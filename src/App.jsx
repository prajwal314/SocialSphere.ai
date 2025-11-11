import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx'
import Connections from './Pages/Connections.jsx'
import Profile from './Pages/Profile.jsx'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
