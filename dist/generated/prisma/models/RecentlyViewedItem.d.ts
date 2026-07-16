import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RecentlyViewedItemModel = runtime.Types.Result.DefaultSelection<Prisma.$RecentlyViewedItemPayload>;
export type AggregateRecentlyViewedItem = {
    _count: RecentlyViewedItemCountAggregateOutputType | null;
    _avg: RecentlyViewedItemAvgAggregateOutputType | null;
    _sum: RecentlyViewedItemSumAggregateOutputType | null;
    _min: RecentlyViewedItemMinAggregateOutputType | null;
    _max: RecentlyViewedItemMaxAggregateOutputType | null;
};
export type RecentlyViewedItemAvgAggregateOutputType = {
    albumsCount: number | null;
};
export type RecentlyViewedItemSumAggregateOutputType = {
    albumsCount: number | null;
};
export type RecentlyViewedItemMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    resourceType: $Enums.CatalogResourceType | null;
    deezerId: string | null;
    title: string | null;
    artistName: string | null;
    coverUrl: string | null;
    albumsCount: number | null;
    viewedAt: Date | null;
};
export type RecentlyViewedItemMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    resourceType: $Enums.CatalogResourceType | null;
    deezerId: string | null;
    title: string | null;
    artistName: string | null;
    coverUrl: string | null;
    albumsCount: number | null;
    viewedAt: Date | null;
};
export type RecentlyViewedItemCountAggregateOutputType = {
    id: number;
    userId: number;
    resourceType: number;
    deezerId: number;
    title: number;
    artistName: number;
    coverUrl: number;
    albumsCount: number;
    viewedAt: number;
    _all: number;
};
export type RecentlyViewedItemAvgAggregateInputType = {
    albumsCount?: true;
};
export type RecentlyViewedItemSumAggregateInputType = {
    albumsCount?: true;
};
export type RecentlyViewedItemMinAggregateInputType = {
    id?: true;
    userId?: true;
    resourceType?: true;
    deezerId?: true;
    title?: true;
    artistName?: true;
    coverUrl?: true;
    albumsCount?: true;
    viewedAt?: true;
};
export type RecentlyViewedItemMaxAggregateInputType = {
    id?: true;
    userId?: true;
    resourceType?: true;
    deezerId?: true;
    title?: true;
    artistName?: true;
    coverUrl?: true;
    albumsCount?: true;
    viewedAt?: true;
};
export type RecentlyViewedItemCountAggregateInputType = {
    id?: true;
    userId?: true;
    resourceType?: true;
    deezerId?: true;
    title?: true;
    artistName?: true;
    coverUrl?: true;
    albumsCount?: true;
    viewedAt?: true;
    _all?: true;
};
export type RecentlyViewedItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecentlyViewedItemWhereInput;
    orderBy?: Prisma.RecentlyViewedItemOrderByWithRelationInput | Prisma.RecentlyViewedItemOrderByWithRelationInput[];
    cursor?: Prisma.RecentlyViewedItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RecentlyViewedItemCountAggregateInputType;
    _avg?: RecentlyViewedItemAvgAggregateInputType;
    _sum?: RecentlyViewedItemSumAggregateInputType;
    _min?: RecentlyViewedItemMinAggregateInputType;
    _max?: RecentlyViewedItemMaxAggregateInputType;
};
export type GetRecentlyViewedItemAggregateType<T extends RecentlyViewedItemAggregateArgs> = {
    [P in keyof T & keyof AggregateRecentlyViewedItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRecentlyViewedItem[P]> : Prisma.GetScalarType<T[P], AggregateRecentlyViewedItem[P]>;
};
export type RecentlyViewedItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecentlyViewedItemWhereInput;
    orderBy?: Prisma.RecentlyViewedItemOrderByWithAggregationInput | Prisma.RecentlyViewedItemOrderByWithAggregationInput[];
    by: Prisma.RecentlyViewedItemScalarFieldEnum[] | Prisma.RecentlyViewedItemScalarFieldEnum;
    having?: Prisma.RecentlyViewedItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecentlyViewedItemCountAggregateInputType | true;
    _avg?: RecentlyViewedItemAvgAggregateInputType;
    _sum?: RecentlyViewedItemSumAggregateInputType;
    _min?: RecentlyViewedItemMinAggregateInputType;
    _max?: RecentlyViewedItemMaxAggregateInputType;
};
export type RecentlyViewedItemGroupByOutputType = {
    id: string;
    userId: string;
    resourceType: $Enums.CatalogResourceType;
    deezerId: string;
    title: string;
    artistName: string | null;
    coverUrl: string | null;
    albumsCount: number | null;
    viewedAt: Date;
    _count: RecentlyViewedItemCountAggregateOutputType | null;
    _avg: RecentlyViewedItemAvgAggregateOutputType | null;
    _sum: RecentlyViewedItemSumAggregateOutputType | null;
    _min: RecentlyViewedItemMinAggregateOutputType | null;
    _max: RecentlyViewedItemMaxAggregateOutputType | null;
};
export type GetRecentlyViewedItemGroupByPayload<T extends RecentlyViewedItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RecentlyViewedItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RecentlyViewedItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RecentlyViewedItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RecentlyViewedItemGroupByOutputType[P]>;
}>>;
export type RecentlyViewedItemWhereInput = {
    AND?: Prisma.RecentlyViewedItemWhereInput | Prisma.RecentlyViewedItemWhereInput[];
    OR?: Prisma.RecentlyViewedItemWhereInput[];
    NOT?: Prisma.RecentlyViewedItemWhereInput | Prisma.RecentlyViewedItemWhereInput[];
    id?: Prisma.StringFilter<"RecentlyViewedItem"> | string;
    userId?: Prisma.StringFilter<"RecentlyViewedItem"> | string;
    resourceType?: Prisma.EnumCatalogResourceTypeFilter<"RecentlyViewedItem"> | $Enums.CatalogResourceType;
    deezerId?: Prisma.StringFilter<"RecentlyViewedItem"> | string;
    title?: Prisma.StringFilter<"RecentlyViewedItem"> | string;
    artistName?: Prisma.StringNullableFilter<"RecentlyViewedItem"> | string | null;
    coverUrl?: Prisma.StringNullableFilter<"RecentlyViewedItem"> | string | null;
    albumsCount?: Prisma.IntNullableFilter<"RecentlyViewedItem"> | number | null;
    viewedAt?: Prisma.DateTimeFilter<"RecentlyViewedItem"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RecentlyViewedItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    artistName?: Prisma.SortOrderInput | Prisma.SortOrder;
    coverUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    albumsCount?: Prisma.SortOrderInput | Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type RecentlyViewedItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_resourceType_deezerId?: Prisma.RecentlyViewedItemUserIdResourceTypeDeezerIdCompoundUniqueInput;
    AND?: Prisma.RecentlyViewedItemWhereInput | Prisma.RecentlyViewedItemWhereInput[];
    OR?: Prisma.RecentlyViewedItemWhereInput[];
    NOT?: Prisma.RecentlyViewedItemWhereInput | Prisma.RecentlyViewedItemWhereInput[];
    userId?: Prisma.StringFilter<"RecentlyViewedItem"> | string;
    resourceType?: Prisma.EnumCatalogResourceTypeFilter<"RecentlyViewedItem"> | $Enums.CatalogResourceType;
    deezerId?: Prisma.StringFilter<"RecentlyViewedItem"> | string;
    title?: Prisma.StringFilter<"RecentlyViewedItem"> | string;
    artistName?: Prisma.StringNullableFilter<"RecentlyViewedItem"> | string | null;
    coverUrl?: Prisma.StringNullableFilter<"RecentlyViewedItem"> | string | null;
    albumsCount?: Prisma.IntNullableFilter<"RecentlyViewedItem"> | number | null;
    viewedAt?: Prisma.DateTimeFilter<"RecentlyViewedItem"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId_resourceType_deezerId">;
export type RecentlyViewedItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    artistName?: Prisma.SortOrderInput | Prisma.SortOrder;
    coverUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    albumsCount?: Prisma.SortOrderInput | Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
    _count?: Prisma.RecentlyViewedItemCountOrderByAggregateInput;
    _avg?: Prisma.RecentlyViewedItemAvgOrderByAggregateInput;
    _max?: Prisma.RecentlyViewedItemMaxOrderByAggregateInput;
    _min?: Prisma.RecentlyViewedItemMinOrderByAggregateInput;
    _sum?: Prisma.RecentlyViewedItemSumOrderByAggregateInput;
};
export type RecentlyViewedItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.RecentlyViewedItemScalarWhereWithAggregatesInput | Prisma.RecentlyViewedItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.RecentlyViewedItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RecentlyViewedItemScalarWhereWithAggregatesInput | Prisma.RecentlyViewedItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RecentlyViewedItem"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RecentlyViewedItem"> | string;
    resourceType?: Prisma.EnumCatalogResourceTypeWithAggregatesFilter<"RecentlyViewedItem"> | $Enums.CatalogResourceType;
    deezerId?: Prisma.StringWithAggregatesFilter<"RecentlyViewedItem"> | string;
    title?: Prisma.StringWithAggregatesFilter<"RecentlyViewedItem"> | string;
    artistName?: Prisma.StringNullableWithAggregatesFilter<"RecentlyViewedItem"> | string | null;
    coverUrl?: Prisma.StringNullableWithAggregatesFilter<"RecentlyViewedItem"> | string | null;
    albumsCount?: Prisma.IntNullableWithAggregatesFilter<"RecentlyViewedItem"> | number | null;
    viewedAt?: Prisma.DateTimeWithAggregatesFilter<"RecentlyViewedItem"> | Date | string;
};
export type RecentlyViewedItemCreateInput = {
    id?: string;
    resourceType: $Enums.CatalogResourceType;
    deezerId: string;
    title: string;
    artistName?: string | null;
    coverUrl?: string | null;
    albumsCount?: number | null;
    viewedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRecentlyViewedItemsInput;
};
export type RecentlyViewedItemUncheckedCreateInput = {
    id?: string;
    userId: string;
    resourceType: $Enums.CatalogResourceType;
    deezerId: string;
    title: string;
    artistName?: string | null;
    coverUrl?: string | null;
    albumsCount?: number | null;
    viewedAt?: Date | string;
};
export type RecentlyViewedItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.EnumCatalogResourceTypeFieldUpdateOperationsInput | $Enums.CatalogResourceType;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumsCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRecentlyViewedItemsNestedInput;
};
export type RecentlyViewedItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.EnumCatalogResourceTypeFieldUpdateOperationsInput | $Enums.CatalogResourceType;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumsCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentlyViewedItemCreateManyInput = {
    id?: string;
    userId: string;
    resourceType: $Enums.CatalogResourceType;
    deezerId: string;
    title: string;
    artistName?: string | null;
    coverUrl?: string | null;
    albumsCount?: number | null;
    viewedAt?: Date | string;
};
export type RecentlyViewedItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.EnumCatalogResourceTypeFieldUpdateOperationsInput | $Enums.CatalogResourceType;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumsCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentlyViewedItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.EnumCatalogResourceTypeFieldUpdateOperationsInput | $Enums.CatalogResourceType;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumsCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentlyViewedItemListRelationFilter = {
    every?: Prisma.RecentlyViewedItemWhereInput;
    some?: Prisma.RecentlyViewedItemWhereInput;
    none?: Prisma.RecentlyViewedItemWhereInput;
};
export type RecentlyViewedItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RecentlyViewedItemUserIdResourceTypeDeezerIdCompoundUniqueInput = {
    userId: string;
    resourceType: $Enums.CatalogResourceType;
    deezerId: string;
};
export type RecentlyViewedItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    artistName?: Prisma.SortOrder;
    coverUrl?: Prisma.SortOrder;
    albumsCount?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
};
export type RecentlyViewedItemAvgOrderByAggregateInput = {
    albumsCount?: Prisma.SortOrder;
};
export type RecentlyViewedItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    artistName?: Prisma.SortOrder;
    coverUrl?: Prisma.SortOrder;
    albumsCount?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
};
export type RecentlyViewedItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    deezerId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    artistName?: Prisma.SortOrder;
    coverUrl?: Prisma.SortOrder;
    albumsCount?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
};
export type RecentlyViewedItemSumOrderByAggregateInput = {
    albumsCount?: Prisma.SortOrder;
};
export type RecentlyViewedItemCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecentlyViewedItemCreateWithoutUserInput, Prisma.RecentlyViewedItemUncheckedCreateWithoutUserInput> | Prisma.RecentlyViewedItemCreateWithoutUserInput[] | Prisma.RecentlyViewedItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentlyViewedItemCreateOrConnectWithoutUserInput | Prisma.RecentlyViewedItemCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RecentlyViewedItemCreateManyUserInputEnvelope;
    connect?: Prisma.RecentlyViewedItemWhereUniqueInput | Prisma.RecentlyViewedItemWhereUniqueInput[];
};
export type RecentlyViewedItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecentlyViewedItemCreateWithoutUserInput, Prisma.RecentlyViewedItemUncheckedCreateWithoutUserInput> | Prisma.RecentlyViewedItemCreateWithoutUserInput[] | Prisma.RecentlyViewedItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentlyViewedItemCreateOrConnectWithoutUserInput | Prisma.RecentlyViewedItemCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RecentlyViewedItemCreateManyUserInputEnvelope;
    connect?: Prisma.RecentlyViewedItemWhereUniqueInput | Prisma.RecentlyViewedItemWhereUniqueInput[];
};
export type RecentlyViewedItemUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecentlyViewedItemCreateWithoutUserInput, Prisma.RecentlyViewedItemUncheckedCreateWithoutUserInput> | Prisma.RecentlyViewedItemCreateWithoutUserInput[] | Prisma.RecentlyViewedItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentlyViewedItemCreateOrConnectWithoutUserInput | Prisma.RecentlyViewedItemCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RecentlyViewedItemUpsertWithWhereUniqueWithoutUserInput | Prisma.RecentlyViewedItemUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RecentlyViewedItemCreateManyUserInputEnvelope;
    set?: Prisma.RecentlyViewedItemWhereUniqueInput | Prisma.RecentlyViewedItemWhereUniqueInput[];
    disconnect?: Prisma.RecentlyViewedItemWhereUniqueInput | Prisma.RecentlyViewedItemWhereUniqueInput[];
    delete?: Prisma.RecentlyViewedItemWhereUniqueInput | Prisma.RecentlyViewedItemWhereUniqueInput[];
    connect?: Prisma.RecentlyViewedItemWhereUniqueInput | Prisma.RecentlyViewedItemWhereUniqueInput[];
    update?: Prisma.RecentlyViewedItemUpdateWithWhereUniqueWithoutUserInput | Prisma.RecentlyViewedItemUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RecentlyViewedItemUpdateManyWithWhereWithoutUserInput | Prisma.RecentlyViewedItemUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RecentlyViewedItemScalarWhereInput | Prisma.RecentlyViewedItemScalarWhereInput[];
};
export type RecentlyViewedItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecentlyViewedItemCreateWithoutUserInput, Prisma.RecentlyViewedItemUncheckedCreateWithoutUserInput> | Prisma.RecentlyViewedItemCreateWithoutUserInput[] | Prisma.RecentlyViewedItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentlyViewedItemCreateOrConnectWithoutUserInput | Prisma.RecentlyViewedItemCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RecentlyViewedItemUpsertWithWhereUniqueWithoutUserInput | Prisma.RecentlyViewedItemUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RecentlyViewedItemCreateManyUserInputEnvelope;
    set?: Prisma.RecentlyViewedItemWhereUniqueInput | Prisma.RecentlyViewedItemWhereUniqueInput[];
    disconnect?: Prisma.RecentlyViewedItemWhereUniqueInput | Prisma.RecentlyViewedItemWhereUniqueInput[];
    delete?: Prisma.RecentlyViewedItemWhereUniqueInput | Prisma.RecentlyViewedItemWhereUniqueInput[];
    connect?: Prisma.RecentlyViewedItemWhereUniqueInput | Prisma.RecentlyViewedItemWhereUniqueInput[];
    update?: Prisma.RecentlyViewedItemUpdateWithWhereUniqueWithoutUserInput | Prisma.RecentlyViewedItemUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RecentlyViewedItemUpdateManyWithWhereWithoutUserInput | Prisma.RecentlyViewedItemUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RecentlyViewedItemScalarWhereInput | Prisma.RecentlyViewedItemScalarWhereInput[];
};
export type EnumCatalogResourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.CatalogResourceType;
};
export type RecentlyViewedItemCreateWithoutUserInput = {
    id?: string;
    resourceType: $Enums.CatalogResourceType;
    deezerId: string;
    title: string;
    artistName?: string | null;
    coverUrl?: string | null;
    albumsCount?: number | null;
    viewedAt?: Date | string;
};
export type RecentlyViewedItemUncheckedCreateWithoutUserInput = {
    id?: string;
    resourceType: $Enums.CatalogResourceType;
    deezerId: string;
    title: string;
    artistName?: string | null;
    coverUrl?: string | null;
    albumsCount?: number | null;
    viewedAt?: Date | string;
};
export type RecentlyViewedItemCreateOrConnectWithoutUserInput = {
    where: Prisma.RecentlyViewedItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecentlyViewedItemCreateWithoutUserInput, Prisma.RecentlyViewedItemUncheckedCreateWithoutUserInput>;
};
export type RecentlyViewedItemCreateManyUserInputEnvelope = {
    data: Prisma.RecentlyViewedItemCreateManyUserInput | Prisma.RecentlyViewedItemCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type RecentlyViewedItemUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RecentlyViewedItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecentlyViewedItemUpdateWithoutUserInput, Prisma.RecentlyViewedItemUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RecentlyViewedItemCreateWithoutUserInput, Prisma.RecentlyViewedItemUncheckedCreateWithoutUserInput>;
};
export type RecentlyViewedItemUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RecentlyViewedItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecentlyViewedItemUpdateWithoutUserInput, Prisma.RecentlyViewedItemUncheckedUpdateWithoutUserInput>;
};
export type RecentlyViewedItemUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RecentlyViewedItemScalarWhereInput;
    data: Prisma.XOR<Prisma.RecentlyViewedItemUpdateManyMutationInput, Prisma.RecentlyViewedItemUncheckedUpdateManyWithoutUserInput>;
};
export type RecentlyViewedItemScalarWhereInput = {
    AND?: Prisma.RecentlyViewedItemScalarWhereInput | Prisma.RecentlyViewedItemScalarWhereInput[];
    OR?: Prisma.RecentlyViewedItemScalarWhereInput[];
    NOT?: Prisma.RecentlyViewedItemScalarWhereInput | Prisma.RecentlyViewedItemScalarWhereInput[];
    id?: Prisma.StringFilter<"RecentlyViewedItem"> | string;
    userId?: Prisma.StringFilter<"RecentlyViewedItem"> | string;
    resourceType?: Prisma.EnumCatalogResourceTypeFilter<"RecentlyViewedItem"> | $Enums.CatalogResourceType;
    deezerId?: Prisma.StringFilter<"RecentlyViewedItem"> | string;
    title?: Prisma.StringFilter<"RecentlyViewedItem"> | string;
    artistName?: Prisma.StringNullableFilter<"RecentlyViewedItem"> | string | null;
    coverUrl?: Prisma.StringNullableFilter<"RecentlyViewedItem"> | string | null;
    albumsCount?: Prisma.IntNullableFilter<"RecentlyViewedItem"> | number | null;
    viewedAt?: Prisma.DateTimeFilter<"RecentlyViewedItem"> | Date | string;
};
export type RecentlyViewedItemCreateManyUserInput = {
    id?: string;
    resourceType: $Enums.CatalogResourceType;
    deezerId: string;
    title: string;
    artistName?: string | null;
    coverUrl?: string | null;
    albumsCount?: number | null;
    viewedAt?: Date | string;
};
export type RecentlyViewedItemUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.EnumCatalogResourceTypeFieldUpdateOperationsInput | $Enums.CatalogResourceType;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumsCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentlyViewedItemUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.EnumCatalogResourceTypeFieldUpdateOperationsInput | $Enums.CatalogResourceType;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumsCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentlyViewedItemUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.EnumCatalogResourceTypeFieldUpdateOperationsInput | $Enums.CatalogResourceType;
    deezerId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    artistName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    albumsCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentlyViewedItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    resourceType?: boolean;
    deezerId?: boolean;
    title?: boolean;
    artistName?: boolean;
    coverUrl?: boolean;
    albumsCount?: boolean;
    viewedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recentlyViewedItem"]>;
export type RecentlyViewedItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    resourceType?: boolean;
    deezerId?: boolean;
    title?: boolean;
    artistName?: boolean;
    coverUrl?: boolean;
    albumsCount?: boolean;
    viewedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recentlyViewedItem"]>;
export type RecentlyViewedItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    resourceType?: boolean;
    deezerId?: boolean;
    title?: boolean;
    artistName?: boolean;
    coverUrl?: boolean;
    albumsCount?: boolean;
    viewedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recentlyViewedItem"]>;
export type RecentlyViewedItemSelectScalar = {
    id?: boolean;
    userId?: boolean;
    resourceType?: boolean;
    deezerId?: boolean;
    title?: boolean;
    artistName?: boolean;
    coverUrl?: boolean;
    albumsCount?: boolean;
    viewedAt?: boolean;
};
export type RecentlyViewedItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "resourceType" | "deezerId" | "title" | "artistName" | "coverUrl" | "albumsCount" | "viewedAt", ExtArgs["result"]["recentlyViewedItem"]>;
export type RecentlyViewedItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RecentlyViewedItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RecentlyViewedItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RecentlyViewedItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RecentlyViewedItem";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        resourceType: $Enums.CatalogResourceType;
        deezerId: string;
        title: string;
        artistName: string | null;
        coverUrl: string | null;
        albumsCount: number | null;
        viewedAt: Date;
    }, ExtArgs["result"]["recentlyViewedItem"]>;
    composites: {};
};
export type RecentlyViewedItemGetPayload<S extends boolean | null | undefined | RecentlyViewedItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload, S>;
export type RecentlyViewedItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RecentlyViewedItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecentlyViewedItemCountAggregateInputType | true;
};
export interface RecentlyViewedItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RecentlyViewedItem'];
        meta: {
            name: 'RecentlyViewedItem';
        };
    };
    findUnique<T extends RecentlyViewedItemFindUniqueArgs>(args: Prisma.SelectSubset<T, RecentlyViewedItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RecentlyViewedItemClient<runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RecentlyViewedItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RecentlyViewedItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecentlyViewedItemClient<runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RecentlyViewedItemFindFirstArgs>(args?: Prisma.SelectSubset<T, RecentlyViewedItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__RecentlyViewedItemClient<runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RecentlyViewedItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RecentlyViewedItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecentlyViewedItemClient<runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RecentlyViewedItemFindManyArgs>(args?: Prisma.SelectSubset<T, RecentlyViewedItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RecentlyViewedItemCreateArgs>(args: Prisma.SelectSubset<T, RecentlyViewedItemCreateArgs<ExtArgs>>): Prisma.Prisma__RecentlyViewedItemClient<runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RecentlyViewedItemCreateManyArgs>(args?: Prisma.SelectSubset<T, RecentlyViewedItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RecentlyViewedItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RecentlyViewedItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RecentlyViewedItemDeleteArgs>(args: Prisma.SelectSubset<T, RecentlyViewedItemDeleteArgs<ExtArgs>>): Prisma.Prisma__RecentlyViewedItemClient<runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RecentlyViewedItemUpdateArgs>(args: Prisma.SelectSubset<T, RecentlyViewedItemUpdateArgs<ExtArgs>>): Prisma.Prisma__RecentlyViewedItemClient<runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RecentlyViewedItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, RecentlyViewedItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RecentlyViewedItemUpdateManyArgs>(args: Prisma.SelectSubset<T, RecentlyViewedItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RecentlyViewedItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RecentlyViewedItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RecentlyViewedItemUpsertArgs>(args: Prisma.SelectSubset<T, RecentlyViewedItemUpsertArgs<ExtArgs>>): Prisma.Prisma__RecentlyViewedItemClient<runtime.Types.Result.GetResult<Prisma.$RecentlyViewedItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RecentlyViewedItemCountArgs>(args?: Prisma.Subset<T, RecentlyViewedItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RecentlyViewedItemCountAggregateOutputType> : number>;
    aggregate<T extends RecentlyViewedItemAggregateArgs>(args: Prisma.Subset<T, RecentlyViewedItemAggregateArgs>): Prisma.PrismaPromise<GetRecentlyViewedItemAggregateType<T>>;
    groupBy<T extends RecentlyViewedItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RecentlyViewedItemGroupByArgs['orderBy'];
    } : {
        orderBy?: RecentlyViewedItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RecentlyViewedItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecentlyViewedItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RecentlyViewedItemFieldRefs;
}
export interface Prisma__RecentlyViewedItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RecentlyViewedItemFieldRefs {
    readonly id: Prisma.FieldRef<"RecentlyViewedItem", 'String'>;
    readonly userId: Prisma.FieldRef<"RecentlyViewedItem", 'String'>;
    readonly resourceType: Prisma.FieldRef<"RecentlyViewedItem", 'CatalogResourceType'>;
    readonly deezerId: Prisma.FieldRef<"RecentlyViewedItem", 'String'>;
    readonly title: Prisma.FieldRef<"RecentlyViewedItem", 'String'>;
    readonly artistName: Prisma.FieldRef<"RecentlyViewedItem", 'String'>;
    readonly coverUrl: Prisma.FieldRef<"RecentlyViewedItem", 'String'>;
    readonly albumsCount: Prisma.FieldRef<"RecentlyViewedItem", 'Int'>;
    readonly viewedAt: Prisma.FieldRef<"RecentlyViewedItem", 'DateTime'>;
}
export type RecentlyViewedItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelect<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    include?: Prisma.RecentlyViewedItemInclude<ExtArgs> | null;
    where: Prisma.RecentlyViewedItemWhereUniqueInput;
};
export type RecentlyViewedItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelect<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    include?: Prisma.RecentlyViewedItemInclude<ExtArgs> | null;
    where: Prisma.RecentlyViewedItemWhereUniqueInput;
};
export type RecentlyViewedItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelect<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    include?: Prisma.RecentlyViewedItemInclude<ExtArgs> | null;
    where?: Prisma.RecentlyViewedItemWhereInput;
    orderBy?: Prisma.RecentlyViewedItemOrderByWithRelationInput | Prisma.RecentlyViewedItemOrderByWithRelationInput[];
    cursor?: Prisma.RecentlyViewedItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecentlyViewedItemScalarFieldEnum | Prisma.RecentlyViewedItemScalarFieldEnum[];
};
export type RecentlyViewedItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelect<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    include?: Prisma.RecentlyViewedItemInclude<ExtArgs> | null;
    where?: Prisma.RecentlyViewedItemWhereInput;
    orderBy?: Prisma.RecentlyViewedItemOrderByWithRelationInput | Prisma.RecentlyViewedItemOrderByWithRelationInput[];
    cursor?: Prisma.RecentlyViewedItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecentlyViewedItemScalarFieldEnum | Prisma.RecentlyViewedItemScalarFieldEnum[];
};
export type RecentlyViewedItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelect<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    include?: Prisma.RecentlyViewedItemInclude<ExtArgs> | null;
    where?: Prisma.RecentlyViewedItemWhereInput;
    orderBy?: Prisma.RecentlyViewedItemOrderByWithRelationInput | Prisma.RecentlyViewedItemOrderByWithRelationInput[];
    cursor?: Prisma.RecentlyViewedItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecentlyViewedItemScalarFieldEnum | Prisma.RecentlyViewedItemScalarFieldEnum[];
};
export type RecentlyViewedItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelect<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    include?: Prisma.RecentlyViewedItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecentlyViewedItemCreateInput, Prisma.RecentlyViewedItemUncheckedCreateInput>;
};
export type RecentlyViewedItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RecentlyViewedItemCreateManyInput | Prisma.RecentlyViewedItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RecentlyViewedItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    data: Prisma.RecentlyViewedItemCreateManyInput | Prisma.RecentlyViewedItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RecentlyViewedItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RecentlyViewedItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelect<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    include?: Prisma.RecentlyViewedItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecentlyViewedItemUpdateInput, Prisma.RecentlyViewedItemUncheckedUpdateInput>;
    where: Prisma.RecentlyViewedItemWhereUniqueInput;
};
export type RecentlyViewedItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RecentlyViewedItemUpdateManyMutationInput, Prisma.RecentlyViewedItemUncheckedUpdateManyInput>;
    where?: Prisma.RecentlyViewedItemWhereInput;
    limit?: number;
};
export type RecentlyViewedItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecentlyViewedItemUpdateManyMutationInput, Prisma.RecentlyViewedItemUncheckedUpdateManyInput>;
    where?: Prisma.RecentlyViewedItemWhereInput;
    limit?: number;
    include?: Prisma.RecentlyViewedItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RecentlyViewedItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelect<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    include?: Prisma.RecentlyViewedItemInclude<ExtArgs> | null;
    where: Prisma.RecentlyViewedItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecentlyViewedItemCreateInput, Prisma.RecentlyViewedItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RecentlyViewedItemUpdateInput, Prisma.RecentlyViewedItemUncheckedUpdateInput>;
};
export type RecentlyViewedItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelect<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    include?: Prisma.RecentlyViewedItemInclude<ExtArgs> | null;
    where: Prisma.RecentlyViewedItemWhereUniqueInput;
};
export type RecentlyViewedItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecentlyViewedItemWhereInput;
    limit?: number;
};
export type RecentlyViewedItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentlyViewedItemSelect<ExtArgs> | null;
    omit?: Prisma.RecentlyViewedItemOmit<ExtArgs> | null;
    include?: Prisma.RecentlyViewedItemInclude<ExtArgs> | null;
};
