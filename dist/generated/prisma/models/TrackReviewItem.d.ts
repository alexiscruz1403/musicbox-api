import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TrackReviewItemModel = runtime.Types.Result.DefaultSelection<Prisma.$TrackReviewItemPayload>;
export type AggregateTrackReviewItem = {
    _count: TrackReviewItemCountAggregateOutputType | null;
    _avg: TrackReviewItemAvgAggregateOutputType | null;
    _sum: TrackReviewItemSumAggregateOutputType | null;
    _min: TrackReviewItemMinAggregateOutputType | null;
    _max: TrackReviewItemMaxAggregateOutputType | null;
};
export type TrackReviewItemAvgAggregateOutputType = {
    rating: number | null;
    position: number | null;
};
export type TrackReviewItemSumAggregateOutputType = {
    rating: number | null;
    position: number | null;
};
export type TrackReviewItemMinAggregateOutputType = {
    id: string | null;
    reviewId: string | null;
    trackId: string | null;
    rating: number | null;
    description: string | null;
    position: number | null;
};
export type TrackReviewItemMaxAggregateOutputType = {
    id: string | null;
    reviewId: string | null;
    trackId: string | null;
    rating: number | null;
    description: string | null;
    position: number | null;
};
export type TrackReviewItemCountAggregateOutputType = {
    id: number;
    reviewId: number;
    trackId: number;
    rating: number;
    description: number;
    position: number;
    _all: number;
};
export type TrackReviewItemAvgAggregateInputType = {
    rating?: true;
    position?: true;
};
export type TrackReviewItemSumAggregateInputType = {
    rating?: true;
    position?: true;
};
export type TrackReviewItemMinAggregateInputType = {
    id?: true;
    reviewId?: true;
    trackId?: true;
    rating?: true;
    description?: true;
    position?: true;
};
export type TrackReviewItemMaxAggregateInputType = {
    id?: true;
    reviewId?: true;
    trackId?: true;
    rating?: true;
    description?: true;
    position?: true;
};
export type TrackReviewItemCountAggregateInputType = {
    id?: true;
    reviewId?: true;
    trackId?: true;
    rating?: true;
    description?: true;
    position?: true;
    _all?: true;
};
export type TrackReviewItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackReviewItemWhereInput;
    orderBy?: Prisma.TrackReviewItemOrderByWithRelationInput | Prisma.TrackReviewItemOrderByWithRelationInput[];
    cursor?: Prisma.TrackReviewItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TrackReviewItemCountAggregateInputType;
    _avg?: TrackReviewItemAvgAggregateInputType;
    _sum?: TrackReviewItemSumAggregateInputType;
    _min?: TrackReviewItemMinAggregateInputType;
    _max?: TrackReviewItemMaxAggregateInputType;
};
export type GetTrackReviewItemAggregateType<T extends TrackReviewItemAggregateArgs> = {
    [P in keyof T & keyof AggregateTrackReviewItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTrackReviewItem[P]> : Prisma.GetScalarType<T[P], AggregateTrackReviewItem[P]>;
};
export type TrackReviewItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackReviewItemWhereInput;
    orderBy?: Prisma.TrackReviewItemOrderByWithAggregationInput | Prisma.TrackReviewItemOrderByWithAggregationInput[];
    by: Prisma.TrackReviewItemScalarFieldEnum[] | Prisma.TrackReviewItemScalarFieldEnum;
    having?: Prisma.TrackReviewItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TrackReviewItemCountAggregateInputType | true;
    _avg?: TrackReviewItemAvgAggregateInputType;
    _sum?: TrackReviewItemSumAggregateInputType;
    _min?: TrackReviewItemMinAggregateInputType;
    _max?: TrackReviewItemMaxAggregateInputType;
};
export type TrackReviewItemGroupByOutputType = {
    id: string;
    reviewId: string;
    trackId: string;
    rating: number;
    description: string | null;
    position: number;
    _count: TrackReviewItemCountAggregateOutputType | null;
    _avg: TrackReviewItemAvgAggregateOutputType | null;
    _sum: TrackReviewItemSumAggregateOutputType | null;
    _min: TrackReviewItemMinAggregateOutputType | null;
    _max: TrackReviewItemMaxAggregateOutputType | null;
};
export type GetTrackReviewItemGroupByPayload<T extends TrackReviewItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TrackReviewItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TrackReviewItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TrackReviewItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TrackReviewItemGroupByOutputType[P]>;
}>>;
export type TrackReviewItemWhereInput = {
    AND?: Prisma.TrackReviewItemWhereInput | Prisma.TrackReviewItemWhereInput[];
    OR?: Prisma.TrackReviewItemWhereInput[];
    NOT?: Prisma.TrackReviewItemWhereInput | Prisma.TrackReviewItemWhereInput[];
    id?: Prisma.StringFilter<"TrackReviewItem"> | string;
    reviewId?: Prisma.StringFilter<"TrackReviewItem"> | string;
    trackId?: Prisma.StringFilter<"TrackReviewItem"> | string;
    rating?: Prisma.IntFilter<"TrackReviewItem"> | number;
    description?: Prisma.StringNullableFilter<"TrackReviewItem"> | string | null;
    position?: Prisma.IntFilter<"TrackReviewItem"> | number;
    review?: Prisma.XOR<Prisma.ReviewScalarRelationFilter, Prisma.ReviewWhereInput>;
    track?: Prisma.XOR<Prisma.TrackScalarRelationFilter, Prisma.TrackWhereInput>;
};
export type TrackReviewItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    trackId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    review?: Prisma.ReviewOrderByWithRelationInput;
    track?: Prisma.TrackOrderByWithRelationInput;
};
export type TrackReviewItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    reviewId_trackId?: Prisma.TrackReviewItemReviewIdTrackIdCompoundUniqueInput;
    AND?: Prisma.TrackReviewItemWhereInput | Prisma.TrackReviewItemWhereInput[];
    OR?: Prisma.TrackReviewItemWhereInput[];
    NOT?: Prisma.TrackReviewItemWhereInput | Prisma.TrackReviewItemWhereInput[];
    reviewId?: Prisma.StringFilter<"TrackReviewItem"> | string;
    trackId?: Prisma.StringFilter<"TrackReviewItem"> | string;
    rating?: Prisma.IntFilter<"TrackReviewItem"> | number;
    description?: Prisma.StringNullableFilter<"TrackReviewItem"> | string | null;
    position?: Prisma.IntFilter<"TrackReviewItem"> | number;
    review?: Prisma.XOR<Prisma.ReviewScalarRelationFilter, Prisma.ReviewWhereInput>;
    track?: Prisma.XOR<Prisma.TrackScalarRelationFilter, Prisma.TrackWhereInput>;
}, "id" | "reviewId_trackId">;
export type TrackReviewItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    trackId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    _count?: Prisma.TrackReviewItemCountOrderByAggregateInput;
    _avg?: Prisma.TrackReviewItemAvgOrderByAggregateInput;
    _max?: Prisma.TrackReviewItemMaxOrderByAggregateInput;
    _min?: Prisma.TrackReviewItemMinOrderByAggregateInput;
    _sum?: Prisma.TrackReviewItemSumOrderByAggregateInput;
};
export type TrackReviewItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.TrackReviewItemScalarWhereWithAggregatesInput | Prisma.TrackReviewItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.TrackReviewItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TrackReviewItemScalarWhereWithAggregatesInput | Prisma.TrackReviewItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TrackReviewItem"> | string;
    reviewId?: Prisma.StringWithAggregatesFilter<"TrackReviewItem"> | string;
    trackId?: Prisma.StringWithAggregatesFilter<"TrackReviewItem"> | string;
    rating?: Prisma.IntWithAggregatesFilter<"TrackReviewItem"> | number;
    description?: Prisma.StringNullableWithAggregatesFilter<"TrackReviewItem"> | string | null;
    position?: Prisma.IntWithAggregatesFilter<"TrackReviewItem"> | number;
};
export type TrackReviewItemCreateInput = {
    id?: string;
    rating: number;
    description?: string | null;
    position: number;
    review: Prisma.ReviewCreateNestedOneWithoutTrackReviewItemsInput;
    track: Prisma.TrackCreateNestedOneWithoutTrackReviewItemsInput;
};
export type TrackReviewItemUncheckedCreateInput = {
    id?: string;
    reviewId: string;
    trackId: string;
    rating: number;
    description?: string | null;
    position: number;
};
export type TrackReviewItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    review?: Prisma.ReviewUpdateOneRequiredWithoutTrackReviewItemsNestedInput;
    track?: Prisma.TrackUpdateOneRequiredWithoutTrackReviewItemsNestedInput;
};
export type TrackReviewItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    trackId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TrackReviewItemCreateManyInput = {
    id?: string;
    reviewId: string;
    trackId: string;
    rating: number;
    description?: string | null;
    position: number;
};
export type TrackReviewItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TrackReviewItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    trackId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TrackReviewItemListRelationFilter = {
    every?: Prisma.TrackReviewItemWhereInput;
    some?: Prisma.TrackReviewItemWhereInput;
    none?: Prisma.TrackReviewItemWhereInput;
};
export type TrackReviewItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TrackReviewItemReviewIdTrackIdCompoundUniqueInput = {
    reviewId: string;
    trackId: string;
};
export type TrackReviewItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    trackId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type TrackReviewItemAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type TrackReviewItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    trackId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type TrackReviewItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    trackId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type TrackReviewItemSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type TrackReviewItemCreateNestedManyWithoutTrackInput = {
    create?: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutTrackInput, Prisma.TrackReviewItemUncheckedCreateWithoutTrackInput> | Prisma.TrackReviewItemCreateWithoutTrackInput[] | Prisma.TrackReviewItemUncheckedCreateWithoutTrackInput[];
    connectOrCreate?: Prisma.TrackReviewItemCreateOrConnectWithoutTrackInput | Prisma.TrackReviewItemCreateOrConnectWithoutTrackInput[];
    createMany?: Prisma.TrackReviewItemCreateManyTrackInputEnvelope;
    connect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
};
export type TrackReviewItemUncheckedCreateNestedManyWithoutTrackInput = {
    create?: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutTrackInput, Prisma.TrackReviewItemUncheckedCreateWithoutTrackInput> | Prisma.TrackReviewItemCreateWithoutTrackInput[] | Prisma.TrackReviewItemUncheckedCreateWithoutTrackInput[];
    connectOrCreate?: Prisma.TrackReviewItemCreateOrConnectWithoutTrackInput | Prisma.TrackReviewItemCreateOrConnectWithoutTrackInput[];
    createMany?: Prisma.TrackReviewItemCreateManyTrackInputEnvelope;
    connect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
};
export type TrackReviewItemUpdateManyWithoutTrackNestedInput = {
    create?: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutTrackInput, Prisma.TrackReviewItemUncheckedCreateWithoutTrackInput> | Prisma.TrackReviewItemCreateWithoutTrackInput[] | Prisma.TrackReviewItemUncheckedCreateWithoutTrackInput[];
    connectOrCreate?: Prisma.TrackReviewItemCreateOrConnectWithoutTrackInput | Prisma.TrackReviewItemCreateOrConnectWithoutTrackInput[];
    upsert?: Prisma.TrackReviewItemUpsertWithWhereUniqueWithoutTrackInput | Prisma.TrackReviewItemUpsertWithWhereUniqueWithoutTrackInput[];
    createMany?: Prisma.TrackReviewItemCreateManyTrackInputEnvelope;
    set?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    disconnect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    delete?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    connect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    update?: Prisma.TrackReviewItemUpdateWithWhereUniqueWithoutTrackInput | Prisma.TrackReviewItemUpdateWithWhereUniqueWithoutTrackInput[];
    updateMany?: Prisma.TrackReviewItemUpdateManyWithWhereWithoutTrackInput | Prisma.TrackReviewItemUpdateManyWithWhereWithoutTrackInput[];
    deleteMany?: Prisma.TrackReviewItemScalarWhereInput | Prisma.TrackReviewItemScalarWhereInput[];
};
export type TrackReviewItemUncheckedUpdateManyWithoutTrackNestedInput = {
    create?: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutTrackInput, Prisma.TrackReviewItemUncheckedCreateWithoutTrackInput> | Prisma.TrackReviewItemCreateWithoutTrackInput[] | Prisma.TrackReviewItemUncheckedCreateWithoutTrackInput[];
    connectOrCreate?: Prisma.TrackReviewItemCreateOrConnectWithoutTrackInput | Prisma.TrackReviewItemCreateOrConnectWithoutTrackInput[];
    upsert?: Prisma.TrackReviewItemUpsertWithWhereUniqueWithoutTrackInput | Prisma.TrackReviewItemUpsertWithWhereUniqueWithoutTrackInput[];
    createMany?: Prisma.TrackReviewItemCreateManyTrackInputEnvelope;
    set?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    disconnect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    delete?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    connect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    update?: Prisma.TrackReviewItemUpdateWithWhereUniqueWithoutTrackInput | Prisma.TrackReviewItemUpdateWithWhereUniqueWithoutTrackInput[];
    updateMany?: Prisma.TrackReviewItemUpdateManyWithWhereWithoutTrackInput | Prisma.TrackReviewItemUpdateManyWithWhereWithoutTrackInput[];
    deleteMany?: Prisma.TrackReviewItemScalarWhereInput | Prisma.TrackReviewItemScalarWhereInput[];
};
export type TrackReviewItemCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutReviewInput, Prisma.TrackReviewItemUncheckedCreateWithoutReviewInput> | Prisma.TrackReviewItemCreateWithoutReviewInput[] | Prisma.TrackReviewItemUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.TrackReviewItemCreateOrConnectWithoutReviewInput | Prisma.TrackReviewItemCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.TrackReviewItemCreateManyReviewInputEnvelope;
    connect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
};
export type TrackReviewItemUncheckedCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutReviewInput, Prisma.TrackReviewItemUncheckedCreateWithoutReviewInput> | Prisma.TrackReviewItemCreateWithoutReviewInput[] | Prisma.TrackReviewItemUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.TrackReviewItemCreateOrConnectWithoutReviewInput | Prisma.TrackReviewItemCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.TrackReviewItemCreateManyReviewInputEnvelope;
    connect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
};
export type TrackReviewItemUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutReviewInput, Prisma.TrackReviewItemUncheckedCreateWithoutReviewInput> | Prisma.TrackReviewItemCreateWithoutReviewInput[] | Prisma.TrackReviewItemUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.TrackReviewItemCreateOrConnectWithoutReviewInput | Prisma.TrackReviewItemCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.TrackReviewItemUpsertWithWhereUniqueWithoutReviewInput | Prisma.TrackReviewItemUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.TrackReviewItemCreateManyReviewInputEnvelope;
    set?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    disconnect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    delete?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    connect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    update?: Prisma.TrackReviewItemUpdateWithWhereUniqueWithoutReviewInput | Prisma.TrackReviewItemUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.TrackReviewItemUpdateManyWithWhereWithoutReviewInput | Prisma.TrackReviewItemUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.TrackReviewItemScalarWhereInput | Prisma.TrackReviewItemScalarWhereInput[];
};
export type TrackReviewItemUncheckedUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutReviewInput, Prisma.TrackReviewItemUncheckedCreateWithoutReviewInput> | Prisma.TrackReviewItemCreateWithoutReviewInput[] | Prisma.TrackReviewItemUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.TrackReviewItemCreateOrConnectWithoutReviewInput | Prisma.TrackReviewItemCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.TrackReviewItemUpsertWithWhereUniqueWithoutReviewInput | Prisma.TrackReviewItemUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.TrackReviewItemCreateManyReviewInputEnvelope;
    set?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    disconnect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    delete?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    connect?: Prisma.TrackReviewItemWhereUniqueInput | Prisma.TrackReviewItemWhereUniqueInput[];
    update?: Prisma.TrackReviewItemUpdateWithWhereUniqueWithoutReviewInput | Prisma.TrackReviewItemUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.TrackReviewItemUpdateManyWithWhereWithoutReviewInput | Prisma.TrackReviewItemUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.TrackReviewItemScalarWhereInput | Prisma.TrackReviewItemScalarWhereInput[];
};
export type TrackReviewItemCreateWithoutTrackInput = {
    id?: string;
    rating: number;
    description?: string | null;
    position: number;
    review: Prisma.ReviewCreateNestedOneWithoutTrackReviewItemsInput;
};
export type TrackReviewItemUncheckedCreateWithoutTrackInput = {
    id?: string;
    reviewId: string;
    rating: number;
    description?: string | null;
    position: number;
};
export type TrackReviewItemCreateOrConnectWithoutTrackInput = {
    where: Prisma.TrackReviewItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutTrackInput, Prisma.TrackReviewItemUncheckedCreateWithoutTrackInput>;
};
export type TrackReviewItemCreateManyTrackInputEnvelope = {
    data: Prisma.TrackReviewItemCreateManyTrackInput | Prisma.TrackReviewItemCreateManyTrackInput[];
    skipDuplicates?: boolean;
};
export type TrackReviewItemUpsertWithWhereUniqueWithoutTrackInput = {
    where: Prisma.TrackReviewItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.TrackReviewItemUpdateWithoutTrackInput, Prisma.TrackReviewItemUncheckedUpdateWithoutTrackInput>;
    create: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutTrackInput, Prisma.TrackReviewItemUncheckedCreateWithoutTrackInput>;
};
export type TrackReviewItemUpdateWithWhereUniqueWithoutTrackInput = {
    where: Prisma.TrackReviewItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.TrackReviewItemUpdateWithoutTrackInput, Prisma.TrackReviewItemUncheckedUpdateWithoutTrackInput>;
};
export type TrackReviewItemUpdateManyWithWhereWithoutTrackInput = {
    where: Prisma.TrackReviewItemScalarWhereInput;
    data: Prisma.XOR<Prisma.TrackReviewItemUpdateManyMutationInput, Prisma.TrackReviewItemUncheckedUpdateManyWithoutTrackInput>;
};
export type TrackReviewItemScalarWhereInput = {
    AND?: Prisma.TrackReviewItemScalarWhereInput | Prisma.TrackReviewItemScalarWhereInput[];
    OR?: Prisma.TrackReviewItemScalarWhereInput[];
    NOT?: Prisma.TrackReviewItemScalarWhereInput | Prisma.TrackReviewItemScalarWhereInput[];
    id?: Prisma.StringFilter<"TrackReviewItem"> | string;
    reviewId?: Prisma.StringFilter<"TrackReviewItem"> | string;
    trackId?: Prisma.StringFilter<"TrackReviewItem"> | string;
    rating?: Prisma.IntFilter<"TrackReviewItem"> | number;
    description?: Prisma.StringNullableFilter<"TrackReviewItem"> | string | null;
    position?: Prisma.IntFilter<"TrackReviewItem"> | number;
};
export type TrackReviewItemCreateWithoutReviewInput = {
    id?: string;
    rating: number;
    description?: string | null;
    position: number;
    track: Prisma.TrackCreateNestedOneWithoutTrackReviewItemsInput;
};
export type TrackReviewItemUncheckedCreateWithoutReviewInput = {
    id?: string;
    trackId: string;
    rating: number;
    description?: string | null;
    position: number;
};
export type TrackReviewItemCreateOrConnectWithoutReviewInput = {
    where: Prisma.TrackReviewItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutReviewInput, Prisma.TrackReviewItemUncheckedCreateWithoutReviewInput>;
};
export type TrackReviewItemCreateManyReviewInputEnvelope = {
    data: Prisma.TrackReviewItemCreateManyReviewInput | Prisma.TrackReviewItemCreateManyReviewInput[];
    skipDuplicates?: boolean;
};
export type TrackReviewItemUpsertWithWhereUniqueWithoutReviewInput = {
    where: Prisma.TrackReviewItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.TrackReviewItemUpdateWithoutReviewInput, Prisma.TrackReviewItemUncheckedUpdateWithoutReviewInput>;
    create: Prisma.XOR<Prisma.TrackReviewItemCreateWithoutReviewInput, Prisma.TrackReviewItemUncheckedCreateWithoutReviewInput>;
};
export type TrackReviewItemUpdateWithWhereUniqueWithoutReviewInput = {
    where: Prisma.TrackReviewItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.TrackReviewItemUpdateWithoutReviewInput, Prisma.TrackReviewItemUncheckedUpdateWithoutReviewInput>;
};
export type TrackReviewItemUpdateManyWithWhereWithoutReviewInput = {
    where: Prisma.TrackReviewItemScalarWhereInput;
    data: Prisma.XOR<Prisma.TrackReviewItemUpdateManyMutationInput, Prisma.TrackReviewItemUncheckedUpdateManyWithoutReviewInput>;
};
export type TrackReviewItemCreateManyTrackInput = {
    id?: string;
    reviewId: string;
    rating: number;
    description?: string | null;
    position: number;
};
export type TrackReviewItemUpdateWithoutTrackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    review?: Prisma.ReviewUpdateOneRequiredWithoutTrackReviewItemsNestedInput;
};
export type TrackReviewItemUncheckedUpdateWithoutTrackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TrackReviewItemUncheckedUpdateManyWithoutTrackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TrackReviewItemCreateManyReviewInput = {
    id?: string;
    trackId: string;
    rating: number;
    description?: string | null;
    position: number;
};
export type TrackReviewItemUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    track?: Prisma.TrackUpdateOneRequiredWithoutTrackReviewItemsNestedInput;
};
export type TrackReviewItemUncheckedUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    trackId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TrackReviewItemUncheckedUpdateManyWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    trackId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TrackReviewItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reviewId?: boolean;
    trackId?: boolean;
    rating?: boolean;
    description?: boolean;
    position?: boolean;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.TrackDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trackReviewItem"]>;
export type TrackReviewItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reviewId?: boolean;
    trackId?: boolean;
    rating?: boolean;
    description?: boolean;
    position?: boolean;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.TrackDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trackReviewItem"]>;
export type TrackReviewItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reviewId?: boolean;
    trackId?: boolean;
    rating?: boolean;
    description?: boolean;
    position?: boolean;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.TrackDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trackReviewItem"]>;
export type TrackReviewItemSelectScalar = {
    id?: boolean;
    reviewId?: boolean;
    trackId?: boolean;
    rating?: boolean;
    description?: boolean;
    position?: boolean;
};
export type TrackReviewItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reviewId" | "trackId" | "rating" | "description" | "position", ExtArgs["result"]["trackReviewItem"]>;
export type TrackReviewItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.TrackDefaultArgs<ExtArgs>;
};
export type TrackReviewItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.TrackDefaultArgs<ExtArgs>;
};
export type TrackReviewItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
    track?: boolean | Prisma.TrackDefaultArgs<ExtArgs>;
};
export type $TrackReviewItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TrackReviewItem";
    objects: {
        review: Prisma.$ReviewPayload<ExtArgs>;
        track: Prisma.$TrackPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reviewId: string;
        trackId: string;
        rating: number;
        description: string | null;
        position: number;
    }, ExtArgs["result"]["trackReviewItem"]>;
    composites: {};
};
export type TrackReviewItemGetPayload<S extends boolean | null | undefined | TrackReviewItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload, S>;
export type TrackReviewItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TrackReviewItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TrackReviewItemCountAggregateInputType | true;
};
export interface TrackReviewItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TrackReviewItem'];
        meta: {
            name: 'TrackReviewItem';
        };
    };
    findUnique<T extends TrackReviewItemFindUniqueArgs>(args: Prisma.SelectSubset<T, TrackReviewItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TrackReviewItemClient<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TrackReviewItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TrackReviewItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrackReviewItemClient<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TrackReviewItemFindFirstArgs>(args?: Prisma.SelectSubset<T, TrackReviewItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__TrackReviewItemClient<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TrackReviewItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TrackReviewItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrackReviewItemClient<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TrackReviewItemFindManyArgs>(args?: Prisma.SelectSubset<T, TrackReviewItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TrackReviewItemCreateArgs>(args: Prisma.SelectSubset<T, TrackReviewItemCreateArgs<ExtArgs>>): Prisma.Prisma__TrackReviewItemClient<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TrackReviewItemCreateManyArgs>(args?: Prisma.SelectSubset<T, TrackReviewItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TrackReviewItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TrackReviewItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TrackReviewItemDeleteArgs>(args: Prisma.SelectSubset<T, TrackReviewItemDeleteArgs<ExtArgs>>): Prisma.Prisma__TrackReviewItemClient<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TrackReviewItemUpdateArgs>(args: Prisma.SelectSubset<T, TrackReviewItemUpdateArgs<ExtArgs>>): Prisma.Prisma__TrackReviewItemClient<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TrackReviewItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, TrackReviewItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TrackReviewItemUpdateManyArgs>(args: Prisma.SelectSubset<T, TrackReviewItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TrackReviewItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TrackReviewItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TrackReviewItemUpsertArgs>(args: Prisma.SelectSubset<T, TrackReviewItemUpsertArgs<ExtArgs>>): Prisma.Prisma__TrackReviewItemClient<runtime.Types.Result.GetResult<Prisma.$TrackReviewItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TrackReviewItemCountArgs>(args?: Prisma.Subset<T, TrackReviewItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TrackReviewItemCountAggregateOutputType> : number>;
    aggregate<T extends TrackReviewItemAggregateArgs>(args: Prisma.Subset<T, TrackReviewItemAggregateArgs>): Prisma.PrismaPromise<GetTrackReviewItemAggregateType<T>>;
    groupBy<T extends TrackReviewItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TrackReviewItemGroupByArgs['orderBy'];
    } : {
        orderBy?: TrackReviewItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TrackReviewItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackReviewItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TrackReviewItemFieldRefs;
}
export interface Prisma__TrackReviewItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    review<T extends Prisma.ReviewDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ReviewDefaultArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    track<T extends Prisma.TrackDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TrackDefaultArgs<ExtArgs>>): Prisma.Prisma__TrackClient<runtime.Types.Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TrackReviewItemFieldRefs {
    readonly id: Prisma.FieldRef<"TrackReviewItem", 'String'>;
    readonly reviewId: Prisma.FieldRef<"TrackReviewItem", 'String'>;
    readonly trackId: Prisma.FieldRef<"TrackReviewItem", 'String'>;
    readonly rating: Prisma.FieldRef<"TrackReviewItem", 'Int'>;
    readonly description: Prisma.FieldRef<"TrackReviewItem", 'String'>;
    readonly position: Prisma.FieldRef<"TrackReviewItem", 'Int'>;
}
export type TrackReviewItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackReviewItemSelect<ExtArgs> | null;
    omit?: Prisma.TrackReviewItemOmit<ExtArgs> | null;
    include?: Prisma.TrackReviewItemInclude<ExtArgs> | null;
    where: Prisma.TrackReviewItemWhereUniqueInput;
};
export type TrackReviewItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackReviewItemSelect<ExtArgs> | null;
    omit?: Prisma.TrackReviewItemOmit<ExtArgs> | null;
    include?: Prisma.TrackReviewItemInclude<ExtArgs> | null;
    where: Prisma.TrackReviewItemWhereUniqueInput;
};
export type TrackReviewItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TrackReviewItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TrackReviewItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TrackReviewItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackReviewItemSelect<ExtArgs> | null;
    omit?: Prisma.TrackReviewItemOmit<ExtArgs> | null;
    include?: Prisma.TrackReviewItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrackReviewItemCreateInput, Prisma.TrackReviewItemUncheckedCreateInput>;
};
export type TrackReviewItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TrackReviewItemCreateManyInput | Prisma.TrackReviewItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TrackReviewItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackReviewItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TrackReviewItemOmit<ExtArgs> | null;
    data: Prisma.TrackReviewItemCreateManyInput | Prisma.TrackReviewItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TrackReviewItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TrackReviewItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackReviewItemSelect<ExtArgs> | null;
    omit?: Prisma.TrackReviewItemOmit<ExtArgs> | null;
    include?: Prisma.TrackReviewItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrackReviewItemUpdateInput, Prisma.TrackReviewItemUncheckedUpdateInput>;
    where: Prisma.TrackReviewItemWhereUniqueInput;
};
export type TrackReviewItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TrackReviewItemUpdateManyMutationInput, Prisma.TrackReviewItemUncheckedUpdateManyInput>;
    where?: Prisma.TrackReviewItemWhereInput;
    limit?: number;
};
export type TrackReviewItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackReviewItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TrackReviewItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrackReviewItemUpdateManyMutationInput, Prisma.TrackReviewItemUncheckedUpdateManyInput>;
    where?: Prisma.TrackReviewItemWhereInput;
    limit?: number;
    include?: Prisma.TrackReviewItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TrackReviewItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackReviewItemSelect<ExtArgs> | null;
    omit?: Prisma.TrackReviewItemOmit<ExtArgs> | null;
    include?: Prisma.TrackReviewItemInclude<ExtArgs> | null;
    where: Prisma.TrackReviewItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrackReviewItemCreateInput, Prisma.TrackReviewItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TrackReviewItemUpdateInput, Prisma.TrackReviewItemUncheckedUpdateInput>;
};
export type TrackReviewItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackReviewItemSelect<ExtArgs> | null;
    omit?: Prisma.TrackReviewItemOmit<ExtArgs> | null;
    include?: Prisma.TrackReviewItemInclude<ExtArgs> | null;
    where: Prisma.TrackReviewItemWhereUniqueInput;
};
export type TrackReviewItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackReviewItemWhereInput;
    limit?: number;
};
export type TrackReviewItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackReviewItemSelect<ExtArgs> | null;
    omit?: Prisma.TrackReviewItemOmit<ExtArgs> | null;
    include?: Prisma.TrackReviewItemInclude<ExtArgs> | null;
};
