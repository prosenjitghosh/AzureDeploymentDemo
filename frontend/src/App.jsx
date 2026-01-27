import { useState } from 'react'
import './App.css'

function App() {
  // State for mock login status
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // State for video URL received from backend
  const [videoUrl, setVideoUrl] = useState('')
  // State for loading status
  const [isLoading, setIsLoading] = useState(false)
  // State for error handling
  const [error, setError] = useState('')

  // Mock login handler - no real authentication yet
  const handleLogin = () => {
    // TODO: Replace with real Azure AD authentication when ready
    console.log('Mock login - will integrate Azure AD later')
    setIsLoggedIn(true)
    setError('')
  }

  // Get video URL from backend
  const handleGetVideoUrl = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Read backend URL from environment variable
      // This will be different in Azure Static Web Apps vs local development
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
      
      console.log('Calling backend at:', `${baseUrl}/api/video-url`)
      
      const response = await fetch(`${baseUrl}/api/video-url`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // TODO: Add Authorization header when authentication is implemented
          // 'Authorization': `Bearer ${token}`
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Received video URL:', data.videoUrl)
      
      setVideoUrl(data.videoUrl)
    } catch (err) {
      console.error('Error fetching video URL:', err)
      setError(`Failed to get video URL: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Azure Demo - Video Streaming</h1>
        <p>Demo for Azure Static Web Apps + App Service + Managed Identity + SAS</p>
      </header>

      <main className="app-main">
        <div className="auth-section">
          <h2>Authentication</h2>
          {!isLoggedIn ? (
            <button 
              className="login-btn" 
              onClick={handleLogin}
            >
              Login (Mock)
            </button>
          ) : (
            <p className="login-status">✅ Logged in (mock)</p>
          )}
          <small className="note">
            TODO: Replace with Azure AD authentication
          </small>
        </div>

        <div className="video-section">
          <h2>Video Streaming</h2>
          
          <button 
            className="get-video-btn"
            onClick={handleGetVideoUrl}
            disabled={isLoading}
          >
            {isLoading ? 'Getting Video URL...' : 'Get Video URL'}
          </button>

          {error && (
            <div className="error">
              <p>❌ {error}</p>
              <small>Make sure the backend is running on {import.meta.env.VITE_API_BASE_URL}</small>
            </div>
          )}

          {videoUrl && (
            <div className="video-player">
              <h3>Video Player</h3>
              <p><strong>Video URL:</strong> {videoUrl}</p>
              
              <video 
                controls 
                width="100%" 
                style={{ maxWidth: '800px' }}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="video-info">
                <small>
                  <strong>Current:</strong> Mock URL from backend<br/>
                  <strong>Later:</strong> This will be a real Azure Blob Storage URL with SAS token
                </small>
              </div>
            </div>
          )}
        </div>

        <div className="info-section">
          <h3>What This Demo Will Prove</h3>
          <ul>
            <li>✅ Frontend hosted on Azure Static Web Apps</li>
            <li>✅ Backend hosted on Azure App Service</li>
            <li>✅ Frontend → Backend communication</li>
            <li>⏳ Azure Managed Identity (TODO)</li>
            <li>⏳ Short-lived SAS for Blob Storage (TODO)</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App