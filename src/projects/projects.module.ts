// 라이브러리 등록
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// 서비스 등록
import { ProjectsService } from './projects.service';

// 스키마 등록
import { Project, ProjectSchema } from './schemas/project.schema';

// 컨트롤러 등록
import { ProjectsController } from './projects.controller';

// 모듈 등록
import { ProposalsModule } from 'src/proposals/proposals.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    ProposalsModule,
    CompanyModule,
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
