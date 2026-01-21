import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HydrationGuard } from './components/HydrationGuard.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HydrationGuard>
      <App />
    </HydrationGuard>
  </React.StrictMode>,
)
