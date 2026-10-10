# Launch icon list

The icons nubo ships with at 1.0: enough to build a whole app without reaching for another set. About 130 icons, every one in Line, Fill and Duo.

Edit freely. Names follow DESIGN.md: name what the icon shows, and give it the Lucide name as an alias when Lucide names it by function.

**Priority**

- **P1** — shadcn/ui components import these. Until they exist, adding a shadcn component brings Lucide back.
- **P2** — core interface icons almost every app needs.
- **P3** — common but app-specific; ship if time allows, otherwise right after launch.

✅ = approved and in the set.

## Interface and actions

| Icon                       | Priority | Notes                                                           |
| -------------------------- | -------- | --------------------------------------------------------------- |
| check                      | ✅       |                                                                 |
| x                          | ✅       |                                                                 |
| plus                       | ✅       |                                                                 |
| minus                      | ✅       | Also used by shadcn's input-otp.                                |
| menu                       | ✅       |                                                                 |
| magnifying-glass           | ✅       | Alias `search`.                                                 |
| gear                       | ✅       | Alias `settings`.                                               |
| circle                     | P1       | Radio and dropdown radio indicators.                            |
| dot                        | P1       | Small filled dot; menu indicators.                              |
| ellipsis                   | P1       | Alias `more-horizontal`. Breadcrumb and pagination overflow.    |
| ellipsis-vertical          | P2       | Alias `more-vertical`.                                          |
| grip-vertical              | P1       | Resizable panel handle.                                         |
| loader                     | P1       | Spinner for buttons and toasts. Must look right while rotating. |
| sliders-horizontal         | P2       | Filters and adjustments.                                        |
| funnel                     | P2       | Alias `filter`.                                                 |
| link                       | P2       | Chain links.                                                    |
| arrow-up-right-from-square | P2       | Alias `external-link`.                                          |
| share                      | P2       | Box with an arrow out.                                          |
| download                   | P2       | Morph group candidate.                                          |
| upload                     | P2       | Morph group candidate.                                          |
| arrows-clockwise           | P2       | Alias `refresh`.                                                |
| arrow-counter-clockwise    | P2       | Alias `undo`.                                                   |
| arrow-clockwise            | P2       | Alias `redo`.                                                   |
| sign-out                   | P2       | Alias `log-out`. Mirrors in RTL.                                |
| sign-in                    | P3       | Alias `log-in`. Mirrors in RTL.                                 |
| arrows-out                 | P3       | Alias `maximize`.                                               |
| arrows-in                  | P3       | Alias `minimize`.                                               |
| pin                        | P3       | Push pin.                                                       |
| bookmark                   | P2       |                                                                 |
| star                       | P2       | Five points, soft tips. Never folded or halved in Duo.          |
| flag                       | P3       |                                                                 |
| tag                        | P3       |                                                                 |
| archive                    | P3       | Box with a lid.                                                 |
| sparkle                    | P2       | Alias `sparkles`. The AI icon.                                  |
| bolt                       | P3       | Alias `zap`.                                                    |

## Arrows and navigation

| Icon                       | Priority | Notes                                    |
| -------------------------- | -------- | ---------------------------------------- |
| arrow-up/down/left/right   | ✅       |                                          |
| chevron-up/down/left/right | ✅       |                                          |
| chevrons-up-down           | P1       | Combobox and select triggers.            |
| chevrons-left              | P2       | First page.                              |
| chevrons-right             | P2       | Last page.                               |
| arrow-up-right             | P2       | Outbound link, growth.                   |
| arrows-up-down             | P2       | Alias `sort`.                            |
| arrow-elbow-down-left      | P3       | Alias `corner-down-left`. The enter key. |
| panel-left                 | P1       | Sidebar toggle.                          |
| panel-right                | P3       |                                          |

## Status and feedback

| Icon            | Priority | Notes                                                        |
| --------------- | -------- | ------------------------------------------------------------ |
| circle-check    | ✅       |                                                              |
| circle-x        | P1       | Error toasts (shadcn's sonner uses an octagon; we alias it). |
| circle-info     | P1       | Alias `info`.                                                |
| triangle-alert  | P1       | Alias `alert-triangle`. Warning toasts.                      |
| circle-alert    | P2       | Alias `alert-circle`.                                        |
| circle-question | P2       | Alias `help-circle`.                                         |
| clock           | P2       |                                                              |
| bell            | ✅       |                                                              |
| bell-off        | P3       | Slash rule from DESIGN.md.                                   |
| prohibit        | P3       | Alias `ban`.                                                 |

## People

| Icon        | Priority | Notes                         |
| ----------- | -------- | ----------------------------- |
| user        | ✅       |                               |
| user-plus   | ✅       |                               |
| user-minus  | P2       | Same badge rule as user-plus. |
| user-check  | P3       |                               |
| users       | P2       | Two people.                   |
| circle-user | P2       | Avatar fallback.              |

## Files and data

| Icon        | Priority | Notes                                    |
| ----------- | -------- | ---------------------------------------- |
| file        | P2       | Page with a folded corner.               |
| file-text   | P2       |                                          |
| folder      | P2       |                                          |
| folder-open | P3       |                                          |
| image       | P2       | Mountains and sun.                       |
| paperclip   | P2       |                                          |
| clipboard   | P2       |                                          |
| copy        | ✅       |                                          |
| cloud       | P2       | Nubo means cloud. Worth getting perfect. |
| database    | P3       |                                          |
| code        | P2       | Angle brackets.                          |
| terminal    | P3       |                                          |

## Editing and text

| Icon            | Priority | Notes              |
| --------------- | -------- | ------------------ |
| pencil          | ✅       | Alias `edit`.      |
| trash           | ✅       |                    |
| scissors        | P3       |                    |
| list            | P2       | Bullets and lines. |
| list-ordered    | P3       |                    |
| text-align-left | P3       |                    |
| quotes          | P3       |                    |

## Communication

| Icon        | Priority | Notes                   |
| ----------- | -------- | ----------------------- |
| mail        | ✅       | Alias `envelope`.       |
| chat        | P2       | Alias `message-circle`. |
| paper-plane | P2       | Alias `send`.           |
| phone       | P2       |                         |
| at          | P3       |                         |

## Media

| Icon             | Priority | Notes                               |
| ---------------- | -------- | ----------------------------------- |
| play             | P2       | Morph group candidate (play/pause). |
| pause            | P2       | Morph group candidate.              |
| stop             | P3       |                                     |
| skip-forward     | P3       |                                     |
| skip-back        | P3       |                                     |
| speaker-high     | P2       | Alias `volume-2`.                   |
| speaker-slash    | P2       | Alias `volume-x`.                   |
| microphone       | P2       | Alias `mic`.                        |
| microphone-slash | P3       | Alias `mic-off`.                    |
| camera           | P2       |                                     |
| video-camera     | P3       | Alias `video`.                      |

## Devices and system

| Icon          | Priority | Notes                  |
| ------------- | -------- | ---------------------- |
| sun           | P2       | Theme toggle.          |
| moon          | P2       | Theme toggle.          |
| monitor       | P2       | "System" theme option. |
| device-mobile | P3       | Alias `smartphone`.    |
| globe         | P2       | Language, public.      |
| wifi          | P3       |                        |
| power         | P3       |                        |

## Security

| Icon         | Priority | Notes           |
| ------------ | -------- | --------------- |
| lock         | ✅       |                 |
| lock-open    | P2       | Alias `unlock`. |
| eye          | ✅       |                 |
| eye-off      | ✅       |                 |
| key          | P2       |                 |
| shield       | P3       |                 |
| shield-check | P2       |                 |

## Commerce

| Icon          | Priority | Notes |
| ------------- | -------- | ----- |
| shopping-cart | P2       |       |
| shopping-bag  | P3       |       |
| credit-card   | P2       |       |
| receipt       | P3       |       |
| gift          | P3       |       |

## Places and time

| Icon     | Priority | Notes         |
| -------- | -------- | ------------- |
| house    | ✅       | Alias `home`. |
| calendar | ✅       |               |
| map-pin  | P2       |               |
| map      | P3       |               |
| compass  | P3       |               |
| building | P3       |               |

## Layout and charts

| Icon         | Priority | Notes                |
| ------------ | -------- | -------------------- |
| squares-four | P2       | Alias `layout-grid`. |
| rows         | P3       | Alias `layout-list`. |
| chart-bar    | P2       |                      |
| chart-line   | P3       |                      |
| chart-pie    | P3       |                      |
| trend-up     | P3       | Alias `trending-up`. |

## Social

| Icon           | Priority | Notes          |
| -------------- | -------- | -------------- |
| heart          | ✅       |                |
| heart-straight | ✅       |                |
| thumbs-up      | P3       |                |
| smiley         | P3       | Alias `smile`. |

## Not in scope

- **Brand logos** (GitHub, X, Google). Trademark terms make them a liability; Simple Icons covers them.
- **Flags, emoji and illustrations.** Different drawing rules from UI icons.
- **Near-duplicates.** One icon per metaphor; variants only when they carry a different meaning.

## Suggested batches

1. **Batch 6 (P1, shadcn):** circle, dot, ellipsis, grip-vertical, loader, chevrons-up-down, panel-left.
2. **Batch 7 (P1 status):** circle-x, circle-info, triangle-alert, circle-alert, circle-question, clock.
3. Then P2 by category, P3 last.
