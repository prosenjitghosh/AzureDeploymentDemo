import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend development
  // In Azure App Service, this will be configured differently
  app.enableCors({
    origin: [
      'http://localhost:3000', // React dev server
      'https://localhost:3000', // HTTPS React dev server
      // TODO: Add Azure Static Web Apps URL when deployed
      // 'https://your-static-web-app.azurestaticapps.net'
    ],
    credentials: true,
  });

  // Global prefix for all routes (optional)
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  
  await app.listen(port);
  console.log(`🚀 Backend API running on: http://localhost:${port}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET /api/video-url - Get video URL (mock for now)`);
  console.log(`\n💡 Next steps for Azure deployment:`);
  console.log(`   - Configure Azure Managed Identity`);
  console.log(`   - Implement Azure Blob Storage SAS generation`);
  console.log(`   - Update CORS for production domain`);
}
bootstrap();