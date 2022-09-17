// 라이브러리 등록
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/image.storage';

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

  // 사용자 조회
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async findOneWithProfile(@Req() req) {
    const user = await this.usersService.findOne({ _id: req.user._id });
    if (user) {
      if (user.category) {
        if (user.category === 'company') {
          const company = await this.companyService.findOne({
            _id: user.companyObjectId,
          });
          return { ...user, company };
        }
        if (user.category === 'people') {
          const people = this.peopleService.findOne({
            _id: user.peopleObjectId,
          });
          return { ...user, people };
        }
      } else {
        return user;
      }
    }
    throw new NotFoundException('존재하지 않는 사용자입니다.');
  }

  // 사용자 이미지 조회
  @Get('image')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Req() req) {
    const user = await this.usersService.findOne({ _id: req.user._id });
    if (user.category === 'people') {
      const people = await this.peopleService.findOne({
        _id: user.peopleObjectId,
      });
      return { image: people.image };
    }
    if (user.category === 'company') {
      const company = await this.companyService.findOne({
        _id: user.companyObjectId,
      });
      return { image: company.image };
    }
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
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async delete(@Req() req) {
    const userId = req.user._id;
    const user = await this.usersService.findOne({ _id: userId });
    await this.usersService.delete(userId);
    if (user.category === 'people') {
      await this.peopleService.delete(user.peopleObjectId.toString());
      return { message: 'Get-P 회원 탈퇴가 완료되었습니다.' };
    }
    if (user.category === 'company') {
      await this.companyService.delete(user.companyObjectId.toString());
      return { message: 'Get-P 회원 탈퇴가 완료되었습니다.' };
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }

  // 프로필 사진 등록
  @ApiCreatedResponse({
    description: '프로필 사진이 등록되었습니다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('image')
  @UseInterceptors(FileInterceptor('image', storage()))
  async uploadImage(@Req() req, @UploadedFile() image: Express.Multer.File) {
    const user = await this.usersService.findOne({ _id: req.user._id });
    if (user.category === 'people' && user.peopleObjectId) {
      await this.peopleService.uploadImage(
        user.peopleObjectId.toString(),
        image,
      );
      return { message: image.filename };
    } else if (user.category === 'company' && user.companyObjectId) {
      await this.companyService.uploadImage(
        user.companyObjectId.toString(),
        image,
      );
      return { message: image.filename };
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }
}
