// 라이브러리 등록
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// 서비스 등록
import { ProposalsService } from './proposals.service';

// 스키마 등록
import { Proposal, ProposalSchema } from './schemas/proposal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
    ]),
  ],
  providers: [ProposalsService],
  exports: [ProposalsService],
})
export class ProposalsModule {}
