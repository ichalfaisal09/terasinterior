# Teras Interior Production

Website premium untuk jasa desain interior di Makassar.

## 🎨 Fitur Utama

- **Hero Section** dengan animasi yang memukau
- **Portfolio Gallery** dengan hover effects elegan
- **Services Section** menampilkan 4 layanan utama
- **Statistics Counter** dengan animasi angka
- **Testimonials** dari klien yang puas
- **Contact Form** yang profesional
- **Responsive Design** untuk semua perangkat
- **Mobile Menu** yang smooth

## 🚀 Teknologi

- **SvelteKit 2.47.1** - Framework modern
- **Svelte 5.41.0** - Dengan runes terbaru
- **TypeScript** - Type safety
- **Vite** - Build tool yang cepat

## 📦 Instalasi

```bash
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
src/
├── lib/
│   └── components/
│       └── AnimatedCounter.svelte
├── routes/
│   ├── +layout.svelte
│   └── +page.svelte
└── app.html
```

## 🎨 Warna Brand

- Primary Orange: `#ff6b35`
- Secondary Gold: `#f7931e`
- Dark Background: `#0a0a0a`
- Light Gray: `#b0b0b0`

## 📝 Customization

### Mengganti Gambar Portfolio

Edit array `projects` di `src/routes/+page.svelte`:

```typescript
const projects = [
  {
    title: "Nama Proyek",
    category: "Residential/Commercial",
    image: "URL_GAMBAR",
  },
];
```

### Mengganti Informasi Kontak

Edit section contact di `src/routes/+page.svelte` untuk mengubah:

- Alamat email
- Nomor telepon
- Lokasi detail

### Menambah Testimonial

Edit array testimonials atau tambahkan card baru di section testimonials.

## 🌐 Deployment

Website ini siap di-deploy ke:

- Vercel
- Netlify
- Cloudflare Pages
- Atau hosting lainnya yang support SvelteKit

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

© 2024 Teras Interior Production. All rights reserved.
