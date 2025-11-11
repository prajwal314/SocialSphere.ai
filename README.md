# SocialSphere - Smart Networking App

A modern React-based social networking application that helps people connect for various purposes including travel, roommates, business partnerships, dating, and social activities.

## Features

- **Travel Buddy Finder**: Connect with like-minded travelers
- **Roommate Matching**: Find compatible roommates based on lifestyle and preferences
- **Business Partner Discovery**: Connect with potential business partners and co-founders
- **Dating Platform**: Find meaningful relationships with compatible people
- **Social Activities**: Join others for various social activities

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd socialsphere
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── forms/          # Form components for different request types
│   ├── home/           # Home page components
│   └── ui/             # Reusable UI components
├── entities/           # Data models and API interactions
├── Pages/              # Main application pages
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── Layout.js           # Layout wrapper
└── main.jsx            # Application entry point
```

## Features Overview

### Home Page
- Hero section with call-to-action
- Connection type cards (Travel, Roommate, Business, Dating)
- Social activities grid
- Form modals for creating requests

### Connections Page
- Tabbed interface for different request types
- Request cards with details
- Filter and search functionality

### Profile Page
- User profile management
- Interest and preference settings
- Photo upload capability

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
