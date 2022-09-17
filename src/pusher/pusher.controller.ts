import { Controller, Post, Body } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Controller('pusher')
export class PusherController {
  constructor(private pusherService: PusherService) {}

  @Post('messages')
  async messages(
    @Body('userId') userId: string,
    @Body('message') message: string,
  ) {
    await this.pusherService.trigger('chat', 'message', {
      userId,
      message,
    });
    return { message: 'success' };
  }
}
