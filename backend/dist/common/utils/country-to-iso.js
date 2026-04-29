"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryNameToISO = countryNameToISO;
const i18n_iso_countries_1 = __importDefault(require("i18n-iso-countries"));
function normalizeCountry(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ');
}
function countryNameToISO(countryName) {
    return i18n_iso_countries_1.default.getAlpha2Code(normalizeCountry(countryName), 'en') || undefined;
}
//# sourceMappingURL=country-to-iso.js.map