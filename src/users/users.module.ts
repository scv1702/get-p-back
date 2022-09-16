// 라이브러리 등록
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// 컨트롤러 등록
import { UsersController } from './users.controller';

// 서비스 등록
import { UsersService } from './users.service';

// 스키마 등록
import { User, UserSchema } from './schemas/user.schema';

// 모듈 등록
import { EmailModule } from 'src/email/email.module';
import { CompanyModule } from 'src/company/company.module';
import { PeopleModule } from 'src/people/people.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    EmailModule,
    forwardRef(() => PeopleModule),
    forwardRef(() => CompanyModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
