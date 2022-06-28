import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/theme/theme'
import { Nav } from './components/Nav'
import { Main } from '@/components/Main'
import { Footer } from '@c/Footer'
import { LinkA } from './routes/LinkA'
import { LinkB } from './routes/LinkB'
import { LinkC } from './routes/LinkC'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="linkA" element={<LinkA />} />
          <Route path="linkB" element={<LinkB />} />
          <Route path="linkC" element={<LinkC />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
