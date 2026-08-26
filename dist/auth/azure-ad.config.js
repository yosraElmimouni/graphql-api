"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.azureAdUrls = void 0;
exports.azureAdUrls = {
    issuer: (tenantId) => `https://login.microsoftonline.com/${tenantId}/v2.0`,
    jwksUri: (tenantId) => `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`,
};
//# sourceMappingURL=azure-ad.config.js.map