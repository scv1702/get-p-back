// 라이브러리 등록
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

// 스키마 등록
import { User } from './schemas/user.schema';

// 서비스 등록
import { UsersService } from './users.service';
import { PeopleService } from 'src/people/people.service';
import { CompanyService } from 'src/company/company.service';

import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('사용자')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly peopleService: PeopleService,
    private readonly companyService: CompanyService,
  ) {}

  // 전체 사용자 목록 조회
  @Get()
  async findAll(): Promise<Array<User>> {
    const users = await this.usersService.findAll();
    return users;
  }

  // 회원 가입
  @ApiCreatedResponse({
    description: 'Get-P 회원 가입이 완료되었습니다.',
  })
  @Post()
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.signUp(createUserDto);
  }

  // 회원 탈퇴
  @ApiNoContentResponse({
    description: 'Get-P 회원 탈퇴가 완료되었습니다.',
  })
  @ApiForbiddenResponse({
    description: '허가되지 않은 접근입니다.',
  })
  @ApiParam({
    description: '사용자 ObjectId',
    name: 'userId',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':userId')
  async delete(@Param('userId') userId: string, @Req() req) {
    const user = await this.usersService.findOne({ _id: userId });
    if (user._id === req.user._id) {
      await this.usersService.delete(userId);
      if (user.category === 'people') {
        await this.peopleService.delete(user.peopleObjectId.toString());
        return { message: 'Get-P 회원 탈퇴가 완료되었습니다.' };
      }
      if (user.category === 'company') {
        await this.companyService.delete(user.companyObjectId.toString());
        return { message: 'Get-P 회원 탈퇴가 완료되었습니다.' };
      }
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }
}
