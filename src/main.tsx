import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CharaGitProvider } from './CharaGitProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CharaGitProvider />
  </StrictMode>,
)
