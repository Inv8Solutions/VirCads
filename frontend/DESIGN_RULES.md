# VirCads Design Rules & Guidelines

## Layout Rules

### Width Constraints
- **Max Width**: Full width (no max-width constraints)
- Applied to navigation bar, main content containers, and all layout elements
- Remove any `max-w-*` Tailwind classes from future components

### Height Management
- All content must fit within screen height without cropping
- No content should be cut off at the bottom
- Ensure proper viewport height (`min-h-screen`, `h-screen`) usage with appropriate padding/margins

## Responsiveness
- No responsive breakpoints needed (desktop-only application)
- Fixed layouts for consistent experience

## Tech Stack
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Three.js / React Three Fiber (for 3D features)
- Zustand (state management)

## Notes
- Focus on gamified autopsy process
- Medical/forensic theme with professional appearance
- Interactive elements should have clear visual feedback

---

*Last Updated: December 20, 2025*
