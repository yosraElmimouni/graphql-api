import { CreateArticleInput } from './create-article.input';
declare const UpdateArticleInput_base: import("@nestjs/common").Type<Partial<Omit<CreateArticleInput, "auteurId">>>;
export declare class UpdateArticleInput extends UpdateArticleInput_base {
    id: number;
    datePublication?: Date;
}
export {};
