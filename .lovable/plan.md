
# Radhika Proposal — "Midnight Rose" Theme

## Overview
A romantic single-page scrolling proposal website with beautiful animations, a love calculator, and a playful proposal interaction. Built with React, Tailwind CSS, and CSS/JS animations. No backend needed initially — SMS will be simulated.

---

## Visual Theme: Midnight Rose
- **Deep midnight background** (#0f172a) with rose accents (#ff4d6d) and blush tones (#ffd1dc)
- **Fonts**: Playfair Display (headlines), Poppins (body)
- **Floating hearts** and bokeh particle effects throughout
- **Smooth scroll-triggered animations** as user moves down the page

---

## Section 1: Hero — "Radhika, will you accept my heart?"
- Full-screen hero with layered CSS parallax background (stars, bokeh, gradient)
- Animated headline with a gentle fade-in and scale effect
- Floating heart particles drifting upward
- Scroll indicator arrow at the bottom

## Section 2: Love Calculator
- Card with "Radhika" pre-filled as one name
- Input field for a second name
- When user types **"Shubham"** (case-insensitive) → animated counter climbs to **101%** with a confetti/heart burst
- Any other name → counter animates to **0%**
- Fun, playful micro-interactions on the percentage display

## Section 3: The Proposal — "Will you be mine?"
- Beautiful card with romantic copy: *"I made this just for you. If you say yes, I'll know instantly. 💖"*
- **Yes button**: Opens a confirmation dialog — *"I promise to cherish you. Send the message?"* → On confirm, shows a thank-you animation with hearts and a success message (simulated, no actual SMS)
- **No button**: Playfully dodges away when hovered/clicked — moves to random positions within bounds. After several attempts, shows a small easter egg message like "Nice try 😏"

## Section 4: Footer
- Simple romantic closing message
- Scroll progress indicator visible throughout the page

---

## Animations & Effects
- CSS parallax layers for depth effect on scroll
- Animated floating hearts using CSS keyframes
- Count-up animation for the love percentage
- Confetti burst on 101% result
- Button dodge animation with bounded random positioning
- Respects `prefers-reduced-motion` — disables auto-animations for accessibility

## Accessibility
- Semantic HTML, proper heading hierarchy
- Keyboard-navigable interactive elements
- High contrast text on dark backgrounds
- Reduced motion support

## Future Enhancements (not in initial build)
- Connect Supabase for actual Twilio SMS sending
- Add 3D parallax with react-three-fiber
- Sound effects toggle
- Shareable snapshot/link
