# Contributing to Teras Interior Production

Terima kasih atas minat Anda untuk berkontribusi! 🎉

## 🚀 Cara Berkontribusi

### 1. Fork Repository

Fork repository ini ke akun GitHub Anda.

### 2. Clone Repository

```bash
git clone https://github.com/your-username/teras-interior.git
cd teras-interior
```

### 3. Buat Branch Baru

```bash
git checkout -b feature/nama-fitur-anda
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Jalankan Development Server

```bash
npm run dev
```

### 6. Buat Perubahan

- Pastikan kode Anda mengikuti style guide yang ada
- Test perubahan Anda secara menyeluruh
- Pastikan tidak ada error di console

### 7. Commit Perubahan

```bash
git add .
git commit -m "feat: deskripsi singkat perubahan"
```

### 8. Push ke GitHub

```bash
git push origin feature/nama-fitur-anda
```

### 9. Buat Pull Request

Buat Pull Request dari branch Anda ke branch `main` repository utama.

## 📝 Commit Message Guidelines

Gunakan format berikut untuk commit message:

- `feat:` untuk fitur baru
- `fix:` untuk bug fixes
- `docs:` untuk perubahan dokumentasi
- `style:` untuk perubahan formatting
- `refactor:` untuk refactoring code
- `test:` untuk menambah tests
- `chore:` untuk maintenance tasks

Contoh:

```
feat: tambah section blog
fix: perbaiki responsive menu di mobile
docs: update README dengan deployment guide
```

## 🎨 Style Guide

### CSS/Styling

- Gunakan CSS-in-JS (Svelte style blocks)
- Ikuti naming convention yang ada
- Gunakan CSS variables untuk colors
- Pastikan responsive di semua breakpoints

### TypeScript

- Gunakan TypeScript untuk type safety
- Definisikan types untuk props dan state
- Hindari `any` type

### Components

- Buat components yang reusable
- Gunakan Svelte 5 runes ($state, $props, dll)
- Dokumentasikan props dengan comments

## 🐛 Melaporkan Bugs

Jika menemukan bug, buat issue dengan informasi:

- Deskripsi bug
- Steps to reproduce
- Expected behavior
- Screenshots (jika ada)
- Browser/device information

## 💡 Mengusulkan Fitur

Untuk mengusulkan fitur baru:

- Buat issue dengan label "enhancement"
- Jelaskan fitur yang diusulkan
- Jelaskan use case dan manfaatnya
- Sertakan mockup/wireframe jika ada

## ✅ Checklist Sebelum Submit PR

- [ ] Code berjalan tanpa error
- [ ] Responsive di mobile, tablet, dan desktop
- [ ] Tidak ada console errors/warnings
- [ ] Commit messages mengikuti guidelines
- [ ] Code sudah di-test
- [ ] Documentation sudah di-update (jika perlu)

## 📞 Kontak

Jika ada pertanyaan, silakan buat issue atau hubungi maintainer.

Terima kasih atas kontribusi Anda! 🙏
