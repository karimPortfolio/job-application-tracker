import { JobQueryDto } from '../dto/job-query.dto';
import type { SortOrder } from 'mongoose';
export declare function buildJobSort(query: JobQueryDto): Record<string, SortOrder>;
