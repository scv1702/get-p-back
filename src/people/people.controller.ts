// 라이브러리 등록
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Param,
  Request,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

// Data Transfer Object 등록
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';

// 서비스 등록
import { PeopleService } from './people.service';

// 스키마 등록
import { People } from './schemas/people.schema';

@ApiTags('피플')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  // 전체 피플 목록 조회
  @ApiOkResponse({ description: '전체 피플 목록을 반환합니다.' })
  @Get()
  async findAll(): Promise<Array<People>> {
    return await this.peopleService.findAll();
  }

  // 피플 회원 가입
  @ApiCreatedResponse({
    description: 'Get-P 피플로 회원 가입이 완료되었습니다.',
  })
  @Post()
  async signUp(@Body() createPeopleDto: CreatePeopleDto): Promise<People> {
    return await this.peopleService.signUp(createPeopleDto);
  }

  // 피플 회원 탈퇴
  @ApiNoContentResponse({
    description: 'Get-P 회원 탈퇴가 완료되었습니다.',
  })
  @ApiForbiddenResponse({
    description: '허가되지 않은 접근입니다.',
  })
  @ApiParam({
    description: '피플 ObjectId',
    name: 'peopleId',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':peopleId')
  async delete(@Param('peopleId') peopleId: string, @Request() req) {
    const people = await this.peopleService.findOne(peopleId);
    if (people.userObjectId.toString() === req.user._id) {
      await this.peopleService.delete(people._id.toString(), req.user._id);
      return { message: 'Get-P 회원 탈퇴가 완료되었습니다.' };
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }

  // 피플 회원 정보 수정
  @ApiNoContentResponse({
    description: '회원 정보가 수정되었습니다.',
  })
  @ApiForbiddenResponse({
    description: '허가되지 않은 접근입니다.',
  })
  @ApiParam({
    description: '피플 ObjectId',
    name: 'peopleId',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put(':peopleId')
  async update(
    @Param('peopleId') peopleId: string,
    @Body() updatePeopleDto: UpdatePeopleDto,
    @Request() req,
  ) {
    const people = await this.peopleService.findOne(peopleId);
    if (people.userObjectId.toString() === req.user._id) {
      await this.peopleService.update(people._id.toString(), updatePeopleDto);
      return { message: '회원 정보가 수정되었습니다.' };
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }
}
