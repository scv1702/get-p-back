// 라이브러리 등록
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';

// Data Transfer Object 등록
import { CreateProjectDto } from './dto/create-project.dto';

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
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    const project = await this.projectsService.create(createProjectDto);
    return project;
  }

  // 프로젝트 조회
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const _id = new Types.ObjectId(id);
    const project = await this.projectsService.findOne(_id);
    return project;
  }
}

/*

// 프로젝트 수정
router.put('/:projectId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await ProjectService.updateProject(req.user._id, req.params.projectId, req.body);
        console.log(`[PUT] /projects/${req.params.projectId}`);  
        res.status(200).json({ message: '프로젝트가 수정되었습니다.' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
});

// 프로젝트 삭제
router.delete('/:projectId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await ProjectService.deleteProject(req.user._id, req.params.projectId);
        console.log(`[DELETE] /projects/${req.params.projectId}`);  
        res.status(200).json({ message: '프로젝트가 삭제되었습니다.' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// 수행자 선택
router.post('/:projectId/performer', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await ProjectService.selectPerformer(req.user._id, req.params.projectId, req.body.proposalId);
        console.log(`[POST] /projects/${req.params.projectId}/performer`);  
        res.status(200).json({ message: '프로젝트 수행이 확정되었습니다.' });
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// 제안 전송
router.post('/:projectId/proposals', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let proposalDTO = req.body;
        proposalDTO.proponent = req.user._id;
        proposalDTO.project = req.params.projectId;
        await ProjectService.sendProposal(proposalDTO);
        console.log(`[POST] /projects/${req.params.projectId}/proposals`);  
        res.status(200).json({ message: '제안서가 제출되었습니다.' });
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// 전체 제안 목록 조회
router.get('/:projectId/proposals', async (req, res) => {
    try {
        const proposals = await ProjectService.getProposalList(req.params.projectId);
        console.log(`[GET] /projects/${req.params.projectId}/proposals`);  
        res.status(200).json(proposals);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// 제안 조회
router.get('/:projectId/proposals/:proposalId', async (req, res) => {
    try {
        const proposal = await ProjectService.readProposal(req.params.proposalId);
        console.log(`[GET] /projects/${req.params.projectId}/proposals/${req.params.proposalId}`);  
        res.status(200).json(proposal);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
*/
