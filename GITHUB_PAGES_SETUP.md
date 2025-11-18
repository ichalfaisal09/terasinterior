# 🚀 Setup GitHub Pages - Panduan Lengkap

Ikuti langkah-langkah ini untuk deploy website ke GitHub Pages.

---

## 📋 Langkah 1: Push ke GitHub

### 1.1 Initialize Git (jika belum)

```bash
git init
```

### 1.2 Add semua files

```bash
git add .
```

### 1.3 Commit

```bash
git commit -m "feat: initial commit - Teras Interior Production"
```

### 1.4 Buat Repository di GitHub

1. Buka [github.com](https://github.com)
2. Click tombol **"+"** di kanan atas → **"New repository"**
3. Isi form:
   - **Repository name**: `teras-interior` (atau nama lain)
   - **Description**: "Premium interior design website"
   - **Public** atau **Private** (pilih sesuai kebutuhan)
   - **JANGAN** centang "Add README" (sudah ada)
4. Click **"Create repository"**

### 1.5 Push ke GitHub

```bash
# Ganti YOUR_USERNAME dengan username GitHub Anda
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/teras-interior.git
git push -u origin main
```

---

## 📋 Langkah 2: Enable GitHub Pages

### 2.1 Buka Repository Settings

1. Buka repository Anda di GitHub
2. Click tab **"Settings"**

### 2.2 Enable GitHub Pages

1. Scroll ke bagian **"Pages"** di sidebar kiri
2. Di **"Build and deployment"**:
   - **Source**: Pilih **"GitHub Actions"**
3. Save (otomatis tersimpan)

### 2.3 Tunggu Deployment

1. Click tab **"Actions"** di repository
2. Anda akan melihat workflow **"Deploy to GitHub Pages"** sedang berjalan
3. Tunggu hingga selesai (biasanya 2-3 menit)
4. Jika berhasil, akan ada ✅ centang hijau

---

## 📋 Langkah 3: Update Base Path (PENTING!)

### 3.1 Edit svelte.config.js

Buka file `svelte.config.js` dan ganti `'/teras-interior'` dengan nama repository Anda:

```javascript
paths: {
  base: process.env.NODE_ENV === "production" ? "/NAMA-REPO-ANDA" : "";
}
```

Contoh:

- Jika repo name: `teras-interior` → gunakan `'/teras-interior'`
- Jika repo name: `my-website` → gunakan `'/my-website'`

### 3.2 Commit & Push

```bash
git add svelte.config.js
git commit -m "fix: update base path"
git push
```

---

## 🌐 Langkah 4: Akses Website

Website Anda akan tersedia di:

```
https://YOUR_USERNAME.github.io/NAMA-REPO/
```

Contoh:

- Username: `johndoe`
- Repo: `teras-interior`
- URL: `https://johndoe.github.io/teras-interior/`

---

## 🎯 Langkah 5: Custom Domain (Optional)

### 5.1 Beli Domain

Beli domain dari provider seperti:

- Namecheap
- GoDaddy
- Cloudflare
- Niagahoster (Indonesia)

### 5.2 Setup DNS

Di DNS provider Anda, tambahkan records:

```
# A Records (untuk apex domain)
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

# CNAME Record (untuk www)
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

### 5.3 Setup di GitHub

1. Buka **Settings** → **Pages**
2. Di **"Custom domain"**, masukkan domain Anda
3. Click **"Save"**
4. Tunggu DNS propagation (bisa 24-48 jam)
5. Centang **"Enforce HTTPS"** setelah DNS aktif

### 5.4 Update svelte.config.js

```javascript
paths: {
  base: ""; // Kosongkan untuk custom domain
}
```

---

## 🔧 Troubleshooting

### ❌ Build Failed

**Solusi:**

```bash
# Test build di local
npm run build

# Jika error, fix dulu di local
# Lalu commit & push lagi
```

### ❌ 404 Page Not Found

**Solusi:**

1. Pastikan base path di `svelte.config.js` sudah benar
2. Pastikan file `.nojekyll` ada di folder `static/`
3. Clear browser cache (Ctrl + Shift + R)

### ❌ CSS/Images Tidak Load

**Solusi:**

1. Periksa base path di `svelte.config.js`
2. Pastikan semua asset path relative, bukan absolute
3. Rebuild dan push lagi

### ❌ Workflow Tidak Jalan

**Solusi:**

1. Pastikan GitHub Actions enabled di Settings
2. Periksa file `.github/workflows/deploy.yml` ada
3. Check tab Actions untuk error logs

---

## 📝 Update Website

Setiap kali ada perubahan:

```bash
# 1. Edit files
# 2. Test di local
npm run dev

# 3. Commit & push
git add .
git commit -m "feat: deskripsi perubahan"
git push

# 4. GitHub Actions akan auto-deploy
```

---

## 🎨 Customization Sebelum Deploy

### Update Informasi Kontak

Edit `src/routes/+page.svelte`:

```typescript
// Line ~320 - Ganti nomor WhatsApp
<a href="https://wa.me/6281xxxxxxxx">

// Line ~380 - Ganti email
<div class="contact-value">hello@terasinterior.com</div>

// Line ~390 - Ganti lokasi
<div class="contact-value">Makassar, Sulawesi Selatan</div>
```

### Update Portfolio Images

```typescript
// Line ~20 - Ganti dengan foto proyek asli
const projects = [
  {
    title: "Nama Proyek",
    category: "Residential",
    image: "https://your-image-url.com/image.jpg",
  },
];
```

### Update Meta Tags

Edit `src/app.html`:

```html
<meta name="description" content="Deskripsi website Anda" />
<meta property="og:title" content="Judul untuk social media" />
```

---

## ✅ Checklist Sebelum Deploy

- [ ] Update nomor WhatsApp
- [ ] Update email & alamat
- [ ] Ganti gambar portfolio
- [ ] Update testimonials
- [ ] Test di local (`npm run dev`)
- [ ] Test build (`npm run build`)
- [ ] Update base path di svelte.config.js
- [ ] Push ke GitHub
- [ ] Enable GitHub Pages
- [ ] Tunggu deployment selesai
- [ ] Test website di browser
- [ ] Test responsive di mobile

---

## 📞 Butuh Bantuan?

Jika mengalami masalah:

1. Baca error message di GitHub Actions
2. Check dokumentasi di README.md
3. Buat issue di repository
4. Google error message yang muncul

---

**Selamat! Website Anda sudah online! 🎉**

Share link website Anda:

```
https://YOUR_USERNAME.github.io/NAMA-REPO/
```
