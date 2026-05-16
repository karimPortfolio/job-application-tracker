import { SetMetadata } from '@nestjs/common';

export interface AIFeatureOptions {
  credits: number;
}

export const AI_FEATURE_KEY = 'ai_feature_options';
export const AIFeature = (options: AIFeatureOptions) => SetMetadata(AI_FEATURE_KEY, options);