import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import { useAuthStore } from './store/authStore'

function App() {
  const token = useAuthStore(state => state.token)

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/app" /> : <Auth />} />
      <Route path="/app" element={token ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default App
