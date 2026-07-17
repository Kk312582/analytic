import React, { useCallback, useState } from 'react'
import { UploadCloud, File, CheckCircle } from 'lucide-react'
import axios from 'axios'
import { useUIStore } from '../store/uiStore'

const FileUploader: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const { setDashboardData } = useUIStore()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true)
    else if (e.type === 'dragleave') setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      // In a real app, this goes to the backend /upload endpoint
      // const res = await axios.post('http://localhost:8000/api/v1/data/upload', formData)
      
      // MOCK DATA for Hackathon demonstration
      setTimeout(() => {
        setDashboardData({
          model_reason: "Prophet chosen because the dataset has clear weekly and yearly seasonality with low variance.",
          kpis: [
            { title: "Total Revenue", value: "$45,231" },
            { title: "Active Users", value: "1,203" },
            { title: "Churn Rate", value: "2.4%" },
            { title: "Projected Growth", value: "+18%" }
          ],
          charts: [
            {
              title: "Revenue by Month",
              type: "bar",
              x_data: ["Jan", "Feb", "Mar", "Apr", "May"],
              y_data: [12000, 15000, 14000, 18000, 22000],
              reason: "Bar charts are best for comparing categorical monthly aggregates."
            },
            {
              title: "User Acquisition Trend",
              type: "line",
              x_data: ["Jan", "Feb", "Mar", "Apr", "May"],
              y_data: [100, 150, 130, 200, 250],
              reason: "Line charts visualize trends over time clearly."
            }
          ],
          forecast: {
            model: "Prophet",
            confidence: "92%",
            reason: "Three years of historical data. Low variance.",
            forecast: [
              { ds: "2026-06", yhat: 23000 },
              { ds: "2026-07", yhat: 24500 },
              { ds: "2026-08", yhat: 26000 },
            ]
          }
        })
        setUploading(false)
      }, 1500)
    } catch (err) {
      console.error(err)
      setUploading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 backdrop-blur-xl ${
          isDragging 
            ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' 
            : 'border-white/20 bg-white/5 hover:bg-white/10'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className={`p-4 rounded-full ${file ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {file ? <CheckCircle size={40} /> : <UploadCloud size={40} />}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white">
              {file ? file.name : 'Upload your dataset'}
            </h3>
            <p className="text-white/50 text-sm mt-1">
              {file ? 'Ready to analyze.' : 'Drag & drop your CSV or Excel file here'}
            </p>
          </div>

          {!file && (
            <label className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full cursor-pointer transition-colors border border-white/10">
              Browse Files
              <input type="file" className="hidden" accept=".csv,.xlsx" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
            </label>
          )}

          {file && (
            <button 
              onClick={handleUpload}
              disabled={uploading}
              className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {uploading ? 'AI Analyzing...' : 'Generate AI Dashboard'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUploader
