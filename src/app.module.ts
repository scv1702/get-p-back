// 라이브러리 등록
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// 컨트롤러 등록
import { AppController } from './app.controller';

// 서비스 등록
import { AppService } from './app.service';

// 모듈 등록
// import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PeopleModule } from './people/people.module';
import { CompanyModule } from './company/company.module';
import { ProjectsModule } from './projects/projects.module';
import { EmailModule } from './email/email.module';

import { config } from './config';

@Module({
  imports: [
    UsersModule,
    PeopleModule,
    CompanyModule,
    ProjectsModule,
    EmailModule,
    MongooseModule.forRoot(config.DB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
