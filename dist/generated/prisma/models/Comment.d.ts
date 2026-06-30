import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommentModel = runtime.Types.Result.DefaultSelection<Prisma.$CommentPayload>;
export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null;
    _min: CommentMinAggregateOutputType | null;
    _max: CommentMaxAggregateOutputType | null;
};
export type CommentMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    reviewId: string | null;
    content: string | null;
    status: $Enums.ContentStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type CommentMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    reviewId: string | null;
    content: string | null;
    status: $Enums.ContentStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type CommentCountAggregateOutputType = {
    id: number;
    userId: number;
    reviewId: number;
    content: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type CommentMinAggregateInputType = {
    id?: true;
    userId?: true;
    reviewId?: true;
    content?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type CommentMaxAggregateInputType = {
    id?: true;
    userId?: true;
    reviewId?: true;
    content?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type CommentCountAggregateInputType = {
    id?: true;
    userId?: true;
    reviewId?: true;
    content?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type CommentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[];
    cursor?: Prisma.CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommentCountAggregateInputType;
    _min?: CommentMinAggregateInputType;
    _max?: CommentMaxAggregateInputType;
};
export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
    [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateComment[P]> : Prisma.GetScalarType<T[P], AggregateComment[P]>;
};
export type CommentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithAggregationInput | Prisma.CommentOrderByWithAggregationInput[];
    by: Prisma.CommentScalarFieldEnum[] | Prisma.CommentScalarFieldEnum;
    having?: Prisma.CommentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommentCountAggregateInputType | true;
    _min?: CommentMinAggregateInputType;
    _max?: CommentMaxAggregateInputType;
};
export type CommentGroupByOutputType = {
    id: string;
    userId: string;
    reviewId: string;
    content: string;
    status: $Enums.ContentStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: CommentCountAggregateOutputType | null;
    _min: CommentMinAggregateOutputType | null;
    _max: CommentMaxAggregateOutputType | null;
};
export type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommentGroupByOutputType[P]>;
}>>;
export type CommentWhereInput = {
    AND?: Prisma.CommentWhereInput | Prisma.CommentWhereInput[];
    OR?: Prisma.CommentWhereInput[];
    NOT?: Prisma.CommentWhereInput | Prisma.CommentWhereInput[];
    id?: Prisma.StringFilter<"Comment"> | string;
    userId?: Prisma.StringFilter<"Comment"> | string;
    reviewId?: Prisma.StringFilter<"Comment"> | string;
    content?: Prisma.StringFilter<"Comment"> | string;
    status?: Prisma.EnumContentStatusFilter<"Comment"> | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Comment"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    review?: Prisma.XOR<Prisma.ReviewScalarRelationFilter, Prisma.ReviewWhereInput>;
    notifications?: Prisma.NotificationListRelationFilter;
};
export type CommentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    review?: Prisma.ReviewOrderByWithRelationInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
};
export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CommentWhereInput | Prisma.CommentWhereInput[];
    OR?: Prisma.CommentWhereInput[];
    NOT?: Prisma.CommentWhereInput | Prisma.CommentWhereInput[];
    userId?: Prisma.StringFilter<"Comment"> | string;
    reviewId?: Prisma.StringFilter<"Comment"> | string;
    content?: Prisma.StringFilter<"Comment"> | string;
    status?: Prisma.EnumContentStatusFilter<"Comment"> | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Comment"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    review?: Prisma.XOR<Prisma.ReviewScalarRelationFilter, Prisma.ReviewWhereInput>;
    notifications?: Prisma.NotificationListRelationFilter;
}, "id">;
export type CommentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.CommentCountOrderByAggregateInput;
    _max?: Prisma.CommentMaxOrderByAggregateInput;
    _min?: Prisma.CommentMinOrderByAggregateInput;
};
export type CommentScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommentScalarWhereWithAggregatesInput | Prisma.CommentScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommentScalarWhereWithAggregatesInput | Prisma.CommentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Comment"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Comment"> | string;
    reviewId?: Prisma.StringWithAggregatesFilter<"Comment"> | string;
    content?: Prisma.StringWithAggregatesFilter<"Comment"> | string;
    status?: Prisma.EnumContentStatusWithAggregatesFilter<"Comment"> | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Comment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Comment"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Comment"> | Date | string | null;
};
export type CommentCreateInput = {
    id?: string;
    content: string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutCommentsInput;
    review: Prisma.ReviewCreateNestedOneWithoutCommentsInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCommentInput;
};
export type CommentUncheckedCreateInput = {
    id?: string;
    userId: string;
    reviewId: string;
    content: string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCommentInput;
};
export type CommentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput;
    review?: Prisma.ReviewUpdateOneRequiredWithoutCommentsNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCommentNestedInput;
};
export type CommentCreateManyInput = {
    id?: string;
    userId: string;
    reviewId: string;
    content: string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type CommentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CommentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CommentListRelationFilter = {
    every?: Prisma.CommentWhereInput;
    some?: Prisma.CommentWhereInput;
    none?: Prisma.CommentWhereInput;
};
export type CommentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type CommentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type CommentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type CommentNullableScalarRelationFilter = {
    is?: Prisma.CommentWhereInput | null;
    isNot?: Prisma.CommentWhereInput | null;
};
export type CommentCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutUserInput, Prisma.CommentUncheckedCreateWithoutUserInput> | Prisma.CommentCreateWithoutUserInput[] | Prisma.CommentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutUserInput | Prisma.CommentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommentCreateManyUserInputEnvelope;
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
};
export type CommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutUserInput, Prisma.CommentUncheckedCreateWithoutUserInput> | Prisma.CommentCreateWithoutUserInput[] | Prisma.CommentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutUserInput | Prisma.CommentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommentCreateManyUserInputEnvelope;
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
};
export type CommentUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutUserInput, Prisma.CommentUncheckedCreateWithoutUserInput> | Prisma.CommentCreateWithoutUserInput[] | Prisma.CommentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutUserInput | Prisma.CommentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommentUpsertWithWhereUniqueWithoutUserInput | Prisma.CommentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommentCreateManyUserInputEnvelope;
    set?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    disconnect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    delete?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    update?: Prisma.CommentUpdateWithWhereUniqueWithoutUserInput | Prisma.CommentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommentUpdateManyWithWhereWithoutUserInput | Prisma.CommentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
};
export type CommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutUserInput, Prisma.CommentUncheckedCreateWithoutUserInput> | Prisma.CommentCreateWithoutUserInput[] | Prisma.CommentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutUserInput | Prisma.CommentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommentUpsertWithWhereUniqueWithoutUserInput | Prisma.CommentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommentCreateManyUserInputEnvelope;
    set?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    disconnect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    delete?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    update?: Prisma.CommentUpdateWithWhereUniqueWithoutUserInput | Prisma.CommentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommentUpdateManyWithWhereWithoutUserInput | Prisma.CommentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
};
export type CommentCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutReviewInput, Prisma.CommentUncheckedCreateWithoutReviewInput> | Prisma.CommentCreateWithoutReviewInput[] | Prisma.CommentUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutReviewInput | Prisma.CommentCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.CommentCreateManyReviewInputEnvelope;
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
};
export type CommentUncheckedCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutReviewInput, Prisma.CommentUncheckedCreateWithoutReviewInput> | Prisma.CommentCreateWithoutReviewInput[] | Prisma.CommentUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutReviewInput | Prisma.CommentCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.CommentCreateManyReviewInputEnvelope;
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
};
export type CommentUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutReviewInput, Prisma.CommentUncheckedCreateWithoutReviewInput> | Prisma.CommentCreateWithoutReviewInput[] | Prisma.CommentUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutReviewInput | Prisma.CommentCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.CommentUpsertWithWhereUniqueWithoutReviewInput | Prisma.CommentUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.CommentCreateManyReviewInputEnvelope;
    set?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    disconnect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    delete?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    update?: Prisma.CommentUpdateWithWhereUniqueWithoutReviewInput | Prisma.CommentUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.CommentUpdateManyWithWhereWithoutReviewInput | Prisma.CommentUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
};
export type CommentUncheckedUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutReviewInput, Prisma.CommentUncheckedCreateWithoutReviewInput> | Prisma.CommentCreateWithoutReviewInput[] | Prisma.CommentUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutReviewInput | Prisma.CommentCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.CommentUpsertWithWhereUniqueWithoutReviewInput | Prisma.CommentUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.CommentCreateManyReviewInputEnvelope;
    set?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    disconnect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    delete?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    update?: Prisma.CommentUpdateWithWhereUniqueWithoutReviewInput | Prisma.CommentUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.CommentUpdateManyWithWhereWithoutReviewInput | Prisma.CommentUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
};
export type CommentCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutNotificationsInput, Prisma.CommentUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.CommentWhereUniqueInput;
};
export type CommentUpdateOneWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutNotificationsInput, Prisma.CommentUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.CommentUpsertWithoutNotificationsInput;
    disconnect?: Prisma.CommentWhereInput | boolean;
    delete?: Prisma.CommentWhereInput | boolean;
    connect?: Prisma.CommentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommentUpdateToOneWithWhereWithoutNotificationsInput, Prisma.CommentUpdateWithoutNotificationsInput>, Prisma.CommentUncheckedUpdateWithoutNotificationsInput>;
};
export type CommentCreateWithoutUserInput = {
    id?: string;
    content: string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    review: Prisma.ReviewCreateNestedOneWithoutCommentsInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCommentInput;
};
export type CommentUncheckedCreateWithoutUserInput = {
    id?: string;
    reviewId: string;
    content: string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCommentInput;
};
export type CommentCreateOrConnectWithoutUserInput = {
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateWithoutUserInput, Prisma.CommentUncheckedCreateWithoutUserInput>;
};
export type CommentCreateManyUserInputEnvelope = {
    data: Prisma.CommentCreateManyUserInput | Prisma.CommentCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CommentUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommentWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommentUpdateWithoutUserInput, Prisma.CommentUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CommentCreateWithoutUserInput, Prisma.CommentUncheckedCreateWithoutUserInput>;
};
export type CommentUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommentUpdateWithoutUserInput, Prisma.CommentUncheckedUpdateWithoutUserInput>;
};
export type CommentUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CommentScalarWhereInput;
    data: Prisma.XOR<Prisma.CommentUpdateManyMutationInput, Prisma.CommentUncheckedUpdateManyWithoutUserInput>;
};
export type CommentScalarWhereInput = {
    AND?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
    OR?: Prisma.CommentScalarWhereInput[];
    NOT?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
    id?: Prisma.StringFilter<"Comment"> | string;
    userId?: Prisma.StringFilter<"Comment"> | string;
    reviewId?: Prisma.StringFilter<"Comment"> | string;
    content?: Prisma.StringFilter<"Comment"> | string;
    status?: Prisma.EnumContentStatusFilter<"Comment"> | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Comment"> | Date | string | null;
};
export type CommentCreateWithoutReviewInput = {
    id?: string;
    content: string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutCommentsInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCommentInput;
};
export type CommentUncheckedCreateWithoutReviewInput = {
    id?: string;
    userId: string;
    content: string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCommentInput;
};
export type CommentCreateOrConnectWithoutReviewInput = {
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateWithoutReviewInput, Prisma.CommentUncheckedCreateWithoutReviewInput>;
};
export type CommentCreateManyReviewInputEnvelope = {
    data: Prisma.CommentCreateManyReviewInput | Prisma.CommentCreateManyReviewInput[];
    skipDuplicates?: boolean;
};
export type CommentUpsertWithWhereUniqueWithoutReviewInput = {
    where: Prisma.CommentWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommentUpdateWithoutReviewInput, Prisma.CommentUncheckedUpdateWithoutReviewInput>;
    create: Prisma.XOR<Prisma.CommentCreateWithoutReviewInput, Prisma.CommentUncheckedCreateWithoutReviewInput>;
};
export type CommentUpdateWithWhereUniqueWithoutReviewInput = {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommentUpdateWithoutReviewInput, Prisma.CommentUncheckedUpdateWithoutReviewInput>;
};
export type CommentUpdateManyWithWhereWithoutReviewInput = {
    where: Prisma.CommentScalarWhereInput;
    data: Prisma.XOR<Prisma.CommentUpdateManyMutationInput, Prisma.CommentUncheckedUpdateManyWithoutReviewInput>;
};
export type CommentCreateWithoutNotificationsInput = {
    id?: string;
    content: string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutCommentsInput;
    review: Prisma.ReviewCreateNestedOneWithoutCommentsInput;
};
export type CommentUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    userId: string;
    reviewId: string;
    content: string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type CommentCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateWithoutNotificationsInput, Prisma.CommentUncheckedCreateWithoutNotificationsInput>;
};
export type CommentUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.CommentUpdateWithoutNotificationsInput, Prisma.CommentUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.CommentCreateWithoutNotificationsInput, Prisma.CommentUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.CommentWhereInput;
};
export type CommentUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.CommentWhereInput;
    data: Prisma.XOR<Prisma.CommentUpdateWithoutNotificationsInput, Prisma.CommentUncheckedUpdateWithoutNotificationsInput>;
};
export type CommentUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput;
    review?: Prisma.ReviewUpdateOneRequiredWithoutCommentsNestedInput;
};
export type CommentUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CommentCreateManyUserInput = {
    id?: string;
    reviewId: string;
    content: string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type CommentUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    review?: Prisma.ReviewUpdateOneRequiredWithoutCommentsNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CommentCreateManyReviewInput = {
    id?: string;
    userId: string;
    content: string;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type CommentUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateManyWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CommentCountOutputType = {
    notifications: number;
};
export type CommentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    notifications?: boolean | CommentCountOutputTypeCountNotificationsArgs;
};
export type CommentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentCountOutputTypeSelect<ExtArgs> | null;
};
export type CommentCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type CommentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    reviewId?: boolean;
    content?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
    notifications?: boolean | Prisma.Comment$notificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.CommentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["comment"]>;
export type CommentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    reviewId?: boolean;
    content?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["comment"]>;
export type CommentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    reviewId?: boolean;
    content?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["comment"]>;
export type CommentSelectScalar = {
    id?: boolean;
    userId?: boolean;
    reviewId?: boolean;
    content?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type CommentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "reviewId" | "content" | "status" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["comment"]>;
export type CommentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
    notifications?: boolean | Prisma.Comment$notificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.CommentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CommentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
};
export type CommentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.ReviewDefaultArgs<ExtArgs>;
};
export type $CommentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Comment";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        review: Prisma.$ReviewPayload<ExtArgs>;
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        reviewId: string;
        content: string;
        status: $Enums.ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["comment"]>;
    composites: {};
};
export type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommentPayload, S>;
export type CommentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommentCountAggregateInputType | true;
};
export interface CommentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Comment'];
        meta: {
            name: 'Comment';
        };
    };
    findUnique<T extends CommentFindUniqueArgs>(args: Prisma.SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommentFindFirstArgs>(args?: Prisma.SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommentFindManyArgs>(args?: Prisma.SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommentCreateArgs>(args: Prisma.SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommentCreateManyArgs>(args?: Prisma.SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommentDeleteArgs>(args: Prisma.SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommentUpdateArgs>(args: Prisma.SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommentDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommentUpdateManyArgs>(args: Prisma.SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommentUpsertArgs>(args: Prisma.SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommentCountArgs>(args?: Prisma.Subset<T, CommentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommentCountAggregateOutputType> : number>;
    aggregate<T extends CommentAggregateArgs>(args: Prisma.Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>;
    groupBy<T extends CommentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommentGroupByArgs['orderBy'];
    } : {
        orderBy?: CommentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommentFieldRefs;
}
export interface Prisma__CommentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    review<T extends Prisma.ReviewDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ReviewDefaultArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    notifications<T extends Prisma.Comment$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Comment$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommentFieldRefs {
    readonly id: Prisma.FieldRef<"Comment", 'String'>;
    readonly userId: Prisma.FieldRef<"Comment", 'String'>;
    readonly reviewId: Prisma.FieldRef<"Comment", 'String'>;
    readonly content: Prisma.FieldRef<"Comment", 'String'>;
    readonly status: Prisma.FieldRef<"Comment", 'ContentStatus'>;
    readonly createdAt: Prisma.FieldRef<"Comment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Comment", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Comment", 'DateTime'>;
}
export type CommentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where: Prisma.CommentWhereUniqueInput;
};
export type CommentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where: Prisma.CommentWhereUniqueInput;
};
export type CommentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentCreateInput, Prisma.CommentUncheckedCreateInput>;
};
export type CommentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommentCreateManyInput | Prisma.CommentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    data: Prisma.CommentCreateManyInput | Prisma.CommentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentUpdateInput, Prisma.CommentUncheckedUpdateInput>;
    where: Prisma.CommentWhereUniqueInput;
};
export type CommentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommentUpdateManyMutationInput, Prisma.CommentUncheckedUpdateManyInput>;
    where?: Prisma.CommentWhereInput;
    limit?: number;
};
export type CommentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentUpdateManyMutationInput, Prisma.CommentUncheckedUpdateManyInput>;
    where?: Prisma.CommentWhereInput;
    limit?: number;
    include?: Prisma.CommentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateInput, Prisma.CommentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommentUpdateInput, Prisma.CommentUncheckedUpdateInput>;
};
export type CommentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where: Prisma.CommentWhereUniqueInput;
};
export type CommentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
    limit?: number;
};
export type Comment$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
};
