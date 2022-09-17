import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PusherService } from './pusher.service';

import { CreateMessageDto } from './dto/create-message.dto';

@Controller('pusher')
export class PusherController {
  constructor(private pusherService: PusherService) {}

  @Post('messages')
  @UseGuards(AuthGuard('jwt'))
  async messages(@Body() createMessageDto: CreateMessageDto, @Req() req) {
    const { message, channel } = createMessageDto;
    await this.pusherService.trigger(channel, 'message', {
      userId: req.user._id,
      email: req.user.email,
      userCategory: req.user.category,
      message,
      channel,
      createdAt: new Date(),
    });
    return { message: 'success' };
  }
}
