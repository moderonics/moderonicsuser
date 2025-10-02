# SmartGadgets PWA - React + Vite

A modern electronics e-commerce Progressive Web App built with React, Vite, Redux Toolkit, and Tailwind CSS.

## Features

- 🛍️ Full-featured e-commerce interface
- 📱 Responsive design (mobile & desktop)
- 🛒 Shopping cart with Redux state management
- ❤️ Wishlist functionality
- 🎨 Modern UI with Tailwind CSS v4
- ⚡ Fast development with Vite
- 🔄 React Router for navigation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

### Development

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

\`\`\`bash
npm run build
\`\`\`

Preview the production build:

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── home-page.jsx   # Home page component
│   ├── cart.jsx        # Shopping cart
│   └── ...
├── features/           # Redux slices
│   ├── cart/          # Cart state management
│   └── wishlist/      # Wishlist state management
├── lib/               # Utility functions
├── App.jsx            # Main app component with routing
├── main.jsx           # Application entry point
└── store.js           # Redux store configuration
\`\`\`

## Technologies

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## License

MIT
