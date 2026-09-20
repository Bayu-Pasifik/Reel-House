---
name: ReelHouse
description: A compact streaming-catalog experience backed by live TMDB data.
colors:
  canvas: "#111111"
  surface: "#1b1b1b"
  surface-raised: "#262626"
  paper: "#f5f5f5"
  accent: "#f6c445"
  body-muted: "#b5b5b5"
  border: "#323232"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(42px, 6vw, 82px)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.8
rounded:
  card: "8px"
  media: "6px"
  control: "6px"
spacing:
  compact: "8px"
  standard: "16px"
  section: "70px"
components:
  primary-action:
    backgroundColor: "{colors.accent}"
    textColor: "#171717"
    rounded: "{rounded.control}"
    padding: "6px 7px 6px 22px"
  genre-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body-muted}"
    rounded: "{rounded.control}"
    padding: "9px 13px"
---

# Design System: ReelHouse

## Overview

**Creative North Star: "The Night Channel Guide"**

ReelHouse is a dark, high-density guide for deciding what to watch. Large artwork, compact labels, strong sans-serif titles, and familiar streaming-catalog rhythms make the next useful film visible quickly. The experience keeps ReelHouse's live TMDB data and full detail pages, while replacing the former slow editorial presentation.

**Key Characteristics:**

- Near-black canvas, graphite surfaces, and a restrained warm yellow action color.
- Condensed display type paired with readable Manrope body copy.
- Horizontal poster rails, compact filters, and a direct full-page detail view.
- Motion is reserved for one purposeful entrance and responsive poster feedback.

## Colors

The palette is tuned for a dark-room browsing scene. Yellow identifies a decision or an active control; it never becomes the page background.

**The Signal Rule.** Use the accent for decisions, metadata emphasis, and active states; do not turn large surfaces yellow.

## Typography

**Display Font:** Barlow Condensed, sans-serif.
**Body Font:** Manrope, sans-serif.

Display type carries film titles and section titles. Body copy remains readable and stays within a comfortable reading measure. Compact metadata uses the body face at a small, semibold weight.

**The Catalog Title Rule.** A film title is immediate and compact; utility labels remain secondary and never compete with artwork.

## Layout

Use a fixed full-width top navigation, an image-led but compact hero, and horizontal rails for discovery. Detail pages use the same navigation language and keep the full-width hero with a constrained reading column. The desktop content frame uses `max(4vw, 28px)` gutters; mobile uses 16px gutters.

On narrow screens, rails preserve horizontal scrolling, cast and provider items reduce in width, and split editorial sections become one column.

## Elevation & Depth

Depth is tonal: graphite surfaces, thin charcoal dividers, and a soft downward shadow on elevated controls. There is no decorative glass or blur.

## Shapes

Poster shells use 8px corners with 6px media corners. Controls use compact rectangular corners; only small utility controls may become round.

## Components

### Buttons

- **Primary action:** yellow surface, dark text, compact rectangular silhouette.
- **Text action:** transparent until hover, then a graphite surface.
- **Genre chip:** graphite at rest; yellow background and dark text when active.

### Cards / Containers

- **Poster card:** near-edge-to-edge art with a short bottom gradient, compact metadata, and a focused yellow outline.
- **Rail:** a bold title, a low-emphasis browse action, and horizontally scrollable posters. On mobile, preserve the rail rather than forcing a dense fixed grid.

### Inputs / Fields

- **Search:** graphite field, body-font input, and a high-contrast yellow action area.

### Navigation

- **Home navigation:** full-width, opaque dark bar with wordmark left and simple discovery links.
- **Detail navigation:** the same solid bar with a clear back action and wordmark.

## Do's and Don'ts

### Do:

- **Do** lead each page with the film or decision the visitor came to make.
- **Do** use warm yellow sparingly for active filters, rating emphasis, and primary actions.
- **Do** keep metadata compact and secondary to artwork and film titles.
- **Do** preserve horizontal rails for browsable film groups.

### Don't:

- **Don't** add bright, saturated surfaces that compete with poster art.
- **Don't** turn the detail experience back into a constrained modal.
- **Don't** use large grids of equally weighted cards where a film hierarchy exists.
- **Don't** use an editorial serif treatment for long-form synopsis or review content.
