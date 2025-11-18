# 🏠 Teras Interior Production

<div align="center">

![Teras Interior](https://img.shields.io/badge/Interior-Design-orange?style=for-the-badge)
![SvelteKit](https://img.shields.io/badge/SvelteKit-2.47.1-FF3E00?style=for-the-badge&logo=svelte)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.10-646CFF?style=for-the-badge&logo=vite)

**Website Premium untuk Jasa Desain Interior di Makassar**

[Features](#-fitur-utama) • [Installation](#-instalasi) • [Customization](#-customization) • [Deployment](#-deployment)

</div>

---

## ✨ Fitur Utama

### 🎨 Design & Animations

- **Hero Section** dengan floating shapes dan particles effect
- **Animated Background** di setiap section dengan berbagai variant
- **Mouse Spotlight** yang mengikuti cursor
- **Geometric Patterns** dan wave animations
- **Smooth Transitions** di semua elemen interaktif

### 📱 Sections

- ✅ **Navigation** - Sticky navbar dengan blur effect
- ✅ **Hero** - Full-screen dengan trust badges
- ✅ **About** - Company profile dengan animated badge
- ✅ **Why Choose Us** - 4 alasan dengan card animations
- ✅ **Services** - 4 layanan utama dengan hover effects
- ✅ **Portfolio** - Gallery dengan overlay animations
- ✅ **Statistics** - Animated counters dengan gradient background
- ✅ **Process** - 5 tahap kerja dengan card design
- ✅ **Testimonials** - 3 testimoni klien dengan shimmer effect
- ✅ **CTA Section** - Call-to-action dengan WhatsApp button
- ✅ **Contact Form** - Form dengan gradient border animation
- ✅ **Footer** - Dengan flowing border animation
- ✅ **Floating WhatsApp** - Button dengan pulse animation

### 🎯 Interactive Elements

- Hover effects pada semua cards
- Smooth scroll untuk anchor links
- Mobile menu dengan fade animation
- Form inputs dengan focus effects
- Icon rotations dan scale animations

## 🚀 Teknologi

| Technology     | Version | Purpose                 |
| -------------- | ------- | ----------------------- |
| **SvelteKit**  | 2.47.1  | Framework utama         |
| **Svelte**     | 5.41.0  | UI dengan runes terbaru |
| **TypeScript** | 5.9.3   | Type safety             |
| **Vite**       | 7.1.10  | Build tool & dev server |

## 📦 Instalasi

```bash
# Clone repository
git clone https://github.com/username/teras-interior.git
cd teras-interior

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## 🎯 Struktur Proyek

```
teras-interior/
├── src/
│   ├── lib/
│   │   ├── assets/
│   │   │   └── favicon.svg
│   │   ├── components/
│   │   │   ├── AnimatedBackground.svelte
│   │   │   ├── AnimatedCounter.svelte
│   │   │   ├── GeometricPattern.svelte
│   │   │   ├── MouseSpotlight.svelte
│   │   │   ├── ParticlesBackground.svelte
│   │   │   └── WaveBackground.svelte
│   │   └── index.ts
│   ├── routes/
│   │   ├── +layout.svelte
│   │   └── +page.svelte
│   └── app.html
├── static/
│   └── robots.txt
├── package.json
├── svelte.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Warna Brand

```css
/* Primary Colors */
--primary-orange: #ff6b35;
--secondary-gold: #f7931e;

/* Background Colors */
--bg-dark: #0a0a0a;
--bg-darker: #0f0f0f;
--bg-card: #1a1a1a;

/* Text Colors */
--text-primary: #ffffff;
--text-secondary: #b0b0b0;
```

## 📝 Customization

### 1. Mengganti Informasi Kontak

Edit di `src/routes/+page.svelte`:

```typescript
// Ganti nomor WhatsApp
<a href="https://wa.me/6281xxxxxxxx">

// Ganti email
<div class="contact-value">hello@terasinterior.com</div>

// Ganti lokasi
<div class="contact-value">Makassar, Sulawesi Selatan</div>
```

### 2. Mengganti Gambar Portfolio

```typescript
const projects = [
  {
    title: "Nama Proyek Anda",
    category: "Residential", // atau 'Commercial'
    image: "https://your-image-url.com/image.jpg",
  },
];
```

### 3. Menambah/Edit Services

```typescript
const services = [
  {
    icon: "🏠", // Emoji icon
    title: "Nama Service",
    description: "Deskripsi service Anda",
  },
];
```

### 4. Mengedit Testimonials

```typescript
const testimonials = [
  {
    stars: "★★★★★",
    text: "Testimoni dari klien",
    author: "Nama Klien",
    title: "Residential Client",
  },
];
```

### 5. Mengubah Warna Brand

Edit di `src/routes/+page.svelte` bagian `<style>`:

```css
/* Cari dan ganti semua: */
#ff6b35 → warna-baru-anda
#f7931e → warna-baru-anda
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload folder 'build' ke Netlify
```

### Cloudflare Pages

```bash
# Build command: npm run build
# Output directory: build
```

## 🎭 Animasi Components

| Component             | Description                         |
| --------------------- | ----------------------------------- |
| `AnimatedBackground`  | Floating shapes dengan blur effect  |
| `AnimatedCounter`     | Number counter dengan animation     |
| `GeometricPattern`    | Grid pattern dengan pulse animation |
| `MouseSpotlight`      | Spotlight yang mengikuti mouse      |
| `ParticlesBackground` | Floating particles effect           |
| `WaveBackground`      | SVG wave animation                  |

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) /* Tablet */ @media (max-width: 968px) /* Desktop */ @media (min-width: 969px);
```

## ⚡ Performance

- ✅ CSS animations (GPU accelerated)
- ✅ Lazy loading images
- ✅ Optimized SVG animations
- ✅ Minimal JavaScript
- ✅ Fast page load

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

© 2024 Teras Interior Production. All rights reserved.

---

<div align="center">

**Made with ❤️ using SvelteKit**

[⬆ Back to Top](#-teras-interior-production)

</div>
