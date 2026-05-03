"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_strategy_1 = require("./jwt.strategy");
const user_schema_1 = require("../users/user.schema");
const config_1 = require("@nestjs/config");
const password_reset_schema_1 = require("./password-reset.schema");
const google_strategy_1 = require("./google.strategy");
const google_auth_guard_1 = require("./google-auth.guard");
const email_verification_schema_1 = require("./email-verification.schema");
const email_verified_guard_1 = require("./email-verified.guard");
const is_user_email_uniqe_validator_1 = require("../common/decorators/is-user-email-uniqe.validator");
const mail_module_1 = require("../mail/mail.module");
const bullmq_1 = require("@nestjs/bullmq");
const auth_mail_processor_1 = require("./auth-mail.processor");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: password_reset_schema_1.PasswordReset.name, schema: password_reset_schema_1.PasswordResetSchema },
                { name: email_verification_schema_1.EmailVerification.name, schema: email_verification_schema_1.EmailVerificationSchema },
            ]),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const expiresIn = config.get('TOKEN_EXPIRATION', '1h');
                    return {
                        secret: config.get('JWT_SECRET', 'test-secret'),
                        signOptions: { expiresIn },
                    };
                },
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'authMail',
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            mail_module_1.MailModule,
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            google_strategy_1.GoogleStrategy,
            google_auth_guard_1.GoogleAuthGuard,
            email_verified_guard_1.EmailVerifiedGuard,
            is_user_email_uniqe_validator_1.IsUserEmailUniqueConstraint,
            auth_mail_processor_1.AuthMailConsumer,
        ],
        exports: [email_verified_guard_1.EmailVerifiedGuard, auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map