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
exports.UserSchema = exports.User = exports.UserPreferences = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const date_fns_1 = require("date-fns");
const mongoose_2 = require("mongoose");
const mongoose_lean_virtuals_1 = __importDefault(require("mongoose-lean-virtuals"));
let UserPreferences = class UserPreferences {
    theme;
    notifications;
};
exports.UserPreferences = UserPreferences;
__decorate([
    (0, mongoose_1.Prop)({ default: 'system', enum: ['light', 'dark', 'system'] }),
    __metadata("design:type", String)
], UserPreferences.prototype, "theme", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true },
            marketing: { type: Boolean, default: true },
        },
        default: {},
        _id: false
    }),
    __metadata("design:type", Object)
], UserPreferences.prototype, "notifications", void 0);
exports.UserPreferences = UserPreferences = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], UserPreferences);
let User = class User {
    name;
    email;
    avatarUrl;
    password;
    provider;
    googleId;
    company;
    emailVerifiedAt;
    preferences;
    createdAt;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxLength: 255 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxLength: 255, minLength: 8 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['local', 'google'], default: 'local' }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true, sparse: true, default: undefined }),
    __metadata("design:type", Object)
], User.prototype, "googleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Company', default: null }),
    __metadata("design:type", Object)
], User.prototype, "company", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], User.prototype, "emailVerifiedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_1.SchemaFactory.createForClass(UserPreferences),
        default: () => ({}),
    }),
    __metadata("design:type", UserPreferences)
], User.prototype, "preferences", void 0);
exports.User = User = __decorate([
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
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.virtual('createdAtDiff').get(function () {
    if (!this.createdAt)
        return null;
    return (0, date_fns_1.formatDistanceToNow)(new Date(this.createdAt), { addSuffix: true });
});
exports.UserSchema.plugin(mongoose_lean_virtuals_1.default);
//# sourceMappingURL=user.schema.js.map