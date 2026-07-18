import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ArtistModel = runtime.Types.Result.DefaultSelection<Prisma.$ArtistPayload>;
export type AggregateArtist = {
    _count: ArtistCountAggregateOutputType | null;
    _avg: ArtistAvgAggregateOutputType | null;
    _sum: ArtistSumAggregateOutputType | null;
    _min: ArtistMinAggregateOutputType | null;
    _max: ArtistMaxAggregateOutputType | null;
};
export type ArtistAvgAggregateOutputType = {
    reviewCount: number | null;
};
export type ArtistSumAggregateOutputType = {
    reviewCount: number | null;
};
export type ArtistMinAggregateOutputType = {
    id: string | null;
    deezerId: string | null;
    mbid: string | null;
    name: string | null;
    imageUrl: string | null;
    lastSyncedAt: Date | null;
    catalogSyncedAt: Date | null;
    reviewCount: number | null;
};
export type ArtistMaxAggregateOutputType = {
    id: string | null;
    deezerId: string | null;
    mbid: string | null;
    name: string | null;
    imageUrl: string | null;
    lastSyncedAt: Date | null;
    catalogSyncedAt: Date | null;
    reviewCount: number | null;
};
export type ArtistCountAggregateOutputType = {
    id: number;
    deezerId: number;
    mbid: number;
    name: number;
    imageUrl: number;
    lastSyncedAt: number;
    catalogSyncedAt: number;
    reviewCount: number;
    _all: number;
};
export type ArtistAvgAggregateInputType = {
    reviewCount?: true;
};
export type ArtistSumAggregateInputType = {
    reviewCount?: true;
};
export type ArtistMinAggregateInputType = {
    id?: true;
    deezerId?: true;
    mbid?: true;
    name?: true;
    imageUrl?: true;
    lastSyncedAt?: true;
    catalogSyncedAt?: true;
    reviewCount?: true;
};
export type ArtistMaxAggregateInputType = {
    id?: true;
    deezerId?: true;
    mbid?: true;
    name?: true;
    imageUrl?: true;
    lastSyncedAt?: true;
    catalogSyncedAt?: true;
    reviewCount?: true;
};
export type ArtistCountAggregateInputType = {
    id?: true;
    deezerId?: true;
    mbid?: true;
    name?: true;
    imageUrl?: true;
    lastSyncedAt?: true;
    catalogSyncedAt?: true;
    reviewCount?: true;
    _all?: true;
};
export type ArtistAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ArtistWhereInput;
    orderBy?: Prisma.ArtistOrderByWithRelationInput | Prisma.ArtistOrderByWithRelationInput[];
    cursor?: Prisma.ArtistWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ArtistCountAggregateInputType;
    _avg?: ArtistAvgAggregateInputType;
    _sum?: ArtistSumAggregateInputType;
    _min?: ArtistMinAggregateInputType;
    _max?: ArtistMaxAggregateInputType;
};
export type GetArtistAggregateType<T extends ArtistAggregateArgs> = {
    [P in keyof T & keyof AggregateArtist]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateArtist[P]> : Prisma.GetScalarType<T[P], AggregateArtist[P]>;
};
export type ArtistGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ArtistWhereInput;
    orderBy?: Prisma.ArtistOrderByWithAggregationInput | Prisma.ArtistOrderByWithAggregationInput[];
    by: Prisma.ArtistScalarFieldEnum[] | Prisma.ArtistScalarFieldEnum;
    having?: Prisma.ArtistScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ArtistCountAggregateInputType | true;
    _avg?: ArtistAvgAggregateInputType;
    _sum?: ArtistSumAggregateInputType;
    _min?: ArtistMinAggregateInputType;
    _max?: ArtistMaxAggregateInputType;
};
export type ArtistGroupByOutputType = {
    id: string;
    deezerId: string;
    mbid: string | null;
    name: string;
    imageUrl: string | null;
    lastSyncedAt: Date;
    catalogSyncedAt: Date | null;
    reviewCount: number;
    _count: ArtistCountAggregateOutputType | null;
    _avg: ArtistAvgAggregateOutputType | null;
    _sum: ArtistSumAggregateOutputType | null;
    _min: ArtistMinAggregateOutputType | null;
    _max: ArtistMaxAggregateOutputType | null;
};
export type GetArtistGroupByPayload<T extends ArtistGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ArtistGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ArtistGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ArtistGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ArtistGroupByOutputType[P]>;
}>>;
export type ArtistWhereInput = {
    AND?: Prisma.ArtistWhereInput | Prisma.ArtistWhereInput[];
    OR?: Prisma.ArtistWhereInput[];
    NOT?: Prisma.ArtistWhereInput | Prisma.ArtistWhereInput[];
    id?: Prisma.StringFilter<"Artist"> | string;
    deezerId?: Prisma.StringFilter<"Artist"> | string;
    mbid?: Prisma.StringNullableFilter<"Artist"> | string | null;
    name?: Prisma.StringFilter<"Artist"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Artist"> | string | null;
    lastSyncedAt?: Prisma.DateTimeFilter<"Artist"> | Date | string;
    catalogSyncedAt?: Prisma.DateTimeNullableFilter<"Artist"> | Date | string | null;
    reviewCount?: Prisma.IntFilter<"Artist"> | number;
    albums?: Prisma.AlbumListRelationFilter;
    tracks?: Prisma.TrackListRelationFilter;
};
export type ArtistOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    catalogSyncedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    albums?: Prisma.AlbumOrderByRelationAggregateInput;
    tracks?: Prisma.TrackOrderByRelationAggregateInput;
};
export type ArtistWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    deezerId?: string;
    mbid?: string;
    AND?: Prisma.ArtistWhereInput | Prisma.ArtistWhereInput[];
    OR?: Prisma.ArtistWhereInput[];
    NOT?: Prisma.ArtistWhereInput | Prisma.ArtistWhereInput[];
    name?: Prisma.StringFilter<"Artist"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Artist"> | string | null;
    lastSyncedAt?: Prisma.DateTimeFilter<"Artist"> | Date | string;
    catalogSyncedAt?: Prisma.DateTimeNullableFilter<"Artist"> | Date | string | null;
    reviewCount?: Prisma.IntFilter<"Artist"> | number;
    albums?: Prisma.AlbumListRelationFilter;
    tracks?: Prisma.TrackListRelationFilter;
}, "id" | "deezerId" | "mbid">;
export type ArtistOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    catalogSyncedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    _count?: Prisma.ArtistCountOrderByAggregateInput;
    _avg?: Prisma.ArtistAvgOrderByAggregateInput;
    _max?: Prisma.ArtistMaxOrderByAggregateInput;
    _min?: Prisma.ArtistMinOrderByAggregateInput;
    _sum?: Prisma.ArtistSumOrderByAggregateInput;
};
export type ArtistScalarWhereWithAggregatesInput = {
    AND?: Prisma.ArtistScalarWhereWithAggregatesInput | Prisma.ArtistScalarWhereWithAggregatesInput[];
    OR?: Prisma.ArtistScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ArtistScalarWhereWithAggregatesInput | Prisma.ArtistScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Artist"> | string;
    deezerId?: Prisma.StringWithAggregatesFilter<"Artist"> | string;
    mbid?: Prisma.StringNullableWithAggregatesFilter<"Artist"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"Artist"> | string;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"Artist"> | string | null;
    lastSyncedAt?: Prisma.DateTimeWithAggregatesFilter<"Artist"> | Date | string;
    catalogSyncedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Artist"> | Date | string | null;
    reviewCount?: Prisma.IntWithAggregatesFilter<"Artist"> | number;
};
export type ArtistCreateInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    name: string;
    imageUrl?: string | null;
    lastSyncedAt: Date | string;
    catalogSyncedAt?: Date | string | null;
    reviewCount?: number;
    albums?: Prisma.AlbumCreateNestedManyWithoutArtistInput;
    tracks?: Prisma.TrackCreateNestedManyWithoutArtistInput;
};
export type ArtistUncheckedCreateInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    name: string;
    imageUrl?: string | null;
    lastSyncedAt: Date | string;
    catalogSyncedAt?: Date | string | null;
    reviewCount?: number;
    albums?: Prisma.AlbumUncheckedCreateNestedManyWithoutArtistInput;
    tracks?: Prisma.TrackUncheckedCreateNestedManyWithoutArtistInput;
};
export type ArtistUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    catalogSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    albums?: Prisma.AlbumUpdateManyWithoutArtistNestedInput;
    tracks?: Prisma.TrackUpdateManyWithoutArtistNestedInput;
};
export type ArtistUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    catalogSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    albums?: Prisma.AlbumUncheckedUpdateManyWithoutArtistNestedInput;
    tracks?: Prisma.TrackUncheckedUpdateManyWithoutArtistNestedInput;
};
export type ArtistCreateManyInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    name: string;
    imageUrl?: string | null;
    lastSyncedAt: Date | string;
    catalogSyncedAt?: Date | string | null;
    reviewCount?: number;
};
export type ArtistUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    catalogSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ArtistUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    catalogSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ArtistCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    catalogSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
};
export type ArtistAvgOrderByAggregateInput = {
    reviewCount?: Prisma.SortOrder;
};
export type ArtistMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    catalogSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
};
export type ArtistMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    catalogSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
};
export type ArtistSumOrderByAggregateInput = {
    reviewCount?: Prisma.SortOrder;
};
export type ArtistScalarRelationFilter = {
    is?: Prisma.ArtistWhereInput;
    isNot?: Prisma.ArtistWhereInput;
};
export type ArtistCreateNestedOneWithoutAlbumsInput = {
    create?: Prisma.XOR<Prisma.ArtistCreateWithoutAlbumsInput, Prisma.ArtistUncheckedCreateWithoutAlbumsInput>;
    connectOrCreate?: Prisma.ArtistCreateOrConnectWithoutAlbumsInput;
    connect?: Prisma.ArtistWhereUniqueInput;
};
export type ArtistUpdateOneRequiredWithoutAlbumsNestedInput = {
    create?: Prisma.XOR<Prisma.ArtistCreateWithoutAlbumsInput, Prisma.ArtistUncheckedCreateWithoutAlbumsInput>;
    connectOrCreate?: Prisma.ArtistCreateOrConnectWithoutAlbumsInput;
    upsert?: Prisma.ArtistUpsertWithoutAlbumsInput;
    connect?: Prisma.ArtistWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ArtistUpdateToOneWithWhereWithoutAlbumsInput, Prisma.ArtistUpdateWithoutAlbumsInput>, Prisma.ArtistUncheckedUpdateWithoutAlbumsInput>;
};
export type ArtistCreateNestedOneWithoutTracksInput = {
    create?: Prisma.XOR<Prisma.ArtistCreateWithoutTracksInput, Prisma.ArtistUncheckedCreateWithoutTracksInput>;
    connectOrCreate?: Prisma.ArtistCreateOrConnectWithoutTracksInput;
    connect?: Prisma.ArtistWhereUniqueInput;
};
export type ArtistUpdateOneRequiredWithoutTracksNestedInput = {
    create?: Prisma.XOR<Prisma.ArtistCreateWithoutTracksInput, Prisma.ArtistUncheckedCreateWithoutTracksInput>;
    connectOrCreate?: Prisma.ArtistCreateOrConnectWithoutTracksInput;
    upsert?: Prisma.ArtistUpsertWithoutTracksInput;
    connect?: Prisma.ArtistWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ArtistUpdateToOneWithWhereWithoutTracksInput, Prisma.ArtistUpdateWithoutTracksInput>, Prisma.ArtistUncheckedUpdateWithoutTracksInput>;
};
export type ArtistCreateWithoutAlbumsInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    name: string;
    imageUrl?: string | null;
    lastSyncedAt: Date | string;
    catalogSyncedAt?: Date | string | null;
    reviewCount?: number;
    tracks?: Prisma.TrackCreateNestedManyWithoutArtistInput;
};
export type ArtistUncheckedCreateWithoutAlbumsInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    name: string;
    imageUrl?: string | null;
    lastSyncedAt: Date | string;
    catalogSyncedAt?: Date | string | null;
    reviewCount?: number;
    tracks?: Prisma.TrackUncheckedCreateNestedManyWithoutArtistInput;
};
export type ArtistCreateOrConnectWithoutAlbumsInput = {
    where: Prisma.ArtistWhereUniqueInput;
    create: Prisma.XOR<Prisma.ArtistCreateWithoutAlbumsInput, Prisma.ArtistUncheckedCreateWithoutAlbumsInput>;
};
export type ArtistUpsertWithoutAlbumsInput = {
    update: Prisma.XOR<Prisma.ArtistUpdateWithoutAlbumsInput, Prisma.ArtistUncheckedUpdateWithoutAlbumsInput>;
    create: Prisma.XOR<Prisma.ArtistCreateWithoutAlbumsInput, Prisma.ArtistUncheckedCreateWithoutAlbumsInput>;
    where?: Prisma.ArtistWhereInput;
};
export type ArtistUpdateToOneWithWhereWithoutAlbumsInput = {
    where?: Prisma.ArtistWhereInput;
    data: Prisma.XOR<Prisma.ArtistUpdateWithoutAlbumsInput, Prisma.ArtistUncheckedUpdateWithoutAlbumsInput>;
};
export type ArtistUpdateWithoutAlbumsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    catalogSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    tracks?: Prisma.TrackUpdateManyWithoutArtistNestedInput;
};
export type ArtistUncheckedUpdateWithoutAlbumsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    catalogSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    tracks?: Prisma.TrackUncheckedUpdateManyWithoutArtistNestedInput;
};
export type ArtistCreateWithoutTracksInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    name: string;
    imageUrl?: string | null;
    lastSyncedAt: Date | string;
    catalogSyncedAt?: Date | string | null;
    reviewCount?: number;
    albums?: Prisma.AlbumCreateNestedManyWithoutArtistInput;
};
export type ArtistUncheckedCreateWithoutTracksInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    name: string;
    imageUrl?: string | null;
    lastSyncedAt: Date | string;
    catalogSyncedAt?: Date | string | null;
    reviewCount?: number;
    albums?: Prisma.AlbumUncheckedCreateNestedManyWithoutArtistInput;
};
export type ArtistCreateOrConnectWithoutTracksInput = {
    where: Prisma.ArtistWhereUniqueInput;
    create: Prisma.XOR<Prisma.ArtistCreateWithoutTracksInput, Prisma.ArtistUncheckedCreateWithoutTracksInput>;
};
export type ArtistUpsertWithoutTracksInput = {
    update: Prisma.XOR<Prisma.ArtistUpdateWithoutTracksInput, Prisma.ArtistUncheckedUpdateWithoutTracksInput>;
    create: Prisma.XOR<Prisma.ArtistCreateWithoutTracksInput, Prisma.ArtistUncheckedCreateWithoutTracksInput>;
    where?: Prisma.ArtistWhereInput;
};
export type ArtistUpdateToOneWithWhereWithoutTracksInput = {
    where?: Prisma.ArtistWhereInput;
    data: Prisma.XOR<Prisma.ArtistUpdateWithoutTracksInput, Prisma.ArtistUncheckedUpdateWithoutTracksInput>;
};
export type ArtistUpdateWithoutTracksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    catalogSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    albums?: Prisma.AlbumUpdateManyWithoutArtistNestedInput;
};
export type ArtistUncheckedUpdateWithoutTracksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    catalogSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    albums?: Prisma.AlbumUncheckedUpdateManyWithoutArtistNestedInput;
};
export type ArtistCountOutputType = {
    albums: number;
    tracks: number;
};
export type ArtistCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    albums?: boolean | ArtistCountOutputTypeCountAlbumsArgs;
    tracks?: boolean | ArtistCountOutputTypeCountTracksArgs;
};
export type ArtistCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistCountOutputTypeSelect<ExtArgs> | null;
};
export type ArtistCountOutputTypeCountAlbumsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AlbumWhereInput;
};
export type ArtistCountOutputTypeCountTracksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackWhereInput;
};
export type ArtistSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    lastSyncedAt?: boolean;
    catalogSyncedAt?: boolean;
    reviewCount?: boolean;
    albums?: boolean | Prisma.Artist$albumsArgs<ExtArgs>;
    tracks?: boolean | Prisma.Artist$tracksArgs<ExtArgs>;
    _count?: boolean | Prisma.ArtistCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["artist"]>;
export type ArtistSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    lastSyncedAt?: boolean;
    catalogSyncedAt?: boolean;
    reviewCount?: boolean;
}, ExtArgs["result"]["artist"]>;
export type ArtistSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    lastSyncedAt?: boolean;
    catalogSyncedAt?: boolean;
    reviewCount?: boolean;
}, ExtArgs["result"]["artist"]>;
export type ArtistSelectScalar = {
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    lastSyncedAt?: boolean;
    catalogSyncedAt?: boolean;
    reviewCount?: boolean;
};
export type ArtistOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "deezerId" | "mbid" | "name" | "imageUrl" | "lastSyncedAt" | "catalogSyncedAt" | "reviewCount", ExtArgs["result"]["artist"]>;
export type ArtistInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    albums?: boolean | Prisma.Artist$albumsArgs<ExtArgs>;
    tracks?: boolean | Prisma.Artist$tracksArgs<ExtArgs>;
    _count?: boolean | Prisma.ArtistCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ArtistIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ArtistIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ArtistPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Artist";
    objects: {
        albums: Prisma.$AlbumPayload<ExtArgs>[];
        tracks: Prisma.$TrackPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        deezerId: string;
        mbid: string | null;
        name: string;
        imageUrl: string | null;
        lastSyncedAt: Date;
        catalogSyncedAt: Date | null;
        reviewCount: number;
    }, ExtArgs["result"]["artist"]>;
    composites: {};
};
export type ArtistGetPayload<S extends boolean | null | undefined | ArtistDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ArtistPayload, S>;
export type ArtistCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ArtistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ArtistCountAggregateInputType | true;
};
export interface ArtistDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Artist'];
        meta: {
            name: 'Artist';
        };
    };
    findUnique<T extends ArtistFindUniqueArgs>(args: Prisma.SelectSubset<T, ArtistFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ArtistClient<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ArtistFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ArtistFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ArtistClient<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ArtistFindFirstArgs>(args?: Prisma.SelectSubset<T, ArtistFindFirstArgs<ExtArgs>>): Prisma.Prisma__ArtistClient<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ArtistFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ArtistFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ArtistClient<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ArtistFindManyArgs>(args?: Prisma.SelectSubset<T, ArtistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ArtistCreateArgs>(args: Prisma.SelectSubset<T, ArtistCreateArgs<ExtArgs>>): Prisma.Prisma__ArtistClient<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ArtistCreateManyArgs>(args?: Prisma.SelectSubset<T, ArtistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ArtistCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ArtistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ArtistDeleteArgs>(args: Prisma.SelectSubset<T, ArtistDeleteArgs<ExtArgs>>): Prisma.Prisma__ArtistClient<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ArtistUpdateArgs>(args: Prisma.SelectSubset<T, ArtistUpdateArgs<ExtArgs>>): Prisma.Prisma__ArtistClient<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ArtistDeleteManyArgs>(args?: Prisma.SelectSubset<T, ArtistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ArtistUpdateManyArgs>(args: Prisma.SelectSubset<T, ArtistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ArtistUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ArtistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ArtistUpsertArgs>(args: Prisma.SelectSubset<T, ArtistUpsertArgs<ExtArgs>>): Prisma.Prisma__ArtistClient<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ArtistCountArgs>(args?: Prisma.Subset<T, ArtistCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ArtistCountAggregateOutputType> : number>;
    aggregate<T extends ArtistAggregateArgs>(args: Prisma.Subset<T, ArtistAggregateArgs>): Prisma.PrismaPromise<GetArtistAggregateType<T>>;
    groupBy<T extends ArtistGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ArtistGroupByArgs['orderBy'];
    } : {
        orderBy?: ArtistGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ArtistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ArtistFieldRefs;
}
export interface Prisma__ArtistClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    albums<T extends Prisma.Artist$albumsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Artist$albumsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    tracks<T extends Prisma.Artist$tracksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Artist$tracksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ArtistFieldRefs {
    readonly id: Prisma.FieldRef<"Artist", 'String'>;
    readonly deezerId: Prisma.FieldRef<"Artist", 'String'>;
    readonly mbid: Prisma.FieldRef<"Artist", 'String'>;
    readonly name: Prisma.FieldRef<"Artist", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Artist", 'String'>;
    readonly lastSyncedAt: Prisma.FieldRef<"Artist", 'DateTime'>;
    readonly catalogSyncedAt: Prisma.FieldRef<"Artist", 'DateTime'>;
    readonly reviewCount: Prisma.FieldRef<"Artist", 'Int'>;
}
export type ArtistFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelect<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    include?: Prisma.ArtistInclude<ExtArgs> | null;
    where: Prisma.ArtistWhereUniqueInput;
};
export type ArtistFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelect<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    include?: Prisma.ArtistInclude<ExtArgs> | null;
    where: Prisma.ArtistWhereUniqueInput;
};
export type ArtistFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelect<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    include?: Prisma.ArtistInclude<ExtArgs> | null;
    where?: Prisma.ArtistWhereInput;
    orderBy?: Prisma.ArtistOrderByWithRelationInput | Prisma.ArtistOrderByWithRelationInput[];
    cursor?: Prisma.ArtistWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ArtistScalarFieldEnum | Prisma.ArtistScalarFieldEnum[];
};
export type ArtistFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelect<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    include?: Prisma.ArtistInclude<ExtArgs> | null;
    where?: Prisma.ArtistWhereInput;
    orderBy?: Prisma.ArtistOrderByWithRelationInput | Prisma.ArtistOrderByWithRelationInput[];
    cursor?: Prisma.ArtistWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ArtistScalarFieldEnum | Prisma.ArtistScalarFieldEnum[];
};
export type ArtistFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelect<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    include?: Prisma.ArtistInclude<ExtArgs> | null;
    where?: Prisma.ArtistWhereInput;
    orderBy?: Prisma.ArtistOrderByWithRelationInput | Prisma.ArtistOrderByWithRelationInput[];
    cursor?: Prisma.ArtistWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ArtistScalarFieldEnum | Prisma.ArtistScalarFieldEnum[];
};
export type ArtistCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelect<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    include?: Prisma.ArtistInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ArtistCreateInput, Prisma.ArtistUncheckedCreateInput>;
};
export type ArtistCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ArtistCreateManyInput | Prisma.ArtistCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ArtistCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    data: Prisma.ArtistCreateManyInput | Prisma.ArtistCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ArtistUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelect<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    include?: Prisma.ArtistInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ArtistUpdateInput, Prisma.ArtistUncheckedUpdateInput>;
    where: Prisma.ArtistWhereUniqueInput;
};
export type ArtistUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ArtistUpdateManyMutationInput, Prisma.ArtistUncheckedUpdateManyInput>;
    where?: Prisma.ArtistWhereInput;
    limit?: number;
};
export type ArtistUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ArtistUpdateManyMutationInput, Prisma.ArtistUncheckedUpdateManyInput>;
    where?: Prisma.ArtistWhereInput;
    limit?: number;
};
export type ArtistUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelect<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    include?: Prisma.ArtistInclude<ExtArgs> | null;
    where: Prisma.ArtistWhereUniqueInput;
    create: Prisma.XOR<Prisma.ArtistCreateInput, Prisma.ArtistUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ArtistUpdateInput, Prisma.ArtistUncheckedUpdateInput>;
};
export type ArtistDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelect<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    include?: Prisma.ArtistInclude<ExtArgs> | null;
    where: Prisma.ArtistWhereUniqueInput;
};
export type ArtistDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ArtistWhereInput;
    limit?: number;
};
export type Artist$albumsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelect<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    include?: Prisma.AlbumInclude<ExtArgs> | null;
    where?: Prisma.AlbumWhereInput;
    orderBy?: Prisma.AlbumOrderByWithRelationInput | Prisma.AlbumOrderByWithRelationInput[];
    cursor?: Prisma.AlbumWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AlbumScalarFieldEnum | Prisma.AlbumScalarFieldEnum[];
};
export type Artist$tracksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackSelect<ExtArgs> | null;
    omit?: Prisma.TrackOmit<ExtArgs> | null;
    include?: Prisma.TrackInclude<ExtArgs> | null;
    where?: Prisma.TrackWhereInput;
    orderBy?: Prisma.TrackOrderByWithRelationInput | Prisma.TrackOrderByWithRelationInput[];
    cursor?: Prisma.TrackWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TrackScalarFieldEnum | Prisma.TrackScalarFieldEnum[];
};
export type ArtistDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArtistSelect<ExtArgs> | null;
    omit?: Prisma.ArtistOmit<ExtArgs> | null;
    include?: Prisma.ArtistInclude<ExtArgs> | null;
};
