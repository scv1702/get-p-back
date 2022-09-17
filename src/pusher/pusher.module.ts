// 라이브러리 등록
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// 컨트롤러 등록
import { PusherController } from './pusher.controller';

// 서비스 등록
import { PusherService } from './pusher.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [PusherController],
  providers: [PusherService],
})
export class PusherModule {}
