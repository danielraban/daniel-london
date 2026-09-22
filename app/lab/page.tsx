import type { Metadata } from "next";
import {
  ContinueSlots,
  PowerGrid,
  RepoCartridges,
} from "../components/github-lab";
import { PixelButton } from "../components/pixel-button";
import { getGitHubSnapshot } from "@/lib/github";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Lab",
  description: `Live GitHub cartridges and continue files from ${profile.name}.`,
};

export default async function LabPage() {
  const { gridStatus, cartridges, slots, grid } = await getGitHubSnapshot();

  return (
    <div className="space-y-6">
      <h1 className="font-pixel text-sm tracking-widest text-neon">LAB</h1>
      <p className="text-muted">
        Public cartridges, a year of commits, and three continue files. Client
        work stays on the work page.
      </p>
      <RepoCartridges cartridges={cartridges} />
      <PowerGrid grid={grid} status={gridStatus} />
      <ContinueSlots slots={slots} />
      <PixelButton href={profile.github}>GITHUB</PixelButton>
    </div>
  );
}
