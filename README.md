# THE UNIVERSE - A Seamless Cosmic Journey

An immersive space travel experience through 13.8 billion years of cosmic history using NASA imagery.

## 🚀 Quick Start

### Running Locally

```bash
# Navigate to project directory
cd /path/to/universe

# Start a local server (Python 3)
python3 -m http.server 8081

# Or with Python 2
python -m SimpleHTTPServer 8081

# Or with Node.js
npx serve .
```

Then open your browser to: **http://localhost:8081**

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- No additional dependencies - uses CDN for Three.js

---

## 🌌 Features

### Immersive Techniques

| Feature | Description |
|---------|-------------|
| **Spherical Environment Mapping** | Photos wrap around inverted spheres - you travel THROUGH them |
| **Dynamic Background Colors** | Scene background transitions to match each photo's theme |
| **Dynamic Fog Density** | Dense fog in nebulae, sparse in empty space |
| **Star Color Tinting** | Stars shift color to match nearby environments |
| **Radial Gradient Alpha** | Soft edges on photos - no hard rectangular boundaries |
| **ACES Filmic Tone Mapping** | Cinematic color grading throughout |

### Performance Optimizations

- ✅ 20,000 stars via InstancedMesh
- ✅ Pixel ratio capped at 1.0
- ✅ 60 FPS cap
- ✅ Antialiasing disabled
- ✅ Lazy rendering (GPU idles when not scrolling)
- ✅ Progressive texture loading (3 photos max in memory)
- ✅ No mipmaps
- ✅ Low-power GPU preference

---

## 📸 Scene Journey

| Scene | Era | Theme Color | Fog Density |
|-------|-----|-------------|-------------|
| 1. Big Bang | T = 0 | Orange-red | Dense (0.025) |
| 2. Cosmic Inflation | 10⁻³² seconds | Deep blue | Dense (0.020) |
| 3. First Light | 380,000 years | Purple | Medium (0.012) |
| 4. Dark Ages | 200 million years | Very dark blue | Sparse (0.003) |
| 5. First Stars | 400 million years | Bright blue | Medium (0.015) |
| 6. Galaxies Form | 1 billion years | Golden | Medium (0.012) |
| 7. Stellar Alchemy | 5 billion years | Red | Dense (0.022) |
| 8. Solar System | 9.2 billion years | Yellow | Sparse (0.010) |
| 9. Planets Form | 4.6 billion years ago | Brown-gold | Sparse (0.008) |
| 10. Cosmic Nurseries | Present Day | Teal-green | Medium (0.018) |
| 11. Heat Death | 10¹⁰⁰ years | Near black | Minimal (0.002) |

---

## 🛠 Project Structure

```
universe/
├── index.html          # Main HTML document
├── style.css           # Styling for UI overlays
├── js/
│   └── main.js         # Three.js cosmic journey
├── photos/             # NASA imagery (11 photos)
│   ├── 52002778380_50e6f859aa_o.jpg   # Big Bang
│   ├── 28098134687_621b8e892c_o.jpg   # Inflation
│   ├── ...and 9 more
└── README.md           # This file
```

---

## 🎮 Controls

- **Scroll** - Navigate through cosmic history
- **Timeline dots** (right side) - Click to jump to specific scenes
- **"Experience Again"** button - Restart journey from beginning

---

## 📝 Technical Details

### Three.js Setup

- Uses Three.js r160 via CDN (ES Modules)
- CatmullRomCurve3 for smooth camera path
- ShaderMaterial for custom radial gradient alpha
- InstancedMesh for 20,000 stars
- FogExp2 with dynamic density

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 📄 License

NASA imagery is in the public domain.

---

## 🙏 Credits

- **NASA** - Hubble, Webb, and other telescope imagery
- **Three.js** - 3D graphics library
- **Space Grotesk** - Google Fonts
