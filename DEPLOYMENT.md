# 🚀 Deployment Guide

Panduan lengkap untuk deploy website Teras Interior Production.

## 📋 Pre-Deployment Checklist

### 1. Update Informasi Kontak

- [ ] Ganti nomor WhatsApp di `src/routes/+page.svelte`
- [ ] Update email address
- [ ] Update alamat lengkap Makassar
- [ ] Update social media links di footer

### 2. Update Content

- [ ] Ganti gambar portfolio dengan foto proyek asli
- [ ] Update testimonials dengan testimoni real
- [ ] Review dan edit semua teks
- [ ] Pastikan semua link berfungsi

### 3. SEO & Meta Tags

- [ ] Update meta description di `src/app.html`
- [ ] Update meta keywords
- [ ] Update Open Graph tags
- [ ] Pastikan favicon sudah sesuai

### 4. Testing

- [ ] Test di Chrome, Firefox, Safari, Edge
- [ ] Test responsive di mobile (375px, 414px)
- [ ] Test responsive di tablet (768px, 1024px)
- [ ] Test semua form submissions
- [ ] Test semua anchor links
- [ ] Test WhatsApp button
- [ ] Check console untuk errors

### 5. Performance

- [ ] Run `npm run build` tanpa errors
- [ ] Check bundle size
- [ ] Optimize images jika perlu
- [ ] Test loading speed

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Kelebihan:**

- Deploy otomatis dari GitHub
- Free SSL certificate
- Global CDN
- Preview deployments
- Zero configuration

**Steps:**

1. **Push ke GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/teras-interior.git
git push -u origin main
```

2. **Deploy ke Vercel**

- Buka [vercel.com](https://vercel.com)
- Sign in dengan GitHub
- Click "New Project"
- Import repository `teras-interior`
- Click "Deploy"

3. **Custom Domain (Optional)**

- Beli domain (contoh: terasinterior.com)
- Di Vercel dashboard → Settings → Domains
- Add custom domain
- Update DNS records sesuai instruksi

**Environment Variables:**

```
# Tidak perlu environment variables untuk versi basic
# Jika menggunakan API, tambahkan di Vercel dashboard
```

---

### Option 2: Netlify

**Steps:**

1. **Build Project**

```bash
npm run build
```

2. **Deploy via Netlify CLI**

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

**Atau via Netlify Dashboard:**

- Drag & drop folder `build` ke [netlify.com/drop](https://app.netlify.com/drop)

**Build Settings:**

- Build command: `npm run build`
- Publish directory: `build`

---

### Option 3: Cloudflare Pages

**Steps:**

1. **Push ke GitHub** (sama seperti Vercel)

2. **Deploy via Cloudflare**

- Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
- Pages → Create a project
- Connect GitHub repository
- Build settings:
  - Build command: `npm run build`
  - Build output directory: `build`
- Click "Save and Deploy"

---

### Option 4: GitHub Pages

**Steps:**

1. **Install adapter**

```bash
npm install -D @sveltejs/adapter-static
```

2. **Update `svelte.config.js`**

```javascript
import adapter from "@sveltejs/adapter-static";

export default {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: null,
    }),
  },
};
```

3. **Build & Deploy**

```bash
npm run build
# Upload folder 'build' ke GitHub Pages
```

---

## 🔧 Post-Deployment

### 1. Verify Deployment

- [ ] Website accessible via URL
- [ ] All pages load correctly
- [ ] All animations working
- [ ] Forms working
- [ ] WhatsApp button working
- [ ] Mobile responsive

### 2. Setup Analytics (Optional)

- Google Analytics
- Facebook Pixel
- Hotjar

### 3. Setup Monitoring

- Uptime monitoring (UptimeRobot)
- Error tracking (Sentry)

### 4. SEO

- Submit sitemap ke Google Search Console
- Submit ke Bing Webmaster Tools
- Setup Google My Business

---

## 📱 Custom Domain Setup

### Vercel

```
# A Record
Type: A
Name: @
Value: 76.76.21.21

# CNAME Record
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Netlify

```
# A Record
Type: A
Name: @
Value: 75.2.60.5

# CNAME Record
Type: CNAME
Name: www
Value: your-site.netlify.app
```

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache
rm -rf node_modules .svelte-kit
npm install
npm run build
```

### Deployment Failed

- Check build logs
- Verify all dependencies installed
- Check Node.js version compatibility

### 404 Errors

- Verify adapter configuration
- Check routing setup
- Verify build output directory

---

## 📞 Support

Jika mengalami masalah deployment:

1. Check documentation platform yang digunakan
2. Buat issue di GitHub repository
3. Contact maintainer

---

**Good luck with your deployment! 🚀**
