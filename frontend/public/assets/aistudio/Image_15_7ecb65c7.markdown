---
name: Academic Methodology & Survey Toolkit
colors:
  surface: '#f6f9ff'
  surface-dim: '#cddceb'
  surface-bright: '#f6f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf4ff'
  surface-container: '#e1f0ff'
  surface-container-high: '#dbeaf9'
  surface-container-highest: '#d5e4f4'
  on-surface: '#0f1d28'
  on-surface-variant: '#3e4948'
  inverse-surface: '#24323d'
  inverse-on-surface: '#e6f2ff'
  outline: '#6e7978'
  outline-variant: '#bec9c7'
  surface-tint: '#006a65'
  primary: '#005450'
  on-primary: '#ffffff'
  primary-container: '#0b6e69'
  on-primary-container: '#9cede6'
  inverse-primary: '#84d5ce'
  secondary: '#536161'
  on-secondary: '#ffffff'
  secondary-container: '#d4e3e2'
  on-secondary-container: '#576565'
  tertiary: '#3c4c58'
  on-tertiary: '#ffffff'
  tertiary-container: '#546471'
  on-tertiary-container: '#d0e0f0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a0f1ea'
  primary-fixed-dim: '#84d5ce'
  on-primary-fixed: '#00201e'
  on-primary-fixed-variant: '#00504c'
  secondary-fixed: '#d7e5e5'
  secondary-fixed-dim: '#bbc9c9'
  on-secondary-fixed: '#111e1e'
  on-secondary-fixed-variant: '#3c4949'
  tertiary-fixed: '#d4e5f4'
  tertiary-fixed-dim: '#b8c9d7'
  on-tertiary-fixed: '#0d1d28'
  on-tertiary-fixed-variant: '#394955'
  background: '#f6f9ff'
  on-background: '#0f1d28'
  surface-variant: '#d5e4f4'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '750'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-md:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: 0em
  code-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

The design system embodies a calm, scholarly, yet accessible atmosphere tailored for Indonesian undergraduate students, graduate candidates, and early-career researchers navigating research methodology, sampling calculations, and questionnaire design.

The aesthetic blends **Modern Institutional Clarity** with **Warm Academic Guidance**. It strips away dense statistical intimidation in favor of structured reassurance. 

Key principles:
- **Calm & Methodical**: High legibility, generous breathing room, structured step-by-step progressions.
- **Academic Rigor without Stiffness**: Crisp geometric sans-serif paired with precise monospace notation for formulas and variables.
- **Restraint Over Spectacle**: No photographic hero units, zero decorative gradients, and an absolute exclusion of emojis. Visual communication relies strictly on 2px linear iconography, structured containers, and intentional color accents.

## Colors

The palette establishes an authoritative, grounded baseline with deep ocean teal and functional contextual tints.

### Core Roles
- **Primary (`#0B6E69`)**: Deep Academic Teal. Applied to primary CTAs, active progress steps, focused borders, and key anchors.
- **Secondary (`#E3F2F1`)**: Soft Teal Tint. Used exclusively for selection highlights, secondary pills, active tab backgrounds, and focused surface highlights.
- **Tertiary / Muted (`#5B6B78`)**: Balanced Slate. Reserved for secondary guidance labels, metadata, helper text, and inactive iconography.
- **Neutral / Text (`#12202B`)**: Deep Ink Navy. Applied to high-contrast headings, body copy, and prominent UI framing.
- **Canvas (`#F4F6F8`)**: Soft Off-White/Fog base canvas tint to soften eye fatigue during long methodology sessions.
- **Surface (`#FFFFFF`)**: Pure White for cards, input surfaces, sheets, and modular panels.
- **Border (`#DDE3E8`)**: 1px subtle boundary tone preserving clear modular separation without excessive visual noise.

### Feedback Signals
- **Success Surface (`#E6F4EA`)** with **Success Ink (`#1B5E34`)**: For valid sample sizes, successful hypothesis checks, and completed data validation.
- **Warning Surface (`#FCEBE3`)** with **Warning Ink (`#8A3B12`)**: For statistical margin-of-error alerts, non-probability sampling warnings, and incomplete validation prompts.

## Typography

The type scale combines **Plus Jakarta Sans** for interfaces and prose with **IBM Plex Mono** (rendered via monospace fallbacks) for formulas, sample notation ($n, N, e, z$), confidence intervals, and data schemas.

### Headings
- Set in Extra-Bold (700-800) weights with subtle negative tracking (`-0.015em` to `-0.03em`) to generate crisp, authoritative presence without feeling heavy.
- Section titles and card headers must maintain tight vertical alignment with their associated content blocks.

### Reading & Instruction Text
- Body copy is set at Regular (400) weight with relaxed line spacing (`1.55` to `1.65` ratio) for academic reading comfort.
- Metadata, methodology descriptions, and Indonesian contextual examples (e.g., *Skala Likert*, *Purposive Sampling*) utilize `body-md` and `body-sm`.

### Monospace Mathematical Notation
- Used for formula breakdowns (e.g., Slovin, Yamane, Cochran formulas), calculated outputs, and variable definitions.

## Layout & Spacing

The layout is built upon an 8pt modular grid that emphasizes clear reading paths and step-by-step logic.

### Grid & Canvas Structure
- **Desktop (1024px+)**: Max-width container of `1200px`, centered. 12-column grid with `1.5rem` (24px) gutters and `2rem` (32px) outer margins. Form inputs and methodology tools follow an asymmetric 7:5 split (Parameters / Live Preview & Formula Analysis).
- **Tablet (768px – 1023px)**: 8-column layout with `1.5rem` gutters and `1.5rem` margins. Formula results dock below input modules.
- **Mobile (<768px)**: Single-column flow with `1rem` (16px) canvas gutters and margins. Action bars anchor to bottom safe areas.

### Component Spacing Discipline
- `space-xs` (4px): Inline icon-to-label spacing, formula variable separators.
- `space-sm` (8px): Stacked input labels, chip inner spacing, small badge padding.
- `space-md` (16px): Internal padding for standard cards, field stacks, list row gaps.
- `space-lg` (24px): Internal padding for primary calculation containers, major module spacing.
- `space-xl` (36px): Vertical separation between distinct methodology sections.

## Elevation & Depth

Visual hierarchy uses a flat, layered tonal model backed by low-opacity, ultra-soft diffusion shadows to keep the UI light and unobtrusive.

### Surface Tiers
- **Tier 0 (Canvas)**: `#F4F6F8` background.
- **Tier 1 (Cards & Workstations)**: `#FFFFFF` surface framed with a crisp `1px solid #DDE3E8` boundary.
- **Tier 2 (Popovers, Tooltips, Dropdowns)**: `#FFFFFF` surface with `1px solid #DDE3E8` and soft ambient shadow: `0 8px 24px -4px rgba(18, 32, 43, 0.06)`.
- **Active Card Elevation**: On hover or active state, cards raise subtly via `0 4px 16px -2px rgba(18, 32, 43, 0.05)`.
- **Strict Rule**: No dark drop shadows, heavy inner glows, or colored specular flares. Borders always accompany elevation to retain structural clarity.

## Shapes

The interface balances welcoming curves with clean structural discipline:

- **Cards & Primary Panels**: 16px radius (within the 14–20px range) for friendly modular units.
- **Modal Dialogs & Large Containers**: 20px radius.
- **Buttons & Interactive Inputs**: 10px radius, providing a crisp, tactile target.
- **Badges, Status Chips, & Filter Pills**: Fully rounded pill shapes (`9999px`) to distinguish categorical tags from interactive buttons.
- **Icons**: 2px stroke weight with rounded caps (`stroke-linecap: round; stroke-linejoin: round;`) matching the soft curvature of the typography.

## Components

### Buttons
- **Primary**: Background `#0B6E69`, text `#FFFFFF`, minimum height `44px`, horizontal padding `20px`, corner radius `10px`. Hover: darken primary by 8%. Focused: 3px ring of `#0B6E69` at 20% opacity.
- **Secondary**: Background `#E3F2F1`, text `#0B6E69`, minimum height `44px`, 10px radius. Hover: `#D4ECE9`.
- **Outline**: Background `#FFFFFF`, 1px border `#DDE3E8`, text `#12202B`, minimum height `44px`. Hover: border `#0B6E69`, text `#0B6E69`.

### Badges & Chips
- **Category & Methodology Chips**: Background `#E3F2F1`, text `#0B6E69`, height `28px`, padding `0 12px`, radius `9999px`, font `label-sm`.
- **Success Status**: Background `#E6F4EA`, text `#1B5E34`, 1px border `rgba(27, 94, 52, 0.15)`.
- **Warning Status**: Background `#FCEBE3`, text `#8A3B12`, 1px border `rgba(138, 59, 18, 0.15)`.

### Cards & Result Blocks
- Pure white background (`#FFFFFF`), `1px solid #DDE3E8`, 16px corner radius, padding `20px` to `24px`.
- Soft ambient drop shadow: `box-shadow: 0 2px 10px rgba(18, 32, 43, 0.04)`.
- Selected/Active card: 2px solid `#0B6E69` border with a subtle inner tint.

### Input Fields & Selectors
- Minimum height `44px`, background `#FFFFFF`, border `1px solid #DDE3E8`, radius `10px`, padding `0 14px`.
- Text `#12202B`, placeholder `#5B6B78`.
- Focus state: border-color `#0B6E69`, `box-shadow: 0 0 0 3px rgba(11, 110, 105, 0.15)`, outline none.

### Selection Controls (Radio & Checkbox)
- Custom rounded boxes (radio: 50%, checkbox: 6px radius), size `20px`.
- Border `1.5px solid #DDE3E8`. Checked state: filled `#0B6E69` with white checkmark/dot.

### Formula & Variable Callouts
- Specialized container: `#F4F6F8` background with `1px dashed #DDE3E8`, radius `12px`, padding `16px`. Text rendered in `IBM Plex Mono` / `code-md`.