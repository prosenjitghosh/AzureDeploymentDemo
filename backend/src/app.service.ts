import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Azure Demo Backend API - Ready for video streaming with Azure Blob Storage!';
  }
}