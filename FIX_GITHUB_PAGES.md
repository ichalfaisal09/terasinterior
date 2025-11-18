# 🔧 Fix GitHub Pages Deployment

## ❌ Masalah: Workflow Failed

Saya lihat ada 3 workflow yang gagal. Ini biasanya karena **GitHub Pages belum di-enable**.

---

## ✅ Solusi: Enable GitHub Pages

### **Step 1: Buka Settings**

1. Di repository GitHub Anda, click tab **"Settings"** (paling kanan atas)
2. Pastikan Anda punya akses admin ke repository

### **Step 2: Enable GitHub Pages**

1. Di sidebar kiri, scroll ke bawah
2. Click **"Pages"** (di bagian "Code and automation")
3. Di bagian **"Build and deployment"**:
   - **Source**: Pilih **"GitHub Actions"**
   - JANGAN pilih "Deploy from a branch"
4. Otomatis tersimpan (tidak ada tombol Save)

### **Step 3: Re-run Failed Workflow**

1. Kembali ke tab **"Actions"**
2. Click salah satu workflow yang failed (yang paling atas)
3. Click tombol **"Re-run all jobs"** di kanan atas
4. Tunggu 2-3 menit

### **Step 4: Verify**

Setelah workflow selesai (✅ hijau):

1. Kembali ke **Settings** → **Pages**
2. Anda akan melihat URL website:
   ```
   Your site is live at https://USERNAME.github.io/REPO-NAME/
   ```
3. Click URL tersebut untuk membuka website

---

## 🔍 Jika Masih Error

### **Error: "npm ci" failed**

**Penyebab:** File `package-lock.json` tidak ter-commit

**Solusi:**

```bash
# Di local, pastikan package-lock.json ada
npm install

# Commit dan push
git add package-lock.json
git commit -m "fix: add package-lock.json"
git push
```

### **Error: "Build failed"**

**Penyebab:** Ada error saat build

**Solusi:**

```bash
# Test build di local
npm run build

# Jika error, fix error tersebut
# Lalu commit dan push
git add .
git commit -m "fix: build errors"
git push
```

### **Error: "Permission denied"**

**Penyebab:** GitHub Pages tidak punya permission

**Solusi:**

1. **Settings** → **Actions** → **General**
2. Scroll ke **"Workflow permissions"**
3. Pilih **"Read and write permissions"**
4. Centang **"Allow GitHub Actions to create and approve pull requests"**
5. Click **"Save"**
6. Re-run workflow

---

## 📱 Alternative: Deploy ke Vercel (Lebih Mudah)

Jika GitHub Pages masih bermasalah, gunakan Vercel:

### **Step 1: Update Config**

Edit `svelte.config.js`, ganti line 18:

```javascript
base: ""; // Kosongkan untuk Vercel
```

### **Step 2: Commit & Push**

```bash
git add svelte.config.js
git commit -m "fix: update config for Vercel"
git push
```

### **Step 3: Deploy ke Vercel**

1. Buka [vercel.com](https://vercel.com)
2. Click **"Sign Up"** atau **"Login"** dengan GitHub
3. Click **"Add New..."** → **"Project"**
4. Import repository Anda
5. Click **"Deploy"**
6. Tunggu 1-2 menit
7. Done! ✅

URL: `https://REPO-NAME.vercel.app`

**Kelebihan Vercel:**

- ✅ Lebih mudah setup
- ✅ Auto-deploy setiap push
- ✅ Preview untuk setiap branch
- ✅ Custom domain gratis
- ✅ Tidak perlu base path

---

## 📋 Checklist Troubleshooting

Cek satu per satu:

- [ ] Repository adalah **Public** (bukan Private)
- [ ] GitHub Pages sudah di-enable di Settings → Pages
- [ ] Source di-set ke **"GitHub Actions"** (bukan "Deploy from a branch")
- [ ] Workflow permissions di-set ke **"Read and write"**
- [ ] File `.github/workflows/deploy.yml` ada di repository
- [ ] File `package-lock.json` ada di repository
- [ ] `npm run build` berhasil di local

---

## 🎯 Quick Fix Commands

Jika semua sudah di-check tapi masih error:

```bash
# 1. Pastikan semua file ter-commit
git status

# 2. Add semua file yang belum ter-commit
git add .

# 3. Commit
git commit -m "fix: ensure all files are committed"

# 4. Push
git push

# 5. Tunggu workflow selesai di GitHub Actions
```

---

## 📞 Masih Bermasalah?

1. **Screenshot error message** dari GitHub Actions
2. Click workflow yang failed → Click job yang failed → Screenshot error log
3. Atau langsung gunakan **Vercel** (lebih mudah dan reliable)

---

**Rekomendasi:** Jika ini project production, saya sarankan pakai **Vercel** karena:

- Setup lebih mudah
- Deployment lebih cepat
- Custom domain gratis
- Better performance
- Automatic HTTPS

GitHub Pages bagus untuk project sederhana, tapi Vercel lebih professional untuk client project.
