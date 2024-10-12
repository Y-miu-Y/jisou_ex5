import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CharaGitRouter } from './CharaGitRouter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CharaGitRouter />
  </StrictMode>,
)
