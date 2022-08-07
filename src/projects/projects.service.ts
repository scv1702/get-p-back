// 라이브러리 등록
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// 스키마 등록
import { Project, ProjectDocument } from './schemas/project.schema';
import { Proposal } from 'src/proposals/schemas/proposal.schema';

// Data Transfer Object 등록
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProposalsService } from 'src/proposals/proposals.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private proposalsService: ProposalsService,
  ) {}

  // 전체 프로젝트 조회
  async findAll(): Promise<Array<Project>> {
    return await this.projectModel.find({});
  }

  // 프로젝트 조회
  async findById(projectId: string): Promise<Project> {
    return await this.projectModel.findById(projectId);
  }

  // 프로젝트 생성
  async create(
    requester: string,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const project = {
      requester: new Types.ObjectId(requester),
      ...createProjectDto,
    };
    const createdProject = new this.projectModel(project);
    return createdProject.save();
  }

  // 프로젝트 수정
  async update(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      updateProjectDto,
      { new: true },
    );
  }

  // 프로젝트 삭제
  async delete(projectId: string) {
    await this.projectModel.findByIdAndDelete(projectId);
  }

  // 프로젝트 수행자 선택
  async selectPerformer(
    projectId: string,
    proposalId: string,
  ): Promise<Project> {
    const proposal = await this.proposalsService.findById(proposalId);
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      { performer: proposal.proponent },
      { new: true },
    );
  }

  // 프로젝트에 제안 추가
  async pushProposalToProject(
    projectId: string,
    proposal: Proposal,
  ): Promise<Project> {
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      { $push: { proposals: proposal } },
      { new: true },
    );
  }
}
