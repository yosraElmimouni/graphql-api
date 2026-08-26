// enumeration for the status of an article
export enum ArticleStatus {
  Brouillon = 'Brouillon', // Draft
    Publie = 'Publié', // Published
    Archive = 'Archivé', // Archived
    EnAttente = 'En attente', // Pending
    Refuse = 'Refusé', // Rejected
    Supprime = 'Supprimé', // Deleted
    EnCoursDeValidation = 'En cours de validation', // Under review
    Valide = 'Validé', // Validated
    Invalide = 'Invalide', // Invalid
}
