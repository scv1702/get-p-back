// 라이브러리 등록
import { Model, Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// 스키마 등록
import { Project, ProjectDocument } from './schemas/project.schema';

// Data Transfer Object 등록
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  // 전체 프로젝트 조회
  async findAll() {
    const projectsList = await this.projectModel.find({});
    return projectsList;
  }

  // 프로젝트 조회
  async findOne(id: string) {
    const project = await this.projectModel.findOne({
      _id: new Types.ObjectId(id),
    });
    if (project) {
      return project;
    } else {
      throw new NotFoundException('존재하지 않는 프로젝트입니다.');
    }
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
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      updateProjectDto,
      { new: true },
    );
    return updatedProject;
  }

  // 프로젝트 삭제
  async delete(id: string) {
    await this.projectModel.deleteOne({ _id: new Types.ObjectId(id) });
    return { message: '프로젝트를 삭제했습니다.' };
  }
}
