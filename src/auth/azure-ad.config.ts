// Ce module ne lit JAMAIS process.env directement au chargement du module :
// les valeurs doivent être lues via ConfigService (après que .env soit chargé),
// typiquement dans le constructeur d'un provider NestJS. Voir AuthService.
export const azureAdUrls = {
  issuer: (tenantId: string) =>
    `https://login.microsoftonline.com/${tenantId}/v2.0`,
  jwksUri: (tenantId: string) =>
    `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`,
};