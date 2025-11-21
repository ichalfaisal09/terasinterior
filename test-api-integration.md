# 🧪 Frontend API Integration Test

## Prerequisites

- ✅ Backend running on http://127.0.0.1:8000
- ✅ Frontend running on http://localhost:5173
- ✅ 6 portfolio items in database

---

## Test Steps

### 1. Start Backend

```powershell
cd D:\Teras\terasinterior-backend
.\venv-new\Scripts\activate
python -m uvicorn app.main:app --reload
```

### 2. Start Frontend

```powershell
cd D:\Teras\my-app
npm run dev
```

### 3. Open Website

Open browser: http://localhost:5173

### 4. Check Portfolio Section

Scroll to Portfolio section and verify:

- [ ] Loading spinner shows briefly
- [ ] Portfolio items load from API
- [ ] 6 items displayed (or current count)
- [ ] Images load correctly
- [ ] Titles and categories show
- [ ] Descriptions visible on hover
- [ ] No errors in browser console (F12)

### 5. Check Network Tab (F12 → Network)

- [ ] Request to `http://127.0.0.1:8000/api/portfolio/`
- [ ] Status: 200 OK
- [ ] Response Type: JSON
- [ ] Response contains array of portfolio items

### 6. Test Error Handling

Stop backend server (Ctrl + C), then:

- [ ] Refresh page
- [ ] Error message shows
- [ ] "Retry" button appears
- [ ] Click retry reloads page

### 7. Test Empty State

If you want to test empty state:

```powershell
# In backend, temporarily delete all portfolio items
# Or modify API to return empty array
```

- [ ] "No portfolio items available" message shows

---

## Expected Results

### Success State ✅

```
Portfolio Section:
- Loading spinner (brief)
- Grid of portfolio items
- Images from database URLs
- Hover effects working
- Smooth animations
```

### Network Request ✅

```
Request URL: http://127.0.0.1:8000/api/portfolio/
Request Method: GET
Status Code: 200 OK
Response: [
  {
    "id": 1,
    "title": "Modern Living Room - UPDATED",
    "description": "...",
    "category": "Residential",
    "image_url": "https://...",
    "published": true,
    "order_index": 1,
    ...
  },
  ...
]
```

### Browser Console ✅

```
No errors
(or only warnings about images, which is normal)
```

---

## Troubleshooting

### Portfolio Not Loading

**Check 1: Backend Running?**

```powershell
curl http://127.0.0.1:8000/api/health
```

Should return: `{"status":"healthy"}`

**Check 2: CORS Configured?**
Backend `.env` should have:

```
FRONTEND_URL=http://localhost:5173
```

**Check 3: API URL Correct?**
Frontend `.env` should have:

```
VITE_API_URL=http://127.0.0.1:8000
```

**Check 4: Browser Console**
Open F12 → Console tab
Look for error messages

**Check 5: Network Tab**
Open F12 → Network tab
Check if request is made and what the response is

### CORS Error

**Error:**

```
Access to fetch at 'http://127.0.0.1:8000/api/portfolio/'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**

1. Check backend `.env` has correct `FRONTEND_URL`
2. Restart backend server
3. Clear browser cache (Ctrl + Shift + Delete)
4. Hard refresh (Ctrl + Shift + R)

### Images Not Loading

**Possible causes:**

- Invalid image URLs in database
- External image host blocking requests
- Network issues

**Solution:**

- Check image URLs in database are valid
- Test URLs directly in browser
- Use different image sources if needed

### Loading Forever

**Possible causes:**

- Backend not responding
- Network timeout
- JavaScript error

**Solution:**

1. Check browser console for errors
2. Verify backend is running
3. Check network tab for failed requests
4. Restart both servers

---

## Integration Checklist

### API Client ✅

- [x] `client.ts` created
- [x] Error handling implemented
- [x] TypeScript types defined

### Portfolio API ✅

- [x] `portfolio.ts` created
- [x] `getPublishedPortfolio()` function
- [x] Type-safe responses

### Auth API ✅

- [x] `auth.ts` created
- [x] Login function
- [x] Get current user function

### Types ✅

- [x] `portfolio.ts` types defined
- [x] Portfolio interface
- [x] Create/Update interfaces

### Component ✅

- [x] PortfolioSection updated
- [x] API integration
- [x] Loading state
- [x] Error state
- [x] Empty state
- [x] Svelte 5 runes ($state)

### Environment ✅

- [x] `.env` created
- [x] `.env.production` created
- [x] `.gitignore` updated

---

## Performance Check

### Load Time

- [ ] Portfolio loads in < 2 seconds
- [ ] Images lazy load
- [ ] Smooth animations
- [ ] No layout shift

### Optimization

- [x] Lazy loading images (`loading="lazy"`)
- [x] Error boundaries
- [x] Loading states
- [x] Efficient re-renders

---

## Next Steps After Testing

If all tests pass:

1. ✅ Mark Step 5 as complete
2. ✅ Update NEXT_STEPS.md
3. ✅ Consider Step 6 (Admin Dashboard)
4. ✅ Or move to deployment

If tests fail:

1. Check troubleshooting section
2. Verify backend is running
3. Check browser console
4. Review network requests
5. Fix issues and retest

---

## Success Criteria

All of these should be true:

- ✅ Backend API responding
- ✅ Frontend fetching data
- ✅ Portfolio items displaying
- ✅ Images loading
- ✅ No console errors
- ✅ Loading states working
- ✅ Error handling working
- ✅ Hover effects smooth

**When all checked, Step 5 is complete!** 🎉
