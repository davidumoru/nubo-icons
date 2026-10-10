import {
  CameraIcon,
  CloudIcon as CloudLineIcon,
  HeartIcon,
} from "@nubo-icons/react";
import {
  BellIcon,
  CloudIcon as CloudFillIcon,
  SparkleIcon,
} from "@nubo-icons/react/fill";
import {
  CloudIcon as CloudDuoIcon,
  HouseIcon,
  PhoneIcon,
} from "@nubo-icons/react/duo";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Browser } from "@/components/browser";
import { SiteHeader } from "@/components/site-header";
import { icons } from "@/lib/icons";

const SHOWCASE = [
  HeartIcon,
  BellIcon,
  HouseIcon,
  CameraIcon,
  SparkleIcon,
  PhoneIcon,
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
      <SiteHeader />
      <section className="flex flex-col items-center gap-8 py-20 text-center">
        <Badge variant="outline" className="h-8 gap-2 px-3">
          <CloudLineIcon />
          <CloudFillIcon />
          <CloudDuoIcon />
          {icons.length} icons · Line, Fill, Duo
        </Badge>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Soft icons for calm interfaces.
        </h1>
        <p className="max-w-xl text-balance text-muted-foreground sm:text-lg">
          Open-source icons on a 24px grid with a 1.5px stroke. Every icon comes
          in three styles that swap without shifting your layout.
        </p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {SHOWCASE.map((ShowcaseIcon, i) => (
            <Card
              key={i}
              size="sm"
              className="size-16 items-center justify-center p-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:rotate-[-6deg] motion-safe:animate-[float_6s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * -0.9}s` }}
            >
              <ShowcaseIcon size={28} />
            </Card>
          ))}
        </div>
      </section>
      <main className="pb-24">
        <Browser />
      </main>
    </div>
  );
}
