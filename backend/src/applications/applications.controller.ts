import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationQueryDto } from './dto/application-query.dto';
import { CompanyGuard } from '../common/guards/CompanyGuard';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { UpdateApplicationStageDto } from './dto/update-application-stage.dto';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('applications')
@UseGuards(AuthGuard('jwt'), CompanyGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  async getCompanyApplications(
    @Req() req: any,
    @Query() query: ApplicationQueryDto,
  ) {
    const companyId = req.user.company;
    return this.applicationsService.getCompanyApplications(companyId, query);
  }

  @Get('export')
  async exportApplications(
    @Query('format') format: 'csv' | 'xlsx' = 'csv',
    @Req() req: any,
    @Query() query: ApplicationQueryDto,
    @Res() res: Response,
  ) {
    const companyId = req.user.company;
    const stream = await this.applicationsService.exportApplications(
      companyId,
      format,
      query,
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="applications.${format}"`,
    );

    res.setHeader(
      'Content-Type',
      format === 'csv'
        ? 'text/csv'
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    stream.pipe(res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('resume', { storage: memoryStorage() }))
  async createApplication(
    @CurrentUser() user: { sub: string },
    @Req() req: any,
    @Body() dto: CreateApplicationDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB
          new FileTypeValidator({
            fileType:
              /(pdf|text\/plain|vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
            fallbackToMimetype: true,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const companyId = req.user.company;
    return this.applicationsService.createApplication(companyId, user, dto, file);
  }

  @Get(':id')
  async getApplicationById(@Req() req: any, @Param('id') applicationId: string) {
    const companyId = req.user.company;
    return this.applicationsService.getApplicationById(applicationId, companyId);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('resume', { storage: memoryStorage() }))
  async updateApplication(
    @Req() req: any,
    @Param('id') applicationId: string,
    @Body() dto: UpdateApplicationDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB
          new FileTypeValidator({
            fileType:
              /(pdf|text\/plain|vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
            fallbackToMimetype: true,
          }),
        ],
      }),
    )

    file: Express.Multer.File,
  ) {
    const companyId = req.user.company;
    return this.applicationsService.updateApplication(applicationId, companyId, dto, file);
  }

  @Delete(':id')
  async deleteApplication(@Param('id') applicationId: string, @Req() req: any) {
    const companyId = req.user.company;
    return this.applicationsService.deleteApplication(applicationId, companyId);
  }

  @Patch(':id/status')
  async updateApplicationStatus(
    @Req() req: any,
    @Param('id') applicationId: string,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    const companyId = req.user.company;
    await this.applicationsService.updateApplicationStatus(
      applicationId,
      companyId,
      dto.status,
    );
    return { message: 'Application status updated successfully' };
  }

  @Patch(':id/stage')
  async updateApplicationStage(
    @Req() req: any,
    @Param('id') applicationId: string,
    @Body() dto: UpdateApplicationStageDto,
  ) {
    const companyId = req.user.company;
    await this.applicationsService.updateApplicationStage(
      applicationId,
      companyId,
      dto.stage,
    );
    return { message: 'Application stage updated successfully' };
  }
}
