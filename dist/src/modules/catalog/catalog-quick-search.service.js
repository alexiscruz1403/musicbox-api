var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
const PER_TYPE_LIMIT = 5;
const RESULT_LIMIT = 5;
function toQuickSearchItem(result) {
    if (result.type === 'artist') {
        return {
            type: 'artist',
            deezerId: result.item.deezerId,
            coverUrl: result.item.imageUrl,
            title: result.item.name,
            artist: null,
            albumsCount: result.item.albumsCount,
        };
    }
    return {
        type: result.type,
        deezerId: result.item.deezerId,
        coverUrl: result.item.coverUrl,
        title: result.item.title,
        artist: result.item.artist.name,
    };
}
let CatalogQuickSearchService = class CatalogQuickSearchService {
    catalog;
    constructor(catalog) {
        this.catalog = catalog;
    }
    async quickSearch(query) {
        const [artists, albums, tracks] = await Promise.all([
            this.catalog.search(query, 'artist', PER_TYPE_LIMIT, null),
            this.catalog.search(query, 'album', PER_TYPE_LIMIT, null),
            this.catalog.search(query, 'track', PER_TYPE_LIMIT, null),
        ]);
        const lists = [artists.items, albums.items, tracks.items];
        const interleaved = [];
        for (let i = 0; i < PER_TYPE_LIMIT; i++) {
            for (const list of lists) {
                if (list[i])
                    interleaved.push(list[i]);
            }
        }
        return interleaved.slice(0, RESULT_LIMIT).map(toQuickSearchItem);
    }
};
CatalogQuickSearchService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CatalogService])
], CatalogQuickSearchService);
export { CatalogQuickSearchService };
//# sourceMappingURL=catalog-quick-search.service.js.map