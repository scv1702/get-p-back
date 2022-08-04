import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectsModel: Model<ProjectDocument>,
  ) {}

  async findAll() {
    const projectsList = await this.projectsModel.find({});
    return projectsList;
  }

  async findOne(id: Types.ObjectId) {
    const project = await this.projectsModel.findOne({ id });
    return project;
  }

  async create(createProjectDto: CreateProjectDto) {
    const createdProject = new this.projectsModel(createProjectDto);
    return createdProject.save();
  }
}
