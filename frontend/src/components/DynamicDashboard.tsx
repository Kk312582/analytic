import React from 'react'
import Plot from 'react-plotly.js'
import { useUIStore } from '../store/uiStore'

const DynamicDashboard: React.FC = () => {
  const { dashboardData, layoutType, theme } = useUIStore()

  if (!dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/50">
        <h2 className="text-2xl font-semibold mb-2">No Data Available</h2>
        <p>Please upload a dataset or ask the AI to generate a report.</p>
      </div>
    )
  }

  const { kpis = [], charts = [], forecast = null } = dashboardData

  // Choose layout based on AI recommendation
  const gridClass = layoutType === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : 'flex flex-col gap-6'

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Generated Dashboard</h1>
        {dashboardData.model_reason && (
          <p className="text-white/70 italic text-sm">
            💡 AI Note: {dashboardData.model_reason}
          </p>
        )}
      </div>

      {/* KPIs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi: any, idx: number) => (
          <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-lg transition-transform hover:-translate-y-1">
            <h3 className="text-white/50 text-sm font-medium mb-1">{kpi.title}</h3>
            <p className="text-3xl font-bold text-white">{kpi.value || kpi.metric_formula}</p>
          </div>
        ))}
      </div>

      {/* Dynamic Charts Section */}
      <div className={gridClass}>
        {charts.map((chart: any, idx: number) => (
          <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg h-[400px]">
            <h3 className="text-white font-medium mb-4">{chart.title}</h3>
            <div className="w-full h-[320px]">
              <Plot
                data={[{
                  x: chart.x_data || ['Jan', 'Feb', 'Mar'], // fallback
                  y: chart.y_data || [10, 15, 13], // fallback
                  type: chart.type === 'line' ? 'scatter' : chart.type,
                  mode: chart.type === 'line' ? 'lines+markers' : undefined,
                  marker: { color: theme === 'dark' ? '#60A5FA' : '#3B82F6' }
                }]}
                layout={{ 
                  autosize: true, 
                  paper_bgcolor: 'transparent', 
                  plot_bgcolor: 'transparent',
                  font: { color: theme === 'dark' ? '#D1D5DB' : '#374151' },
                  margin: { l: 40, r: 20, t: 20, b: 40 }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
                config={{ displayModeBar: false }}
              />
            </div>
            {chart.reason && <p className="text-xs text-white/40 mt-2 text-center">{chart.reason}</p>}
          </div>
        ))}
        
        {/* Forecast Chart (if available) */}
        {forecast && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg h-[400px] col-span-full">
            <h3 className="text-white font-medium mb-1">Forecast Analysis ({forecast.model})</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                Confidence: {forecast.confidence}
              </span>
              <span className="text-xs text-white/50">{forecast.reason}</span>
            </div>
            
            <div className="w-full h-[280px]">
              <Plot
                data={[
                  {
                    x: forecast.forecast.map((f: any) => f.ds),
                    y: forecast.forecast.map((f: any) => f.yhat),
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Prediction',
                    line: { color: '#F87171' }
                  }
                ]}
                layout={{ 
                  autosize: true, 
                  paper_bgcolor: 'transparent', 
                  plot_bgcolor: 'transparent',
                  font: { color: theme === 'dark' ? '#D1D5DB' : '#374151' },
                  margin: { l: 40, r: 20, t: 20, b: 40 }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
                config={{ displayModeBar: false }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DynamicDashboard
