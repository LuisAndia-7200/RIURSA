# Project Guide

## Architecture

This is a dependency-free static institutional website. `index.html` contains all semantic page content, `styles.css` contains the complete responsive design system, and `script.js` provides progressive enhancements for navigation and scroll interactions.

## Key Paths

- `index.html`: Main landing page and content hierarchy.
- `styles.css`: Design tokens, layout, components, motion, and responsive breakpoints.
- `script.js`: Mobile menu, sticky-header state, section navigation state, and reveal animations.

## Conventions

- Keep content and structure semantic and accessible.
- Reuse the CSS variables in `:root`; do not hardcode new brand colors unless adding a documented token.
- Use BEM-inspired component class names.
- Keep JavaScript framework-free and treat it as progressive enhancement.
- Animate only `transform` and `opacity` where practical, and preserve reduced-motion behavior.
- Maintain mobile-first accessibility, visible focus states, and descriptive alternative text.

## Design Decisions

The visual direction combines academic editorial typography with an organic sustainability palette. The hero avoids a carousel in favor of a focused narrative, while activities receive the strongest visual hierarchy. University names in the ticker are intentional placeholders and should be replaced with approved institutional logos when final assets are available.
