import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@nubo-icons/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Canvas } from "@/components/canvas";
import { pageMetadata } from "@/lib/site";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ComposerDemo,
  EmptyDemo,
  FilesDemo,
  NoticesDemo,
  PlayerDemo,
  SettingsDemo,
  StatsDemo,
  TabBarDemo,
} from "@/components/showcase-demos";
import {
  AlertsDemo,
  CallDemo,
  CartDemo,
  CommandDemo,
  ControlsDemo,
  CookiesDemo,
  CreateAccountDemo,
  EventDemo,
  InboxDemo,
  PaymentDemo,
  ProfileDemo,
  ReportDemo,
  ShareDemo,
  SidebarDemo,
  TasksDemo,
  TeamDemo,
  UploadDemo,
  WeatherDemo,
} from "@/components/showcase-more";

export const metadata: Metadata = pageMetadata({
  title: "Showcase",
  description: "Nubo in the places icons usually live.",
  path: "/showcase",
  image: "/og/showcase",
});

export default function Showcase() {
  return (
    <main className="h-svh">
      <div className="fixed top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-background/80 p-1 pr-4 ring-1 ring-foreground/10 backdrop-blur">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Back to home"
          nativeButton={false}
          render={<Link href="/" />}
        >
          <ArrowLeftIcon />
        </Button>
        <Link href="/" className="rounded-md">
          <Logo />
        </Link>
        <Separator orientation="vertical" className="mx-2 my-auto h-4" />
        <h1 className="text-sm text-muted-foreground">Showcase</h1>
      </div>
      <div className="fixed top-4 right-4 z-10 rounded-full bg-background/80 p-1 ring-1 ring-foreground/10 backdrop-blur">
        <ThemeToggle />
      </div>
      <Canvas aria-label="Showcase" className="size-full">
        <div className="w-max px-6 pt-24 pb-12 sm:px-12">
          <div className="w-[139.5rem] columns-6 gap-6">
            <CreateAccountDemo />
            <TabBarDemo />
            <TeamDemo />
            <InboxDemo />
            <CommandDemo />
            <PlayerDemo />
            <PaymentDemo />
            <NoticesDemo />
            <SidebarDemo />
            <EventDemo />
            <ShareDemo />
            <TasksDemo />
            <ControlsDemo />
            <UploadDemo />
            <SettingsDemo />
            <CartDemo />
            <WeatherDemo />
            <ProfileDemo />
            <CallDemo />
            <ReportDemo />
            <StatsDemo />
            <ComposerDemo />
            <CookiesDemo />
            <FilesDemo />
            <AlertsDemo />
            <EmptyDemo />
          </div>
        </div>
      </Canvas>
    </main>
  );
}
