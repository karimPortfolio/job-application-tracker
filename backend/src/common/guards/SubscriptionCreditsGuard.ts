import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Observable } from "rxjs";
import { SubscriptionPlan } from "src/billing/enums/subscriptions.enums";
import { CompanyDocument } from "src/companies/company.schema";
import { REQUIRED_CREDITS_PER_AI_FEATURES_USAGE } from "../constants/susbscriptions.constants";

@Injectable()
export class SubscriptionCreditsGuard implements CanActivate {

    constructor(
        @InjectModel('Company') private readonly companyModel: Model<CompanyDocument>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const company = await this.companyModel.findById(request.user.company);

        if (!company) {
            throw new ForbiddenException('Company not found');
        }
        
        if (company.plan === SubscriptionPlan.FREE)
        {
            throw new ForbiddenException('This feature requires a Pro subscription');
        }

        if (!company.aiFeaturesCredits || company.aiFeaturesCredits < REQUIRED_CREDITS_PER_AI_FEATURES_USAGE ) {
            throw new ForbiddenException('Insufficient credits. Please upgrade your plan.');
        }

        return true;
    }
}