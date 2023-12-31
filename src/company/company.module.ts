// 라이브러리 등록
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// 모듈 등록
import { UsersModule } from 'src/users/users.module';

// 서비스 등록
import { CompanyService } from './company.service';

// 컨트롤러 등록
import { CompanyController } from './company.controller';

// 스키마 등록
import { Company, CompanySchema } from './schemas/company.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
