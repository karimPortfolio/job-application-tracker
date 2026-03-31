import { Controller, Get, Inject } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { Public } from "src/common/decorators/public.decorator";


@Controller('public-jobs')
export class PublicJobsController {
    constructor(
        private readonly jobsService: JobsService
    ) {}

    @Public()
    @Get()
    findAll() {
        return this.jobsService.findAll();
    }
}