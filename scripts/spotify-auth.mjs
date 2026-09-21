import { createServer } from "node:http";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
].join(" ");

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq);
      let value = trimmed.slice(eq + 1);
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

loadEnv();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local");
  process.exit(1);
}

const authorizeUrl = new URL("https://accounts.spotify.com/authorize");
authorizeUrl.searchParams.set("client_id", clientId);
authorizeUrl.searchParams.set("response_type", "code");
authorizeUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authorizeUrl.searchParams.set("scope", SCOPES);
authorizeUrl.searchParams.set("show_dialog", "true");

const server = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end("Not found");
    return;
  }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    res.writeHead(400).end(`Spotify auth failed: ${error ?? "no code"}`);
    server.close();
    process.exit(1);
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const payload = await tokenRes.json();

  if (!tokenRes.ok || !payload.refresh_token) {
    res.writeHead(500).end("Token exchange failed. Check the terminal.");
    console.error(payload.error, payload.error_description);
    server.close();
    process.exit(1);
  }

  const tokenPath = resolve(process.cwd(), ".spotify-refresh-token");
  writeFileSync(tokenPath, payload.refresh_token, { mode: 0o600 });
  console.log("\nSaved refresh token to .spotify-refresh-token (gitignored).");
  res.writeHead(200, { "Content-Type": "text/plain" }).end("Spotify login worked. You can close this tab.");
  server.close();
});

server.listen(8888, "127.0.0.1", () => {
  console.log("Add this Redirect URI in the Spotify developer dashboard if it is missing:");
  console.log(" ", REDIRECT_URI);
  console.log("\nOpen this URL and approve access:\n");
  console.log(authorizeUrl.toString());
});
