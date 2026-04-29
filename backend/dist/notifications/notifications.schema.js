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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = exports.Notification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const date_fns_1 = require("date-fns");
const mongoose_lean_virtuals_1 = __importDefault(require("mongoose-lean-virtuals"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
let Notification = class Notification {
    userId;
    type;
    data;
    readAt;
    createdAt;
};
exports.Notification = Notification;
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'User', required: true }),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], Notification.prototype, "data", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], Notification.prototype, "readAt", void 0);
exports.Notification = Notification = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
        toObject: {
            virtuals: true,
        },
    })
], Notification);
exports.NotificationSchema = mongoose_1.SchemaFactory.createForClass(Notification);
exports.NotificationSchema.virtual('createdAtDiff').get(function () {
    if (!this.createdAt)
        return null;
    return (0, date_fns_1.formatDistanceToNow)(new Date(this.createdAt), { addSuffix: true });
});
exports.NotificationSchema.set('toJSON', { virtuals: true });
exports.NotificationSchema.set('toObject', { virtuals: true });
exports.NotificationSchema.plugin(mongoose_lean_virtuals_1.default);
exports.NotificationSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=notifications.schema.js.map