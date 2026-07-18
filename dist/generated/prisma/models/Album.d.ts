import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AlbumModel = runtime.Types.Result.DefaultSelection<Prisma.$AlbumPayload>;
export type AggregateAlbum = {
    _count: AlbumCountAggregateOutputType | null;
    _avg: AlbumAvgAggregateOutputType | null;
    _sum: AlbumSumAggregateOutputType | null;
    _min: AlbumMinAggregateOutputType | null;
    _max: AlbumMaxAggregateOutputType | null;
};
export type AlbumAvgAggregateOutputType = {
    reviewCount: number | null;
};
export type AlbumSumAggregateOutputType = {
    reviewCount: number | null;
};
export type AlbumMinAggregateOutputType = {
    id: string | null;
    deezerId: string | null;
    mbid: string | null;
    title: string | null;
    artistId: string | null;
    coverUrl: string | null;
    releaseDate: Date | null;
    genreLabel: string | null;
    lastSyncedAt: Date | null;
    reviewCount: number | null;
};
export type AlbumMaxAggregateOutputType = {
    id: string | null;
    deezerId: string | null;
    mbid: string | null;
    title: string | null;
    artistId: string | null;
    coverUrl: string | null;
    releaseDate: Date | null;
    genreLabel: string | null;
    lastSyncedAt: Date | null;
    reviewCount: number | null;
};
export type AlbumCountAggregateOutputType = {
    id: number;
    deezerId: number;
    mbid: number;
    title: number;
    artistId: number;
    coverUrl: number;
    releaseDate: number;
    genreLabel: number;
    lastSyncedAt: number;
    reviewCount: number;
    _all: number;
};
export type AlbumAvgAggregateInputType = {
    reviewCount?: true;
};
export type AlbumSumAggregateInputType = {
    reviewCount?: true;
};
export type AlbumMinAggregateInputType = {
    id?: true;
    deezerId?: true;
    mbid?: true;
    title?: true;
    artistId?: true;
    coverUrl?: true;
    releaseDate?: true;
    genreLabel?: true;
    lastSyncedAt?: true;
    reviewCount?: true;
};
export type AlbumMaxAggregateInputType = {
    id?: true;
    deezerId?: true;
    mbid?: true;
    title?: true;
    artistId?: true;
    coverUrl?: true;
    releaseDate?: true;
    genreLabel?: true;
    lastSyncedAt?: true;
    reviewCount?: true;
};
export type AlbumCountAggregateInputType = {
    id?: true;
    deezerId?: true;
    mbid?: true;
    title?: true;
    artistId?: true;
    coverUrl?: true;
    releaseDate?: true;
    genreLabel?: true;
    lastSyncedAt?: true;
    reviewCount?: true;
    _all?: true;
};
export type AlbumAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AlbumWhereInput;
    orderBy?: Prisma.AlbumOrderByWithRelationInput | Prisma.AlbumOrderByWithRelationInput[];
    cursor?: Prisma.AlbumWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AlbumCountAggregateInputType;
    _avg?: AlbumAvgAggregateInputType;
    _sum?: AlbumSumAggregateInputType;
    _min?: AlbumMinAggregateInputType;
    _max?: AlbumMaxAggregateInputType;
};
export type GetAlbumAggregateType<T extends AlbumAggregateArgs> = {
    [P in keyof T & keyof AggregateAlbum]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAlbum[P]> : Prisma.GetScalarType<T[P], AggregateAlbum[P]>;
};
export type AlbumGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AlbumWhereInput;
    orderBy?: Prisma.AlbumOrderByWithAggregationInput | Prisma.AlbumOrderByWithAggregationInput[];
    by: Prisma.AlbumScalarFieldEnum[] | Prisma.AlbumScalarFieldEnum;
    having?: Prisma.AlbumScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AlbumCountAggregateInputType | true;
    _avg?: AlbumAvgAggregateInputType;
    _sum?: AlbumSumAggregateInputType;
    _min?: AlbumMinAggregateInputType;
    _max?: AlbumMaxAggregateInputType;
};
export type AlbumGroupByOutputType = {
    id: string;
    deezerId: string;
    mbid: string | null;
    title: string;
    artistId: string;
    coverUrl: string | null;
    releaseDate: Date | null;
    genreLabel: string | null;
    lastSyncedAt: Date;
    reviewCount: number;
    _count: AlbumCountAggregateOutputType | null;
    _avg: AlbumAvgAggregateOutputType | null;
    _sum: AlbumSumAggregateOutputType | null;
    _min: AlbumMinAggregateOutputType | null;
    _max: AlbumMaxAggregateOutputType | null;
};
export type GetAlbumGroupByPayload<T extends AlbumGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AlbumGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AlbumGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AlbumGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AlbumGroupByOutputType[P]>;
}>>;
export type AlbumWhereInput = {
    AND?: Prisma.AlbumWhereInput | Prisma.AlbumWhereInput[];
    OR?: Prisma.AlbumWhereInput[];
    NOT?: Prisma.AlbumWhereInput | Prisma.AlbumWhereInput[];
    id?: Prisma.StringFilter<"Album"> | string;
    deezerId?: Prisma.StringFilter<"Album"> | string;
    mbid?: Prisma.StringNullableFilter<"Album"> | string | null;
    title?: Prisma.StringFilter<"Album"> | string;
    artistId?: Prisma.StringFilter<"Album"> | string;
    coverUrl?: Prisma.StringNullableFilter<"Album"> | string | null;
    releaseDate?: Prisma.DateTimeNullableFilter<"Album"> | Date | string | null;
    genreLabel?: Prisma.StringNullableFilter<"Album"> | string | null;
    lastSyncedAt?: Prisma.DateTimeFilter<"Album"> | Date | string;
    reviewCount?: Prisma.IntFilter<"Album"> | number;
    artist?: Prisma.XOR<Prisma.ArtistScalarRelationFilter, Prisma.ArtistWhereInput>;
    tracks?: Prisma.TrackListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
};
export type AlbumOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    coverUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    releaseDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    genreLabel?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    artist?: Prisma.ArtistOrderByWithRelationInput;
    tracks?: Prisma.TrackOrderByRelationAggregateInput;
    reviews?: Prisma.ReviewOrderByRelationAggregateInput;
};
export type AlbumWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    deezerId?: string;
    mbid?: string;
    AND?: Prisma.AlbumWhereInput | Prisma.AlbumWhereInput[];
    OR?: Prisma.AlbumWhereInput[];
    NOT?: Prisma.AlbumWhereInput | Prisma.AlbumWhereInput[];
    title?: Prisma.StringFilter<"Album"> | string;
    artistId?: Prisma.StringFilter<"Album"> | string;
    coverUrl?: Prisma.StringNullableFilter<"Album"> | string | null;
    releaseDate?: Prisma.DateTimeNullableFilter<"Album"> | Date | string | null;
    genreLabel?: Prisma.StringNullableFilter<"Album"> | string | null;
    lastSyncedAt?: Prisma.DateTimeFilter<"Album"> | Date | string;
    reviewCount?: Prisma.IntFilter<"Album"> | number;
    artist?: Prisma.XOR<Prisma.ArtistScalarRelationFilter, Prisma.ArtistWhereInput>;
    tracks?: Prisma.TrackListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
}, "id" | "deezerId" | "mbid">;
export type AlbumOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    coverUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    releaseDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    genreLabel?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    _count?: Prisma.AlbumCountOrderByAggregateInput;
    _avg?: Prisma.AlbumAvgOrderByAggregateInput;
    _max?: Prisma.AlbumMaxOrderByAggregateInput;
    _min?: Prisma.AlbumMinOrderByAggregateInput;
    _sum?: Prisma.AlbumSumOrderByAggregateInput;
};
export type AlbumScalarWhereWithAggregatesInput = {
    AND?: Prisma.AlbumScalarWhereWithAggregatesInput | Prisma.AlbumScalarWhereWithAggregatesInput[];
    OR?: Prisma.AlbumScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AlbumScalarWhereWithAggregatesInput | Prisma.AlbumScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Album"> | string;
    deezerId?: Prisma.StringWithAggregatesFilter<"Album"> | string;
    mbid?: Prisma.StringNullableWithAggregatesFilter<"Album"> | string | null;
    title?: Prisma.StringWithAggregatesFilter<"Album"> | string;
    artistId?: Prisma.StringWithAggregatesFilter<"Album"> | string;
    coverUrl?: Prisma.StringNullableWithAggregatesFilter<"Album"> | string | null;
    releaseDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Album"> | Date | string | null;
    genreLabel?: Prisma.StringNullableWithAggregatesFilter<"Album"> | string | null;
    lastSyncedAt?: Prisma.DateTimeWithAggregatesFilter<"Album"> | Date | string;
    reviewCount?: Prisma.IntWithAggregatesFilter<"Album"> | number;
};
export type AlbumCreateInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    coverUrl?: string | null;
    releaseDate?: Date | string | null;
    genreLabel?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    artist: Prisma.ArtistCreateNestedOneWithoutAlbumsInput;
    tracks?: Prisma.TrackCreateNestedManyWithoutAlbumInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutAlbumInput;
};
export type AlbumUncheckedCreateInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    artistId: string;
    coverUrl?: string | null;
    releaseDate?: Date | string | null;
    genreLabel?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    tracks?: Prisma.TrackUncheckedCreateNestedManyWithoutAlbumInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutAlbumInput;
};
export type AlbumUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    genreLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    artist?: Prisma.ArtistUpdateOneRequiredWithoutAlbumsNestedInput;
    tracks?: Prisma.TrackUpdateManyWithoutAlbumNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutAlbumNestedInput;
};
export type AlbumUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    genreLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    tracks?: Prisma.TrackUncheckedUpdateManyWithoutAlbumNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutAlbumNestedInput;
};
export type AlbumCreateManyInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    artistId: string;
    coverUrl?: string | null;
    releaseDate?: Date | string | null;
    genreLabel?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
};
export type AlbumUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    genreLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AlbumUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    genreLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AlbumListRelationFilter = {
    every?: Prisma.AlbumWhereInput;
    some?: Prisma.AlbumWhereInput;
    none?: Prisma.AlbumWhereInput;
};
export type AlbumOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AlbumCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    coverUrl?: Prisma.SortOrder;
    releaseDate?: Prisma.SortOrder;
    genreLabel?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
};
export type AlbumAvgOrderByAggregateInput = {
    reviewCount?: Prisma.SortOrder;
};
export type AlbumMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    coverUrl?: Prisma.SortOrder;
    releaseDate?: Prisma.SortOrder;
    genreLabel?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
};
export type AlbumMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    coverUrl?: Prisma.SortOrder;
    releaseDate?: Prisma.SortOrder;
    genreLabel?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
};
export type AlbumSumOrderByAggregateInput = {
    reviewCount?: Prisma.SortOrder;
};
export type AlbumNullableScalarRelationFilter = {
    is?: Prisma.AlbumWhereInput | null;
    isNot?: Prisma.AlbumWhereInput | null;
};
export type AlbumCreateNestedManyWithoutArtistInput = {
    create?: Prisma.XOR<Prisma.AlbumCreateWithoutArtistInput, Prisma.AlbumUncheckedCreateWithoutArtistInput> | Prisma.AlbumCreateWithoutArtistInput[] | Prisma.AlbumUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.AlbumCreateOrConnectWithoutArtistInput | Prisma.AlbumCreateOrConnectWithoutArtistInput[];
    createMany?: Prisma.AlbumCreateManyArtistInputEnvelope;
    connect?: Prisma.AlbumWhereUniqueInput | Prisma.AlbumWhereUniqueInput[];
};
export type AlbumUncheckedCreateNestedManyWithoutArtistInput = {
    create?: Prisma.XOR<Prisma.AlbumCreateWithoutArtistInput, Prisma.AlbumUncheckedCreateWithoutArtistInput> | Prisma.AlbumCreateWithoutArtistInput[] | Prisma.AlbumUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.AlbumCreateOrConnectWithoutArtistInput | Prisma.AlbumCreateOrConnectWithoutArtistInput[];
    createMany?: Prisma.AlbumCreateManyArtistInputEnvelope;
    connect?: Prisma.AlbumWhereUniqueInput | Prisma.AlbumWhereUniqueInput[];
};
export type AlbumUpdateManyWithoutArtistNestedInput = {
    create?: Prisma.XOR<Prisma.AlbumCreateWithoutArtistInput, Prisma.AlbumUncheckedCreateWithoutArtistInput> | Prisma.AlbumCreateWithoutArtistInput[] | Prisma.AlbumUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.AlbumCreateOrConnectWithoutArtistInput | Prisma.AlbumCreateOrConnectWithoutArtistInput[];
    upsert?: Prisma.AlbumUpsertWithWhereUniqueWithoutArtistInput | Prisma.AlbumUpsertWithWhereUniqueWithoutArtistInput[];
    createMany?: Prisma.AlbumCreateManyArtistInputEnvelope;
    set?: Prisma.AlbumWhereUniqueInput | Prisma.AlbumWhereUniqueInput[];
    disconnect?: Prisma.AlbumWhereUniqueInput | Prisma.AlbumWhereUniqueInput[];
    delete?: Prisma.AlbumWhereUniqueInput | Prisma.AlbumWhereUniqueInput[];
    connect?: Prisma.AlbumWhereUniqueInput | Prisma.AlbumWhereUniqueInput[];
    update?: Prisma.AlbumUpdateWithWhereUniqueWithoutArtistInput | Prisma.AlbumUpdateWithWhereUniqueWithoutArtistInput[];
    updateMany?: Prisma.AlbumUpdateManyWithWhereWithoutArtistInput | Prisma.AlbumUpdateManyWithWhereWithoutArtistInput[];
    deleteMany?: Prisma.AlbumScalarWhereInput | Prisma.AlbumScalarWhereInput[];
};
export type AlbumUncheckedUpdateManyWithoutArtistNestedInput = {
    create?: Prisma.XOR<Prisma.AlbumCreateWithoutArtistInput, Prisma.AlbumUncheckedCreateWithoutArtistInput> | Prisma.AlbumCreateWithoutArtistInput[] | Prisma.AlbumUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.AlbumCreateOrConnectWithoutArtistInput | Prisma.AlbumCreateOrConnectWithoutArtistInput[];
    upsert?: Prisma.AlbumUpsertWithWhereUniqueWithoutArtistInput | Prisma.AlbumUpsertWithWhereUniqueWithoutArtistInput[];
    createMany?: Prisma.AlbumCreateManyArtistInputEnvelope;
    set?: Prisma.AlbumWhereUniqueInput | Prisma.AlbumWhereUniqueInput[];
    disconnect?: Prisma.AlbumWhereUniqueInput | Prisma.AlbumWhereUniqueInput[];
    delete?: Prisma.AlbumWhereUniqueInput | Prisma.AlbumWhereUniqueInput[];
    connect?: Prisma.AlbumWhereUniqueInput | Prisma.AlbumWhereUniqueInput[];
    update?: Prisma.AlbumUpdateWithWhereUniqueWithoutArtistInput | Prisma.AlbumUpdateWithWhereUniqueWithoutArtistInput[];
    updateMany?: Prisma.AlbumUpdateManyWithWhereWithoutArtistInput | Prisma.AlbumUpdateManyWithWhereWithoutArtistInput[];
    deleteMany?: Prisma.AlbumScalarWhereInput | Prisma.AlbumScalarWhereInput[];
};
export type AlbumCreateNestedOneWithoutTracksInput = {
    create?: Prisma.XOR<Prisma.AlbumCreateWithoutTracksInput, Prisma.AlbumUncheckedCreateWithoutTracksInput>;
    connectOrCreate?: Prisma.AlbumCreateOrConnectWithoutTracksInput;
    connect?: Prisma.AlbumWhereUniqueInput;
};
export type AlbumUpdateOneWithoutTracksNestedInput = {
    create?: Prisma.XOR<Prisma.AlbumCreateWithoutTracksInput, Prisma.AlbumUncheckedCreateWithoutTracksInput>;
    connectOrCreate?: Prisma.AlbumCreateOrConnectWithoutTracksInput;
    upsert?: Prisma.AlbumUpsertWithoutTracksInput;
    disconnect?: Prisma.AlbumWhereInput | boolean;
    delete?: Prisma.AlbumWhereInput | boolean;
    connect?: Prisma.AlbumWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AlbumUpdateToOneWithWhereWithoutTracksInput, Prisma.AlbumUpdateWithoutTracksInput>, Prisma.AlbumUncheckedUpdateWithoutTracksInput>;
};
export type AlbumCreateNestedOneWithoutReviewsInput = {
    create?: Prisma.XOR<Prisma.AlbumCreateWithoutReviewsInput, Prisma.AlbumUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.AlbumCreateOrConnectWithoutReviewsInput;
    connect?: Prisma.AlbumWhereUniqueInput;
};
export type AlbumUpdateOneWithoutReviewsNestedInput = {
    create?: Prisma.XOR<Prisma.AlbumCreateWithoutReviewsInput, Prisma.AlbumUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.AlbumCreateOrConnectWithoutReviewsInput;
    upsert?: Prisma.AlbumUpsertWithoutReviewsInput;
    disconnect?: Prisma.AlbumWhereInput | boolean;
    delete?: Prisma.AlbumWhereInput | boolean;
    connect?: Prisma.AlbumWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AlbumUpdateToOneWithWhereWithoutReviewsInput, Prisma.AlbumUpdateWithoutReviewsInput>, Prisma.AlbumUncheckedUpdateWithoutReviewsInput>;
};
export type AlbumCreateWithoutArtistInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    coverUrl?: string | null;
    releaseDate?: Date | string | null;
    genreLabel?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    tracks?: Prisma.TrackCreateNestedManyWithoutAlbumInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutAlbumInput;
};
export type AlbumUncheckedCreateWithoutArtistInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    coverUrl?: string | null;
    releaseDate?: Date | string | null;
    genreLabel?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    tracks?: Prisma.TrackUncheckedCreateNestedManyWithoutAlbumInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutAlbumInput;
};
export type AlbumCreateOrConnectWithoutArtistInput = {
    where: Prisma.AlbumWhereUniqueInput;
    create: Prisma.XOR<Prisma.AlbumCreateWithoutArtistInput, Prisma.AlbumUncheckedCreateWithoutArtistInput>;
};
export type AlbumCreateManyArtistInputEnvelope = {
    data: Prisma.AlbumCreateManyArtistInput | Prisma.AlbumCreateManyArtistInput[];
    skipDuplicates?: boolean;
};
export type AlbumUpsertWithWhereUniqueWithoutArtistInput = {
    where: Prisma.AlbumWhereUniqueInput;
    update: Prisma.XOR<Prisma.AlbumUpdateWithoutArtistInput, Prisma.AlbumUncheckedUpdateWithoutArtistInput>;
    create: Prisma.XOR<Prisma.AlbumCreateWithoutArtistInput, Prisma.AlbumUncheckedCreateWithoutArtistInput>;
};
export type AlbumUpdateWithWhereUniqueWithoutArtistInput = {
    where: Prisma.AlbumWhereUniqueInput;
    data: Prisma.XOR<Prisma.AlbumUpdateWithoutArtistInput, Prisma.AlbumUncheckedUpdateWithoutArtistInput>;
};
export type AlbumUpdateManyWithWhereWithoutArtistInput = {
    where: Prisma.AlbumScalarWhereInput;
    data: Prisma.XOR<Prisma.AlbumUpdateManyMutationInput, Prisma.AlbumUncheckedUpdateManyWithoutArtistInput>;
};
export type AlbumScalarWhereInput = {
    AND?: Prisma.AlbumScalarWhereInput | Prisma.AlbumScalarWhereInput[];
    OR?: Prisma.AlbumScalarWhereInput[];
    NOT?: Prisma.AlbumScalarWhereInput | Prisma.AlbumScalarWhereInput[];
    id?: Prisma.StringFilter<"Album"> | string;
    deezerId?: Prisma.StringFilter<"Album"> | string;
    mbid?: Prisma.StringNullableFilter<"Album"> | string | null;
    title?: Prisma.StringFilter<"Album"> | string;
    artistId?: Prisma.StringFilter<"Album"> | string;
    coverUrl?: Prisma.StringNullableFilter<"Album"> | string | null;
    releaseDate?: Prisma.DateTimeNullableFilter<"Album"> | Date | string | null;
    genreLabel?: Prisma.StringNullableFilter<"Album"> | string | null;
    lastSyncedAt?: Prisma.DateTimeFilter<"Album"> | Date | string;
    reviewCount?: Prisma.IntFilter<"Album"> | number;
};
export type AlbumCreateWithoutTracksInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    coverUrl?: string | null;
    releaseDate?: Date | string | null;
    genreLabel?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    artist: Prisma.ArtistCreateNestedOneWithoutAlbumsInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutAlbumInput;
};
export type AlbumUncheckedCreateWithoutTracksInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    artistId: string;
    coverUrl?: string | null;
    releaseDate?: Date | string | null;
    genreLabel?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutAlbumInput;
};
export type AlbumCreateOrConnectWithoutTracksInput = {
    where: Prisma.AlbumWhereUniqueInput;
    create: Prisma.XOR<Prisma.AlbumCreateWithoutTracksInput, Prisma.AlbumUncheckedCreateWithoutTracksInput>;
};
export type AlbumUpsertWithoutTracksInput = {
    update: Prisma.XOR<Prisma.AlbumUpdateWithoutTracksInput, Prisma.AlbumUncheckedUpdateWithoutTracksInput>;
    create: Prisma.XOR<Prisma.AlbumCreateWithoutTracksInput, Prisma.AlbumUncheckedCreateWithoutTracksInput>;
    where?: Prisma.AlbumWhereInput;
};
export type AlbumUpdateToOneWithWhereWithoutTracksInput = {
    where?: Prisma.AlbumWhereInput;
    data: Prisma.XOR<Prisma.AlbumUpdateWithoutTracksInput, Prisma.AlbumUncheckedUpdateWithoutTracksInput>;
};
export type AlbumUpdateWithoutTracksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    genreLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    artist?: Prisma.ArtistUpdateOneRequiredWithoutAlbumsNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutAlbumNestedInput;
};
export type AlbumUncheckedUpdateWithoutTracksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    genreLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutAlbumNestedInput;
};
export type AlbumCreateWithoutReviewsInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    coverUrl?: string | null;
    releaseDate?: Date | string | null;
    genreLabel?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    artist: Prisma.ArtistCreateNestedOneWithoutAlbumsInput;
    tracks?: Prisma.TrackCreateNestedManyWithoutAlbumInput;
};
export type AlbumUncheckedCreateWithoutReviewsInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    artistId: string;
    coverUrl?: string | null;
    releaseDate?: Date | string | null;
    genreLabel?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    tracks?: Prisma.TrackUncheckedCreateNestedManyWithoutAlbumInput;
};
export type AlbumCreateOrConnectWithoutReviewsInput = {
    where: Prisma.AlbumWhereUniqueInput;
    create: Prisma.XOR<Prisma.AlbumCreateWithoutReviewsInput, Prisma.AlbumUncheckedCreateWithoutReviewsInput>;
};
export type AlbumUpsertWithoutReviewsInput = {
    update: Prisma.XOR<Prisma.AlbumUpdateWithoutReviewsInput, Prisma.AlbumUncheckedUpdateWithoutReviewsInput>;
    create: Prisma.XOR<Prisma.AlbumCreateWithoutReviewsInput, Prisma.AlbumUncheckedCreateWithoutReviewsInput>;
    where?: Prisma.AlbumWhereInput;
};
export type AlbumUpdateToOneWithWhereWithoutReviewsInput = {
    where?: Prisma.AlbumWhereInput;
    data: Prisma.XOR<Prisma.AlbumUpdateWithoutReviewsInput, Prisma.AlbumUncheckedUpdateWithoutReviewsInput>;
};
export type AlbumUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    genreLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    artist?: Prisma.ArtistUpdateOneRequiredWithoutAlbumsNestedInput;
    tracks?: Prisma.TrackUpdateManyWithoutAlbumNestedInput;
};
export type AlbumUncheckedUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    genreLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    tracks?: Prisma.TrackUncheckedUpdateManyWithoutAlbumNestedInput;
};
export type AlbumCreateManyArtistInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    coverUrl?: string | null;
    releaseDate?: Date | string | null;
    genreLabel?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
};
export type AlbumUpdateWithoutArtistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    genreLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    tracks?: Prisma.TrackUpdateManyWithoutAlbumNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutAlbumNestedInput;
};
export type AlbumUncheckedUpdateWithoutArtistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    genreLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    tracks?: Prisma.TrackUncheckedUpdateManyWithoutAlbumNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutAlbumNestedInput;
};
export type AlbumUncheckedUpdateManyWithoutArtistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    genreLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AlbumCountOutputType = {
    tracks: number;
    reviews: number;
};
export type AlbumCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tracks?: boolean | AlbumCountOutputTypeCountTracksArgs;
    reviews?: boolean | AlbumCountOutputTypeCountReviewsArgs;
};
export type AlbumCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumCountOutputTypeSelect<ExtArgs> | null;
};
export type AlbumCountOutputTypeCountTracksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackWhereInput;
};
export type AlbumCountOutputTypeCountReviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
};
export type AlbumSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    title?: boolean;
    artistId?: boolean;
    coverUrl?: boolean;
    releaseDate?: boolean;
    genreLabel?: boolean;
    lastSyncedAt?: boolean;
    reviewCount?: boolean;
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
    tracks?: boolean | Prisma.Album$tracksArgs<ExtArgs>;
    reviews?: boolean | Prisma.Album$reviewsArgs<ExtArgs>;
    _count?: boolean | Prisma.AlbumCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["album"]>;
export type AlbumSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    title?: boolean;
    artistId?: boolean;
    coverUrl?: boolean;
    releaseDate?: boolean;
    genreLabel?: boolean;
    lastSyncedAt?: boolean;
    reviewCount?: boolean;
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["album"]>;
export type AlbumSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    title?: boolean;
    artistId?: boolean;
    coverUrl?: boolean;
    releaseDate?: boolean;
    genreLabel?: boolean;
    lastSyncedAt?: boolean;
    reviewCount?: boolean;
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["album"]>;
export type AlbumSelectScalar = {
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    title?: boolean;
    artistId?: boolean;
    coverUrl?: boolean;
    releaseDate?: boolean;
    genreLabel?: boolean;
    lastSyncedAt?: boolean;
    reviewCount?: boolean;
};
export type AlbumOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "deezerId" | "mbid" | "title" | "artistId" | "coverUrl" | "releaseDate" | "genreLabel" | "lastSyncedAt" | "reviewCount", ExtArgs["result"]["album"]>;
export type AlbumInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
    tracks?: boolean | Prisma.Album$tracksArgs<ExtArgs>;
    reviews?: boolean | Prisma.Album$reviewsArgs<ExtArgs>;
    _count?: boolean | Prisma.AlbumCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AlbumIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
};
export type AlbumIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
};
export type $AlbumPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Album";
    objects: {
        artist: Prisma.$ArtistPayload<ExtArgs>;
        tracks: Prisma.$TrackPayload<ExtArgs>[];
        reviews: Prisma.$ReviewPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        deezerId: string;
        mbid: string | null;
        title: string;
        artistId: string;
        coverUrl: string | null;
        releaseDate: Date | null;
        genreLabel: string | null;
        lastSyncedAt: Date;
        reviewCount: number;
    }, ExtArgs["result"]["album"]>;
    composites: {};
};
export type AlbumGetPayload<S extends boolean | null | undefined | AlbumDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AlbumPayload, S>;
export type AlbumCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AlbumFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AlbumCountAggregateInputType | true;
};
export interface AlbumDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Album'];
        meta: {
            name: 'Album';
        };
    };
    findUnique<T extends AlbumFindUniqueArgs>(args: Prisma.SelectSubset<T, AlbumFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AlbumClient<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AlbumFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AlbumFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AlbumClient<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AlbumFindFirstArgs>(args?: Prisma.SelectSubset<T, AlbumFindFirstArgs<ExtArgs>>): Prisma.Prisma__AlbumClient<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AlbumFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AlbumFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AlbumClient<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AlbumFindManyArgs>(args?: Prisma.SelectSubset<T, AlbumFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AlbumCreateArgs>(args: Prisma.SelectSubset<T, AlbumCreateArgs<ExtArgs>>): Prisma.Prisma__AlbumClient<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AlbumCreateManyArgs>(args?: Prisma.SelectSubset<T, AlbumCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AlbumCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AlbumCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AlbumDeleteArgs>(args: Prisma.SelectSubset<T, AlbumDeleteArgs<ExtArgs>>): Prisma.Prisma__AlbumClient<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AlbumUpdateArgs>(args: Prisma.SelectSubset<T, AlbumUpdateArgs<ExtArgs>>): Prisma.Prisma__AlbumClient<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AlbumDeleteManyArgs>(args?: Prisma.SelectSubset<T, AlbumDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AlbumUpdateManyArgs>(args: Prisma.SelectSubset<T, AlbumUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AlbumUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AlbumUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AlbumUpsertArgs>(args: Prisma.SelectSubset<T, AlbumUpsertArgs<ExtArgs>>): Prisma.Prisma__AlbumClient<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AlbumCountArgs>(args?: Prisma.Subset<T, AlbumCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AlbumCountAggregateOutputType> : number>;
    aggregate<T extends AlbumAggregateArgs>(args: Prisma.Subset<T, AlbumAggregateArgs>): Prisma.PrismaPromise<GetAlbumAggregateType<T>>;
    groupBy<T extends AlbumGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AlbumGroupByArgs['orderBy'];
    } : {
        orderBy?: AlbumGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AlbumGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlbumGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AlbumFieldRefs;
}
export interface Prisma__AlbumClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    artist<T extends Prisma.ArtistDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ArtistDefaultArgs<ExtArgs>>): Prisma.Prisma__ArtistClient<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tracks<T extends Prisma.Album$tracksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Album$tracksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviews<T extends Prisma.Album$reviewsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Album$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AlbumFieldRefs {
    readonly id: Prisma.FieldRef<"Album", 'String'>;
    readonly deezerId: Prisma.FieldRef<"Album", 'String'>;
    readonly mbid: Prisma.FieldRef<"Album", 'String'>;
    readonly title: Prisma.FieldRef<"Album", 'String'>;
    readonly artistId: Prisma.FieldRef<"Album", 'String'>;
    readonly coverUrl: Prisma.FieldRef<"Album", 'String'>;
    readonly releaseDate: Prisma.FieldRef<"Album", 'DateTime'>;
    readonly genreLabel: Prisma.FieldRef<"Album", 'String'>;
    readonly lastSyncedAt: Prisma.FieldRef<"Album", 'DateTime'>;
    readonly reviewCount: Prisma.FieldRef<"Album", 'Int'>;
}
export type AlbumFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelect<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    include?: Prisma.AlbumInclude<ExtArgs> | null;
    where: Prisma.AlbumWhereUniqueInput;
};
export type AlbumFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelect<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    include?: Prisma.AlbumInclude<ExtArgs> | null;
    where: Prisma.AlbumWhereUniqueInput;
};
export type AlbumFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AlbumFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AlbumFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AlbumCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelect<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    include?: Prisma.AlbumInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AlbumCreateInput, Prisma.AlbumUncheckedCreateInput>;
};
export type AlbumCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AlbumCreateManyInput | Prisma.AlbumCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AlbumCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    data: Prisma.AlbumCreateManyInput | Prisma.AlbumCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AlbumIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AlbumUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelect<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    include?: Prisma.AlbumInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AlbumUpdateInput, Prisma.AlbumUncheckedUpdateInput>;
    where: Prisma.AlbumWhereUniqueInput;
};
export type AlbumUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AlbumUpdateManyMutationInput, Prisma.AlbumUncheckedUpdateManyInput>;
    where?: Prisma.AlbumWhereInput;
    limit?: number;
};
export type AlbumUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AlbumUpdateManyMutationInput, Prisma.AlbumUncheckedUpdateManyInput>;
    where?: Prisma.AlbumWhereInput;
    limit?: number;
    include?: Prisma.AlbumIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AlbumUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelect<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    include?: Prisma.AlbumInclude<ExtArgs> | null;
    where: Prisma.AlbumWhereUniqueInput;
    create: Prisma.XOR<Prisma.AlbumCreateInput, Prisma.AlbumUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AlbumUpdateInput, Prisma.AlbumUncheckedUpdateInput>;
};
export type AlbumDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelect<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    include?: Prisma.AlbumInclude<ExtArgs> | null;
    where: Prisma.AlbumWhereUniqueInput;
};
export type AlbumDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AlbumWhereInput;
    limit?: number;
};
export type Album$tracksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Album$reviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type AlbumDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelect<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    include?: Prisma.AlbumInclude<ExtArgs> | null;
};
