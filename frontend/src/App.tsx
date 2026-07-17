
import FileUploader from './components/FileUploader'
import DynamicDashboard from './components/DynamicDashboard'
import FloatingAssistant from './components/FloatingAssistant'
import { useUIStore } from './store/uiStore'

function App() {
  const { dashboardData, theme } = useUIStore()

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0f1115]' : 'bg-gray-100'}`}>
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 h-screen flex flex-col">
        
        {/* Navbar */}
        <header className="px-8 py-4 bg-white/5 backdrop-blur-xl border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">ForecastAI</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-sm">Guest Mode</span>
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20"></div>
          </div>
        </header>

        {/* Dashboard Area */}
        <main className="flex-1 overflow-hidden relative">
          {!dashboardData ? (
            <div className="h-full flex flex-col items-center pt-20 px-4">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-white mb-4">Intelligent Personal Analyst</h2>
                <p className="text-white/60 max-w-xl mx-auto">Upload any dataset and let the AI automatically generate a customized dashboard, select the best forecasting model, and prescribe actionable insights.</p>
              </div>
              <FileUploader />
            </div>
          ) : (
            <DynamicDashboard />
          )}
        </main>
      </main>

      <FloatingAssistant />
    </div>
  )
}

export default App
