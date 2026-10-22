import { Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider } from './i18n/LangContext'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import MegaTestPage from './pages/MegaTestPage'

export default function App() {
  return (
    <LangProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/mega-test" element={<MegaTestPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LangProvider>
  )
}
