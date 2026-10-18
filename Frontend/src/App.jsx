import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import AppointmentPrep from './pages/AppointmentPrep'
import Dashboard from './pages/Dashboard'
import Journal from './pages/Journal'
import JournalEntryForm from './pages/JournalEntryForm'
import Landing from './pages/Landing'
import Learn from './pages/Learn'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Onboarding from './pages/Onboarding'
import Register from './pages/Register'
import Reminders from './pages/Reminders'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/new" element={<JournalEntryForm />} />
          <Route path="/journal/:entryId/edit" element={<JournalEntryForm />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/appointment-prep" element={<AppointmentPrep />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="/app" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
