// 라이브러리 등록
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProposalDto } from './dto/create-proposal.dto';

// 스키마 등록
import { Proposal, ProposalDocument } from './schemas/proposal.schema';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
  ) {}

  // 제안 생성
  async create(
    projectId: string,
    proponent: string,
    createProposalDto: CreateProposalDto,
  ): Promise<Proposal> {
    const createdProposal = new this.proposalModel({
      project: new Types.ObjectId(projectId),
      proponent: new Types.ObjectId(proponent),
      ...createProposalDto,
    });
    return createdProposal.save();
  }

  // 특정 프로젝트의 제안 조회
  async findAll(projectId: string): Promise<Array<Proposal>> {
    return await this.proposalModel.find({
      project: new Types.ObjectId(projectId),
    });
  }

  // 제안 조회
  async findById(proposalId: string): Promise<Proposal> {
    return await this.proposalModel.findById(proposalId);
  }
}
