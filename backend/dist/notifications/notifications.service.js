"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/user.schema");
const notifications_schema_1 = require("./notifications.schema");
let NotificationsService = class NotificationsService {
    notificationModel;
    userModel;
    constructor(notificationModel, userModel) {
        this.notificationModel = notificationModel;
        this.userModel = userModel;
    }
    async findUserNotifications(user, query) {
        const userFound = await this.getUserOrThrow(user.sub);
        return this.notificationModel.paginate({
            userId: userFound.id,
        }, {
            page: query.page || 1,
            limit: query.limit || 10,
            lean: true,
            leanWithVirtuals: true,
        });
    }
    async markAsRead(user, notification) {
        const userFound = await this.getUserOrThrow(user.sub);
        const notificationToUpdate = await this.notificationModel.findOne({
            _id: notification,
            userId: userFound.id,
        });
        if (!notificationToUpdate) {
            throw new common_1.NotFoundException('Notification not found');
        }
        await this.notificationModel.updateOne({ _id: notificationToUpdate.id }, { $set: { readAt: new Date() } });
        return {
            message: 'Notification marked as read successfully',
        };
    }
    async markAllAsRead(user) {
        const userFound = await this.getUserOrThrow(user.sub);
        await this.notificationModel.updateMany({ userId: userFound.id }, { $set: { readAt: new Date() } });
        return {
            message: 'All Notifications marked as read successfully',
        };
    }
    async getUserOrThrow(userId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        return user;
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notifications_schema_1.Notification.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [Object, mongoose_2.Model])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map