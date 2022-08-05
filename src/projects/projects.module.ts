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
import { AuthModule } from 'src/auth/auth.module';
import { ProposalsModule } from 'src/proposals/proposals.module';

@Module({
  imports: [
    AuthModule,
    ProposalsModule,
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
