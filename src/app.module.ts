import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UploadModule, PrismaModule,],
  controllers: [AppController, UploadController],
  providers: [AppService],

})
export class AppModule {}
