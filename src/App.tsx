import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import PlayerPage from './pages/PlayerPage';
import MyProfilePage from './pages/MyProfilePage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                  element={<HomePage />} />
          <Route path="/player/:playerId"  element={<PlayerPage />} />
          <Route path="/me"                element={<MyProfilePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
