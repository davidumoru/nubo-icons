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
| circle                     | ✅       | Radio and dropdown radio indicators.                            |
| dot                        | ✅       | Small filled dot; menu indicators.                              |
| ellipsis                   | ✅       | Alias `more-horizontal`. Breadcrumb and pagination overflow.    |
| ellipsis-vertical          | ✅       | Alias `more-vertical`.                                          |
| grip-vertical              | ✅       | Resizable panel handle.                                         |
| loader                     | ✅       | Spinner for buttons and toasts. Must look right while rotating. |
| sliders-horizontal         | ✅       | Filters and adjustments.                                        |
| funnel                     | ✅       | Alias `filter`.                                                 |
| link                       | ✅       | Chain links.                                                    |
| arrow-up-right-from-square | ✅       | Alias `external-link`.                                          |
| share                      | ✅       | Box with an arrow out.                                          |
| download                   | ✅       | Morph group candidate.                                          |
| upload                     | ✅       | Morph group candidate.                                          |
| arrows-clockwise           | ✅       | Alias `refresh`.                                                |
| arrow-counter-clockwise    | ✅       | Alias `undo`.                                                   |
| arrow-clockwise            | ✅       | Alias `redo`.                                                   |
| sign-out                   | ✅       | Alias `log-out`. Mirrors in RTL.                                |
| sign-in                    | P3       | Alias `log-in`. Mirrors in RTL.                                 |
| arrows-out                 | P3       | Alias `maximize`.                                               |
| arrows-in                  | P3       | Alias `minimize`.                                               |
| pin                        | P3       | Push pin.                                                       |
| bookmark                   | ✅       |                                                                 |
| star                       | ✅       | Five points, soft tips. Never folded or halved in Duo.          |
| flag                       | P3       |                                                                 |
| tag                        | P3       |                                                                 |
| archive                    | P3       | Box with a lid.                                                 |
| sparkle                    | ✅       | Alias `sparkles`. The AI icon.                                  |
| bolt                       | P3       | Alias `zap`.                                                    |

## Arrows and navigation

| Icon                       | Priority | Notes                                    |
| -------------------------- | -------- | ---------------------------------------- |
| arrow-up/down/left/right   | ✅       |                                          |
| chevron-up/down/left/right | ✅       |                                          |
| chevrons-up-down           | ✅       | Combobox and select triggers.            |
| chevrons-left              | ✅       | First page.                              |
| chevrons-right             | ✅       | Last page.                               |
| arrow-up-right             | ✅       | Outbound link, growth.                   |
| arrows-up-down             | ✅       | Alias `sort`.                            |
| arrow-elbow-down-left      | P3       | Alias `corner-down-left`. The enter key. |
| panel-left                 | ✅       | Sidebar toggle.                          |
| panel-right                | P3       |                                          |

## Status and feedback

| Icon            | Priority | Notes                                                        |
| --------------- | -------- | ------------------------------------------------------------ |
| circle-check    | ✅       |                                                              |
| circle-x        | ✅       | Error toasts (shadcn's sonner uses an octagon; we alias it). |
| circle-info     | ✅       | Alias `info`.                                                |
| triangle-alert  | ✅       | Alias `alert-triangle`. Warning toasts.                      |
| circle-alert    | ✅       | Alias `alert-circle`.                                        |
| circle-question | ✅       | Alias `help-circle`.                                         |
| clock           | ✅       |                                                              |
| bell            | ✅       |                                                              |
| bell-off        | P3       | Slash rule from DESIGN.md.                                   |
| prohibit        | P3       | Alias `ban`.                                                 |

## People

| Icon        | Priority | Notes                         |
| ----------- | -------- | ----------------------------- |
| user        | ✅       |                               |
| user-plus   | ✅       |                               |
| user-minus  | ✅       | Same badge rule as user-plus. |
| user-check  | P3       |                               |
| users       | ✅       | Two people.                   |
| circle-user | ✅       | Avatar fallback.              |

## Files and data

| Icon        | Priority | Notes                                    |
| ----------- | -------- | ---------------------------------------- |
| file        | ✅       | Page with a folded corner.               |
| file-text   | ✅       |                                          |
| folder      | ✅       |                                          |
| folder-open | P3       |                                          |
| image       | ✅       | Mountains and sun.                       |
| paperclip   | ✅       |                                          |
| clipboard   | ✅       |                                          |
| copy        | ✅       |                                          |
| cloud       | ✅       | Nubo means cloud. Worth getting perfect. |
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
| chat        | ✅       | Alias `message-circle`. |
| paper-plane | ✅       | Alias `send`.           |
| phone       | ✅       |                         |
| at          | P3       |                         |

## Media

| Icon             | Priority | Notes                               |
| ---------------- | -------- | ----------------------------------- |
| play             | ✅       | Morph group candidate (play/pause). |
| pause            | ✅       | Morph group candidate.              |
| stop             | P3       |                                     |
| skip-forward     | P3       |                                     |
| skip-back        | P3       |                                     |
| speaker-high     | ✅       | Alias `volume-2`.                   |
| speaker-slash    | ✅       | Alias `volume-x`.                   |
| microphone       | ✅       | Alias `mic`.                        |
| microphone-slash | P3       | Alias `mic-off`.                    |
| camera           | ✅       |                                     |
| video-camera     | P3       | Alias `video`.                      |

## Devices and system

| Icon          | Priority | Notes                  |
| ------------- | -------- | ---------------------- |
| sun           | ✅       | Theme toggle.          |
| moon          | ✅       | Theme toggle.          |
| monitor       | ✅       | "System" theme option. |
| device-mobile | P3       | Alias `smartphone`.    |
| globe         | ✅       | Language, public.      |
| wifi          | P3       |                        |
| power         | P3       |                        |

## Security

| Icon         | Priority | Notes           |
| ------------ | -------- | --------------- |
| lock         | ✅       |                 |
| lock-open    | ✅       | Alias `unlock`. |
| eye          | ✅       |                 |
| eye-off      | ✅       |                 |
| key          | ✅       |                 |
| shield       | P3       |                 |
| shield-check | ✅       |                 |

## Commerce

| Icon          | Priority | Notes |
| ------------- | -------- | ----- |
| shopping-cart | ✅       |       |
| shopping-bag  | P3       |       |
| credit-card   | ✅       |       |
| receipt       | P3       |       |
| gift          | P3       |       |

## Places and time

| Icon     | Priority | Notes         |
| -------- | -------- | ------------- |
| house    | ✅       | Alias `home`. |
| calendar | ✅       |               |
| map-pin  | ✅       |               |
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
