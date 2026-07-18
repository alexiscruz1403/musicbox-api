import { TrackReviewItemDto } from './track-review-item.dto.js';
export declare class CreateReviewDto {
    type: 'TRACK' | 'ALBUM';
    deezerId: string;
    description?: string;
    rating?: number;
    trackItems?: TrackReviewItemDto[];
}
