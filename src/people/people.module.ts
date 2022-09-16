// 라이브러리 등록
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// 서비스 등록
import { PeopleService } from './people.service';

// 컨트롤러 등록
import { PeopleController } from './people.controller';

// 모듈 등록
import { AuthModule } from 'src/auth/auth.module';

// 스키마 등록
import { People, PeopleSchema } from './schemas/people.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: People.name, schema: PeopleSchema }]),
    forwardRef(() => UsersModule),
  ],
  providers: [PeopleService],
  controllers: [PeopleController],
  exports: [PeopleService],
})
export class PeopleModule {}
