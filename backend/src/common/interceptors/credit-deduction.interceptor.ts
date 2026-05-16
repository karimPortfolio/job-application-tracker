import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AI_FEATURE_KEY, AIFeatureOptions } from '../decorators/ai-feature.decorator';
import { CompanyDocument } from '../../companies/company.schema';

@Injectable()
export class CreditDeductionInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    @InjectModel('Company') private readonly companyModel: Model<CompanyDocument>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = this.reflector.get<AIFeatureOptions>(AI_FEATURE_KEY, context.getHandler());

    if (!options) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const companyId = request.user?.company; 

    if (!companyId) {
      throw new HttpException('Company context missing from request', HttpStatus.BAD_REQUEST);
    }

    return next.handle().pipe(
      tap(async () => {
        ///====== this tap block runs ONLY if the controller returns successfully status 2xx =====///
        const updatedCompany = await this.companyModel.findOneAndUpdate(
          { 
            _id: companyId, 
            aiFeaturesCredits: { $gte: options.credits }
          },
          { 
            $inc: { aiFeaturesCredits: -options.credits } 
          },
          { new: true }
        );

        if (!updatedCompany) {
          console.error(`Failed atomic credit deduction for company: ${companyId}`);
        } else {
          console.log(`Successfully deducted ${options.credits} credits. Remaining: ${updatedCompany.aiFeaturesCredits}`);
        }
      })
    );
  }
}