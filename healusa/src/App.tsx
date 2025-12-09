import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ProcedureCatalog } from './pages/ProcedureCatalog';
import { Story } from './pages/Story';
import { Letter } from './pages/Letter';
import { Appointment } from './pages/Appointment';
import { NotFound } from './pages/NotFound';
import './styles/pages.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/procedures" element={<ProcedureCatalog />} />
                <Route path="/story" element={<Story />} />
                <Route path="/letter" element={<Letter />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
