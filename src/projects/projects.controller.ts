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
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateProposalDto } from 'src/proposals/dto/create-proposal.dto';
import { ProposalsService } from 'src/proposals/proposals.service';

// Data Transfer Object 등록
import { CreateProjectDto } from './dto/create-project.dto';
import { SelectPerformerDto } from './dto/select-performer.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

// 서비스 등록
import { ProjectsService } from './projects.service';

// 스키마 등록
import { Project } from './schemas/project.schema';

@ApiTags('프로젝트')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly proposalsService: ProposalsService,
  ) {}

  // 전체 프로젝트 목록 조회
  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  // 프로젝트 생성
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req,
  ): Promise<Project> {
    if (req.user.category === 'company') {
      return await this.projectsService.create(req.user._id, createProjectDto);
    }
    throw new ForbiddenException('회사 회원만 프로젝트를 등록할 수 있습니다.');
  }

  // 프로젝트 조회
  @Get(':projectId')
  async findById(@Param('projectId') projectId: string) {
    const project = await this.projectsService.findOne({ _id: projectId });
    if (project) {
      return project;
    }
    throw new NotFoundException('존재하지 않는 프로젝트입니다.');
  }

  // 프로젝트 수정
  @UseGuards(AuthGuard('jwt'))
  @Put(':projectId')
  async update(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    const project = await this.projectsService.findOne({ _id: projectId });
    if (project.requester.toString() === req.user._id) {
      return await this.projectsService.update(projectId, updateProjectDto);
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }

  // 프로젝트 삭제
  @UseGuards(AuthGuard('jwt'))
  @Delete(':projectId')
  async delete(@Param('projectId') projectId: string, @Request() req) {
    const project = await this.projectsService.findOne({ _id: projectId });
    if (project.requester.toString() === req.user._id) {
      await this.projectsService.delete(projectId);
      return { message: '프로젝트를 삭제했습니다.' };
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }

  // 수행자 선택
  @UseGuards(AuthGuard('jwt'))
  @Post(':projectId/performer')
  async selectPerformer(
    @Param('projectId') projectId: string,
    @Request() req,
    @Body() selectPerformerDto: SelectPerformerDto,
  ) {
    const { proposalId } = selectPerformerDto;
    const project = await this.projectsService.findOne({ _id: projectId });
    if (project) {
      if (project.requester.toString() === req.user._id) {
        return await this.projectsService.selectPerformer(
          projectId,
          proposalId,
        );
      }
      throw new ForbiddenException('허가되지 않은 접근입니다.');
    }
    throw new NotFoundException('존재하지 않는 프로젝트입니다.');
  }

  // 제안 전송
  @UseGuards(AuthGuard('jwt'))
  @Post(':projectId/proposals')
  async createProposal(
    @Param('projectId') projectId: string,
    @Request() req,
    @Body() createProposalDto: CreateProposalDto,
  ) {
    if (req.user.category === 'people') {
      const proposal = await this.proposalsService.create(
        projectId,
        req.user._id,
        createProposalDto,
      );
      return await this.projectsService.pushProposalToProject(
        projectId,
        proposal,
      );
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }

  // 전체 제안 조회
  @Get(':projectId/proposals')
  async findAllProposals(@Param('projectId') projectId: string) {
    return await this.proposalsService.findAll(projectId);
  }

  // 제안 조회
  @Get(':projectId/proposals/:proposalId')
  async findOneProposal(@Param('proposalId') proposalId: string) {
    const proposal = await this.proposalsService.findOne({ _id: proposalId });
    if (proposal) {
      return proposal;
    }
    throw new NotFoundException('존재하지 않는 제안입니다.');
  }
}
