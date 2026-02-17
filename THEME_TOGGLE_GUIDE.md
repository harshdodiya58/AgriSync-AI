# 🎨 AgriSync AI - Theme Toggle Quick Guide

## How to Use the Theme Toggle

### Location
The theme toggle button appears in **two places**:

1. **Dashboard Pages** - Top-right corner of the navbar (next to notifications)
2. **Landing Page** - Top-right corner (before Sign In button)

### Visual Appearance

**Dark Mode Button:**
```
┌─────────────────┐
│  ☀️  Light      │  ← Shows sun icon
└─────────────────┘
```

**Light Mode Button:**
```
┌─────────────────┐
│  🌙  Dark       │  ← Shows moon icon
└─────────────────┘
```

### How It Works

1. **Click the button** - Theme switches instantly
2. **Icon rotates** - Smooth 20° rotation animation on hover
3. **Colors change** - All UI elements transition smoothly (0.3s)
4. **Preference saved** - Your choice is remembered in localStorage

---

## Theme Comparison

### 🌙 Dark Theme (Default)
- **Background**: Deep blue-black (#0A0F1E)
- **Cards**: Dark slate with glassmorphism
- **Text**: Light gray to white
- **Best for**: Low-light environments, reduced eye strain

### ☀️ Light Theme
- **Background**: Clean white (#F8FAFC)
- **Cards**: White with subtle shadows
- **Text**: Dark slate to black
- **Best for**: Bright environments, high contrast reading

---

## Keyboard Accessibility

- Tab to focus the button
- Press Enter or Space to toggle
- Fully accessible with screen readers

---

## Technical Notes

- **Persistence**: Theme choice stored in `localStorage` as `agrisync-theme`
- **Default**: Dark theme on first visit
- **Transition**: All colors animate smoothly (0.3s ease)
- **Global**: Works across all pages automatically

---

## Troubleshooting

**Theme not persisting?**
- Check if localStorage is enabled in your browser
- Clear browser cache and try again

**Colors look wrong?**
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser compatibility (modern browsers only)

---

**Enjoy your personalized AgriSync AI experience! 🌾✨**
