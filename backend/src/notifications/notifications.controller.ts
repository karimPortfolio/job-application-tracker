import {
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationsService } from './notifications.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JobQueryDto } from 'src/jobs/dto/job-query.dto';

@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
export class NotificationsController {
  constructor(
    @Inject() private readonly notificationsService: NotificationsService,
  ) {}

  @Get()
  async getNotifications(
    @CurrentUser() user: { sub: string },
    @Query() query: JobQueryDto,
  ) {
    return await this.notificationsService.findUserNotifications(user, query);
  }

  @Patch(':id')
  async markNotificationAsRead(
    @CurrentUser() user: { sub: string },
    @Param('id') id: string,
  ) {
    return await this.notificationsService.markAsRead(user, id);
  }

  @Post()
  async markAllNotificationsAsRead(@CurrentUser() user: { sub: string }) {
    return await this.notificationsService.markAllAsRead(user);
  }
}
