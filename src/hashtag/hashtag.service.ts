import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PeopleService } from 'src/people/people.service';
import { ProjectsService } from 'src/projects/projects.service';

import { People } from 'src/people/schemas/people.schema';
import { Project } from 'src/projects/schemas/project.schema';

import { Hashtag, HashtagDocument } from './schemas/hashtag.schema';

import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectModel(Hashtag.name) private hashtagModel: Model<HashtagDocument>,
    private readonly projectsService: ProjectsService,
    private readonly peopleService: PeopleService,
  ) {}

  // 피플 도큐먼트 생성
  async create(hashtag: CreateHashtagDto): Promise<Hashtag> {
    const createdHashtag = new this.hashtagModel(hashtag);
    return createdHashtag.save();
  }

  // 해시 태그로 프로젝트 조회
  async findProject(hashtagId: string): Promise<Array<Project>> {
    return await this.projectsService.find({ hashtagId });
  }

  // 해시 태그로 피플 조회
  async findPeople(hashtagId: string): Promise<Array<People>> {
    return await this.peopleService.find({ hashtagId });
  }
}
