import { Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider } from './i18n/LangContext'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <LangProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LangProvider>
  )
}
