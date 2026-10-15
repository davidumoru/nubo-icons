import type { Metadata } from "next";
import { MorphLab } from "@/components/morph-lab";

export const metadata: Metadata = {
  title: "Morph",
  robots: { index: false },
};

export default function Morph() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-8">
      <MorphLab />
    </main>
  );
}
