// 라이브러리 등록
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// 컨트롤러 등록
import { AppController } from './app.controller';

// 서비스 등록
import { AppService } from './app.service';

// 모듈 등록
import { HashtagModule } from './hashtag/hashtag.module';
import { AuthModule } from './auth/auth.module';
import { PusherModule } from './pusher/pusher.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    HashtagModule,
    PusherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
