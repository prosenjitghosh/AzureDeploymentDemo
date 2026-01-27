# Azure Demo Backend

A Nest.js REST API for demonstrating Azure App Service deployment with Managed Identity and Blob Storage integration.

## Overview

This is a minimal demo backend that will be deployed to Azure App Service. It demonstrates:

- REST API with video URL endpoint
- Clean structure for Azure Managed Identity integration
- Placeholder for Azure Blob Storage SAS generation
- CORS configuration for frontend integration

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
   npm run start:dev
   ```

3. The API will be available at http://localhost:3001

## API Endpoints

### Core Endpoints
- `GET /api` - Basic hello message
- `GET /api/health` - Health check endpoint

### Video Endpoints
- `GET /api/video-url` - **Main endpoint** - Returns video URL for streaming
- `GET /api/video-url/health` - Video service health check

### Example Response
```json
{
  "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "timestamp": "2026-01-27T11:00:00.000Z"
}
```

## Architecture

### Current Implementation (Local Development)
- ✅ Basic Nest.js REST API
- ✅ Mock video URL endpoint
- ✅ CORS enabled for frontend development
- ✅ Structured for Azure integration

### TODO for Azure Deployment
- [ ] Azure Managed Identity authentication
- [ ] Azure Blob Storage client setup
- [ ] SAS token generation for secure access
- [ ] Environment-based configuration

## File Structure

```
src/
├── main.ts              # Application entry point
├── app.module.ts        # Root module
├── app.controller.ts    # Basic health endpoints
├── app.service.ts       # Basic app service
└── video/
    ├── video.module.ts     # Video feature module
    ├── video.controller.ts # Video URL endpoint
    ├── video.service.ts    # Video business logic
    └── azure.service.ts    # Azure integration layer
```

## Azure Integration Points

### Managed Identity (Future Implementation)
```typescript
// TODO: Replace mock implementation in azure.service.ts
import { DefaultAzureCredential } from '@azure/identity';
const credential = new DefaultAzureCredential();
```

### Blob Storage SAS Generation (Future Implementation)
```typescript
// TODO: Replace mock implementation in azure.service.ts
import { BlobServiceClient, generateBlobSASQueryParameters } from '@azure/storage-blob';
const sasUrl = generateBlobSASQueryParameters(sasOptions, credential);
```

### Environment Variables (Azure App Service)
```bash
# These will be configured in Azure App Service
AZURE_STORAGE_ACCOUNT_NAME=yourstorageaccount
NODE_ENV=production
PORT=8080
```

## CORS Configuration

Currently configured for:
- `http://localhost:3000` (React dev server)
- TODO: Add Azure Static Web Apps URL when deployed

## Testing

```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Test the video URL endpoint
curl http://localhost:3001/api/video-url
```

## Deployment

This backend is designed to be deployed to Azure App Service with:
- Automatic deployment from GitHub
- Managed Identity enabled
- Integration with Azure Blob Storage
- Environment variable configuration

## Next Steps

After local testing:
1. Deploy to Azure App Service
2. Enable Managed Identity
3. Configure Azure Blob Storage access
4. Replace mock video URL with real SAS generation
5. Update CORS for production frontend domain