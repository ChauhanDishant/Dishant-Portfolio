# Dishant Chauhan - Professional Portfolio

A production-grade, futuristic portfolio built with React, TypeScript, and Tailwind CSS, following atomic design principles.

## 🚀 Features

- **Corporate-Futurism Aesthetic**: Dark mode with neon cyan/indigo accents and glassmorphism
- **Custom Cursor**: Reactive SVG cursor that blooms on hover
- **3D Interactions**: Card tilt effects and dynamic spotlight following mouse position
- **Sticky Timeline**: Vertical timeline with scroll progress indicator
- **GitHub Integration**: Live repository data fetched from GitHub API
- **Performance Optimized**: React.memo, useCallback, and code splitting
- **Type-Safe**: Strict TypeScript with zero `any` types
- **Atomic Design**: Modular component architecture (atoms → molecules → organisms)

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/          # Base components (buttons, badges, frames)
│   ├── molecules/      # Composite components (cards, forms)
│   ├── organisms/      # Complex sections (hero, timeline)
│   └── templates/      # Layout wrappers
├── hooks/              # Custom React hooks
│   ├── useGitHub.ts
│   ├── useCustomCursor.ts
│   └── useScrollProgress.ts
├── utils/              # Utility functions and helpers
├── types/              # TypeScript type definitions
├── data/               # Static data and constants
└── App.tsx             # Main application component
```

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Deployment**: GitHub Actions CI/CD

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ChauhanDishant/Dishant-Portfolio.git

# Navigate to project directory
cd Dishant-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Deployment

The portfolio automatically deploys to GitHub Pages via GitHub Actions on push to `main` branch.

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service

## 🎨 Customization

### Replace Profile Photo

1. Add your professional headshot to `/public/` or `/src/assets/`
2. Update the `HexagonalFrame` component in `HeroSection.tsx`:

```tsx
<HexagonalFrame size={320} glowColor="gradient">
  <img src="/your-photo.jpg" alt="Dishant Chauhan" className="w-full h-full object-cover" />
</HexagonalFrame>
```

### Update Content

- **Experience**: Edit `src/data/constants.ts` → `EXPERIENCES` array
- **Projects**: Edit `src/data/constants.ts` → `PROJECTS` array
- **GitHub Username**: Change `GITHUB_USERNAME` in `constants.ts`
- **LinkedIn**: Update URL in `App.tsx` contact section

### Modify Theme Colors

Edit `tailwind.config.js`:

```js
colors: {
  'neon-cyan': '#06b6d4',      // Your primary neon color
  'neon-indigo': '#6366f1',    // Your secondary neon color
  'electric-indigo': '#818cf8', // Accent color
  'deep-slate': '#0a0a0a',     // Background color
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

- **Email**: [your-email@example.com]
- **LinkedIn**: [linkedin.com/in/chauhandishant](https://linkedin.com/in/chauhandishant)
- **GitHub**: [github.com/ChauhanDishant](https://github.com/ChauhanDishant)

---

Built with ❤️ by Dishant Chauhan
