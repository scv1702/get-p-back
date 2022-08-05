// 라이브러리 등록
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// 컨트롤러 등록
import { AppController } from './app.controller';

// 서비스 등록
import { AppService } from './app.service';

// 모듈 등록
import { PeopleModule } from './people/people.module';
import { CompanyModule } from './company/company.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { ProposalsModule } from './proposals/proposals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    PeopleModule,
    CompanyModule,
    ProjectsModule,
    ProposalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
