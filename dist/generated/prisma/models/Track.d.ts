import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TrackModel = runtime.Types.Result.DefaultSelection<Prisma.$TrackPayload>;
export type AggregateTrack = {
    _count: TrackCountAggregateOutputType | null;
    _avg: TrackAvgAggregateOutputType | null;
    _sum: TrackSumAggregateOutputType | null;
    _min: TrackMinAggregateOutputType | null;
    _max: TrackMaxAggregateOutputType | null;
};
export type TrackAvgAggregateOutputType = {
    durationMs: number | null;
    trackNumber: number | null;
    reviewCount: number | null;
};
export type TrackSumAggregateOutputType = {
    durationMs: number | null;
    trackNumber: number | null;
    reviewCount: number | null;
};
export type TrackMinAggregateOutputType = {
    id: string | null;
    deezerId: string | null;
    mbid: string | null;
    title: string | null;
    albumId: string | null;
    artistId: string | null;
    durationMs: number | null;
    trackNumber: number | null;
    previewUrl: string | null;
    lastSyncedAt: Date | null;
    reviewCount: number | null;
};
export type TrackMaxAggregateOutputType = {
    id: string | null;
    deezerId: string | null;
    mbid: string | null;
    title: string | null;
    albumId: string | null;
    artistId: string | null;
    durationMs: number | null;
    trackNumber: number | null;
    previewUrl: string | null;
    lastSyncedAt: Date | null;
    reviewCount: number | null;
};
export type TrackCountAggregateOutputType = {
    id: number;
    deezerId: number;
    mbid: number;
    title: number;
    albumId: number;
    artistId: number;
    durationMs: number;
    trackNumber: number;
    previewUrl: number;
    lastSyncedAt: number;
    reviewCount: number;
    _all: number;
};
export type TrackAvgAggregateInputType = {
    durationMs?: true;
    trackNumber?: true;
    reviewCount?: true;
};
export type TrackSumAggregateInputType = {
    durationMs?: true;
    trackNumber?: true;
    reviewCount?: true;
};
export type TrackMinAggregateInputType = {
    id?: true;
    deezerId?: true;
    mbid?: true;
    title?: true;
    albumId?: true;
    artistId?: true;
    durationMs?: true;
    trackNumber?: true;
    previewUrl?: true;
    lastSyncedAt?: true;
    reviewCount?: true;
};
export type TrackMaxAggregateInputType = {
    id?: true;
    deezerId?: true;
    mbid?: true;
    title?: true;
    albumId?: true;
    artistId?: true;
    durationMs?: true;
    trackNumber?: true;
    previewUrl?: true;
    lastSyncedAt?: true;
    reviewCount?: true;
};
export type TrackCountAggregateInputType = {
    id?: true;
    deezerId?: true;
    mbid?: true;
    title?: true;
    albumId?: true;
    artistId?: true;
    durationMs?: true;
    trackNumber?: true;
    previewUrl?: true;
    lastSyncedAt?: true;
    reviewCount?: true;
    _all?: true;
};
export type TrackAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackWhereInput;
    orderBy?: Prisma.TrackOrderByWithRelationInput | Prisma.TrackOrderByWithRelationInput[];
    cursor?: Prisma.TrackWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TrackCountAggregateInputType;
    _avg?: TrackAvgAggregateInputType;
    _sum?: TrackSumAggregateInputType;
    _min?: TrackMinAggregateInputType;
    _max?: TrackMaxAggregateInputType;
};
export type GetTrackAggregateType<T extends TrackAggregateArgs> = {
    [P in keyof T & keyof AggregateTrack]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTrack[P]> : Prisma.GetScalarType<T[P], AggregateTrack[P]>;
};
export type TrackGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackWhereInput;
    orderBy?: Prisma.TrackOrderByWithAggregationInput | Prisma.TrackOrderByWithAggregationInput[];
    by: Prisma.TrackScalarFieldEnum[] | Prisma.TrackScalarFieldEnum;
    having?: Prisma.TrackScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TrackCountAggregateInputType | true;
    _avg?: TrackAvgAggregateInputType;
    _sum?: TrackSumAggregateInputType;
    _min?: TrackMinAggregateInputType;
    _max?: TrackMaxAggregateInputType;
};
export type TrackGroupByOutputType = {
    id: string;
    deezerId: string;
    mbid: string | null;
    title: string;
    albumId: string | null;
    artistId: string;
    durationMs: number | null;
    trackNumber: number | null;
    previewUrl: string | null;
    lastSyncedAt: Date;
    reviewCount: number;
    _count: TrackCountAggregateOutputType | null;
    _avg: TrackAvgAggregateOutputType | null;
    _sum: TrackSumAggregateOutputType | null;
    _min: TrackMinAggregateOutputType | null;
    _max: TrackMaxAggregateOutputType | null;
};
export type GetTrackGroupByPayload<T extends TrackGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TrackGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TrackGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TrackGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TrackGroupByOutputType[P]>;
}>>;
export type TrackWhereInput = {
    AND?: Prisma.TrackWhereInput | Prisma.TrackWhereInput[];
    OR?: Prisma.TrackWhereInput[];
    NOT?: Prisma.TrackWhereInput | Prisma.TrackWhereInput[];
    id?: Prisma.StringFilter<"Track"> | string;
    deezerId?: Prisma.StringFilter<"Track"> | string;
    mbid?: Prisma.StringNullableFilter<"Track"> | string | null;
    title?: Prisma.StringFilter<"Track"> | string;
    albumId?: Prisma.StringNullableFilter<"Track"> | string | null;
    artistId?: Prisma.StringFilter<"Track"> | string;
    durationMs?: Prisma.IntNullableFilter<"Track"> | number | null;
    trackNumber?: Prisma.IntNullableFilter<"Track"> | number | null;
    previewUrl?: Prisma.StringNullableFilter<"Track"> | string | null;
    lastSyncedAt?: Prisma.DateTimeFilter<"Track"> | Date | string;
    reviewCount?: Prisma.IntFilter<"Track"> | number;
    album?: Prisma.XOR<Prisma.AlbumNullableScalarRelationFilter, Prisma.AlbumWhereInput> | null;
    artist?: Prisma.XOR<Prisma.ArtistScalarRelationFilter, Prisma.ArtistWhereInput>;
    reviews?: Prisma.ReviewListRelationFilter;
    trackReviewItems?: Prisma.TrackReviewItemListRelationFilter;
};
export type TrackOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    albumId?: Prisma.SortOrderInput | Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrderInput | Prisma.SortOrder;
    trackNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    previewUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    album?: Prisma.AlbumOrderByWithRelationInput;
    artist?: Prisma.ArtistOrderByWithRelationInput;
    reviews?: Prisma.ReviewOrderByRelationAggregateInput;
    trackReviewItems?: Prisma.TrackReviewItemOrderByRelationAggregateInput;
};
export type TrackWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    deezerId?: string;
    mbid?: string;
    AND?: Prisma.TrackWhereInput | Prisma.TrackWhereInput[];
    OR?: Prisma.TrackWhereInput[];
    NOT?: Prisma.TrackWhereInput | Prisma.TrackWhereInput[];
    title?: Prisma.StringFilter<"Track"> | string;
    albumId?: Prisma.StringNullableFilter<"Track"> | string | null;
    artistId?: Prisma.StringFilter<"Track"> | string;
    durationMs?: Prisma.IntNullableFilter<"Track"> | number | null;
    trackNumber?: Prisma.IntNullableFilter<"Track"> | number | null;
    previewUrl?: Prisma.StringNullableFilter<"Track"> | string | null;
    lastSyncedAt?: Prisma.DateTimeFilter<"Track"> | Date | string;
    reviewCount?: Prisma.IntFilter<"Track"> | number;
    album?: Prisma.XOR<Prisma.AlbumNullableScalarRelationFilter, Prisma.AlbumWhereInput> | null;
    artist?: Prisma.XOR<Prisma.ArtistScalarRelationFilter, Prisma.ArtistWhereInput>;
    reviews?: Prisma.ReviewListRelationFilter;
    trackReviewItems?: Prisma.TrackReviewItemListRelationFilter;
}, "id" | "deezerId" | "mbid">;
export type TrackOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    albumId?: Prisma.SortOrderInput | Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrderInput | Prisma.SortOrder;
    trackNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    previewUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    _count?: Prisma.TrackCountOrderByAggregateInput;
    _avg?: Prisma.TrackAvgOrderByAggregateInput;
    _max?: Prisma.TrackMaxOrderByAggregateInput;
    _min?: Prisma.TrackMinOrderByAggregateInput;
    _sum?: Prisma.TrackSumOrderByAggregateInput;
};
export type TrackScalarWhereWithAggregatesInput = {
    AND?: Prisma.TrackScalarWhereWithAggregatesInput | Prisma.TrackScalarWhereWithAggregatesInput[];
    OR?: Prisma.TrackScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TrackScalarWhereWithAggregatesInput | Prisma.TrackScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Track"> | string;
    deezerId?: Prisma.StringWithAggregatesFilter<"Track"> | string;
    mbid?: Prisma.StringNullableWithAggregatesFilter<"Track"> | string | null;
    title?: Prisma.StringWithAggregatesFilter<"Track"> | string;
    albumId?: Prisma.StringNullableWithAggregatesFilter<"Track"> | string | null;
    artistId?: Prisma.StringWithAggregatesFilter<"Track"> | string;
    durationMs?: Prisma.IntNullableWithAggregatesFilter<"Track"> | number | null;
    trackNumber?: Prisma.IntNullableWithAggregatesFilter<"Track"> | number | null;
    previewUrl?: Prisma.StringNullableWithAggregatesFilter<"Track"> | string | null;
    lastSyncedAt?: Prisma.DateTimeWithAggregatesFilter<"Track"> | Date | string;
    reviewCount?: Prisma.IntWithAggregatesFilter<"Track"> | number;
};
export type TrackCreateInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    album?: Prisma.AlbumCreateNestedOneWithoutTracksInput;
    artist: Prisma.ArtistCreateNestedOneWithoutTracksInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutTrackInput;
    trackReviewItems?: Prisma.TrackReviewItemCreateNestedManyWithoutTrackInput;
};
export type TrackUncheckedCreateInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    albumId?: string | null;
    artistId: string;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutTrackInput;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedCreateNestedManyWithoutTrackInput;
};
export type TrackUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    album?: Prisma.AlbumUpdateOneWithoutTracksNestedInput;
    artist?: Prisma.ArtistUpdateOneRequiredWithoutTracksNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutTrackNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUpdateManyWithoutTrackNestedInput;
};
export type TrackUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutTrackNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedUpdateManyWithoutTrackNestedInput;
};
export type TrackCreateManyInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    albumId?: string | null;
    artistId: string;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
};
export type TrackUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TrackUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TrackListRelationFilter = {
    every?: Prisma.TrackWhereInput;
    some?: Prisma.TrackWhereInput;
    none?: Prisma.TrackWhereInput;
};
export type TrackOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TrackCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    albumId?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    trackNumber?: Prisma.SortOrder;
    previewUrl?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
};
export type TrackAvgOrderByAggregateInput = {
    durationMs?: Prisma.SortOrder;
    trackNumber?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
};
export type TrackMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    albumId?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    trackNumber?: Prisma.SortOrder;
    previewUrl?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
};
export type TrackMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    mbid?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    albumId?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    trackNumber?: Prisma.SortOrder;
    previewUrl?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
};
export type TrackSumOrderByAggregateInput = {
    durationMs?: Prisma.SortOrder;
    trackNumber?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
};
export type TrackNullableScalarRelationFilter = {
    is?: Prisma.TrackWhereInput | null;
    isNot?: Prisma.TrackWhereInput | null;
};
export type TrackScalarRelationFilter = {
    is?: Prisma.TrackWhereInput;
    isNot?: Prisma.TrackWhereInput;
};
export type TrackCreateNestedManyWithoutArtistInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutArtistInput, Prisma.TrackUncheckedCreateWithoutArtistInput> | Prisma.TrackCreateWithoutArtistInput[] | Prisma.TrackUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutArtistInput | Prisma.TrackCreateOrConnectWithoutArtistInput[];
    createMany?: Prisma.TrackCreateManyArtistInputEnvelope;
    connect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
};
export type TrackUncheckedCreateNestedManyWithoutArtistInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutArtistInput, Prisma.TrackUncheckedCreateWithoutArtistInput> | Prisma.TrackCreateWithoutArtistInput[] | Prisma.TrackUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutArtistInput | Prisma.TrackCreateOrConnectWithoutArtistInput[];
    createMany?: Prisma.TrackCreateManyArtistInputEnvelope;
    connect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
};
export type TrackUpdateManyWithoutArtistNestedInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutArtistInput, Prisma.TrackUncheckedCreateWithoutArtistInput> | Prisma.TrackCreateWithoutArtistInput[] | Prisma.TrackUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutArtistInput | Prisma.TrackCreateOrConnectWithoutArtistInput[];
    upsert?: Prisma.TrackUpsertWithWhereUniqueWithoutArtistInput | Prisma.TrackUpsertWithWhereUniqueWithoutArtistInput[];
    createMany?: Prisma.TrackCreateManyArtistInputEnvelope;
    set?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    disconnect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    delete?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    connect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    update?: Prisma.TrackUpdateWithWhereUniqueWithoutArtistInput | Prisma.TrackUpdateWithWhereUniqueWithoutArtistInput[];
    updateMany?: Prisma.TrackUpdateManyWithWhereWithoutArtistInput | Prisma.TrackUpdateManyWithWhereWithoutArtistInput[];
    deleteMany?: Prisma.TrackScalarWhereInput | Prisma.TrackScalarWhereInput[];
};
export type TrackUncheckedUpdateManyWithoutArtistNestedInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutArtistInput, Prisma.TrackUncheckedCreateWithoutArtistInput> | Prisma.TrackCreateWithoutArtistInput[] | Prisma.TrackUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutArtistInput | Prisma.TrackCreateOrConnectWithoutArtistInput[];
    upsert?: Prisma.TrackUpsertWithWhereUniqueWithoutArtistInput | Prisma.TrackUpsertWithWhereUniqueWithoutArtistInput[];
    createMany?: Prisma.TrackCreateManyArtistInputEnvelope;
    set?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    disconnect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    delete?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    connect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    update?: Prisma.TrackUpdateWithWhereUniqueWithoutArtistInput | Prisma.TrackUpdateWithWhereUniqueWithoutArtistInput[];
    updateMany?: Prisma.TrackUpdateManyWithWhereWithoutArtistInput | Prisma.TrackUpdateManyWithWhereWithoutArtistInput[];
    deleteMany?: Prisma.TrackScalarWhereInput | Prisma.TrackScalarWhereInput[];
};
export type TrackCreateNestedManyWithoutAlbumInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutAlbumInput, Prisma.TrackUncheckedCreateWithoutAlbumInput> | Prisma.TrackCreateWithoutAlbumInput[] | Prisma.TrackUncheckedCreateWithoutAlbumInput[];
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutAlbumInput | Prisma.TrackCreateOrConnectWithoutAlbumInput[];
    createMany?: Prisma.TrackCreateManyAlbumInputEnvelope;
    connect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
};
export type TrackUncheckedCreateNestedManyWithoutAlbumInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutAlbumInput, Prisma.TrackUncheckedCreateWithoutAlbumInput> | Prisma.TrackCreateWithoutAlbumInput[] | Prisma.TrackUncheckedCreateWithoutAlbumInput[];
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutAlbumInput | Prisma.TrackCreateOrConnectWithoutAlbumInput[];
    createMany?: Prisma.TrackCreateManyAlbumInputEnvelope;
    connect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
};
export type TrackUpdateManyWithoutAlbumNestedInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutAlbumInput, Prisma.TrackUncheckedCreateWithoutAlbumInput> | Prisma.TrackCreateWithoutAlbumInput[] | Prisma.TrackUncheckedCreateWithoutAlbumInput[];
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutAlbumInput | Prisma.TrackCreateOrConnectWithoutAlbumInput[];
    upsert?: Prisma.TrackUpsertWithWhereUniqueWithoutAlbumInput | Prisma.TrackUpsertWithWhereUniqueWithoutAlbumInput[];
    createMany?: Prisma.TrackCreateManyAlbumInputEnvelope;
    set?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    disconnect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    delete?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    connect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    update?: Prisma.TrackUpdateWithWhereUniqueWithoutAlbumInput | Prisma.TrackUpdateWithWhereUniqueWithoutAlbumInput[];
    updateMany?: Prisma.TrackUpdateManyWithWhereWithoutAlbumInput | Prisma.TrackUpdateManyWithWhereWithoutAlbumInput[];
    deleteMany?: Prisma.TrackScalarWhereInput | Prisma.TrackScalarWhereInput[];
};
export type TrackUncheckedUpdateManyWithoutAlbumNestedInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutAlbumInput, Prisma.TrackUncheckedCreateWithoutAlbumInput> | Prisma.TrackCreateWithoutAlbumInput[] | Prisma.TrackUncheckedCreateWithoutAlbumInput[];
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutAlbumInput | Prisma.TrackCreateOrConnectWithoutAlbumInput[];
    upsert?: Prisma.TrackUpsertWithWhereUniqueWithoutAlbumInput | Prisma.TrackUpsertWithWhereUniqueWithoutAlbumInput[];
    createMany?: Prisma.TrackCreateManyAlbumInputEnvelope;
    set?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    disconnect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    delete?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    connect?: Prisma.TrackWhereUniqueInput | Prisma.TrackWhereUniqueInput[];
    update?: Prisma.TrackUpdateWithWhereUniqueWithoutAlbumInput | Prisma.TrackUpdateWithWhereUniqueWithoutAlbumInput[];
    updateMany?: Prisma.TrackUpdateManyWithWhereWithoutAlbumInput | Prisma.TrackUpdateManyWithWhereWithoutAlbumInput[];
    deleteMany?: Prisma.TrackScalarWhereInput | Prisma.TrackScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type TrackCreateNestedOneWithoutReviewsInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutReviewsInput, Prisma.TrackUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutReviewsInput;
    connect?: Prisma.TrackWhereUniqueInput;
};
export type TrackUpdateOneWithoutReviewsNestedInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutReviewsInput, Prisma.TrackUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutReviewsInput;
    upsert?: Prisma.TrackUpsertWithoutReviewsInput;
    disconnect?: Prisma.TrackWhereInput | boolean;
    delete?: Prisma.TrackWhereInput | boolean;
    connect?: Prisma.TrackWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TrackUpdateToOneWithWhereWithoutReviewsInput, Prisma.TrackUpdateWithoutReviewsInput>, Prisma.TrackUncheckedUpdateWithoutReviewsInput>;
};
export type TrackCreateNestedOneWithoutTrackReviewItemsInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutTrackReviewItemsInput, Prisma.TrackUncheckedCreateWithoutTrackReviewItemsInput>;
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutTrackReviewItemsInput;
    connect?: Prisma.TrackWhereUniqueInput;
};
export type TrackUpdateOneRequiredWithoutTrackReviewItemsNestedInput = {
    create?: Prisma.XOR<Prisma.TrackCreateWithoutTrackReviewItemsInput, Prisma.TrackUncheckedCreateWithoutTrackReviewItemsInput>;
    connectOrCreate?: Prisma.TrackCreateOrConnectWithoutTrackReviewItemsInput;
    upsert?: Prisma.TrackUpsertWithoutTrackReviewItemsInput;
    connect?: Prisma.TrackWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TrackUpdateToOneWithWhereWithoutTrackReviewItemsInput, Prisma.TrackUpdateWithoutTrackReviewItemsInput>, Prisma.TrackUncheckedUpdateWithoutTrackReviewItemsInput>;
};
export type TrackCreateWithoutArtistInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    album?: Prisma.AlbumCreateNestedOneWithoutTracksInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutTrackInput;
    trackReviewItems?: Prisma.TrackReviewItemCreateNestedManyWithoutTrackInput;
};
export type TrackUncheckedCreateWithoutArtistInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    albumId?: string | null;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutTrackInput;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedCreateNestedManyWithoutTrackInput;
};
export type TrackCreateOrConnectWithoutArtistInput = {
    where: Prisma.TrackWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrackCreateWithoutArtistInput, Prisma.TrackUncheckedCreateWithoutArtistInput>;
};
export type TrackCreateManyArtistInputEnvelope = {
    data: Prisma.TrackCreateManyArtistInput | Prisma.TrackCreateManyArtistInput[];
    skipDuplicates?: boolean;
};
export type TrackUpsertWithWhereUniqueWithoutArtistInput = {
    where: Prisma.TrackWhereUniqueInput;
    update: Prisma.XOR<Prisma.TrackUpdateWithoutArtistInput, Prisma.TrackUncheckedUpdateWithoutArtistInput>;
    create: Prisma.XOR<Prisma.TrackCreateWithoutArtistInput, Prisma.TrackUncheckedCreateWithoutArtistInput>;
};
export type TrackUpdateWithWhereUniqueWithoutArtistInput = {
    where: Prisma.TrackWhereUniqueInput;
    data: Prisma.XOR<Prisma.TrackUpdateWithoutArtistInput, Prisma.TrackUncheckedUpdateWithoutArtistInput>;
};
export type TrackUpdateManyWithWhereWithoutArtistInput = {
    where: Prisma.TrackScalarWhereInput;
    data: Prisma.XOR<Prisma.TrackUpdateManyMutationInput, Prisma.TrackUncheckedUpdateManyWithoutArtistInput>;
};
export type TrackScalarWhereInput = {
    AND?: Prisma.TrackScalarWhereInput | Prisma.TrackScalarWhereInput[];
    OR?: Prisma.TrackScalarWhereInput[];
    NOT?: Prisma.TrackScalarWhereInput | Prisma.TrackScalarWhereInput[];
    id?: Prisma.StringFilter<"Track"> | string;
    deezerId?: Prisma.StringFilter<"Track"> | string;
    mbid?: Prisma.StringNullableFilter<"Track"> | string | null;
    title?: Prisma.StringFilter<"Track"> | string;
    albumId?: Prisma.StringNullableFilter<"Track"> | string | null;
    artistId?: Prisma.StringFilter<"Track"> | string;
    durationMs?: Prisma.IntNullableFilter<"Track"> | number | null;
    trackNumber?: Prisma.IntNullableFilter<"Track"> | number | null;
    previewUrl?: Prisma.StringNullableFilter<"Track"> | string | null;
    lastSyncedAt?: Prisma.DateTimeFilter<"Track"> | Date | string;
    reviewCount?: Prisma.IntFilter<"Track"> | number;
};
export type TrackCreateWithoutAlbumInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    artist: Prisma.ArtistCreateNestedOneWithoutTracksInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutTrackInput;
    trackReviewItems?: Prisma.TrackReviewItemCreateNestedManyWithoutTrackInput;
};
export type TrackUncheckedCreateWithoutAlbumInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    artistId: string;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutTrackInput;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedCreateNestedManyWithoutTrackInput;
};
export type TrackCreateOrConnectWithoutAlbumInput = {
    where: Prisma.TrackWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrackCreateWithoutAlbumInput, Prisma.TrackUncheckedCreateWithoutAlbumInput>;
};
export type TrackCreateManyAlbumInputEnvelope = {
    data: Prisma.TrackCreateManyAlbumInput | Prisma.TrackCreateManyAlbumInput[];
    skipDuplicates?: boolean;
};
export type TrackUpsertWithWhereUniqueWithoutAlbumInput = {
    where: Prisma.TrackWhereUniqueInput;
    update: Prisma.XOR<Prisma.TrackUpdateWithoutAlbumInput, Prisma.TrackUncheckedUpdateWithoutAlbumInput>;
    create: Prisma.XOR<Prisma.TrackCreateWithoutAlbumInput, Prisma.TrackUncheckedCreateWithoutAlbumInput>;
};
export type TrackUpdateWithWhereUniqueWithoutAlbumInput = {
    where: Prisma.TrackWhereUniqueInput;
    data: Prisma.XOR<Prisma.TrackUpdateWithoutAlbumInput, Prisma.TrackUncheckedUpdateWithoutAlbumInput>;
};
export type TrackUpdateManyWithWhereWithoutAlbumInput = {
    where: Prisma.TrackScalarWhereInput;
    data: Prisma.XOR<Prisma.TrackUpdateManyMutationInput, Prisma.TrackUncheckedUpdateManyWithoutAlbumInput>;
};
export type TrackCreateWithoutReviewsInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    album?: Prisma.AlbumCreateNestedOneWithoutTracksInput;
    artist: Prisma.ArtistCreateNestedOneWithoutTracksInput;
    trackReviewItems?: Prisma.TrackReviewItemCreateNestedManyWithoutTrackInput;
};
export type TrackUncheckedCreateWithoutReviewsInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    albumId?: string | null;
    artistId: string;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedCreateNestedManyWithoutTrackInput;
};
export type TrackCreateOrConnectWithoutReviewsInput = {
    where: Prisma.TrackWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrackCreateWithoutReviewsInput, Prisma.TrackUncheckedCreateWithoutReviewsInput>;
};
export type TrackUpsertWithoutReviewsInput = {
    update: Prisma.XOR<Prisma.TrackUpdateWithoutReviewsInput, Prisma.TrackUncheckedUpdateWithoutReviewsInput>;
    create: Prisma.XOR<Prisma.TrackCreateWithoutReviewsInput, Prisma.TrackUncheckedCreateWithoutReviewsInput>;
    where?: Prisma.TrackWhereInput;
};
export type TrackUpdateToOneWithWhereWithoutReviewsInput = {
    where?: Prisma.TrackWhereInput;
    data: Prisma.XOR<Prisma.TrackUpdateWithoutReviewsInput, Prisma.TrackUncheckedUpdateWithoutReviewsInput>;
};
export type TrackUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    album?: Prisma.AlbumUpdateOneWithoutTracksNestedInput;
    artist?: Prisma.ArtistUpdateOneRequiredWithoutTracksNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUpdateManyWithoutTrackNestedInput;
};
export type TrackUncheckedUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedUpdateManyWithoutTrackNestedInput;
};
export type TrackCreateWithoutTrackReviewItemsInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    album?: Prisma.AlbumCreateNestedOneWithoutTracksInput;
    artist: Prisma.ArtistCreateNestedOneWithoutTracksInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutTrackInput;
};
export type TrackUncheckedCreateWithoutTrackReviewItemsInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    albumId?: string | null;
    artistId: string;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutTrackInput;
};
export type TrackCreateOrConnectWithoutTrackReviewItemsInput = {
    where: Prisma.TrackWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrackCreateWithoutTrackReviewItemsInput, Prisma.TrackUncheckedCreateWithoutTrackReviewItemsInput>;
};
export type TrackUpsertWithoutTrackReviewItemsInput = {
    update: Prisma.XOR<Prisma.TrackUpdateWithoutTrackReviewItemsInput, Prisma.TrackUncheckedUpdateWithoutTrackReviewItemsInput>;
    create: Prisma.XOR<Prisma.TrackCreateWithoutTrackReviewItemsInput, Prisma.TrackUncheckedCreateWithoutTrackReviewItemsInput>;
    where?: Prisma.TrackWhereInput;
};
export type TrackUpdateToOneWithWhereWithoutTrackReviewItemsInput = {
    where?: Prisma.TrackWhereInput;
    data: Prisma.XOR<Prisma.TrackUpdateWithoutTrackReviewItemsInput, Prisma.TrackUncheckedUpdateWithoutTrackReviewItemsInput>;
};
export type TrackUpdateWithoutTrackReviewItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    album?: Prisma.AlbumUpdateOneWithoutTracksNestedInput;
    artist?: Prisma.ArtistUpdateOneRequiredWithoutTracksNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutTrackNestedInput;
};
export type TrackUncheckedUpdateWithoutTrackReviewItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutTrackNestedInput;
};
export type TrackCreateManyArtistInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    albumId?: string | null;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
};
export type TrackUpdateWithoutArtistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    album?: Prisma.AlbumUpdateOneWithoutTracksNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutTrackNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUpdateManyWithoutTrackNestedInput;
};
export type TrackUncheckedUpdateWithoutArtistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutTrackNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedUpdateManyWithoutTrackNestedInput;
};
export type TrackUncheckedUpdateManyWithoutArtistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TrackCreateManyAlbumInput = {
    id?: string;
    deezerId: string;
    mbid?: string | null;
    title: string;
    artistId: string;
    durationMs?: number | null;
    trackNumber?: number | null;
    previewUrl?: string | null;
    lastSyncedAt: Date | string;
    reviewCount?: number;
};
export type TrackUpdateWithoutAlbumInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    artist?: Prisma.ArtistUpdateOneRequiredWithoutTracksNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutTrackNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUpdateManyWithoutTrackNestedInput;
};
export type TrackUncheckedUpdateWithoutAlbumInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutTrackNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedUpdateManyWithoutTrackNestedInput;
};
export type TrackUncheckedUpdateManyWithoutAlbumInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    mbid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trackNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    previewUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TrackCountOutputType = {
    reviews: number;
    trackReviewItems: number;
};
export type TrackCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reviews?: boolean | TrackCountOutputTypeCountReviewsArgs;
    trackReviewItems?: boolean | TrackCountOutputTypeCountTrackReviewItemsArgs;
};
export type TrackCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackCountOutputTypeSelect<ExtArgs> | null;
};
export type TrackCountOutputTypeCountReviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
};
export type TrackCountOutputTypeCountTrackReviewItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackReviewItemWhereInput;
};
export type TrackSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    title?: boolean;
    albumId?: boolean;
    artistId?: boolean;
    durationMs?: boolean;
    trackNumber?: boolean;
    previewUrl?: boolean;
    lastSyncedAt?: boolean;
    reviewCount?: boolean;
    album?: boolean | Prisma.Track$albumArgs<ExtArgs>;
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
    reviews?: boolean | Prisma.Track$reviewsArgs<ExtArgs>;
    trackReviewItems?: boolean | Prisma.Track$trackReviewItemsArgs<ExtArgs>;
    _count?: boolean | Prisma.TrackCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["track"]>;
export type TrackSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    title?: boolean;
    albumId?: boolean;
    artistId?: boolean;
    durationMs?: boolean;
    trackNumber?: boolean;
    previewUrl?: boolean;
    lastSyncedAt?: boolean;
    reviewCount?: boolean;
    album?: boolean | Prisma.Track$albumArgs<ExtArgs>;
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["track"]>;
export type TrackSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    title?: boolean;
    albumId?: boolean;
    artistId?: boolean;
    durationMs?: boolean;
    trackNumber?: boolean;
    previewUrl?: boolean;
    lastSyncedAt?: boolean;
    reviewCount?: boolean;
    album?: boolean | Prisma.Track$albumArgs<ExtArgs>;
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["track"]>;
export type TrackSelectScalar = {
    id?: boolean;
    deezerId?: boolean;
    mbid?: boolean;
    title?: boolean;
    albumId?: boolean;
    artistId?: boolean;
    durationMs?: boolean;
    trackNumber?: boolean;
    previewUrl?: boolean;
    lastSyncedAt?: boolean;
    reviewCount?: boolean;
};
export type TrackOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "deezerId" | "mbid" | "title" | "albumId" | "artistId" | "durationMs" | "trackNumber" | "previewUrl" | "lastSyncedAt" | "reviewCount", ExtArgs["result"]["track"]>;
export type TrackInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    album?: boolean | Prisma.Track$albumArgs<ExtArgs>;
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
    reviews?: boolean | Prisma.Track$reviewsArgs<ExtArgs>;
    trackReviewItems?: boolean | Prisma.Track$trackReviewItemsArgs<ExtArgs>;
    _count?: boolean | Prisma.TrackCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TrackIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    album?: boolean | Prisma.Track$albumArgs<ExtArgs>;
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
};
export type TrackIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    album?: boolean | Prisma.Track$albumArgs<ExtArgs>;
    artist?: boolean | Prisma.ArtistDefaultArgs<ExtArgs>;
};
export type $TrackPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Track";
    objects: {
        album: Prisma.$AlbumPayload<ExtArgs> | null;
        artist: Prisma.$ArtistPayload<ExtArgs>;
        reviews: Prisma.$ReviewPayload<ExtArgs>[];
        trackReviewItems: Prisma.$TrackReviewItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        deezerId: string;
        mbid: string | null;
        title: string;
        albumId: string | null;
        artistId: string;
        durationMs: number | null;
        trackNumber: number | null;
        previewUrl: string | null;
        lastSyncedAt: Date;
        reviewCount: number;
    }, ExtArgs["result"]["track"]>;
    composites: {};
};
export type TrackGetPayload<S extends boolean | null | undefined | TrackDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TrackPayload, S>;
export type TrackCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TrackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TrackCountAggregateInputType | true;
};
export interface TrackDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Track'];
        meta: {
            name: 'Track';
        };
    };
    findUnique<T extends TrackFindUniqueArgs>(args: Prisma.SelectSubset<T, TrackFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TrackClient<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TrackFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TrackFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrackClient<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TrackFindFirstArgs>(args?: Prisma.SelectSubset<T, TrackFindFirstArgs<ExtArgs>>): Prisma.Prisma__TrackClient<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TrackFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TrackFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrackClient<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TrackFindManyArgs>(args?: Prisma.SelectSubset<T, TrackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TrackCreateArgs>(args: Prisma.SelectSubset<T, TrackCreateArgs<ExtArgs>>): Prisma.Prisma__TrackClient<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TrackCreateManyArgs>(args?: Prisma.SelectSubset<T, TrackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TrackCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TrackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TrackDeleteArgs>(args: Prisma.SelectSubset<T, TrackDeleteArgs<ExtArgs>>): Prisma.Prisma__TrackClient<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TrackUpdateArgs>(args: Prisma.SelectSubset<T, TrackUpdateArgs<ExtArgs>>): Prisma.Prisma__TrackClient<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TrackDeleteManyArgs>(args?: Prisma.SelectSubset<T, TrackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TrackUpdateManyArgs>(args: Prisma.SelectSubset<T, TrackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TrackUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TrackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TrackUpsertArgs>(args: Prisma.SelectSubset<T, TrackUpsertArgs<ExtArgs>>): Prisma.Prisma__TrackClient<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TrackCountArgs>(args?: Prisma.Subset<T, TrackCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TrackCountAggregateOutputType> : number>;
    aggregate<T extends TrackAggregateArgs>(args: Prisma.Subset<T, TrackAggregateArgs>): Prisma.PrismaPromise<GetTrackAggregateType<T>>;
    groupBy<T extends TrackGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TrackGroupByArgs['orderBy'];
    } : {
        orderBy?: TrackGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TrackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TrackFieldRefs;
}
export interface Prisma__TrackClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    album<T extends Prisma.Track$albumArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Track$albumArgs<ExtArgs>>): Prisma.Prisma__AlbumClient<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    artist<T extends Prisma.ArtistDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ArtistDefaultArgs<ExtArgs>>): Prisma.Prisma__ArtistClient<runtime.Types.Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviews<T extends Prisma.Track$reviewsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Track$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    trackReviewItems<T extends Prisma.Track$trackReviewItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Track$trackReviewItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TrackFieldRefs {
    readonly id: Prisma.FieldRef<"Track", 'String'>;
    readonly deezerId: Prisma.FieldRef<"Track", 'String'>;
    readonly mbid: Prisma.FieldRef<"Track", 'String'>;
    readonly title: Prisma.FieldRef<"Track", 'String'>;
    readonly albumId: Prisma.FieldRef<"Track", 'String'>;
    readonly artistId: Prisma.FieldRef<"Track", 'String'>;
    readonly durationMs: Prisma.FieldRef<"Track", 'Int'>;
    readonly trackNumber: Prisma.FieldRef<"Track", 'Int'>;
    readonly previewUrl: Prisma.FieldRef<"Track", 'String'>;
    readonly lastSyncedAt: Prisma.FieldRef<"Track", 'DateTime'>;
    readonly reviewCount: Prisma.FieldRef<"Track", 'Int'>;
}
export type TrackFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackSelect<ExtArgs> | null;
    omit?: Prisma.TrackOmit<ExtArgs> | null;
    include?: Prisma.TrackInclude<ExtArgs> | null;
    where: Prisma.TrackWhereUniqueInput;
};
export type TrackFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackSelect<ExtArgs> | null;
    omit?: Prisma.TrackOmit<ExtArgs> | null;
    include?: Prisma.TrackInclude<ExtArgs> | null;
    where: Prisma.TrackWhereUniqueInput;
};
export type TrackFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TrackFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TrackFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TrackCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackSelect<ExtArgs> | null;
    omit?: Prisma.TrackOmit<ExtArgs> | null;
    include?: Prisma.TrackInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrackCreateInput, Prisma.TrackUncheckedCreateInput>;
};
export type TrackCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TrackCreateManyInput | Prisma.TrackCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TrackCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TrackOmit<ExtArgs> | null;
    data: Prisma.TrackCreateManyInput | Prisma.TrackCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TrackIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TrackUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackSelect<ExtArgs> | null;
    omit?: Prisma.TrackOmit<ExtArgs> | null;
    include?: Prisma.TrackInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrackUpdateInput, Prisma.TrackUncheckedUpdateInput>;
    where: Prisma.TrackWhereUniqueInput;
};
export type TrackUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TrackUpdateManyMutationInput, Prisma.TrackUncheckedUpdateManyInput>;
    where?: Prisma.TrackWhereInput;
    limit?: number;
};
export type TrackUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TrackOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrackUpdateManyMutationInput, Prisma.TrackUncheckedUpdateManyInput>;
    where?: Prisma.TrackWhereInput;
    limit?: number;
    include?: Prisma.TrackIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TrackUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackSelect<ExtArgs> | null;
    omit?: Prisma.TrackOmit<ExtArgs> | null;
    include?: Prisma.TrackInclude<ExtArgs> | null;
    where: Prisma.TrackWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrackCreateInput, Prisma.TrackUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TrackUpdateInput, Prisma.TrackUncheckedUpdateInput>;
};
export type TrackDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackSelect<ExtArgs> | null;
    omit?: Prisma.TrackOmit<ExtArgs> | null;
    include?: Prisma.TrackInclude<ExtArgs> | null;
    where: Prisma.TrackWhereUniqueInput;
};
export type TrackDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackWhereInput;
    limit?: number;
};
export type Track$albumArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelect<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    include?: Prisma.AlbumInclude<ExtArgs> | null;
    where?: Prisma.AlbumWhereInput;
};
export type Track$reviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Track$trackReviewItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackReviewItemSelect<ExtArgs> | null;
    omit?: Prisma.TrackReviewItemOmit<ExtArgs> | null;
    include?: Prisma.TrackReviewItemInclude<ExtArgs> | null;
    where?: Prisma.TrackReviewItemWhereInput;
    orderBy?: Prisma.TrackReviewItemOrderByWithRelationInput | Prisma.TrackReviewItemOrderByWithRelationInput[];
    cursor?: Prisma.TrackReviewItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TrackReviewItemScalarFieldEnum | Prisma.TrackReviewItemScalarFieldEnum[];
};
export type TrackDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackSelect<ExtArgs> | null;
    omit?: Prisma.TrackOmit<ExtArgs> | null;
    include?: Prisma.TrackInclude<ExtArgs> | null;
};
