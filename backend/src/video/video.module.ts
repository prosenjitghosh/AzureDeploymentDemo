import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { AzureService } from './azure.service';

@Module({
  controllers: [VideoController],
  providers: [VideoService, AzureService],
  exports: [VideoService, AzureService],
})
export class VideoModule {}