import type { SortOrder } from 'mongoose';
import { ApplicationQueryDto } from '../dto/application-query.dto';
export declare function buildApplicationSort(query: ApplicationQueryDto): Record<string, SortOrder>;
