"use client";

import { useState } from "react";
import type { NuboIcon } from "@nubo-icons/react";
import * as Line from "@nubo-icons/react/line";
import * as Fill from "@nubo-icons/react/fill";
import * as Duo from "@nubo-icons/react/duo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Demo } from "@/components/showcase-demos";
import { cn } from "@/lib/utils";

function Heading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-base font-medium">{title}</span>
      {description && (
        <span className="text-muted-foreground">{description}</span>
      )}
    </div>
  );
}

export function CreateAccountDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <Demo className="gap-6">
      <Heading
        title="Create an account"
        description="Enter your email below to get started."
      />
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline">
          <Line.CodeIcon data-icon="inline-start" />
          GitHub
        </Button>
        <Button variant="outline">
          <Line.GlobeIcon data-icon="inline-start" />
          Google
        </Button>
      </div>
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="showcase-email">Email</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Line.MailIcon />
            </InputGroupAddon>
            <InputGroupInput
              id="showcase-email"
              type="email"
              placeholder="you@example.com"
            />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="showcase-password">Password</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Line.LockIcon />
            </InputGroupAddon>
            <InputGroupInput
              id="showcase-password"
              type={visible ? "text" : "password"}
              defaultValue="soft-edges"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                aria-label={visible ? "Hide password" : "Show password"}
                onClick={() => setVisible(!visible)}
              >
                {visible ? <Line.EyeOffIcon /> : <Line.EyeIcon />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
      <Button>Create account</Button>
    </Demo>
  );
}

const METHODS = [
  { value: "card", label: "Card", icon: Duo.CreditCardIcon },
  { value: "instant", label: "Instant", icon: Duo.BoltIcon },
  { value: "bank", label: "Bank", icon: Duo.BuildingIcon },
];

export function PaymentDemo() {
  return (
    <Demo className="gap-6">
      <Heading
        title="Payment method"
        description="Add a new payment method to your account."
      />
      <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-3">
        {METHODS.map(({ value, label, icon: MethodIcon }) => (
          <FieldLabel
            key={value}
            htmlFor={`method-${value}`}
            className="flex w-full cursor-pointer flex-col items-center gap-3 rounded-2xl border p-4 has-data-checked:border-primary has-data-checked:bg-muted/50"
          >
            <RadioGroupItem
              id={`method-${value}`}
              value={value}
              className="sr-only"
            />
            <MethodIcon className="size-6" />
            {label}
          </FieldLabel>
        ))}
      </RadioGroup>
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="showcase-card">Card number</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Line.CreditCardIcon />
            </InputGroupAddon>
            <InputGroupInput
              id="showcase-card"
              placeholder="1234 1234 1234 1234"
            />
          </InputGroup>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="showcase-expiry">Expires</FieldLabel>
            <Input id="showcase-expiry" placeholder="MM / YY" />
          </Field>
          <Field>
            <FieldLabel htmlFor="showcase-cvc">CVC</FieldLabel>
            <Input id="showcase-cvc" placeholder="123" />
          </Field>
        </div>
      </FieldGroup>
      <Button>
        <Line.LockIcon data-icon="inline-start" />
        Pay $24.00
      </Button>
    </Demo>
  );
}

const ROLES = [
  { label: "Owner", value: "owner" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];

const MEMBERS = [
  { name: "Ada Obi", email: "ada@example.com", role: "owner" },
  { name: "Kemi Bello", email: "kemi@example.com", role: "editor" },
  { name: "Tunde Eze", email: "tunde@example.com", role: "viewer" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function TeamDemo() {
  return (
    <Demo className="gap-5">
      <div className="flex items-start justify-between gap-4">
        <Heading
          title="Team members"
          description="Invite people to collaborate."
        />
        <Button size="icon" variant="outline" aria-label="Invite">
          <Line.UserPlusIcon />
        </Button>
      </div>
      {MEMBERS.map(({ name, email, role }) => (
        <div key={email} className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{initials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-medium">{name}</span>
            <span className="truncate text-muted-foreground">{email}</span>
          </div>
          <Select items={ROLES} defaultValue={role}>
            <SelectTrigger size="sm" aria-label={`Role for ${name}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ROLES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}
    </Demo>
  );
}

export function ShareDemo() {
  const [copied, setCopied] = useState(false);
  return (
    <Demo className="gap-5">
      <Heading
        title="Share this document"
        description="Anyone with the link can view."
      />
      <InputGroup>
        <InputGroupAddon>
          <Line.LinkIcon />
        </InputGroupAddon>
        <InputGroupInput
          readOnly
          aria-label="Link"
          defaultValue="nubo.app/d/launch-notes"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={copied ? "Copied" : "Copy link"}
            onClick={() => setCopied(true)}
          >
            {copied ? <Line.CheckIcon /> : <Line.CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Separator />
      <div className="flex items-center gap-3">
        <div className="grid size-8 place-items-center rounded-full bg-muted">
          <Duo.GlobeIcon className="size-4" />
        </div>
        <div className="flex flex-1 flex-col">
          <span className="font-medium">Anyone with the link</span>
          <span className="text-muted-foreground">Can view</span>
        </div>
        <Switch defaultChecked aria-label="Link sharing" />
      </div>
      <div className="flex items-center justify-between">
        <AvatarGroup>
          {MEMBERS.map(({ name }) => (
            <Avatar key={name}>
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
        <Button variant="outline" size="sm">
          <Line.MailIcon data-icon="inline-start" />
          Invite by email
        </Button>
      </div>
    </Demo>
  );
}

const COOKIES = [
  {
    label: "Strictly necessary",
    description: "Needed for the site to work.",
    icon: Duo.ShieldIcon,
    locked: true,
  },
  {
    label: "Analytics",
    description: "See which pages get used.",
    icon: Duo.ChartLineIcon,
  },
  {
    label: "Personalization",
    description: "Remember your settings.",
    icon: Duo.SparkleIcon,
  },
];

export function CookiesDemo() {
  return (
    <Demo className="gap-5">
      <Heading title="Cookie settings" />
      {COOKIES.map(({ label, description, icon: CookieIcon, locked }) => (
        <div key={label} className="flex items-center gap-3">
          <CookieIcon className="size-5 shrink-0" />
          <div className="flex flex-1 flex-col">
            <span className="font-medium">{label}</span>
            <span className="text-muted-foreground">{description}</span>
          </div>
          <Switch
            defaultChecked={locked}
            disabled={locked}
            aria-label={label}
          />
        </div>
      ))}
      <Button variant="outline">Save preferences</Button>
    </Demo>
  );
}

const AREAS = [
  { label: "Billing", value: "billing" },
  { label: "Account", value: "account" },
  { label: "Something else", value: "other" },
];

export function ReportDemo() {
  return (
    <Demo className="gap-5">
      <Heading
        title="Report an issue"
        description="What area are you having problems with?"
      />
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel>Area</FieldLabel>
          <Select items={AREAS} defaultValue="billing">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {AREAS.map((a) => (
                  <SelectItem key={a.value} value={a.value}>
                    {a.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="showcase-issue">Description</FieldLabel>
          <Textarea
            id="showcase-issue"
            placeholder="Tell us what happened."
            className="min-h-24"
          />
        </Field>
      </FieldGroup>
      <div className="flex items-center justify-between">
        <Button variant="outline">
          <Line.PaperclipIcon data-icon="inline-start" />
          Attach
        </Button>
        <Button>
          Send report
          <Line.PaperPlaneIcon data-icon="inline-end" />
        </Button>
      </div>
    </Demo>
  );
}

export function EventDemo() {
  return (
    <Demo className="gap-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-center rounded-xl border px-3 py-1.5">
          <span className="text-xs font-medium text-muted-foreground uppercase">
            Oct
          </span>
          <span className="text-xl font-semibold tabular-nums">14</span>
        </div>
        <Badge variant="secondary">In 4 days</Badge>
      </div>
      <span className="text-base font-medium">Design review</span>
      <div className="flex flex-col gap-2.5 text-muted-foreground">
        <span className="flex items-center gap-2.5">
          <Line.ClockIcon className="size-4" />
          10:00 – 11:00
        </span>
        <span className="flex items-center gap-2.5">
          <Line.MapPinIcon className="size-4" />
          Studio, 2nd floor
        </span>
        <span className="flex items-center gap-2.5">
          <Line.VideoCameraIcon className="size-4" />
          meet.nubo.app/review
        </span>
      </div>
      <div className="flex gap-2">
        <Button className="flex-1">
          <Line.CheckIcon data-icon="inline-start" />
          Going
        </Button>
        <Button variant="outline" size="icon" aria-label="Add to calendar">
          <Line.CalendarIcon />
        </Button>
      </div>
    </Demo>
  );
}

const UPLOADS = [
  { name: "brand-guide.pdf", size: "2.4 MB", progress: 100 },
  { name: "hero-photo.png", size: "5.1 MB", progress: 64 },
  { name: "icons-v2.zip", size: "860 KB", progress: 18 },
];

export function UploadDemo() {
  return (
    <Demo className="gap-5">
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed p-6 text-center">
        <Duo.UploadIcon className="size-6" />
        <span className="font-medium">Drop files to upload</span>
        <span className="text-muted-foreground">
          PNG, PDF or ZIP up to 10 MB
        </span>
      </div>
      {UPLOADS.map(({ name, size, progress }) => (
        <div key={name} className="flex items-center gap-3">
          <Line.FileTextIcon className="size-5 shrink-0 text-muted-foreground" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex justify-between gap-2">
              <span className="truncate font-medium">{name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {size}
              </span>
            </div>
            <Progress value={progress} aria-label={`Uploading ${name}`} />
          </div>
          {progress === 100 ? (
            <span className="grid size-8 shrink-0 place-items-center">
              <Fill.CircleCheckIcon className="size-5" />
            </span>
          ) : (
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Cancel ${name}`}
            >
              <Line.XIcon />
            </Button>
          )}
        </div>
      ))}
    </Demo>
  );
}

const COMMANDS: {
  group: string;
  items: { label: string; icon: NuboIcon; keys?: string }[];
}[] = [
  {
    group: "Suggestions",
    items: [
      { label: "Calendar", icon: Line.CalendarIcon },
      { label: "Search emoji", icon: Line.SmileyIcon },
      { label: "Launch terminal", icon: Line.TerminalIcon },
    ],
  },
  {
    group: "Settings",
    items: [
      { label: "Profile", icon: Line.UserIcon, keys: "⌘P" },
      { label: "Billing", icon: Line.CreditCardIcon, keys: "⌘B" },
      { label: "Settings", icon: Line.GearIcon, keys: "⌘S" },
    ],
  },
];

export function CommandDemo() {
  return (
    <Demo className="gap-0 p-0">
      <div className="flex items-center gap-2 px-4">
        <Line.MagnifyingGlassIcon className="size-4 text-muted-foreground" />
        <Input
          aria-label="Search commands"
          placeholder="Type a command or search…"
          className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
      </div>
      <Separator />
      <div className="flex flex-col gap-1 p-2">
        {COMMANDS.map(({ group, items }) => (
          <div key={group} className="flex flex-col">
            <span className="px-3 py-2 text-xs text-muted-foreground">
              {group}
            </span>
            {items.map(({ label, icon: CommandIcon, keys }, i) => (
              <div
                key={label}
                className={cn(
                  "flex h-9 items-center gap-3 rounded-xl px-3",
                  group === "Suggestions" && i === 0 && "bg-muted",
                )}
              >
                <CommandIcon className="size-4" />
                {label}
                {keys && <Kbd className="ml-auto">{keys}</Kbd>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Demo>
  );
}

const TASKS = [
  { title: "Draw the receipt icon", tag: "Icons", done: true, flagged: false },
  { title: "Review batch 14", tag: "Review", done: false, flagged: true },
  { title: "Write the React docs", tag: "Docs", done: false, flagged: false },
  { title: "Export the Figma file", tag: "Design", done: false, flagged: true },
];

export function TasksDemo() {
  return (
    <Demo className="gap-4">
      <div className="flex items-center justify-between">
        <span className="text-base font-medium">Today</span>
        <Button variant="ghost" size="icon-sm" aria-label="Filter">
          <Line.FunnelIcon />
        </Button>
      </div>
      {TASKS.map(({ title, tag, done, flagged }) => (
        <label key={title} className="flex items-center gap-3">
          <Checkbox defaultChecked={done} />
          <span
            className={cn(
              "flex-1",
              done && "text-muted-foreground line-through",
            )}
          >
            {title}
          </span>
          {flagged && (
            <Fill.FlagIcon className="size-4 text-muted-foreground" />
          )}
          <Badge variant="outline" className="w-16">
            {tag}
          </Badge>
        </label>
      ))}
      <Button
        variant="ghost"
        className="-mx-3 justify-start text-muted-foreground has-data-[icon=inline-start]:pl-3"
      >
        <Line.PlusIcon data-icon="inline-start" />
        Add task
      </Button>
    </Demo>
  );
}

export function CallDemo() {
  const [muted, setMuted] = useState(false);
  const [camera, setCamera] = useState(true);
  return (
    <Demo className="gap-4">
      <div className="grid grid-cols-2 gap-2">
        {MEMBERS.slice(0, 2).map(({ name }) => (
          <div
            key={name}
            className="relative grid aspect-4/3 place-items-center rounded-xl bg-muted"
          >
            <Avatar size="lg">
              <AvatarFallback>{initials(name)}</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-2 left-2 text-xs">{name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button
          variant={muted ? "secondary" : "outline"}
          size="icon-lg"
          aria-label={muted ? "Unmute" : "Mute"}
          aria-pressed={muted}
          onClick={() => setMuted(!muted)}
        >
          {muted ? <Line.MicrophoneSlashIcon /> : <Line.MicrophoneIcon />}
        </Button>
        <Button
          variant={camera ? "outline" : "secondary"}
          size="icon-lg"
          aria-label={camera ? "Turn camera off" : "Turn camera on"}
          aria-pressed={!camera}
          onClick={() => setCamera(!camera)}
        >
          {camera ? <Line.VideoCameraIcon /> : <Line.EyeOffIcon />}
        </Button>
        <Button variant="outline" size="icon-lg" aria-label="Share screen">
          <Line.MonitorIcon />
        </Button>
        <Button variant="outline" size="icon-lg" aria-label="Chat">
          <Line.ChatIcon />
        </Button>
        <Button variant="destructive" size="icon-lg" aria-label="Leave call">
          <Fill.PhoneIcon />
        </Button>
      </div>
    </Demo>
  );
}

export function CartDemo() {
  const [items, setItems] = useState([
    { name: "Cloud tee", price: 32, qty: 1 },
    { name: "Sticker pack", price: 8, qty: 2 },
  ]);
  const setQty = (name: string, qty: number) =>
    setItems((list) =>
      list.map((item) => (item.name === name ? { ...item, qty } : item)),
    );
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <Demo className="gap-4">
      <span className="flex items-center gap-2 text-base font-medium">
        <Duo.ShoppingCartIcon className="size-5" />
        Your cart
      </span>
      {items.map(({ name, price, qty }) => (
        <div key={name} className="flex items-center gap-3">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-muted">
            <Duo.ShoppingBagIcon className="size-5" />
          </div>
          <div className="flex flex-1 flex-col">
            <span className="font-medium">{name}</span>
            <span className="text-muted-foreground tabular-nums">${price}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-xs"
              aria-label={`Remove one ${name}`}
              disabled={qty === 1}
              onClick={() => setQty(name, qty - 1)}
            >
              <Line.MinusIcon />
            </Button>
            <span className="w-6 text-center tabular-nums">{qty}</span>
            <Button
              variant="outline"
              size="icon-xs"
              aria-label={`Add one ${name}`}
              onClick={() => setQty(name, qty + 1)}
            >
              <Line.PlusIcon />
            </Button>
          </div>
        </div>
      ))}
      <InputGroup>
        <InputGroupAddon>
          <Line.TagIcon />
        </InputGroupAddon>
        <InputGroupInput aria-label="Promo code" placeholder="Promo code" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Apply</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Separator />
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Total</span>
        <span className="text-base font-semibold tabular-nums">${total}</span>
      </div>
      <Button>Check out</Button>
    </Demo>
  );
}

const FORECAST = [
  { day: "Mon", icon: Duo.SunIcon, high: 31 },
  { day: "Tue", icon: Duo.CloudIcon, high: 27 },
  { day: "Wed", icon: Duo.CloudIcon, high: 26 },
  { day: "Thu", icon: Duo.SunIcon, high: 30 },
  { day: "Fri", icon: Duo.MoonIcon, high: 24 },
];

export function WeatherDemo() {
  return (
    <Demo className="gap-5">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Line.MapPinIcon className="size-4" />
            Lagos
          </span>
          <span className="text-5xl font-semibold tracking-tight tabular-nums">
            29°
          </span>
          <span className="text-muted-foreground">Partly cloudy</span>
        </div>
        <Duo.CloudIcon className="size-14" />
      </div>
      <Separator />
      <div className="grid grid-cols-5 text-center">
        {FORECAST.map(({ day, icon: DayIcon, high }) => (
          <div key={day} className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">{day}</span>
            <DayIcon className="size-5" />
            <span className="tabular-nums">{high}°</span>
          </div>
        ))}
      </div>
    </Demo>
  );
}

const NAV = [
  { label: "Home", line: Line.HouseIcon, fill: Fill.HouseIcon },
  { label: "Projects", line: Line.FolderIcon, fill: Fill.FolderIcon },
  { label: "Calendar", line: Line.CalendarIcon, fill: Fill.CalendarIcon },
  { label: "Reports", line: Line.ChartPieIcon, fill: Fill.ChartPieIcon },
  { label: "Inbox", line: Line.MailIcon, fill: Fill.MailIcon, count: 4 },
];

export function SidebarDemo() {
  const [active, setActive] = useState("Projects");
  return (
    <Demo className="gap-1 p-2">
      <div className="flex items-center gap-2.5 px-3 py-2">
        <div className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Fill.CloudIcon className="size-4" />
        </div>
        <span className="font-medium">Acme Studio</span>
        <Line.ChevronsUpDownIcon className="ml-auto size-4 text-muted-foreground" />
      </div>
      {NAV.map(({ label, line: LineIcon, fill: FillIcon, count }) => {
        const on = label === active;
        const NavIcon = on ? FillIcon : LineIcon;
        return (
          <Button
            key={label}
            variant="ghost"
            aria-current={on ? "page" : undefined}
            onClick={() => setActive(label)}
            className={cn(
              "h-9 justify-start gap-3 px-3 font-normal",
              on ? "bg-muted" : "text-muted-foreground",
            )}
          >
            <NavIcon className="size-4!" />
            {label}
            {count && (
              <Badge variant="secondary" className="ml-auto">
                {count}
              </Badge>
            )}
          </Button>
        );
      })}
      <Separator className="my-1" />
      <Button
        variant="ghost"
        className="h-9 justify-start gap-3 px-3 font-normal text-muted-foreground"
      >
        <Line.GearIcon className="size-4!" />
        Settings
      </Button>
    </Demo>
  );
}

export function AlertsDemo() {
  return (
    <Demo className="gap-0 p-0">
      <Alert className="rounded-none border-0 px-6 py-4">
        <Line.CircleInfoIcon />
        <AlertTitle>New icons are out</AlertTitle>
        <AlertDescription>
          Twelve more, including receipt and key.
        </AlertDescription>
      </Alert>
      <Separator />
      <Alert className="rounded-none border-0 px-6 py-4">
        <Line.TriangleAlertIcon />
        <AlertTitle>Your trial ends soon</AlertTitle>
        <AlertDescription>Pick a plan to keep your projects.</AlertDescription>
      </Alert>
      <Separator />
      <Alert variant="destructive" className="rounded-none border-0 px-6 py-4">
        <Line.CircleXIcon />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          Check your card details and try again.
        </AlertDescription>
      </Alert>
    </Demo>
  );
}

export function ProfileDemo() {
  const [following, setFollowing] = useState(false);
  return (
    <Demo className="gap-4">
      <div className="flex items-start justify-between">
        <Avatar className="size-14">
          <AvatarFallback className="text-base">KB</AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" aria-label="Message">
            <Line.MailIcon />
          </Button>
          <Button
            variant={following ? "outline" : "default"}
            onClick={() => setFollowing(!following)}
          >
            {following ? (
              <Line.UserCheckIcon data-icon="inline-start" />
            ) : (
              <Line.UserPlusIcon data-icon="inline-start" />
            )}
            {following ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-base font-medium">Kemi Bello</span>
        <span className="text-muted-foreground">
          Product designer. Draws small things carefully.
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Line.AtIcon className="size-4" />
          kemi
        </span>
        <span className="flex items-center gap-1.5">
          <Line.MapPinIcon className="size-4" />
          Abuja
        </span>
        <span className="flex items-center gap-1.5">
          <Line.LinkIcon className="size-4" />
          kemi.design
        </span>
        <span className="flex items-center gap-1.5">
          <Line.CalendarIcon className="size-4" />
          Joined 2024
        </span>
      </div>
    </Demo>
  );
}

const TILES = [
  { label: "Wi-Fi", detail: "Home", icon: Line.WifiIcon, on: true },
  { label: "Focus", detail: "Off", icon: Line.MoonIcon, on: false },
  { label: "Notifications", detail: "On", icon: Line.BellIcon, on: true },
  { label: "Low power", detail: "Off", icon: Line.BoltIcon, on: false },
];

export function ControlsDemo() {
  const [tiles, setTiles] = useState(TILES);
  return (
    <Demo className="gap-4">
      <div className="grid grid-cols-2 gap-2">
        {tiles.map(({ label, detail, icon: TileIcon, on }) => (
          <Button
            key={label}
            variant={on ? "default" : "secondary"}
            aria-pressed={on}
            onClick={() =>
              setTiles((list) =>
                list.map((t) => (t.label === label ? { ...t, on: !t.on } : t)),
              )
            }
            className="h-auto justify-start gap-3 rounded-2xl p-3 text-left"
          >
            <TileIcon className="size-5!" />
            <span className="flex min-w-0 flex-col">
              <span className="truncate">{label}</span>
              <span className="truncate text-xs font-normal opacity-70">
                {detail}
              </span>
            </span>
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Line.SunIcon className="size-5 shrink-0 text-muted-foreground" />
        <Slider defaultValue={[70]} aria-label="Brightness" />
      </div>
      <div className="flex items-center gap-3">
        <Line.SpeakerHighIcon className="size-5 shrink-0 text-muted-foreground" />
        <Slider defaultValue={[45]} aria-label="Volume" />
      </div>
    </Demo>
  );
}

const MAIL = [
  {
    from: "Ada Obi",
    subject: "Batch 14 is ready for review",
    preview: "Six new icons, all three styles. Let me know about the key.",
    time: "9:41",
    unread: true,
    attachment: true,
  },
  {
    from: "GitHub",
    subject: "New issue: Request a compass icon",
    preview: "Would love a compass for our maps feature.",
    time: "Yesterday",
    unread: true,
  },
  {
    from: "Tunde Eze",
    subject: "Launch notes",
    preview: "Drafted the changelog, have a look when you can.",
    time: "Mon",
  },
];

export function InboxDemo() {
  const [starred, setStarred] = useState<string[]>(["Launch notes"]);
  return (
    <Demo className="gap-0 p-2">
      {MAIL.map(({ from, subject, preview, time, unread, attachment }) => {
        const isStarred = starred.includes(subject);
        const StarIcon = isStarred ? Fill.StarIcon : Line.StarIcon;
        return (
          <div
            key={subject}
            className="flex gap-3 rounded-xl p-3 hover:bg-muted/60"
          >
            <span
              className={cn(
                "mt-2 size-1.5 shrink-0 rounded-full",
                unread ? "bg-primary" : "bg-transparent",
              )}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className={cn("truncate", unread && "font-medium")}>
                  {from}
                </span>
                {attachment && (
                  <Line.PaperclipIcon className="size-3.5 shrink-0 text-muted-foreground" />
                )}
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                  {time}
                </span>
              </div>
              <span className="truncate">{subject}</span>
              <span className="truncate text-muted-foreground">{preview}</span>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={isStarred ? "Unstar" : "Star"}
              aria-pressed={isStarred}
              onClick={() =>
                setStarred((list) =>
                  isStarred
                    ? list.filter((s) => s !== subject)
                    : [...list, subject],
                )
              }
            >
              <StarIcon />
            </Button>
          </div>
        );
      })}
    </Demo>
  );
}
