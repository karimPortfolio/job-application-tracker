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
import { NotificationsService } from './notifications.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JobQueryDto } from 'src/jobs/dto/job-query.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EmailVerifiedGuard } from 'src/auth/email-verified.guard';
import { CompanyGuard } from 'src/common/guards/CompanyGuard';

@Controller('notifications')
@UseGuards(JwtAuthGuard, EmailVerifiedGuard, CompanyGuard)
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
