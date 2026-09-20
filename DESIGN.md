---
name: ReelHouse
description: An editorial film-discovery experience backed by live TMDB data.
colors:
  canvas: "#090a0f"
  surface: "#111218"
  paper: "#f2eee4"
  accent: "#c5a467"
  body-muted: "#c2c1c2"
  border: "rgba(255,255,255,.1)"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(45px, 7vw, 100px)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "DM Mono, monospace"
    fontSize: "10px"
    fontWeight: 500
    letterSpacing: "0.14em"
rounded:
  card: "20px"
  media: "16px"
  control: "999px"
spacing:
  compact: "8px"
  standard: "16px"
  section: "70px"
components:
  primary-action:
    backgroundColor: "{colors.paper}"
    textColor: "#111217"
    rounded: "{rounded.control}"
    padding: "6px 7px 6px 22px"
  genre-chip:
    backgroundColor: "transparent"
    textColor: "#bdb9b0"
    rounded: "{rounded.control}"
    padding: "8px 12px"
---

# Design System: ReelHouse

## Overview

**Creative North Star: "The Midnight Film Index"**

ReelHouse is a dark, editorial film index: generous imagery, large serif titles, and restrained metadata guide the eye from discovery to a considered viewing decision. The experience is cinematic without becoming theatrical; content is always the focal point.

**Key Characteristics:**

- Deep charcoal canvas with warm paper and muted gold accents.
- Editorial serif display type paired with calm sans-serif copy.
- Horizontal discovery rails and spacious full-page film detail.
- Motion is soft, sparse, and respects reduced-motion preferences.

## Colors

The palette evokes a dim cinema with warm reflected light. Gold is a selective navigational accent, not a dominant background.

**The Rare Gold Rule.** Use the accent for decisions, metadata emphasis, and active states; do not turn large surfaces gold.

## Typography

**Display Font:** Playfair Display, Georgia, serif.
**Body Font:** Manrope, sans-serif.
**Label/Mono Font:** DM Mono, monospace.

Display type carries film titles and section titles. Body copy remains readable and should stay within a comfortable reading measure. Mono is reserved for compact labels, ratings, and metadata.

**The Editorial Title Rule.** A film title is allowed to be large and expressive; utility labels remain small and quiet.

## Layout

Use wide, image-led hero regions and horizontal rails for discovery. Detail pages move into a full-width hero followed by a constrained reading column. The desktop content frame uses `max(5vw, 32px)` gutters; mobile uses 20px gutters.

On narrow screens, rails preserve horizontal scrolling, cast and provider items reduce in width, and split editorial sections become one column.

## Elevation & Depth

Depth is mainly tonal: dark surfaces, subtle white alpha borders, and occasional soft shadows distinguish interactive media. Blur is reserved for the navigation island and modal trailer backdrop, where it clarifies layered context.

## Shapes

Poster shells use rounded cards (20px outer, 16px media). Controls that communicate a small action use pills or circles; large content remains primarily edge-to-edge rather than card-heavy.

## Components

### Buttons

- **Primary action:** warm paper surface, dark text, pill silhouette, with a gold circular directional affordance.
- **Text action:** transparent background with gold icon treatment.
- **Genre chip:** outlined at rest; gold background and dark text when active.

### Cards / Containers

- **Poster card:** dark translucent shell, subtle border, poster image with bottom gradient and compact metadata.
- **Rail:** heading followed by horizontally scrollable posters; do not replace it with a dense fixed grid on mobile.

### Inputs / Fields

- **Search:** dark inset surface, mono label, serif input text, and a high-contrast action area.

### Navigation

- **Home navigation:** centered translucent pill with backdrop blur.
- **Detail navigation:** minimal back action and wordmark above the hero.

## Do's and Don'ts

### Do:

- **Do** lead each page with the film or decision the visitor came to make.
- **Do** use warm gold sparingly for active filters, rating emphasis, and small actions.
- **Do** keep metadata compact and secondary to imagery and film titles.
- **Do** preserve horizontal rails for browsable film groups.

### Don't:

- **Don't** add bright, saturated surfaces that compete with poster art.
- **Don't** turn the detail experience back into a constrained modal.
- **Don't** use large grids of equally weighted cards where a film hierarchy exists.
- **Don't** use mono type for long-form synopsis or review content.
