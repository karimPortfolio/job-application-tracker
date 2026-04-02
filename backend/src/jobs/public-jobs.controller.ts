import { Controller, Get, Inject, Query } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { Public } from "src/common/decorators/public.decorator";
import { JobQueryDto } from "./dto/job-query.dto";


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
}