import { Controller, Get, Inject, Param, Query, UseGuards } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { Public } from "src/common/decorators/public.decorator";
import { JobQueryDto } from "./dto/job-query.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { OptionalAuthGuard } from "src/common/guards/OptionalAuthGuard";


@UseGuards(OptionalAuthGuard)
@Controller('public-jobs')
export class PublicJobsController {
    constructor(
        private readonly jobsService: JobsService
    ) {}

    @Public()
    @Get()
    findAll(@Query() query: JobQueryDto) {
        return this.jobsService.findAll(query);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string, @CurrentUser() user: { sub: string }) {
        return this.jobsService.getPublicJobById(id, user);
    }
}