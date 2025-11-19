# 📱 Panduan Responsive Design

## Breakpoints yang Digunakan

```css
/* Desktop (default) - > 968px */
/* Tablet - 641px sampai 968px */
/* Mobile - ≤ 640px */
```

---

## Contoh: Hero Content dengan 3 Breakpoint

### 1️⃣ Desktop (Default - > 968px)

```css
.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 900px; /* Lebar maksimal 900px */
  padding: 0 2rem; /* Padding 2rem */
  margin-top: 5rem; /* Margin top 5rem */
}
```

### 2️⃣ Tablet (641px - 968px)

```css
@media (max-width: 968px) and (min-width: 641px) {
  .hero-content {
    max-width: 700px; /* Lebih kecil dari desktop */
    padding: 0 1.5rem; /* Padding lebih kecil */
    margin-top: 4rem; /* Margin top lebih kecil */
  }
}
```

### 3️⃣ Mobile (≤ 640px)

```css
@media (max-width: 640px) {
  .hero-content {
    max-width: 100%; /* Full width */
    padding: 0 1rem; /* Padding paling kecil */
    margin-top: 3rem; /* Margin top paling kecil */
  }
}
```

---

## Template untuk Element Lain

### Contoh: Service Card

```css
/* Desktop */
.service-card {
  padding: 3rem 2rem;
  font-size: 1rem;
}

/* Tablet */
@media (max-width: 968px) and (min-width: 641px) {
  .service-card {
    padding: 2.5rem 1.5rem;
    font-size: 0.95rem;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .service-card {
    padding: 2rem 1rem;
    font-size: 0.9rem;
  }
}
```

### Contoh: Typography

```css
/* Desktop */
.section-title {
  font-size: 4rem;
  margin-bottom: 2rem;
}

/* Tablet */
@media (max-width: 968px) and (min-width: 641px) {
  .section-title {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .section-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}
```

### Contoh: Grid Layout

```css
/* Desktop */
.services-grid {
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

/* Tablet */
@media (max-width: 968px) and (min-width: 641px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

---

## Best Practices

### 1. Mobile First vs Desktop First

**Desktop First (yang kita pakai):**

```css
/* Default = Desktop */
.element {
  font-size: 2rem;
}

/* Tablet */
@media (max-width: 968px) {
  .element {
    font-size: 1.5rem;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .element {
    font-size: 1rem;
  }
}
```

**Mobile First (alternatif):**

```css
/* Default = Mobile */
.element {
  font-size: 1rem;
}

/* Tablet */
@media (min-width: 641px) {
  .element {
    font-size: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 969px) {
  .element {
    font-size: 2rem;
  }
}
```

### 2. Urutan Media Queries

Letakkan media queries di akhir file CSS atau kelompokkan per section:

```css
/* Semua style default */
.hero {
  ...;
}
.about {
  ...;
}
.services {
  ...;
}

/* Lalu semua media queries */
@media (max-width: 968px) {
  .hero {
    ...;
  }
  .about {
    ...;
  }
  .services {
    ...;
  }
}

@media (max-width: 640px) {
  .hero {
    ...;
  }
  .about {
    ...;
  }
  .services {
    ...;
  }
}
```

### 3. Properties yang Sering Diubah

**Spacing:**

- `padding`
- `margin`
- `gap`

**Typography:**

- `font-size`
- `line-height`
- `letter-spacing`

**Layout:**

- `grid-template-columns`
- `flex-direction`
- `width` / `max-width`

**Display:**

- `display: none` / `display: flex`

---

## Contoh Lengkap: About Section

```css
/* Desktop (> 968px) */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  padding: 8rem 2rem;
}

.about-image img {
  height: 600px;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.8;
}

/* Tablet (641px - 968px) */
@media (max-width: 968px) and (min-width: 641px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 6rem 1.5rem;
  }

  .about-image img {
    height: 500px;
  }

  .about-text {
    font-size: 1rem;
    line-height: 1.7;
  }
}

/* Mobile (≤ 640px) */
@media (max-width: 640px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 4rem 1rem;
  }

  .about-image img {
    height: 400px;
  }

  .about-text {
    font-size: 0.95rem;
    line-height: 1.6;
  }
}
```

---

## Testing Responsive

### Di Browser:

1. **Chrome DevTools**: F12 → Toggle device toolbar (Ctrl+Shift+M)
2. **Test breakpoints**:
   - Mobile: 375px, 414px
   - Tablet: 768px, 1024px
   - Desktop: 1440px, 1920px

### Devices untuk Test:

- **Mobile**: iPhone SE (375px), iPhone 12 (390px), Samsung Galaxy (360px)
- **Tablet**: iPad (768px), iPad Pro (1024px)
- **Desktop**: Laptop (1366px), Desktop (1920px)

---

## Quick Reference

| Device  | Breakpoint    | Typical Width |
| ------- | ------------- | ------------- |
| Mobile  | ≤ 640px       | 320px - 640px |
| Tablet  | 641px - 968px | 641px - 968px |
| Desktop | > 968px       | 969px+        |

---

**Pro Tip:** Gunakan `clamp()` untuk responsive typography tanpa media queries:

```css
.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  /* Min: 2rem, Preferred: 5vw, Max: 4rem */
}
```
