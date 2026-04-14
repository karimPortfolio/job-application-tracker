import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UsersModule } from "../users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/user.schema";
import { ProfileController } from "./profile.controller";
import { AuthModule } from "../auth/auth.module";
import { S3Uploader } from "src/common/utils/s3-uploader";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        UsersModule,
        AuthModule
    ],
    exports: [MongooseModule],
    providers: [ProfileService, S3Uploader],
    controllers: [ProfileController]
})
export class ProfileModule {}
