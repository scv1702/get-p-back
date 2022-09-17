import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PusherService } from './pusher.service';

@Controller('pusher')
export class PusherController {
  constructor(private pusherService: PusherService) {}

  @Post('messages')
  @UseGuards(AuthGuard('jwt'))
  async messages(@Body('message') message: string, @Req() req) {
    await this.pusherService.trigger('chat', 'message', {
      userId: req.user._id,
      message,
    });
    return { message: 'success' };
  }
}
