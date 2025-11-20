# HealUSA - Medical Assistance Website

A professional React-based website for providing medical assistance services to Chinese patients seeking healthcare in the United States. This frontend application features multilingual support, comprehensive medical service information, appointment booking, and patient testimonials.

## 🌟 Features

- **Multilingual Support**: Full Chinese (Simplified) and English translation
- **Responsive Design**: Mobile-friendly, modern UI with smooth animations
- **Pages**:
  - Home: Hero section with features and call-to-action
  - About: Team information, mission, experience stats
  - Services: Comprehensive medical services catalog
  - Procedure Catalog: Searchable and filterable medical procedures
  - Contact Form: Inquiry and contact submission
  - Appointment Booking: Date/time selection with form validation
  
- **Core Features**:
  - Real-time search and filtering
  - Language toggle (Chinese/English)
  - Sticky header with responsive mobile menu
  - Professional footer with links
  - Smooth page transitions
  - Accessible and semantic HTML

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header with language toggle
│   └── Footer.tsx          # Footer with links and social
├── context/
│   └── LanguageContext.tsx # Multilingual support context
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── About.tsx           # Company information
│   ├── Services.tsx        # Medical services overview
│   ├── ProcedureCatalog.tsx# Searchable procedures list
│   ├── Contact.tsx         # Contact form page
│   ├── Appointment.tsx     # Appointment booking page
│   └── NotFound.tsx        # 404 page
├── styles/
│   ├── pages.css           # Main styling
│   ├── header.css          # Header specific styles
│   └── footer.css          # Footer specific styles
├── App.tsx                 # Main app with routing
├── main.tsx                # React entry point
└── index.css               # Global styles
```

## 🎨 Styling

The application uses a modern color scheme with:
- Primary Color: `#0066cc` (Professional Blue)
- Secondary Color: `#00a86b` (Health Green)
- Accent Color: `#ff6b6b` (Alert Red)

All components are fully responsive with mobile-first approach.

## 🌐 Languages

The application supports:
- **English (en)**: Default language
- **Chinese Simplified (zh)**: Complete Chinese translation

Language toggle is available in the header. All content is dynamically translated using the LanguageContext.

## 📝 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module reloading.

### Build
```bash
npm run build
```
Creates an optimized production build.

### Preview
```bash
npm run preview
```
Preview the production build locally.

### Lint
```bash
npm run lint
```
Check code quality with ESLint.

## 🔧 Technologies Used

- **React 18**: UI library
- **React Router v6**: Client-side routing
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern styling with CSS Grid and Flexbox

## �� Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Key Components

### LanguageContext
Provides multilingual support throughout the application with:
- Language switching functionality
- Translation lookup with `t()` function
- Persistent language state

### Header
Features:
- Logo with icon
- Navigation menu
- Language toggle button
- Appointment CTA button
- Mobile responsive hamburger menu

### Footer
Features:
- Company information
- Quick links
- Service categories
- Contact information
- Social media links

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
The `dist/` folder contains the production build ready to deploy.

## 📞 Contact & Support

- Email: info@healusa.com
- Phone: +1 (212) 555-0123
- Address: 123 Medical Plaza, New York, NY 10001

## 📄 License

This project is proprietary and confidential.

## 🔮 Future Enhancements

- [ ] Backend integration for form submissions
- [ ] Patient testimonials gallery
- [ ] Doctor profiles and bios
- [ ] Online payment integration
- [ ] Appointment confirmation emails
- [ ] Patient portal login
- [ ] Real-time chat support
- [ ] Blog section with medical information

---

**Built with ❤️ for international patients**
