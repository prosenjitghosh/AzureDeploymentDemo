import { Controller, Get, HttpStatus } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video-url')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  /**
   * GET /api/video-url
   * Returns a video URL for streaming
   * 
   * Current: Returns mock URL for demo purposes
   * Future: Will use Azure Managed Identity to generate SAS tokens for Azure Blob Storage
   */
  @Get()
  async getVideoUrl() {
    try {
      // TODO: Add authentication check here
      // if (!user.isAuthenticated) {
      //   throw new UnauthorizedException('User must be authenticated');
      // }

      const videoUrl = await this.videoService.getVideoStreamUrl();

      return {
        videoUrl,
        timestamp: new Date().toISOString(),
        // TODO: Add metadata when using real Azure Blob Storage
        // metadata: {
        //   blobName: 'demo-video.mp4',
        //   container: 'videos',
        //   sasExpiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
        // }
      };
    } catch (error) {
      console.error('Error getting video URL:', error);
      
      return {
        error: 'Failed to get video URL',
        message: error.message || 'Unknown error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  /**
   * Health check endpoint for video service
   */
  @Get('health')
  getVideoServiceHealth() {
    return {
      status: 'OK',
      service: 'video-url-service',
      timestamp: new Date().toISOString(),
      azureIntegration: {
        managedIdentity: 'TODO: Not implemented yet',
        blobStorage: 'TODO: Not implemented yet',
        sasGeneration: 'TODO: Not implemented yet'
      }
    };
  }
}