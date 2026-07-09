import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReviewModel = runtime.Types.Result.DefaultSelection<Prisma.$ReviewPayload>;
export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
};
export type ReviewAvgAggregateOutputType = {
    rating: runtime.Decimal | null;
};
export type ReviewSumAggregateOutputType = {
    rating: runtime.Decimal | null;
};
export type ReviewMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.ReviewType | null;
    trackId: string | null;
    albumId: string | null;
    description: string | null;
    rating: runtime.Decimal | null;
    status: $Enums.ContentStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
    externalTitle: string | null;
    externalArtistName: string | null;
    externalCoverUrl: string | null;
};
export type ReviewMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.ReviewType | null;
    trackId: string | null;
    albumId: string | null;
    description: string | null;
    rating: runtime.Decimal | null;
    status: $Enums.ContentStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
    externalTitle: string | null;
    externalArtistName: string | null;
    externalCoverUrl: string | null;
};
export type ReviewCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    trackId: number;
    albumId: number;
    description: number;
    rating: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    externalTitle: number;
    externalArtistName: number;
    externalCoverUrl: number;
    _all: number;
};
export type ReviewAvgAggregateInputType = {
    rating?: true;
};
export type ReviewSumAggregateInputType = {
    rating?: true;
};
export type ReviewMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    trackId?: true;
    albumId?: true;
    description?: true;
    rating?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    externalTitle?: true;
    externalArtistName?: true;
    externalCoverUrl?: true;
};
export type ReviewMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    trackId?: true;
    albumId?: true;
    description?: true;
    rating?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    externalTitle?: true;
    externalArtistName?: true;
    externalCoverUrl?: true;
};
export type ReviewCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    trackId?: true;
    albumId?: true;
    description?: true;
    rating?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    externalTitle?: true;
    externalArtistName?: true;
    externalCoverUrl?: true;
    _all?: true;
};
export type ReviewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReviewCountAggregateInputType;
    _avg?: ReviewAvgAggregateInputType;
    _sum?: ReviewSumAggregateInputType;
    _min?: ReviewMinAggregateInputType;
    _max?: ReviewMaxAggregateInputType;
};
export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
    [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReview[P]> : Prisma.GetScalarType<T[P], AggregateReview[P]>;
};
export type ReviewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithAggregationInput | Prisma.ReviewOrderByWithAggregationInput[];
    by: Prisma.ReviewScalarFieldEnum[] | Prisma.ReviewScalarFieldEnum;
    having?: Prisma.ReviewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReviewCountAggregateInputType | true;
    _avg?: ReviewAvgAggregateInputType;
    _sum?: ReviewSumAggregateInputType;
    _min?: ReviewMinAggregateInputType;
    _max?: ReviewMaxAggregateInputType;
};
export type ReviewGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.ReviewType;
    trackId: string | null;
    albumId: string | null;
    description: string;
    rating: runtime.Decimal;
    status: $Enums.ContentStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl: string | null;
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
};
export type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReviewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReviewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReviewGroupByOutputType[P]>;
}>>;
export type ReviewWhereInput = {
    AND?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    OR?: Prisma.ReviewWhereInput[];
    NOT?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    id?: Prisma.StringFilter<"Review"> | string;
    userId?: Prisma.StringFilter<"Review"> | string;
    type?: Prisma.EnumReviewTypeFilter<"Review"> | $Enums.ReviewType;
    trackId?: Prisma.StringNullableFilter<"Review"> | string | null;
    albumId?: Prisma.StringNullableFilter<"Review"> | string | null;
    description?: Prisma.StringFilter<"Review"> | string;
    rating?: Prisma.DecimalFilter<"Review"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFilter<"Review"> | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Review"> | Date | string | null;
    externalTitle?: Prisma.StringFilter<"Review"> | string;
    externalArtistName?: Prisma.StringFilter<"Review"> | string;
    externalCoverUrl?: Prisma.StringNullableFilter<"Review"> | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    track?: Prisma.XOR<Prisma.TrackNullableScalarRelationFilter, Prisma.TrackWhereInput> | null;
    album?: Prisma.XOR<Prisma.AlbumNullableScalarRelationFilter, Prisma.AlbumWhereInput> | null;
    trackReviewItems?: Prisma.TrackReviewItemListRelationFilter;
    reactions?: Prisma.ReviewReactionListRelationFilter;
    comments?: Prisma.CommentListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
};
export type ReviewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    trackId?: Prisma.SortOrderInput | Prisma.SortOrder;
    albumId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    externalTitle?: Prisma.SortOrder;
    externalArtistName?: Prisma.SortOrder;
    externalCoverUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    track?: Prisma.TrackOrderByWithRelationInput;
    album?: Prisma.AlbumOrderByWithRelationInput;
    trackReviewItems?: Prisma.TrackReviewItemOrderByRelationAggregateInput;
    reactions?: Prisma.ReviewReactionOrderByRelationAggregateInput;
    comments?: Prisma.CommentOrderByRelationAggregateInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
};
export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    OR?: Prisma.ReviewWhereInput[];
    NOT?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    userId?: Prisma.StringFilter<"Review"> | string;
    type?: Prisma.EnumReviewTypeFilter<"Review"> | $Enums.ReviewType;
    trackId?: Prisma.StringNullableFilter<"Review"> | string | null;
    albumId?: Prisma.StringNullableFilter<"Review"> | string | null;
    description?: Prisma.StringFilter<"Review"> | string;
    rating?: Prisma.DecimalFilter<"Review"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFilter<"Review"> | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Review"> | Date | string | null;
    externalTitle?: Prisma.StringFilter<"Review"> | string;
    externalArtistName?: Prisma.StringFilter<"Review"> | string;
    externalCoverUrl?: Prisma.StringNullableFilter<"Review"> | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    track?: Prisma.XOR<Prisma.TrackNullableScalarRelationFilter, Prisma.TrackWhereInput> | null;
    album?: Prisma.XOR<Prisma.AlbumNullableScalarRelationFilter, Prisma.AlbumWhereInput> | null;
    trackReviewItems?: Prisma.TrackReviewItemListRelationFilter;
    reactions?: Prisma.ReviewReactionListRelationFilter;
    comments?: Prisma.CommentListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
}, "id">;
export type ReviewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    trackId?: Prisma.SortOrderInput | Prisma.SortOrder;
    albumId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    externalTitle?: Prisma.SortOrder;
    externalArtistName?: Prisma.SortOrder;
    externalCoverUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ReviewCountOrderByAggregateInput;
    _avg?: Prisma.ReviewAvgOrderByAggregateInput;
    _max?: Prisma.ReviewMaxOrderByAggregateInput;
    _min?: Prisma.ReviewMinOrderByAggregateInput;
    _sum?: Prisma.ReviewSumOrderByAggregateInput;
};
export type ReviewScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReviewScalarWhereWithAggregatesInput | Prisma.ReviewScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReviewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReviewScalarWhereWithAggregatesInput | Prisma.ReviewScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    type?: Prisma.EnumReviewTypeWithAggregatesFilter<"Review"> | $Enums.ReviewType;
    trackId?: Prisma.StringNullableWithAggregatesFilter<"Review"> | string | null;
    albumId?: Prisma.StringNullableWithAggregatesFilter<"Review"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    rating?: Prisma.DecimalWithAggregatesFilter<"Review"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusWithAggregatesFilter<"Review"> | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Review"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Review"> | Date | string | null;
    externalTitle?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    externalArtistName?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    externalCoverUrl?: Prisma.StringNullableWithAggregatesFilter<"Review"> | string | null;
};
export type ReviewCreateInput = {
    id?: string;
    type: $Enums.ReviewType;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    track?: Prisma.TrackCreateNestedOneWithoutReviewsInput;
    album?: Prisma.AlbumCreateNestedOneWithoutReviewsInput;
    trackReviewItems?: Prisma.TrackReviewItemCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutReviewInput;
};
export type ReviewUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: $Enums.ReviewType;
    trackId?: string | null;
    albumId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionUncheckedCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutReviewInput;
};
export type ReviewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    track?: Prisma.TrackUpdateOneWithoutReviewsNestedInput;
    album?: Prisma.AlbumUpdateOneWithoutReviewsNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    trackId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUncheckedUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ReviewCreateManyInput = {
    id?: string;
    userId: string;
    type: $Enums.ReviewType;
    trackId?: string | null;
    albumId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
};
export type ReviewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReviewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    trackId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReviewListRelationFilter = {
    every?: Prisma.ReviewWhereInput;
    some?: Prisma.ReviewWhereInput;
    none?: Prisma.ReviewWhereInput;
};
export type ReviewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReviewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    trackId?: Prisma.SortOrder;
    albumId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    externalTitle?: Prisma.SortOrder;
    externalArtistName?: Prisma.SortOrder;
    externalCoverUrl?: Prisma.SortOrder;
};
export type ReviewAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type ReviewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    trackId?: Prisma.SortOrder;
    albumId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    externalTitle?: Prisma.SortOrder;
    externalArtistName?: Prisma.SortOrder;
    externalCoverUrl?: Prisma.SortOrder;
};
export type ReviewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    trackId?: Prisma.SortOrder;
    albumId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    externalTitle?: Prisma.SortOrder;
    externalArtistName?: Prisma.SortOrder;
    externalCoverUrl?: Prisma.SortOrder;
};
export type ReviewSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type ReviewScalarRelationFilter = {
    is?: Prisma.ReviewWhereInput;
    isNot?: Prisma.ReviewWhereInput;
};
export type ReviewNullableScalarRelationFilter = {
    is?: Prisma.ReviewWhereInput | null;
    isNot?: Prisma.ReviewWhereInput | null;
};
export type ReviewCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput> | Prisma.ReviewCreateWithoutUserInput[] | Prisma.ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutUserInput | Prisma.ReviewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ReviewCreateManyUserInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput> | Prisma.ReviewCreateWithoutUserInput[] | Prisma.ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutUserInput | Prisma.ReviewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ReviewCreateManyUserInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput> | Prisma.ReviewCreateWithoutUserInput[] | Prisma.ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutUserInput | Prisma.ReviewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput | Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ReviewCreateManyUserInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput | Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutUserInput | Prisma.ReviewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput> | Prisma.ReviewCreateWithoutUserInput[] | Prisma.ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutUserInput | Prisma.ReviewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput | Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ReviewCreateManyUserInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput | Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutUserInput | Prisma.ReviewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewCreateNestedManyWithoutAlbumInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutAlbumInput, Prisma.ReviewUncheckedCreateWithoutAlbumInput> | Prisma.ReviewCreateWithoutAlbumInput[] | Prisma.ReviewUncheckedCreateWithoutAlbumInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutAlbumInput | Prisma.ReviewCreateOrConnectWithoutAlbumInput[];
    createMany?: Prisma.ReviewCreateManyAlbumInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutAlbumInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutAlbumInput, Prisma.ReviewUncheckedCreateWithoutAlbumInput> | Prisma.ReviewCreateWithoutAlbumInput[] | Prisma.ReviewUncheckedCreateWithoutAlbumInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutAlbumInput | Prisma.ReviewCreateOrConnectWithoutAlbumInput[];
    createMany?: Prisma.ReviewCreateManyAlbumInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUpdateManyWithoutAlbumNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutAlbumInput, Prisma.ReviewUncheckedCreateWithoutAlbumInput> | Prisma.ReviewCreateWithoutAlbumInput[] | Prisma.ReviewUncheckedCreateWithoutAlbumInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutAlbumInput | Prisma.ReviewCreateOrConnectWithoutAlbumInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutAlbumInput | Prisma.ReviewUpsertWithWhereUniqueWithoutAlbumInput[];
    createMany?: Prisma.ReviewCreateManyAlbumInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutAlbumInput | Prisma.ReviewUpdateWithWhereUniqueWithoutAlbumInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutAlbumInput | Prisma.ReviewUpdateManyWithWhereWithoutAlbumInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutAlbumNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutAlbumInput, Prisma.ReviewUncheckedCreateWithoutAlbumInput> | Prisma.ReviewCreateWithoutAlbumInput[] | Prisma.ReviewUncheckedCreateWithoutAlbumInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutAlbumInput | Prisma.ReviewCreateOrConnectWithoutAlbumInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutAlbumInput | Prisma.ReviewUpsertWithWhereUniqueWithoutAlbumInput[];
    createMany?: Prisma.ReviewCreateManyAlbumInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutAlbumInput | Prisma.ReviewUpdateWithWhereUniqueWithoutAlbumInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutAlbumInput | Prisma.ReviewUpdateManyWithWhereWithoutAlbumInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewCreateNestedManyWithoutTrackInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutTrackInput, Prisma.ReviewUncheckedCreateWithoutTrackInput> | Prisma.ReviewCreateWithoutTrackInput[] | Prisma.ReviewUncheckedCreateWithoutTrackInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutTrackInput | Prisma.ReviewCreateOrConnectWithoutTrackInput[];
    createMany?: Prisma.ReviewCreateManyTrackInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutTrackInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutTrackInput, Prisma.ReviewUncheckedCreateWithoutTrackInput> | Prisma.ReviewCreateWithoutTrackInput[] | Prisma.ReviewUncheckedCreateWithoutTrackInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutTrackInput | Prisma.ReviewCreateOrConnectWithoutTrackInput[];
    createMany?: Prisma.ReviewCreateManyTrackInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUpdateManyWithoutTrackNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutTrackInput, Prisma.ReviewUncheckedCreateWithoutTrackInput> | Prisma.ReviewCreateWithoutTrackInput[] | Prisma.ReviewUncheckedCreateWithoutTrackInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutTrackInput | Prisma.ReviewCreateOrConnectWithoutTrackInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutTrackInput | Prisma.ReviewUpsertWithWhereUniqueWithoutTrackInput[];
    createMany?: Prisma.ReviewCreateManyTrackInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutTrackInput | Prisma.ReviewUpdateWithWhereUniqueWithoutTrackInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutTrackInput | Prisma.ReviewUpdateManyWithWhereWithoutTrackInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutTrackNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutTrackInput, Prisma.ReviewUncheckedCreateWithoutTrackInput> | Prisma.ReviewCreateWithoutTrackInput[] | Prisma.ReviewUncheckedCreateWithoutTrackInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutTrackInput | Prisma.ReviewCreateOrConnectWithoutTrackInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutTrackInput | Prisma.ReviewUpsertWithWhereUniqueWithoutTrackInput[];
    createMany?: Prisma.ReviewCreateManyTrackInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutTrackInput | Prisma.ReviewUpdateWithWhereUniqueWithoutTrackInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutTrackInput | Prisma.ReviewUpdateManyWithWhereWithoutTrackInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type EnumReviewTypeFieldUpdateOperationsInput = {
    set?: $Enums.ReviewType;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type EnumContentStatusFieldUpdateOperationsInput = {
    set?: $Enums.ContentStatus;
};
export type ReviewCreateNestedOneWithoutTrackReviewItemsInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutTrackReviewItemsInput, Prisma.ReviewUncheckedCreateWithoutTrackReviewItemsInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutTrackReviewItemsInput;
    connect?: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUpdateOneRequiredWithoutTrackReviewItemsNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutTrackReviewItemsInput, Prisma.ReviewUncheckedCreateWithoutTrackReviewItemsInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutTrackReviewItemsInput;
    upsert?: Prisma.ReviewUpsertWithoutTrackReviewItemsInput;
    connect?: Prisma.ReviewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReviewUpdateToOneWithWhereWithoutTrackReviewItemsInput, Prisma.ReviewUpdateWithoutTrackReviewItemsInput>, Prisma.ReviewUncheckedUpdateWithoutTrackReviewItemsInput>;
};
export type ReviewCreateNestedOneWithoutReactionsInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutReactionsInput, Prisma.ReviewUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutReactionsInput;
    connect?: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutReactionsInput, Prisma.ReviewUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutReactionsInput;
    upsert?: Prisma.ReviewUpsertWithoutReactionsInput;
    connect?: Prisma.ReviewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReviewUpdateToOneWithWhereWithoutReactionsInput, Prisma.ReviewUpdateWithoutReactionsInput>, Prisma.ReviewUncheckedUpdateWithoutReactionsInput>;
};
export type ReviewCreateNestedOneWithoutCommentsInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutCommentsInput, Prisma.ReviewUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutCommentsInput;
    connect?: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutCommentsInput, Prisma.ReviewUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutCommentsInput;
    upsert?: Prisma.ReviewUpsertWithoutCommentsInput;
    connect?: Prisma.ReviewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReviewUpdateToOneWithWhereWithoutCommentsInput, Prisma.ReviewUpdateWithoutCommentsInput>, Prisma.ReviewUncheckedUpdateWithoutCommentsInput>;
};
export type ReviewCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutNotificationsInput, Prisma.ReviewUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUpdateOneWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutNotificationsInput, Prisma.ReviewUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.ReviewUpsertWithoutNotificationsInput;
    disconnect?: Prisma.ReviewWhereInput | boolean;
    delete?: Prisma.ReviewWhereInput | boolean;
    connect?: Prisma.ReviewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReviewUpdateToOneWithWhereWithoutNotificationsInput, Prisma.ReviewUpdateWithoutNotificationsInput>, Prisma.ReviewUncheckedUpdateWithoutNotificationsInput>;
};
export type ReviewCreateWithoutUserInput = {
    id?: string;
    type: $Enums.ReviewType;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    track?: Prisma.TrackCreateNestedOneWithoutReviewsInput;
    album?: Prisma.AlbumCreateNestedOneWithoutReviewsInput;
    trackReviewItems?: Prisma.TrackReviewItemCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutReviewInput;
};
export type ReviewUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.ReviewType;
    trackId?: string | null;
    albumId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionUncheckedCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutReviewInput;
};
export type ReviewCreateOrConnectWithoutUserInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput>;
};
export type ReviewCreateManyUserInputEnvelope = {
    data: Prisma.ReviewCreateManyUserInput | Prisma.ReviewCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutUserInput, Prisma.ReviewUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutUserInput, Prisma.ReviewUncheckedUpdateWithoutUserInput>;
};
export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutUserInput>;
};
export type ReviewScalarWhereInput = {
    AND?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
    OR?: Prisma.ReviewScalarWhereInput[];
    NOT?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
    id?: Prisma.StringFilter<"Review"> | string;
    userId?: Prisma.StringFilter<"Review"> | string;
    type?: Prisma.EnumReviewTypeFilter<"Review"> | $Enums.ReviewType;
    trackId?: Prisma.StringNullableFilter<"Review"> | string | null;
    albumId?: Prisma.StringNullableFilter<"Review"> | string | null;
    description?: Prisma.StringFilter<"Review"> | string;
    rating?: Prisma.DecimalFilter<"Review"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFilter<"Review"> | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Review"> | Date | string | null;
    externalTitle?: Prisma.StringFilter<"Review"> | string;
    externalArtistName?: Prisma.StringFilter<"Review"> | string;
    externalCoverUrl?: Prisma.StringNullableFilter<"Review"> | string | null;
};
export type ReviewCreateWithoutAlbumInput = {
    id?: string;
    type: $Enums.ReviewType;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    track?: Prisma.TrackCreateNestedOneWithoutReviewsInput;
    trackReviewItems?: Prisma.TrackReviewItemCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutReviewInput;
};
export type ReviewUncheckedCreateWithoutAlbumInput = {
    id?: string;
    userId: string;
    type: $Enums.ReviewType;
    trackId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionUncheckedCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutReviewInput;
};
export type ReviewCreateOrConnectWithoutAlbumInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutAlbumInput, Prisma.ReviewUncheckedCreateWithoutAlbumInput>;
};
export type ReviewCreateManyAlbumInputEnvelope = {
    data: Prisma.ReviewCreateManyAlbumInput | Prisma.ReviewCreateManyAlbumInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpsertWithWhereUniqueWithoutAlbumInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutAlbumInput, Prisma.ReviewUncheckedUpdateWithoutAlbumInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutAlbumInput, Prisma.ReviewUncheckedCreateWithoutAlbumInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutAlbumInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutAlbumInput, Prisma.ReviewUncheckedUpdateWithoutAlbumInput>;
};
export type ReviewUpdateManyWithWhereWithoutAlbumInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutAlbumInput>;
};
export type ReviewCreateWithoutTrackInput = {
    id?: string;
    type: $Enums.ReviewType;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    album?: Prisma.AlbumCreateNestedOneWithoutReviewsInput;
    trackReviewItems?: Prisma.TrackReviewItemCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutReviewInput;
};
export type ReviewUncheckedCreateWithoutTrackInput = {
    id?: string;
    userId: string;
    type: $Enums.ReviewType;
    albumId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionUncheckedCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutReviewInput;
};
export type ReviewCreateOrConnectWithoutTrackInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutTrackInput, Prisma.ReviewUncheckedCreateWithoutTrackInput>;
};
export type ReviewCreateManyTrackInputEnvelope = {
    data: Prisma.ReviewCreateManyTrackInput | Prisma.ReviewCreateManyTrackInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpsertWithWhereUniqueWithoutTrackInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutTrackInput, Prisma.ReviewUncheckedUpdateWithoutTrackInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutTrackInput, Prisma.ReviewUncheckedCreateWithoutTrackInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutTrackInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutTrackInput, Prisma.ReviewUncheckedUpdateWithoutTrackInput>;
};
export type ReviewUpdateManyWithWhereWithoutTrackInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutTrackInput>;
};
export type ReviewCreateWithoutTrackReviewItemsInput = {
    id?: string;
    type: $Enums.ReviewType;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    track?: Prisma.TrackCreateNestedOneWithoutReviewsInput;
    album?: Prisma.AlbumCreateNestedOneWithoutReviewsInput;
    reactions?: Prisma.ReviewReactionCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutReviewInput;
};
export type ReviewUncheckedCreateWithoutTrackReviewItemsInput = {
    id?: string;
    userId: string;
    type: $Enums.ReviewType;
    trackId?: string | null;
    albumId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    reactions?: Prisma.ReviewReactionUncheckedCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutReviewInput;
};
export type ReviewCreateOrConnectWithoutTrackReviewItemsInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutTrackReviewItemsInput, Prisma.ReviewUncheckedCreateWithoutTrackReviewItemsInput>;
};
export type ReviewUpsertWithoutTrackReviewItemsInput = {
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutTrackReviewItemsInput, Prisma.ReviewUncheckedUpdateWithoutTrackReviewItemsInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutTrackReviewItemsInput, Prisma.ReviewUncheckedCreateWithoutTrackReviewItemsInput>;
    where?: Prisma.ReviewWhereInput;
};
export type ReviewUpdateToOneWithWhereWithoutTrackReviewItemsInput = {
    where?: Prisma.ReviewWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutTrackReviewItemsInput, Prisma.ReviewUncheckedUpdateWithoutTrackReviewItemsInput>;
};
export type ReviewUpdateWithoutTrackReviewItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    track?: Prisma.TrackUpdateOneWithoutReviewsNestedInput;
    album?: Prisma.AlbumUpdateOneWithoutReviewsNestedInput;
    reactions?: Prisma.ReviewReactionUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateWithoutTrackReviewItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    trackId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reactions?: Prisma.ReviewReactionUncheckedUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ReviewCreateWithoutReactionsInput = {
    id?: string;
    type: $Enums.ReviewType;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    track?: Prisma.TrackCreateNestedOneWithoutReviewsInput;
    album?: Prisma.AlbumCreateNestedOneWithoutReviewsInput;
    trackReviewItems?: Prisma.TrackReviewItemCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutReviewInput;
};
export type ReviewUncheckedCreateWithoutReactionsInput = {
    id?: string;
    userId: string;
    type: $Enums.ReviewType;
    trackId?: string | null;
    albumId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutReviewInput;
};
export type ReviewCreateOrConnectWithoutReactionsInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutReactionsInput, Prisma.ReviewUncheckedCreateWithoutReactionsInput>;
};
export type ReviewUpsertWithoutReactionsInput = {
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutReactionsInput, Prisma.ReviewUncheckedUpdateWithoutReactionsInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutReactionsInput, Prisma.ReviewUncheckedCreateWithoutReactionsInput>;
    where?: Prisma.ReviewWhereInput;
};
export type ReviewUpdateToOneWithWhereWithoutReactionsInput = {
    where?: Prisma.ReviewWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutReactionsInput, Prisma.ReviewUncheckedUpdateWithoutReactionsInput>;
};
export type ReviewUpdateWithoutReactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    track?: Prisma.TrackUpdateOneWithoutReviewsNestedInput;
    album?: Prisma.AlbumUpdateOneWithoutReviewsNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateWithoutReactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    trackId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ReviewCreateWithoutCommentsInput = {
    id?: string;
    type: $Enums.ReviewType;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    track?: Prisma.TrackCreateNestedOneWithoutReviewsInput;
    album?: Prisma.AlbumCreateNestedOneWithoutReviewsInput;
    trackReviewItems?: Prisma.TrackReviewItemCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutReviewInput;
};
export type ReviewUncheckedCreateWithoutCommentsInput = {
    id?: string;
    userId: string;
    type: $Enums.ReviewType;
    trackId?: string | null;
    albumId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionUncheckedCreateNestedManyWithoutReviewInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutReviewInput;
};
export type ReviewCreateOrConnectWithoutCommentsInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutCommentsInput, Prisma.ReviewUncheckedCreateWithoutCommentsInput>;
};
export type ReviewUpsertWithoutCommentsInput = {
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutCommentsInput, Prisma.ReviewUncheckedUpdateWithoutCommentsInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutCommentsInput, Prisma.ReviewUncheckedCreateWithoutCommentsInput>;
    where?: Prisma.ReviewWhereInput;
};
export type ReviewUpdateToOneWithWhereWithoutCommentsInput = {
    where?: Prisma.ReviewWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutCommentsInput, Prisma.ReviewUncheckedUpdateWithoutCommentsInput>;
};
export type ReviewUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    track?: Prisma.TrackUpdateOneWithoutReviewsNestedInput;
    album?: Prisma.AlbumUpdateOneWithoutReviewsNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    trackId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUncheckedUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ReviewCreateWithoutNotificationsInput = {
    id?: string;
    type: $Enums.ReviewType;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    track?: Prisma.TrackCreateNestedOneWithoutReviewsInput;
    album?: Prisma.AlbumCreateNestedOneWithoutReviewsInput;
    trackReviewItems?: Prisma.TrackReviewItemCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentCreateNestedManyWithoutReviewInput;
};
export type ReviewUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    userId: string;
    type: $Enums.ReviewType;
    trackId?: string | null;
    albumId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedCreateNestedManyWithoutReviewInput;
    reactions?: Prisma.ReviewReactionUncheckedCreateNestedManyWithoutReviewInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutReviewInput;
};
export type ReviewCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutNotificationsInput, Prisma.ReviewUncheckedCreateWithoutNotificationsInput>;
};
export type ReviewUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutNotificationsInput, Prisma.ReviewUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutNotificationsInput, Prisma.ReviewUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.ReviewWhereInput;
};
export type ReviewUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.ReviewWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutNotificationsInput, Prisma.ReviewUncheckedUpdateWithoutNotificationsInput>;
};
export type ReviewUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    track?: Prisma.TrackUpdateOneWithoutReviewsNestedInput;
    album?: Prisma.AlbumUpdateOneWithoutReviewsNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    trackId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUncheckedUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ReviewCreateManyUserInput = {
    id?: string;
    type: $Enums.ReviewType;
    trackId?: string | null;
    albumId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
};
export type ReviewUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    track?: Prisma.TrackUpdateOneWithoutReviewsNestedInput;
    album?: Prisma.AlbumUpdateOneWithoutReviewsNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    trackId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUncheckedUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    trackId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReviewCreateManyAlbumInput = {
    id?: string;
    userId: string;
    type: $Enums.ReviewType;
    trackId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
};
export type ReviewUpdateWithoutAlbumInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    track?: Prisma.TrackUpdateOneWithoutReviewsNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateWithoutAlbumInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    trackId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUncheckedUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateManyWithoutAlbumInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    trackId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReviewCreateManyTrackInput = {
    id?: string;
    userId: string;
    type: $Enums.ReviewType;
    albumId?: string | null;
    description: string;
    rating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl?: string | null;
};
export type ReviewUpdateWithoutTrackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    album?: Prisma.AlbumUpdateOneWithoutReviewsNestedInput;
    trackReviewItems?: Prisma.TrackReviewItemUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateWithoutTrackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trackReviewItems?: Prisma.TrackReviewItemUncheckedUpdateManyWithoutReviewNestedInput;
    reactions?: Prisma.ReviewReactionUncheckedUpdateManyWithoutReviewNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutReviewNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateManyWithoutTrackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType;
    albumId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    externalTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    externalArtistName?: Prisma.StringFieldUpdateOperationsInput | string;
    externalCoverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReviewCountOutputType = {
    trackReviewItems: number;
    reactions: number;
    comments: number;
    notifications: number;
};
export type ReviewCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    trackReviewItems?: boolean | ReviewCountOutputTypeCountTrackReviewItemsArgs;
    reactions?: boolean | ReviewCountOutputTypeCountReactionsArgs;
    comments?: boolean | ReviewCountOutputTypeCountCommentsArgs;
    notifications?: boolean | ReviewCountOutputTypeCountNotificationsArgs;
};
export type ReviewCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewCountOutputTypeSelect<ExtArgs> | null;
};
export type ReviewCountOutputTypeCountTrackReviewItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackReviewItemWhereInput;
};
export type ReviewCountOutputTypeCountReactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewReactionWhereInput;
};
export type ReviewCountOutputTypeCountCommentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
};
export type ReviewCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type ReviewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    trackId?: boolean;
    albumId?: boolean;
    description?: boolean;
    rating?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    externalTitle?: boolean;
    externalArtistName?: boolean;
    externalCoverUrl?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.Review$trackArgs<ExtArgs>;
    album?: boolean | Prisma.Review$albumArgs<ExtArgs>;
    trackReviewItems?: boolean | Prisma.Review$trackReviewItemsArgs<ExtArgs>;
    reactions?: boolean | Prisma.Review$reactionsArgs<ExtArgs>;
    comments?: boolean | Prisma.Review$commentsArgs<ExtArgs>;
    notifications?: boolean | Prisma.Review$notificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.ReviewCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    trackId?: boolean;
    albumId?: boolean;
    description?: boolean;
    rating?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    externalTitle?: boolean;
    externalArtistName?: boolean;
    externalCoverUrl?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.Review$trackArgs<ExtArgs>;
    album?: boolean | Prisma.Review$albumArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    trackId?: boolean;
    albumId?: boolean;
    description?: boolean;
    rating?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    externalTitle?: boolean;
    externalArtistName?: boolean;
    externalCoverUrl?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.Review$trackArgs<ExtArgs>;
    album?: boolean | Prisma.Review$albumArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    trackId?: boolean;
    albumId?: boolean;
    description?: boolean;
    rating?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    externalTitle?: boolean;
    externalArtistName?: boolean;
    externalCoverUrl?: boolean;
};
export type ReviewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "trackId" | "albumId" | "description" | "rating" | "status" | "createdAt" | "updatedAt" | "deletedAt" | "externalTitle" | "externalArtistName" | "externalCoverUrl", ExtArgs["result"]["review"]>;
export type ReviewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.Review$trackArgs<ExtArgs>;
    album?: boolean | Prisma.Review$albumArgs<ExtArgs>;
    trackReviewItems?: boolean | Prisma.Review$trackReviewItemsArgs<ExtArgs>;
    reactions?: boolean | Prisma.Review$reactionsArgs<ExtArgs>;
    comments?: boolean | Prisma.Review$commentsArgs<ExtArgs>;
    notifications?: boolean | Prisma.Review$notificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.ReviewCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ReviewIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.Review$trackArgs<ExtArgs>;
    album?: boolean | Prisma.Review$albumArgs<ExtArgs>;
};
export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.Review$trackArgs<ExtArgs>;
    album?: boolean | Prisma.Review$albumArgs<ExtArgs>;
};
export type $ReviewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Review";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        track: Prisma.$TrackPayload<ExtArgs> | null;
        album: Prisma.$AlbumPayload<ExtArgs> | null;
        trackReviewItems: Prisma.$TrackReviewItemPayload<ExtArgs>[];
        reactions: Prisma.$ReviewReactionPayload<ExtArgs>[];
        comments: Prisma.$CommentPayload<ExtArgs>[];
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: $Enums.ReviewType;
        trackId: string | null;
        albumId: string | null;
        description: string;
        rating: runtime.Decimal;
        status: $Enums.ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }, ExtArgs["result"]["review"]>;
    composites: {};
};
export type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReviewPayload, S>;
export type ReviewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReviewCountAggregateInputType | true;
};
export interface ReviewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Review'];
        meta: {
            name: 'Review';
        };
    };
    findUnique<T extends ReviewFindUniqueArgs>(args: Prisma.SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReviewFindFirstArgs>(args?: Prisma.SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReviewFindManyArgs>(args?: Prisma.SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReviewCreateArgs>(args: Prisma.SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReviewCreateManyArgs>(args?: Prisma.SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReviewDeleteArgs>(args: Prisma.SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReviewUpdateArgs>(args: Prisma.SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReviewDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReviewUpdateManyArgs>(args: Prisma.SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReviewUpsertArgs>(args: Prisma.SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReviewCountArgs>(args?: Prisma.Subset<T, ReviewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReviewCountAggregateOutputType> : number>;
    aggregate<T extends ReviewAggregateArgs>(args: Prisma.Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>;
    groupBy<T extends ReviewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReviewGroupByArgs['orderBy'];
    } : {
        orderBy?: ReviewGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReviewFieldRefs;
}
export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    track<T extends Prisma.Review$trackArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Review$trackArgs<ExtArgs>>): Prisma.Prisma__TrackClient<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    album<T extends Prisma.Review$albumArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Review$albumArgs<ExtArgs>>): Prisma.Prisma__AlbumClient<runtime.Types.Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    trackReviewItems<T extends Prisma.Review$trackReviewItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Review$trackReviewItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reactions<T extends Prisma.Review$reactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Review$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    comments<T extends Prisma.Review$commentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Review$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notifications<T extends Prisma.Review$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Review$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReviewFieldRefs {
    readonly id: Prisma.FieldRef<"Review", 'String'>;
    readonly userId: Prisma.FieldRef<"Review", 'String'>;
    readonly type: Prisma.FieldRef<"Review", 'ReviewType'>;
    readonly trackId: Prisma.FieldRef<"Review", 'String'>;
    readonly albumId: Prisma.FieldRef<"Review", 'String'>;
    readonly description: Prisma.FieldRef<"Review", 'String'>;
    readonly rating: Prisma.FieldRef<"Review", 'Decimal'>;
    readonly status: Prisma.FieldRef<"Review", 'ContentStatus'>;
    readonly createdAt: Prisma.FieldRef<"Review", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Review", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Review", 'DateTime'>;
    readonly externalTitle: Prisma.FieldRef<"Review", 'String'>;
    readonly externalArtistName: Prisma.FieldRef<"Review", 'String'>;
    readonly externalCoverUrl: Prisma.FieldRef<"Review", 'String'>;
}
export type ReviewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReviewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReviewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReviewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewCreateInput, Prisma.ReviewUncheckedCreateInput>;
};
export type ReviewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReviewCreateManyInput | Prisma.ReviewCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReviewCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    data: Prisma.ReviewCreateManyInput | Prisma.ReviewCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReviewIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReviewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewUpdateInput, Prisma.ReviewUncheckedUpdateInput>;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyInput>;
    where?: Prisma.ReviewWhereInput;
    limit?: number;
};
export type ReviewUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyInput>;
    where?: Prisma.ReviewWhereInput;
    limit?: number;
    include?: Prisma.ReviewIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReviewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateInput, Prisma.ReviewUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReviewUpdateInput, Prisma.ReviewUncheckedUpdateInput>;
};
export type ReviewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    limit?: number;
};
export type Review$trackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackSelect<ExtArgs> | null;
    omit?: Prisma.TrackOmit<ExtArgs> | null;
    include?: Prisma.TrackInclude<ExtArgs> | null;
    where?: Prisma.TrackWhereInput;
};
export type Review$albumArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AlbumSelect<ExtArgs> | null;
    omit?: Prisma.AlbumOmit<ExtArgs> | null;
    include?: Prisma.AlbumInclude<ExtArgs> | null;
    where?: Prisma.AlbumWhereInput;
};
export type Review$trackReviewItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Review$reactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewReactionSelect<ExtArgs> | null;
    omit?: Prisma.ReviewReactionOmit<ExtArgs> | null;
    include?: Prisma.ReviewReactionInclude<ExtArgs> | null;
    where?: Prisma.ReviewReactionWhereInput;
    orderBy?: Prisma.ReviewReactionOrderByWithRelationInput | Prisma.ReviewReactionOrderByWithRelationInput[];
    cursor?: Prisma.ReviewReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewReactionScalarFieldEnum | Prisma.ReviewReactionScalarFieldEnum[];
};
export type Review$commentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[];
    cursor?: Prisma.CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentScalarFieldEnum | Prisma.CommentScalarFieldEnum[];
};
export type Review$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type ReviewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
};
