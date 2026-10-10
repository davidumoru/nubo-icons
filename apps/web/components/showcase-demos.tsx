"use client";

import { useState } from "react";
import * as Line from "@nubo-icons/react/line";
import * as Fill from "@nubo-icons/react/fill";
import * as Duo from "@nubo-icons/react/duo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function Demo({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("mb-6 break-inside-avoid p-6", className)}>
      {children}
    </Card>
  );
}

const TABS = [
  { label: "Home", line: Line.HouseIcon, fill: Fill.HouseIcon },
  {
    label: "Search",
    line: Line.MagnifyingGlassIcon,
    fill: Fill.MagnifyingGlassIcon,
  },
  { label: "Saved", line: Line.HeartIcon, fill: Fill.HeartIcon },
  { label: "Profile", line: Line.UserIcon, fill: Fill.UserIcon },
];

export function TabBarDemo() {
  const [active, setActive] = useState("Home");
  return (
    <Demo>
      <nav className="grid grid-cols-4 gap-1">
        {TABS.map(({ label, line: LineIcon, fill: FillIcon }) => {
          const on = label === active;
          const TabIcon = on ? FillIcon : LineIcon;
          return (
            <Button
              key={label}
              variant="ghost"
              aria-pressed={on}
              onClick={() => setActive(label)}
              className={cn(
                "h-auto flex-col gap-1.5 py-2.5 text-xs",
                !on && "text-muted-foreground",
              )}
            >
              <TabIcon className="size-6!" />
              {label}
            </Button>
          );
        })}
      </nav>
    </Demo>
  );
}

const FORMAT = [
  { label: "Align left", icon: Line.TextAlignLeftIcon },
  { label: "Bulleted list", icon: Line.ListIcon },
  { label: "Numbered list", icon: Line.ListOrderedIcon },
  { label: "Link", icon: Line.LinkIcon },
  { label: "Code", icon: Line.CodeIcon },
];

export function ComposerDemo() {
  return (
    <Demo className="gap-0 p-0">
      <Input
        placeholder="Write a message…"
        className="h-14 rounded-none border-0 bg-transparent px-5 shadow-none focus-visible:ring-0"
      />
      <Separator />
      <div className="flex items-center gap-0.5 p-2">
        {FORMAT.map(({ label, icon: FormatIcon }) => (
          <Button key={label} variant="ghost" size="icon" aria-label={label}>
            <FormatIcon />
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Attach"
          className="ml-auto"
        >
          <Line.PaperclipIcon />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Emoji">
          <Line.SmileyIcon />
        </Button>
        <Button size="icon" aria-label="Send">
          <Fill.PaperPlaneIcon />
        </Button>
      </div>
    </Demo>
  );
}

export function PlayerDemo() {
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const LikeIcon = liked ? Fill.HeartIcon : Line.HeartIcon;
  return (
    <Demo>
      <div className="flex items-center gap-4">
        <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-muted">
          <Duo.MicrophoneIcon className="size-6" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-medium">Soft Edges</span>
          <span className="truncate text-muted-foreground">Cumulus</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={liked ? "Unlike" : "Like"}
          aria-pressed={liked}
          onClick={() => setLiked(!liked)}
        >
          <LikeIcon />
        </Button>
      </div>
      <Slider defaultValue={[38]} aria-label="Position" />
      <div className="flex items-center justify-center gap-2">
        <Button variant="ghost" size="icon-lg" aria-label="Previous">
          <Fill.SkipBackIcon />
        </Button>
        <Button
          size="icon-lg"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? <Fill.PauseIcon /> : <Fill.PlayIcon />}
        </Button>
        <Button variant="ghost" size="icon-lg" aria-label="Next">
          <Fill.SkipForwardIcon />
        </Button>
      </div>
    </Demo>
  );
}

const SETTINGS = [
  { label: "Account", icon: Duo.UserIcon },
  { label: "Notifications", icon: Duo.BellIcon },
  { label: "Privacy", icon: Duo.LockIcon },
  { label: "Billing", icon: Duo.CreditCardIcon },
];

export function SettingsDemo() {
  return (
    <Demo className="gap-1 p-2">
      {SETTINGS.map(({ label, icon: RowIcon }) => (
        <Button
          key={label}
          variant="ghost"
          className="h-11 justify-start gap-3 px-3 font-normal"
        >
          <RowIcon className="size-5!" />
          {label}
          <Line.ChevronRightIcon className="ml-auto text-muted-foreground" />
        </Button>
      ))}
      <Separator className="my-1" />
      <label className="flex h-11 items-center gap-3 pr-3.5 pl-3 text-sm">
        <Duo.MoonIcon className="size-5" />
        Dark mode
        <Switch className="ml-auto" defaultChecked />
      </label>
      <Button
        variant="ghost"
        className="h-11 justify-start gap-3 px-3 font-normal text-destructive hover:text-destructive"
      >
        <Duo.SignOutIcon className="size-5!" />
        Sign out
      </Button>
    </Demo>
  );
}

const STATS = [
  { label: "Revenue", value: "$12.4k", change: "+8%", icon: Duo.ChartBarIcon },
  { label: "Customers", value: "1,284", change: "+3%", icon: Duo.UsersIcon },
  { label: "Orders", value: "342", change: "+12%", icon: Duo.ReceiptIcon },
  { label: "Rating", value: "4.9", change: "+0.2", icon: Duo.StarIcon },
];

export function StatsDemo() {
  return (
    <Demo>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        {STATS.map(({ label, value, change, icon: StatIcon }) => (
          <div key={label} className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-muted-foreground">
              <StatIcon className="size-5" />
              {label}
            </span>
            <span className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight tabular-nums">
                {value}
              </span>
              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <Line.TrendUpIcon className="size-3.5" />
                {change}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Demo>
  );
}

const FILES = [
  { name: "Brand", meta: "12 files", icon: Duo.FolderIcon },
  { name: "Launch notes.md", meta: "4 KB", icon: Duo.FileTextIcon },
  { name: "Hero.png", meta: "1.2 MB", icon: Duo.ImageIcon },
  { name: "Icons.zip", meta: "86 KB", icon: Duo.ArchiveIcon },
];

export function FilesDemo() {
  return (
    <Demo className="gap-0 p-2">
      {FILES.map(({ name, meta, icon: FileIcon }) => (
        <div
          key={name}
          className="flex h-12 items-center gap-3 rounded-xl px-3 hover:bg-muted"
        >
          <FileIcon className="size-5 shrink-0" />
          <span className="truncate">{name}</span>
          <span className="ml-auto shrink-0 text-xs text-muted-foreground tabular-nums">
            {meta}
          </span>
        </div>
      ))}
    </Demo>
  );
}

const NOTICES = [
  {
    title: "Deploy finished",
    body: "nubo-web is live.",
    icon: Fill.CircleCheckIcon,
  },
  {
    title: "Storage almost full",
    body: "You've used 92% of your plan.",
    icon: Fill.TriangleAlertIcon,
  },
  {
    title: "New comment",
    body: "Ada replied on Launch notes.",
    icon: Fill.ChatIcon,
  },
];

export function NoticesDemo() {
  return (
    <Demo className="gap-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">Notifications</span>
        <Badge variant="secondary">3 new</Badge>
      </div>
      {NOTICES.map(({ title, body, icon: NoticeIcon }) => (
        <div key={title} className="flex gap-3">
          <NoticeIcon className="mt-0.5 size-5 shrink-0" />
          <div className="flex flex-col">
            <span className="font-medium">{title}</span>
            <span className="text-muted-foreground">{body}</span>
          </div>
        </div>
      ))}
    </Demo>
  );
}

export function EmptyDemo() {
  return (
    <Demo className="items-center gap-4 py-10 text-center">
      <Duo.CloudIcon className="size-12" />
      <div className="flex flex-col gap-1">
        <span className="font-medium">No uploads yet</span>
        <span className="text-muted-foreground">
          Drop files here to add them.
        </span>
      </div>
      <Button variant="outline">
        <Line.UploadIcon data-icon="inline-start" />
        Upload files
      </Button>
    </Demo>
  );
}
