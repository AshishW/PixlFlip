import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudySession from './components/StudySession';
import AuthModal from './components/AuthModal';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1E1E24',
            color: '#F5F5F7',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            fontSize: '0.875rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          },
          success: {
            iconTheme: { primary: '#10B981', secondary: '#1E1E24' },
          },
          error: {
            iconTheme: { primary: '#FB7185', secondary: '#1E1E24' },
          },
          duration: 3000,
        }}
      />
      <AuthModal />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/study/:deckId" element={<StudySession />} />
      </Routes>
    </BrowserRouter>
  );
}
