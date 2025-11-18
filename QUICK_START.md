# 🚀 Quick Start - Deploy ke GitHub Pages

## Langkah Cepat (5 Menit)

### 1️⃣ Update Base Path

Edit `svelte.config.js` line 15:

```javascript
base: process.env.NODE_ENV === "production" ? "/NAMA-REPO-ANDA" : "";
```

Ganti `/NAMA-REPO-ANDA` dengan nama repository yang akan Anda buat.

Contoh: Jika repo name `teras-interior`, maka:

```javascript
base: process.env.NODE_ENV === "production" ? "/teras-interior" : "";
```

### 2️⃣ Push ke GitHub

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Buat repository di GitHub dengan nama yang sama
# Lalu jalankan:
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

### 3️⃣ Enable GitHub Pages

1. Buka repository di GitHub
2. **Settings** → **Pages**
3. **Source**: Pilih **GitHub Actions**
4. Tunggu 2-3 menit

### 4️⃣ Akses Website

```
https://USERNAME.github.io/NAMA-REPO/
```

---

## ⚡ Atau Deploy ke Vercel (Lebih Mudah)

### 1️⃣ Update svelte.config.js

```javascript
base: ""; // Kosongkan untuk Vercel
```

### 2️⃣ Push ke GitHub (sama seperti di atas)

### 3️⃣ Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Sign in dengan GitHub
3. Import repository
4. Click Deploy
5. Done! ✅

URL: `https://nama-project.vercel.app`

---

## 📝 Sebelum Deploy - Update Kontak

Edit `src/routes/+page.svelte`:

**Line ~460** - WhatsApp:

```html
<a href="https://wa.me/6281xxxxxxxx"></a>
```

**Line ~380** - Email:

```html
<div class="contact-value">hello@terasinterior.com</div>
```

**Line ~390** - Lokasi:

```html
<div class="contact-value">Makassar, Sulawesi Selatan</div>
```

**Line ~515-517** - Social Media:

```html
<a href="https://instagram.com/terasinterior">Instagram</a>
<a href="https://facebook.com/terasinterior">Facebook</a>
```

---

## ✅ Done!

Website Anda sudah online! 🎉

**Dokumentasi Lengkap:**

- GitHub Pages: Baca `GITHUB_PAGES_SETUP.md`
- Deployment: Baca `DEPLOYMENT.md`
- Contributing: Baca `CONTRIBUTING.md`
