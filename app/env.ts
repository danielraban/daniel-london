import { z } from 'zod';

const envSchema = z.object({
  POSTGRES_URL: z.string().min(1),
  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
  SPOTIFY_REFRESH_TOKEN: z.string().min(1),
  OAUTH_CLIENT_KEY: z.string().min(1),
  OAUTH_CLIENT_SECRET: z.string().min(1),
  RESEND_SECRET: z.string().min(1),
  OWNER_EMAIL: z.string().email(),
});

export const env = envSchema.parse(process.env);
