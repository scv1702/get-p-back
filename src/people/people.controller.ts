// 라이브러리 등록
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  UseGuards,
  Param,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

// Data Transfer Object 등록
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';

// 서비스 등록
import { PeopleService } from './people.service';
import { UsersService } from 'src/users/users.service';

// 스키마 등록
import { People } from './schemas/people.schema';

@ApiTags('피플')
@Controller('people')
export class PeopleController {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly usersService: UsersService,
  ) {}

  // 전체 피플 목록 조회
  @ApiOkResponse({ description: '전체 피플 목록을 반환합니다.' })
  @Get()
  async findAll(): Promise<Array<People>> {
    return await this.peopleService.findAll();
  }

  // 피플 조회
  @ApiOkResponse({ description: '피플을 반환합니다.' })
  @Get(':peopleId')
  async findOne(@Param('peopleId') peopleId: string): Promise<People> {
    return await this.peopleService.findOne({ _id: peopleId });
  }

  // 피플 등록
  @ApiCreatedResponse({
    description: 'Get-P 피플로 등록이 완료되었습니다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async signUp(
    @Req() req,
    @Body() createPeopleDto: CreatePeopleDto,
  ): Promise<People> {
    const userId = req.user._id;
    const user = await this.usersService.findOne({ _id: userId });
    if (!user.category && !user.peopleObjectId) {
      return await this.peopleService.signUp(userId, createPeopleDto);
    }
  }

  // 피플 회원 정보 수정
  @ApiNoContentResponse({
    description: '피플 정보가 수정되었습니다.',
  })
  @ApiForbiddenResponse({
    description: '허가되지 않은 접근입니다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@Req() req, @Body() updatePeopleDto: UpdatePeopleDto) {
    const userId = req.user._id;
    const user = await this.usersService.findOne({ _id: userId });
    if (user.peopleObjectId) {
      return await this.peopleService.update(
        user.peopleObjectId.toString(),
        updatePeopleDto,
      );
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }
}
