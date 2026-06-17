import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './home.jsx'

createRoot(document.querySelector<HTMLDivElement>('#app')!).render(
  <StrictMode>
    <Home />
  </StrictMode>
)
