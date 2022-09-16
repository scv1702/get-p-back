// 라이브러리 등록
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from 'src/company/company.module';
import { PeopleModule } from 'src/people/people.module';
import { ProjectsModule } from 'src/projects/projects.module';

// 서비스 등록
import { HashtagService } from './hashtag.service';

// 모듈 등록

// 스키마 등록
import { Hashtag, HashtagSchema } from './schemas/hashtag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hashtag.name, schema: HashtagSchema }]),
    ProjectsModule,
    CompanyModule,
    PeopleModule,
  ],
  providers: [HashtagService],
})
export class HashtagModule {}
