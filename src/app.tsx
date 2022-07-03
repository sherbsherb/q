import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Footer } from './components/Footer'
import { Main } from './components/Main'
import { Nav } from './components/Nav'
import { Navbar } from '@components/Navbar'
import { LinkA } from './routes/LinkA'
import { LinkB } from './routes/LinkB'
import { LinkC } from './routes/LinkC'
import { theme } from './theme'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './app.css'
import './reset.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Nav />
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="linkA" element={<LinkA />} />
            <Route path="linkB" element={<LinkB />} />
            <Route path="linkC" element={<LinkC />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
