# Azure Demo Frontend

A React + Vite application for demonstrating Azure Static Web Apps deployment with backend integration.

## Overview

This is a minimal demo frontend that will be deployed to Azure Static Web Apps. It demonstrates:

- React SPA with video streaming capability
- Environment-based backend configuration
- Clean structure for Azure deployment
- Mock authentication (to be replaced with Azure AD)

## Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The app will be available at http://localhost:3000

### Environment Configuration

The app reads the backend URL from `VITE_API_BASE_URL` environment variable:

- **Local development**: `http://localhost:3001` (from .env)
- **Azure deployment**: Will point to your Azure App Service

## Features

### Current Implementation
- ✅ Mock login button
- ✅ "Get Video URL" button that calls backend
- ✅ HTML5 video player for streaming
- ✅ Error handling and loading states
- ✅ Environment-based backend configuration

### TODO for Azure Deployment
- [ ] Replace mock login with Azure AD authentication
- [ ] Configure for Azure Static Web Apps
- [ ] Update environment variables for production

## File Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Application styles
├── main.jsx         # React entry point
└── index.css        # Global styles
```

## Azure Integration Points

### Environment Variables
- `VITE_API_BASE_URL`: Backend API base URL
  - Local: `http://localhost:3001`
  - Azure: `https://your-azure-app-service.azurewebsites.net`

### Authentication Flow (Future)
```javascript
// TODO: Replace mock login with:
// 1. Azure AD integration
// 2. Token acquisition
// 3. Secure API calls with Bearer token
```

### Video Streaming
Currently displays videos from URLs returned by the backend. In production, these will be:
- Azure Blob Storage URLs
- With short-lived SAS tokens
- Generated via Azure Managed Identity

## Deployment

This app is designed to be deployed to Azure Static Web Apps with:
- Automatic CI/CD from GitHub
- Environment variable configuration
- Integration with Azure App Service backend

## Next Steps

After local testing:
1. Deploy to Azure Static Web Apps
2. Connect to Azure App Service backend
3. Configure Azure AD authentication
4. Implement real video streaming from Azure Blob Storage