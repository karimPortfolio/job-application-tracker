import {
  Body,
  Controller,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApplicationsService } from './applications.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { CreatePublicApplicationDto } from './dto/create-public-application.dto';
import { Recaptcha } from '@nestlab/google-recaptcha';

@Controller('public-applications')
export class PublicApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @UseGuards(ThrottlerGuard)
  @Recaptcha()
  @Public()
  @UseInterceptors(FileInterceptor('resume', { storage: memoryStorage() }))
  @Post()
  @Throttle({ default: { ttl: 60, limit: 5 } })
  async createPublicApplication(
    @Body() createApplicationDto: CreatePublicApplicationDto,
    @UploadedFile(
      new ParseFilePipe({
        exceptionFactory: (error) => {
          throw new HttpException(
            'The resume is required and must be a PDF file not exceeding 5MB in size.',
            HttpStatus.BAD_REQUEST,
          );
        },
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.applicationsService.createPublicApplication(
      createApplicationDto,
      file,
    );
  }
}
