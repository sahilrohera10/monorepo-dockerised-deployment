# Core Frontend

React frontend application for the monorepo, built with Vite.

## Features

- ⚡️ Fast HMR (Hot Module Replacement)
- 🎨 Modern UI with React 18
- 📦 Optimized production builds
- 🔥 Lightning-fast dev server

## Getting Started

### Install Dependencies

```bash
yarn install
```

### Development Server

```bash
yarn dev
# or from root
yarn workspace @monorepo/core-front dev
```

The app will be available at http://localhost:3002

### Build for Production

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

## Configuration

- Port: 3002 (configured in `vite.config.js`)
- Entry: `src/main.jsx`
- Framework: React 18 with Vite 5

## Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn clean` - Remove build artifacts

