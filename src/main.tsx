import React from 'react'
import ReactDOM from 'react-dom/client'
import RadarChartVisualization from './LLMUncertaintyRadar.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RadarChartVisualization />
  </React.StrictMode>,
)