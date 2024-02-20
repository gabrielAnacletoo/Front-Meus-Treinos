import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Global from './assets/style/global.styles.ts'
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>,
)
