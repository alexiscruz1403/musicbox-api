import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReviewReactionModel = runtime.Types.Result.DefaultSelection<Prisma.$ReviewReactionPayload>;
export type AggregateReviewReaction = {
    _count: ReviewReactionCountAggregateOutputType | null;
    _min: ReviewReactionMinAggregateOutputType | null;
    _max: ReviewReactionMaxAggregateOutputType | null;
};
export type ReviewReactionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    reviewId: string | null;
    type: $Enums.ReactionType | null;
    createdAt: Date | null;
};
export type ReviewReactionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    reviewId: string | null;
    type: $Enums.ReactionType | null;
    createdAt: Date | null;
};
export type ReviewReactionCountAggregateOutputType = {
    id: number;
    userId: number;
    reviewId: number;
    type: number;
    createdAt: number;
    _all: number;
};
export type ReviewReactionMinAggregateInputType = {
    id?: true;
    userId?: true;
    reviewId?: true;
    type?: true;
    createdAt?: true;
};
export type ReviewReactionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    reviewId?: true;
    type?: true;
    createdAt?: true;
};
export type ReviewReactionCountAggregateInputType = {
    id?: true;
    userId?: true;
    reviewId?: true;
    type?: true;
    createdAt?: true;
    _all?: true;
};
export type ReviewReactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewReactionWhereInput;
    orderBy?: Prisma.ReviewReactionOrderByWithRelationInput | Prisma.ReviewReactionOrderByWithRelationInput[];
    cursor?: Prisma.ReviewReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReviewReactionCountAggregateInputType;
    _min?: ReviewReactionMinAggregateInputType;
    _max?: ReviewReactionMaxAggregateInputType;
};
export type GetReviewReactionAggregateType<T extends ReviewReactionAggregateArgs> = {
    [P in keyof T & keyof AggregateReviewReaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReviewReaction[P]> : Prisma.GetScalarType<T[P], AggregateReviewReaction[P]>;
};
export type ReviewReactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewReactionWhereInput;
    orderBy?: Prisma.ReviewReactionOrderByWithAggregationInput | Prisma.ReviewReactionOrderByWithAggregationInput[];
    by: Prisma.ReviewReactionScalarFieldEnum[] | Prisma.ReviewReactionScalarFieldEnum;
    having?: Prisma.ReviewReactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReviewReactionCountAggregateInputType | true;
    _min?: ReviewReactionMinAggregateInputType;
    _max?: ReviewReactionMaxAggregateInputType;
};
export type ReviewReactionGroupByOutputType = {
    id: string;
    userId: string;
    reviewId: string;
    type: $Enums.ReactionType;
    createdAt: Date;
    _count: ReviewReactionCountAggregateOutputType | null;
    _min: ReviewReactionMinAggregateOutputType | null;
    _max: ReviewReactionMaxAggregateOutputType | null;
};
export type GetReviewReactionGroupByPayload<T extends ReviewReactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReviewReactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReviewReactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReviewReactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReviewReactionGroupByOutputType[P]>;
}>>;
export type ReviewReactionWhereInput = {
    AND?: Prisma.ReviewReactionWhereInput | Prisma.ReviewReactionWhereInput[];
    OR?: Prisma.ReviewReactionWhereInput[];
    NOT?: Prisma.ReviewReactionWhereInput | Prisma.ReviewReactionWhereInput[];
    id?: Prisma.StringFilter<"ReviewReaction"> | string;
    userId?: Prisma.StringFilter<"ReviewReaction"> | string;
    reviewId?: Prisma.StringFilter<"ReviewReaction"> | string;
    type?: Prisma.EnumReactionTypeFilter<"ReviewReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFilter<"ReviewReaction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    review?: Prisma.XOR<Prisma.ReviewScalarRelationFilter, Prisma.ReviewWhereInput>;
};
export type ReviewReactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    review?: Prisma.ReviewOrderByWithRelationInput;
};
export type ReviewReactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_reviewId?: Prisma.ReviewReactionUserIdReviewIdCompoundUniqueInput;
    AND?: Prisma.ReviewReactionWhereInput | Prisma.ReviewReactionWhereInput[];
    OR?: Prisma.ReviewReactionWhereInput[];
    NOT?: Prisma.ReviewReactionWhereInput | Prisma.ReviewReactionWhereInput[];
    userId?: Prisma.StringFilter<"ReviewReaction"> | string;
    reviewId?: Prisma.StringFilter<"ReviewReaction"> | string;
    type?: Prisma.EnumReactionTypeFilter<"ReviewReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFilter<"ReviewReaction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    review?: Prisma.XOR<Prisma.ReviewScalarRelationFilter, Prisma.ReviewWhereInput>;
}, "id" | "userId_reviewId">;
export type ReviewReactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ReviewReactionCountOrderByAggregateInput;
    _max?: Prisma.ReviewReactionMaxOrderByAggregateInput;
    _min?: Prisma.ReviewReactionMinOrderByAggregateInput;
};
export type ReviewReactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReviewReactionScalarWhereWithAggregatesInput | Prisma.ReviewReactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReviewReactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReviewReactionScalarWhereWithAggregatesInput | Prisma.ReviewReactionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ReviewReaction"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ReviewReaction"> | string;
    reviewId?: Prisma.StringWithAggregatesFilter<"ReviewReaction"> | string;
    type?: Prisma.EnumReactionTypeWithAggregatesFilter<"ReviewReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ReviewReaction"> | Date | string;
};
export type ReviewReactionCreateInput = {
    id?: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutReactionsInput;
    review: Prisma.ReviewCreateNestedOneWithoutReactionsInput;
};
export type ReviewReactionUncheckedCreateInput = {
    id?: string;
    userId: string;
    reviewId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type ReviewReactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutReactionsNestedInput;
    review?: Prisma.ReviewUpdateOneRequiredWithoutReactionsNestedInput;
};
export type ReviewReactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewReactionCreateManyInput = {
    id?: string;
    userId: string;
    reviewId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type ReviewReactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewReactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewReactionListRelationFilter = {
    every?: Prisma.ReviewReactionWhereInput;
    some?: Prisma.ReviewReactionWhereInput;
    none?: Prisma.ReviewReactionWhereInput;
};
export type ReviewReactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReviewReactionUserIdReviewIdCompoundUniqueInput = {
    userId: string;
    reviewId: string;
};
export type ReviewReactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReviewReactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReviewReactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReviewReactionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ReviewReactionCreateWithoutUserInput, Prisma.ReviewReactionUncheckedCreateWithoutUserInput> | Prisma.ReviewReactionCreateWithoutUserInput[] | Prisma.ReviewReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewReactionCreateOrConnectWithoutUserInput | Prisma.ReviewReactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ReviewReactionCreateManyUserInputEnvelope;
    connect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
};
export type ReviewReactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ReviewReactionCreateWithoutUserInput, Prisma.ReviewReactionUncheckedCreateWithoutUserInput> | Prisma.ReviewReactionCreateWithoutUserInput[] | Prisma.ReviewReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewReactionCreateOrConnectWithoutUserInput | Prisma.ReviewReactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ReviewReactionCreateManyUserInputEnvelope;
    connect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
};
export type ReviewReactionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewReactionCreateWithoutUserInput, Prisma.ReviewReactionUncheckedCreateWithoutUserInput> | Prisma.ReviewReactionCreateWithoutUserInput[] | Prisma.ReviewReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewReactionCreateOrConnectWithoutUserInput | Prisma.ReviewReactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ReviewReactionUpsertWithWhereUniqueWithoutUserInput | Prisma.ReviewReactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ReviewReactionCreateManyUserInputEnvelope;
    set?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    disconnect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    delete?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    connect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    update?: Prisma.ReviewReactionUpdateWithWhereUniqueWithoutUserInput | Prisma.ReviewReactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ReviewReactionUpdateManyWithWhereWithoutUserInput | Prisma.ReviewReactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ReviewReactionScalarWhereInput | Prisma.ReviewReactionScalarWhereInput[];
};
export type ReviewReactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewReactionCreateWithoutUserInput, Prisma.ReviewReactionUncheckedCreateWithoutUserInput> | Prisma.ReviewReactionCreateWithoutUserInput[] | Prisma.ReviewReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewReactionCreateOrConnectWithoutUserInput | Prisma.ReviewReactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ReviewReactionUpsertWithWhereUniqueWithoutUserInput | Prisma.ReviewReactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ReviewReactionCreateManyUserInputEnvelope;
    set?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    disconnect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    delete?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    connect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    update?: Prisma.ReviewReactionUpdateWithWhereUniqueWithoutUserInput | Prisma.ReviewReactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ReviewReactionUpdateManyWithWhereWithoutUserInput | Prisma.ReviewReactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ReviewReactionScalarWhereInput | Prisma.ReviewReactionScalarWhereInput[];
};
export type ReviewReactionCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.ReviewReactionCreateWithoutReviewInput, Prisma.ReviewReactionUncheckedCreateWithoutReviewInput> | Prisma.ReviewReactionCreateWithoutReviewInput[] | Prisma.ReviewReactionUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ReviewReactionCreateOrConnectWithoutReviewInput | Prisma.ReviewReactionCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.ReviewReactionCreateManyReviewInputEnvelope;
    connect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
};
export type ReviewReactionUncheckedCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.ReviewReactionCreateWithoutReviewInput, Prisma.ReviewReactionUncheckedCreateWithoutReviewInput> | Prisma.ReviewReactionCreateWithoutReviewInput[] | Prisma.ReviewReactionUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ReviewReactionCreateOrConnectWithoutReviewInput | Prisma.ReviewReactionCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.ReviewReactionCreateManyReviewInputEnvelope;
    connect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
};
export type ReviewReactionUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewReactionCreateWithoutReviewInput, Prisma.ReviewReactionUncheckedCreateWithoutReviewInput> | Prisma.ReviewReactionCreateWithoutReviewInput[] | Prisma.ReviewReactionUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ReviewReactionCreateOrConnectWithoutReviewInput | Prisma.ReviewReactionCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.ReviewReactionUpsertWithWhereUniqueWithoutReviewInput | Prisma.ReviewReactionUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.ReviewReactionCreateManyReviewInputEnvelope;
    set?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    disconnect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    delete?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    connect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    update?: Prisma.ReviewReactionUpdateWithWhereUniqueWithoutReviewInput | Prisma.ReviewReactionUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.ReviewReactionUpdateManyWithWhereWithoutReviewInput | Prisma.ReviewReactionUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.ReviewReactionScalarWhereInput | Prisma.ReviewReactionScalarWhereInput[];
};
export type ReviewReactionUncheckedUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewReactionCreateWithoutReviewInput, Prisma.ReviewReactionUncheckedCreateWithoutReviewInput> | Prisma.ReviewReactionCreateWithoutReviewInput[] | Prisma.ReviewReactionUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ReviewReactionCreateOrConnectWithoutReviewInput | Prisma.ReviewReactionCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.ReviewReactionUpsertWithWhereUniqueWithoutReviewInput | Prisma.ReviewReactionUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.ReviewReactionCreateManyReviewInputEnvelope;
    set?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    disconnect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    delete?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    connect?: Prisma.ReviewReactionWhereUniqueInput | Prisma.ReviewReactionWhereUniqueInput[];
    update?: Prisma.ReviewReactionUpdateWithWhereUniqueWithoutReviewInput | Prisma.ReviewReactionUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.ReviewReactionUpdateManyWithWhereWithoutReviewInput | Prisma.ReviewReactionUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.ReviewReactionScalarWhereInput | Prisma.ReviewReactionScalarWhereInput[];
};
export type EnumReactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.ReactionType;
};
export type ReviewReactionCreateWithoutUserInput = {
    id?: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
    review: Prisma.ReviewCreateNestedOneWithoutReactionsInput;
};
export type ReviewReactionUncheckedCreateWithoutUserInput = {
    id?: string;
    reviewId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type ReviewReactionCreateOrConnectWithoutUserInput = {
    where: Prisma.ReviewReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewReactionCreateWithoutUserInput, Prisma.ReviewReactionUncheckedCreateWithoutUserInput>;
};
export type ReviewReactionCreateManyUserInputEnvelope = {
    data: Prisma.ReviewReactionCreateManyUserInput | Prisma.ReviewReactionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ReviewReactionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ReviewReactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewReactionUpdateWithoutUserInput, Prisma.ReviewReactionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ReviewReactionCreateWithoutUserInput, Prisma.ReviewReactionUncheckedCreateWithoutUserInput>;
};
export type ReviewReactionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ReviewReactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewReactionUpdateWithoutUserInput, Prisma.ReviewReactionUncheckedUpdateWithoutUserInput>;
};
export type ReviewReactionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ReviewReactionScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewReactionUpdateManyMutationInput, Prisma.ReviewReactionUncheckedUpdateManyWithoutUserInput>;
};
export type ReviewReactionScalarWhereInput = {
    AND?: Prisma.ReviewReactionScalarWhereInput | Prisma.ReviewReactionScalarWhereInput[];
    OR?: Prisma.ReviewReactionScalarWhereInput[];
    NOT?: Prisma.ReviewReactionScalarWhereInput | Prisma.ReviewReactionScalarWhereInput[];
    id?: Prisma.StringFilter<"ReviewReaction"> | string;
    userId?: Prisma.StringFilter<"ReviewReaction"> | string;
    reviewId?: Prisma.StringFilter<"ReviewReaction"> | string;
    type?: Prisma.EnumReactionTypeFilter<"ReviewReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFilter<"ReviewReaction"> | Date | string;
};
export type ReviewReactionCreateWithoutReviewInput = {
    id?: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutReactionsInput;
};
export type ReviewReactionUncheckedCreateWithoutReviewInput = {
    id?: string;
    userId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type ReviewReactionCreateOrConnectWithoutReviewInput = {
    where: Prisma.ReviewReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewReactionCreateWithoutReviewInput, Prisma.ReviewReactionUncheckedCreateWithoutReviewInput>;
};
export type ReviewReactionCreateManyReviewInputEnvelope = {
    data: Prisma.ReviewReactionCreateManyReviewInput | Prisma.ReviewReactionCreateManyReviewInput[];
    skipDuplicates?: boolean;
};
export type ReviewReactionUpsertWithWhereUniqueWithoutReviewInput = {
    where: Prisma.ReviewReactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewReactionUpdateWithoutReviewInput, Prisma.ReviewReactionUncheckedUpdateWithoutReviewInput>;
    create: Prisma.XOR<Prisma.ReviewReactionCreateWithoutReviewInput, Prisma.ReviewReactionUncheckedCreateWithoutReviewInput>;
};
export type ReviewReactionUpdateWithWhereUniqueWithoutReviewInput = {
    where: Prisma.ReviewReactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewReactionUpdateWithoutReviewInput, Prisma.ReviewReactionUncheckedUpdateWithoutReviewInput>;
};
export type ReviewReactionUpdateManyWithWhereWithoutReviewInput = {
    where: Prisma.ReviewReactionScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewReactionUpdateManyMutationInput, Prisma.ReviewReactionUncheckedUpdateManyWithoutReviewInput>;
};
export type ReviewReactionCreateManyUserInput = {
    id?: string;
    reviewId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type ReviewReactionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    review?: Prisma.ReviewUpdateOneRequiredWithoutReactionsNestedInput;
};
export type ReviewReactionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewReactionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewReactionCreateManyReviewInput = {
    id?: string;
    userId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type ReviewReactionUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutReactionsNestedInput;
};
export type ReviewReactionUncheckedUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewReactionUncheckedUpdateManyWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewReactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    reviewId?: boolean;
    type?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reviewReaction"]>;
export type ReviewReactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    reviewId?: boolean;
    type?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reviewReaction"]>;
export type ReviewReactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    reviewId?: boolean;
    type?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reviewReaction"]>;
export type ReviewReactionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    reviewId?: boolean;
    type?: boolean;
    createdAt?: boolean;
};
export type ReviewReactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "reviewId" | "type" | "createdAt", ExtArgs["result"]["reviewReaction"]>;
export type ReviewReactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
};
export type ReviewReactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
};
export type ReviewReactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
};
export type $ReviewReactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ReviewReaction";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        review: Prisma.$ReviewPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        reviewId: string;
        type: $Enums.ReactionType;
        createdAt: Date;
    }, ExtArgs["result"]["reviewReaction"]>;
    composites: {};
};
export type ReviewReactionGetPayload<S extends boolean | null | undefined | ReviewReactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload, S>;
export type ReviewReactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReviewReactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReviewReactionCountAggregateInputType | true;
};
export interface ReviewReactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ReviewReaction'];
        meta: {
            name: 'ReviewReaction';
        };
    };
    findUnique<T extends ReviewReactionFindUniqueArgs>(args: Prisma.SelectSubset<T, ReviewReactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReviewReactionClient<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReviewReactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReviewReactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewReactionClient<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReviewReactionFindFirstArgs>(args?: Prisma.SelectSubset<T, ReviewReactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReviewReactionClient<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReviewReactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReviewReactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewReactionClient<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReviewReactionFindManyArgs>(args?: Prisma.SelectSubset<T, ReviewReactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReviewReactionCreateArgs>(args: Prisma.SelectSubset<T, ReviewReactionCreateArgs<ExtArgs>>): Prisma.Prisma__ReviewReactionClient<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReviewReactionCreateManyArgs>(args?: Prisma.SelectSubset<T, ReviewReactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReviewReactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReviewReactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReviewReactionDeleteArgs>(args: Prisma.SelectSubset<T, ReviewReactionDeleteArgs<ExtArgs>>): Prisma.Prisma__ReviewReactionClient<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReviewReactionUpdateArgs>(args: Prisma.SelectSubset<T, ReviewReactionUpdateArgs<ExtArgs>>): Prisma.Prisma__ReviewReactionClient<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReviewReactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReviewReactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReviewReactionUpdateManyArgs>(args: Prisma.SelectSubset<T, ReviewReactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReviewReactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReviewReactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReviewReactionUpsertArgs>(args: Prisma.SelectSubset<T, ReviewReactionUpsertArgs<ExtArgs>>): Prisma.Prisma__ReviewReactionClient<runtime.Types.Result.GetResult<Prisma.$ReviewReactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReviewReactionCountArgs>(args?: Prisma.Subset<T, ReviewReactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReviewReactionCountAggregateOutputType> : number>;
    aggregate<T extends ReviewReactionAggregateArgs>(args: Prisma.Subset<T, ReviewReactionAggregateArgs>): Prisma.PrismaPromise<GetReviewReactionAggregateType<T>>;
    groupBy<T extends ReviewReactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReviewReactionGroupByArgs['orderBy'];
    } : {
        orderBy?: ReviewReactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReviewReactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewReactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReviewReactionFieldRefs;
}
export interface Prisma__ReviewReactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    review<T extends Prisma.ReviewDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ReviewDefaultArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReviewReactionFieldRefs {
    readonly id: Prisma.FieldRef<"ReviewReaction", 'String'>;
    readonly userId: Prisma.FieldRef<"ReviewReaction", 'String'>;
    readonly reviewId: Prisma.FieldRef<"ReviewReaction", 'String'>;
    readonly type: Prisma.FieldRef<"ReviewReaction", 'ReactionType'>;
    readonly createdAt: Prisma.FieldRef<"ReviewReaction", 'DateTime'>;
}
export type ReviewReactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewReactionSelect<ExtArgs> | null;
    omit?: Prisma.ReviewReactionOmit<ExtArgs> | null;
    include?: Prisma.ReviewReactionInclude<ExtArgs> | null;
    where: Prisma.ReviewReactionWhereUniqueInput;
};
export type ReviewReactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewReactionSelect<ExtArgs> | null;
    omit?: Prisma.ReviewReactionOmit<ExtArgs> | null;
    include?: Prisma.ReviewReactionInclude<ExtArgs> | null;
    where: Prisma.ReviewReactionWhereUniqueInput;
};
export type ReviewReactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReviewReactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReviewReactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReviewReactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewReactionSelect<ExtArgs> | null;
    omit?: Prisma.ReviewReactionOmit<ExtArgs> | null;
    include?: Prisma.ReviewReactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewReactionCreateInput, Prisma.ReviewReactionUncheckedCreateInput>;
};
export type ReviewReactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReviewReactionCreateManyInput | Prisma.ReviewReactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReviewReactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewReactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReviewReactionOmit<ExtArgs> | null;
    data: Prisma.ReviewReactionCreateManyInput | Prisma.ReviewReactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReviewReactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReviewReactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewReactionSelect<ExtArgs> | null;
    omit?: Prisma.ReviewReactionOmit<ExtArgs> | null;
    include?: Prisma.ReviewReactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewReactionUpdateInput, Prisma.ReviewReactionUncheckedUpdateInput>;
    where: Prisma.ReviewReactionWhereUniqueInput;
};
export type ReviewReactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReviewReactionUpdateManyMutationInput, Prisma.ReviewReactionUncheckedUpdateManyInput>;
    where?: Prisma.ReviewReactionWhereInput;
    limit?: number;
};
export type ReviewReactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewReactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReviewReactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewReactionUpdateManyMutationInput, Prisma.ReviewReactionUncheckedUpdateManyInput>;
    where?: Prisma.ReviewReactionWhereInput;
    limit?: number;
    include?: Prisma.ReviewReactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReviewReactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewReactionSelect<ExtArgs> | null;
    omit?: Prisma.ReviewReactionOmit<ExtArgs> | null;
    include?: Prisma.ReviewReactionInclude<ExtArgs> | null;
    where: Prisma.ReviewReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewReactionCreateInput, Prisma.ReviewReactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReviewReactionUpdateInput, Prisma.ReviewReactionUncheckedUpdateInput>;
};
export type ReviewReactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewReactionSelect<ExtArgs> | null;
    omit?: Prisma.ReviewReactionOmit<ExtArgs> | null;
    include?: Prisma.ReviewReactionInclude<ExtArgs> | null;
    where: Prisma.ReviewReactionWhereUniqueInput;
};
export type ReviewReactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewReactionWhereInput;
    limit?: number;
};
export type ReviewReactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewReactionSelect<ExtArgs> | null;
    omit?: Prisma.ReviewReactionOmit<ExtArgs> | null;
    include?: Prisma.ReviewReactionInclude<ExtArgs> | null;
};
