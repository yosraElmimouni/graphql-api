import { MediasService } from './medias.service';
import { Media } from './entities/media.entity';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
export declare class MediasResolver {
    private readonly mediasService;
    constructor(mediasService: MediasService);
    createMedia(createMediaInput: CreateMediaInput): Promise<Media>;
    findAll(): Promise<Media[]>;
    findOne(id: number): Promise<Media>;
    updateMedia(updateMediaInput: UpdateMediaInput): Promise<Media>;
    removeMedia(id: number): Promise<{
        id: number;
        type: import("./Enums/MediaType").MediaType;
        urlFichier: string;
        titre: string;
        description: string;
        localisation: string;
        dateCapture: Date;
        article: import("../articles/entities/article.entity").Article;
        user: import("../users/entities/user.entity").User;
    }>;
}
