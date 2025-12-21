# 🌌 THE UNIVERSE - A Cosmic Journey

An immersive, butter-smooth journey through 13.8 billion years of cosmic history.

Built with **Next.js 15**, **React Three Fiber**, **GSAP**, **Lenis**, and **Tailwind CSS**.

![Universe Journey](https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200)

## ✨ Features

- **Smooth Scroll**: Lenis + GSAP ScrollTrigger integration
- **3D Starfield**: 15,000 instanced stars with dynamic color tinting
- **NASA Imagery**: 11 high-resolution photos as immersive environments
- **Dynamic Theming**: Background colors, star tints, and exposure change per scene
- **Post-Processing**: Bloom and vignette for cinematic look
- **60 FPS**: Optimized for smooth performance on laptops

## 🚀 Quick Start

```bash
# Navigate to project
cd universe-next

# Install dependencies (already done if you cloned)
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
universe-next/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with Geist font
│   │   ├── page.tsx         # Main page with all components
│   │   └── globals.css      # Tailwind + custom styles
│   ├── components/
│   │   ├── Canvas/
│   │   │   ├── Scene.tsx       # Main R3F Canvas
│   │   │   ├── StarField.tsx   # 15K instanced stars
│   │   │   ├── PhotoPlane.tsx  # Photo with soft-edge shader
│   │   │   ├── CameraRig.tsx   # Smooth camera controller
│   │   │   └── Effects.tsx     # Post-processing
│   │   ├── UI/
│   │   │   ├── StartScreen.tsx     # Landing overlay
│   │   │   ├── Timeline.tsx        # Progress dots
│   │   │   ├── TextOverlay.tsx     # Scene descriptions
│   │   │   ├── TemperatureDisplay.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   └── EndScreen.tsx
│   │   └── Scroll/
│   │       └── SmoothScroll.tsx    # Lenis integration
│   ├── hooks/
│   │   └── useLenis.ts         # Smooth scroll hook
│   ├── store/
│   │   └── scrollStore.ts      # Zustand state
│   └── lib/
│       ├── constants.ts        # Photo data, waypoints
│       └── types.ts            # TypeScript interfaces
└── public/
    └── photos/                 # 11 NASA images
```

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| 3D | React Three Fiber, Three.js |
| Animation | GSAP, Framer Motion |
| Scroll | Lenis |
| State | Zustand |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5 |

## 🎨 Scene Journey

| # | Scene | Era | Theme |
|---|-------|-----|-------|
| 1 | Big Bang | T = 0 | Orange-red |
| 2 | Cosmic Inflation | 10⁻³² sec | Deep blue |
| 3 | First Light | 380,000 years | Purple |
| 4 | Dark Ages | 200M years | Near black |
| 5 | First Stars | 400M years | Bright blue |
| 6 | Galaxies Form | 1B years | Golden |
| 7 | Stellar Alchemy | 5B years | Red |
| 8 | Solar System | 9.2B years | Yellow |
| 9 | Planets Form | 4.6B years ago | Brown-gold |
| 10 | Cosmic Nurseries | Present | Teal |
| 11 | Heat Death | 10¹⁰⁰ years | Black |

## ⚡ Performance

- ✅ 60 FPS on M1 MacBook Air
- ✅ Pixel ratio capped at 1.5
- ✅ Antialiasing disabled
- ✅ Dynamic imports (no SSR for Canvas)
- ✅ Lazy texture loading
- ✅ Instanced mesh for stars

## 📸 Photos

NASA public domain imagery from:
- Hubble Space Telescope
- James Webb Space Telescope
- Various NASA missions

## 🔧 Development

```bash
# Dev server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npx tsc --noEmit
```

## 📄 License

MIT License. NASA imagery is public domain.
