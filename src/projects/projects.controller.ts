// 라이브러리 등록
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  Delete,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Data Transfer Object 등록
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

// 서비스 등록
import { ProjectsService } from './projects.service';

// 스키마 등록
import { Project } from './schemas/project.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // 전체 프로젝트 목록 조회
  @Get()
  async findAll() {
    const projectsList = await this.projectsService.findAll();
    return projectsList;
  }

  // 프로젝트 생성
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req,
  ): Promise<Project> {
    if (req.user.category === 'company') {
      const project = await this.projectsService.create(
        req.user._id,
        createProjectDto,
      );
      return project;
    } else {
      throw new UnauthorizedException(
        '회사 회원만 프로젝트 생성이 가능합니다.',
      );
    }
  }

  // 프로젝트 조회
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectsService.findOne(id);
  }

  // 프로젝트 수정
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    const project = await this.projectsService.findOne(id);
    if (project.requester._id.toString() === req.user._id) {
      return await this.projectsService.update(id, updateProjectDto);
    } else {
      throw new UnauthorizedException('허가되지 않은 접근입니다.');
    }
  }

  // 프로젝트 삭제
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    const project = await this.projectsService.findOne(id);
    if (project.requester._id.toString() === req.user._id) {
      return await this.projectsService.delete(id);
    } else {
      throw new UnauthorizedException('허가되지 않은 접근입니다.');
    }
  }
}
