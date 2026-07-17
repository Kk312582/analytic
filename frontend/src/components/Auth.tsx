import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Loader2 } from 'lucide-react'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  const setToken = useAuthStore(state => state.setToken)
  const setUser = useAuthStore(state => state.setUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Default URL to local backend, handle prod via env if possible
    const baseUrl = 'http://localhost:8000/api/v1/auth'
    const endpoint = isLogin ? '/login' : '/register'
    
    try {
      let body: any
      let headers = {}
      if (isLogin) {
        // OAuth2PasswordRequestForm expects x-www-form-urlencoded
        body = new URLSearchParams()
        body.append('username', username)
        body.append('password', password)
        headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
      } else {
        body = JSON.stringify({ email, username, password })
        headers = { 'Content-Type': 'application/json' }
      }

      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.detail || 'Authentication failed')
      }
      
      if (data.access_token) {
        setToken(data.access_token)
        setUser({ username, email })
        navigate('/app')
      } else {
        if (!isLogin && data.id) {
          setIsLogin(true)
          setError('Account created! Please log in.')
        }
      }
    } catch (err: any) {
      // Hackathon Fallback: If backend is not running/deployed, mock the login
      if (err.name === 'TypeError' || err.message.includes('NetworkError') || err.message.includes('fetch')) {
        console.warn("Backend unreachable. Falling back to Mock Mode for Hackathon.")
        setToken("mock_jwt_token_for_hackathon")
        setUser({ username: username || "GuestAnalyst", email })
        navigate('/app')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0f1115] flex items-center justify-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">ForecastAI</h1>
          <p className="text-white/60 text-sm mt-1">{isLogin ? 'Welcome back, Analyst' : 'Create your secure account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">{error}</div>}
          
          {!isLogin && (
            <div>
              <label className="text-white/60 text-sm mb-1 block">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="you@company.com"
              />
            </div>
          )}

          <div>
            <label className="text-white/60 text-sm mb-1 block">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Analyst123"
            />
          </div>

          <div>
            <label className="text-white/60 text-sm mb-1 block">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-3 rounded-lg shadow-lg shadow-blue-500/25 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4">
          <button 
            onClick={() => {
              setToken("guest_mock_token")
              setUser({ username: "GuestAnalyst", email: "guest@example.com" })
              navigate('/app')
            }}
            className="w-full bg-white/5 hover:bg-white/10 text-white/80 font-medium py-3 rounded-lg border border-white/10 transition-all flex justify-center items-center"
          >
            Continue as Guest
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-white/50">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-blue-400 hover:text-blue-300 font-medium">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  )
}
