// 라이브러리 등록
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// 서비스 등록
import { PeopleService } from './people.service';

// 컨트롤러 등록
import { PeopleController } from './people.controller';

// 모듈 등록
import { UsersModule } from 'src/users/users.module';

// 스키마 등록
import { People, PeopleSchema } from './schemas/people.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: People.name, schema: PeopleSchema }]),
    UsersModule,
  ],
  providers: [PeopleService],
  controllers: [PeopleController],
})
export class PeopleModule {}
