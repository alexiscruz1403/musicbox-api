import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FollowRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$FollowRequestPayload>;
export type AggregateFollowRequest = {
    _count: FollowRequestCountAggregateOutputType | null;
    _min: FollowRequestMinAggregateOutputType | null;
    _max: FollowRequestMaxAggregateOutputType | null;
};
export type FollowRequestMinAggregateOutputType = {
    id: string | null;
    requesterId: string | null;
    targetId: string | null;
    status: $Enums.FollowRequestStatus | null;
    createdAt: Date | null;
    respondedAt: Date | null;
};
export type FollowRequestMaxAggregateOutputType = {
    id: string | null;
    requesterId: string | null;
    targetId: string | null;
    status: $Enums.FollowRequestStatus | null;
    createdAt: Date | null;
    respondedAt: Date | null;
};
export type FollowRequestCountAggregateOutputType = {
    id: number;
    requesterId: number;
    targetId: number;
    status: number;
    createdAt: number;
    respondedAt: number;
    _all: number;
};
export type FollowRequestMinAggregateInputType = {
    id?: true;
    requesterId?: true;
    targetId?: true;
    status?: true;
    createdAt?: true;
    respondedAt?: true;
};
export type FollowRequestMaxAggregateInputType = {
    id?: true;
    requesterId?: true;
    targetId?: true;
    status?: true;
    createdAt?: true;
    respondedAt?: true;
};
export type FollowRequestCountAggregateInputType = {
    id?: true;
    requesterId?: true;
    targetId?: true;
    status?: true;
    createdAt?: true;
    respondedAt?: true;
    _all?: true;
};
export type FollowRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowRequestWhereInput;
    orderBy?: Prisma.FollowRequestOrderByWithRelationInput | Prisma.FollowRequestOrderByWithRelationInput[];
    cursor?: Prisma.FollowRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FollowRequestCountAggregateInputType;
    _min?: FollowRequestMinAggregateInputType;
    _max?: FollowRequestMaxAggregateInputType;
};
export type GetFollowRequestAggregateType<T extends FollowRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateFollowRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFollowRequest[P]> : Prisma.GetScalarType<T[P], AggregateFollowRequest[P]>;
};
export type FollowRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowRequestWhereInput;
    orderBy?: Prisma.FollowRequestOrderByWithAggregationInput | Prisma.FollowRequestOrderByWithAggregationInput[];
    by: Prisma.FollowRequestScalarFieldEnum[] | Prisma.FollowRequestScalarFieldEnum;
    having?: Prisma.FollowRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FollowRequestCountAggregateInputType | true;
    _min?: FollowRequestMinAggregateInputType;
    _max?: FollowRequestMaxAggregateInputType;
};
export type FollowRequestGroupByOutputType = {
    id: string;
    requesterId: string;
    targetId: string;
    status: $Enums.FollowRequestStatus;
    createdAt: Date;
    respondedAt: Date | null;
    _count: FollowRequestCountAggregateOutputType | null;
    _min: FollowRequestMinAggregateOutputType | null;
    _max: FollowRequestMaxAggregateOutputType | null;
};
export type GetFollowRequestGroupByPayload<T extends FollowRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FollowRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FollowRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FollowRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FollowRequestGroupByOutputType[P]>;
}>>;
export type FollowRequestWhereInput = {
    AND?: Prisma.FollowRequestWhereInput | Prisma.FollowRequestWhereInput[];
    OR?: Prisma.FollowRequestWhereInput[];
    NOT?: Prisma.FollowRequestWhereInput | Prisma.FollowRequestWhereInput[];
    id?: Prisma.StringFilter<"FollowRequest"> | string;
    requesterId?: Prisma.StringFilter<"FollowRequest"> | string;
    targetId?: Prisma.StringFilter<"FollowRequest"> | string;
    status?: Prisma.EnumFollowRequestStatusFilter<"FollowRequest"> | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"FollowRequest"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableFilter<"FollowRequest"> | Date | string | null;
    requester?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    target?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type FollowRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    requester?: Prisma.UserOrderByWithRelationInput;
    target?: Prisma.UserOrderByWithRelationInput;
};
export type FollowRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    requesterId_targetId?: Prisma.FollowRequestRequesterIdTargetIdCompoundUniqueInput;
    AND?: Prisma.FollowRequestWhereInput | Prisma.FollowRequestWhereInput[];
    OR?: Prisma.FollowRequestWhereInput[];
    NOT?: Prisma.FollowRequestWhereInput | Prisma.FollowRequestWhereInput[];
    requesterId?: Prisma.StringFilter<"FollowRequest"> | string;
    targetId?: Prisma.StringFilter<"FollowRequest"> | string;
    status?: Prisma.EnumFollowRequestStatusFilter<"FollowRequest"> | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"FollowRequest"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableFilter<"FollowRequest"> | Date | string | null;
    requester?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    target?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "requesterId_targetId">;
export type FollowRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.FollowRequestCountOrderByAggregateInput;
    _max?: Prisma.FollowRequestMaxOrderByAggregateInput;
    _min?: Prisma.FollowRequestMinOrderByAggregateInput;
};
export type FollowRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.FollowRequestScalarWhereWithAggregatesInput | Prisma.FollowRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.FollowRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FollowRequestScalarWhereWithAggregatesInput | Prisma.FollowRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FollowRequest"> | string;
    requesterId?: Prisma.StringWithAggregatesFilter<"FollowRequest"> | string;
    targetId?: Prisma.StringWithAggregatesFilter<"FollowRequest"> | string;
    status?: Prisma.EnumFollowRequestStatusWithAggregatesFilter<"FollowRequest"> | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FollowRequest"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FollowRequest"> | Date | string | null;
};
export type FollowRequestCreateInput = {
    id?: string;
    status?: $Enums.FollowRequestStatus;
    createdAt?: Date | string;
    respondedAt?: Date | string | null;
    requester: Prisma.UserCreateNestedOneWithoutFollowRequestsSentInput;
    target: Prisma.UserCreateNestedOneWithoutFollowRequestsReceivedInput;
};
export type FollowRequestUncheckedCreateInput = {
    id?: string;
    requesterId: string;
    targetId: string;
    status?: $Enums.FollowRequestStatus;
    createdAt?: Date | string;
    respondedAt?: Date | string | null;
};
export type FollowRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFollowRequestStatusFieldUpdateOperationsInput | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requester?: Prisma.UserUpdateOneRequiredWithoutFollowRequestsSentNestedInput;
    target?: Prisma.UserUpdateOneRequiredWithoutFollowRequestsReceivedNestedInput;
};
export type FollowRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requesterId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFollowRequestStatusFieldUpdateOperationsInput | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FollowRequestCreateManyInput = {
    id?: string;
    requesterId: string;
    targetId: string;
    status?: $Enums.FollowRequestStatus;
    createdAt?: Date | string;
    respondedAt?: Date | string | null;
};
export type FollowRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFollowRequestStatusFieldUpdateOperationsInput | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FollowRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requesterId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFollowRequestStatusFieldUpdateOperationsInput | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FollowRequestListRelationFilter = {
    every?: Prisma.FollowRequestWhereInput;
    some?: Prisma.FollowRequestWhereInput;
    none?: Prisma.FollowRequestWhereInput;
};
export type FollowRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FollowRequestRequesterIdTargetIdCompoundUniqueInput = {
    requesterId: string;
    targetId: string;
};
export type FollowRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
};
export type FollowRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
};
export type FollowRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
};
export type FollowRequestCreateNestedManyWithoutRequesterInput = {
    create?: Prisma.XOR<Prisma.FollowRequestCreateWithoutRequesterInput, Prisma.FollowRequestUncheckedCreateWithoutRequesterInput> | Prisma.FollowRequestCreateWithoutRequesterInput[] | Prisma.FollowRequestUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.FollowRequestCreateOrConnectWithoutRequesterInput | Prisma.FollowRequestCreateOrConnectWithoutRequesterInput[];
    createMany?: Prisma.FollowRequestCreateManyRequesterInputEnvelope;
    connect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
};
export type FollowRequestCreateNestedManyWithoutTargetInput = {
    create?: Prisma.XOR<Prisma.FollowRequestCreateWithoutTargetInput, Prisma.FollowRequestUncheckedCreateWithoutTargetInput> | Prisma.FollowRequestCreateWithoutTargetInput[] | Prisma.FollowRequestUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.FollowRequestCreateOrConnectWithoutTargetInput | Prisma.FollowRequestCreateOrConnectWithoutTargetInput[];
    createMany?: Prisma.FollowRequestCreateManyTargetInputEnvelope;
    connect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
};
export type FollowRequestUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: Prisma.XOR<Prisma.FollowRequestCreateWithoutRequesterInput, Prisma.FollowRequestUncheckedCreateWithoutRequesterInput> | Prisma.FollowRequestCreateWithoutRequesterInput[] | Prisma.FollowRequestUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.FollowRequestCreateOrConnectWithoutRequesterInput | Prisma.FollowRequestCreateOrConnectWithoutRequesterInput[];
    createMany?: Prisma.FollowRequestCreateManyRequesterInputEnvelope;
    connect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
};
export type FollowRequestUncheckedCreateNestedManyWithoutTargetInput = {
    create?: Prisma.XOR<Prisma.FollowRequestCreateWithoutTargetInput, Prisma.FollowRequestUncheckedCreateWithoutTargetInput> | Prisma.FollowRequestCreateWithoutTargetInput[] | Prisma.FollowRequestUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.FollowRequestCreateOrConnectWithoutTargetInput | Prisma.FollowRequestCreateOrConnectWithoutTargetInput[];
    createMany?: Prisma.FollowRequestCreateManyTargetInputEnvelope;
    connect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
};
export type FollowRequestUpdateManyWithoutRequesterNestedInput = {
    create?: Prisma.XOR<Prisma.FollowRequestCreateWithoutRequesterInput, Prisma.FollowRequestUncheckedCreateWithoutRequesterInput> | Prisma.FollowRequestCreateWithoutRequesterInput[] | Prisma.FollowRequestUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.FollowRequestCreateOrConnectWithoutRequesterInput | Prisma.FollowRequestCreateOrConnectWithoutRequesterInput[];
    upsert?: Prisma.FollowRequestUpsertWithWhereUniqueWithoutRequesterInput | Prisma.FollowRequestUpsertWithWhereUniqueWithoutRequesterInput[];
    createMany?: Prisma.FollowRequestCreateManyRequesterInputEnvelope;
    set?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    disconnect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    delete?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    connect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    update?: Prisma.FollowRequestUpdateWithWhereUniqueWithoutRequesterInput | Prisma.FollowRequestUpdateWithWhereUniqueWithoutRequesterInput[];
    updateMany?: Prisma.FollowRequestUpdateManyWithWhereWithoutRequesterInput | Prisma.FollowRequestUpdateManyWithWhereWithoutRequesterInput[];
    deleteMany?: Prisma.FollowRequestScalarWhereInput | Prisma.FollowRequestScalarWhereInput[];
};
export type FollowRequestUpdateManyWithoutTargetNestedInput = {
    create?: Prisma.XOR<Prisma.FollowRequestCreateWithoutTargetInput, Prisma.FollowRequestUncheckedCreateWithoutTargetInput> | Prisma.FollowRequestCreateWithoutTargetInput[] | Prisma.FollowRequestUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.FollowRequestCreateOrConnectWithoutTargetInput | Prisma.FollowRequestCreateOrConnectWithoutTargetInput[];
    upsert?: Prisma.FollowRequestUpsertWithWhereUniqueWithoutTargetInput | Prisma.FollowRequestUpsertWithWhereUniqueWithoutTargetInput[];
    createMany?: Prisma.FollowRequestCreateManyTargetInputEnvelope;
    set?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    disconnect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    delete?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    connect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    update?: Prisma.FollowRequestUpdateWithWhereUniqueWithoutTargetInput | Prisma.FollowRequestUpdateWithWhereUniqueWithoutTargetInput[];
    updateMany?: Prisma.FollowRequestUpdateManyWithWhereWithoutTargetInput | Prisma.FollowRequestUpdateManyWithWhereWithoutTargetInput[];
    deleteMany?: Prisma.FollowRequestScalarWhereInput | Prisma.FollowRequestScalarWhereInput[];
};
export type FollowRequestUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: Prisma.XOR<Prisma.FollowRequestCreateWithoutRequesterInput, Prisma.FollowRequestUncheckedCreateWithoutRequesterInput> | Prisma.FollowRequestCreateWithoutRequesterInput[] | Prisma.FollowRequestUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.FollowRequestCreateOrConnectWithoutRequesterInput | Prisma.FollowRequestCreateOrConnectWithoutRequesterInput[];
    upsert?: Prisma.FollowRequestUpsertWithWhereUniqueWithoutRequesterInput | Prisma.FollowRequestUpsertWithWhereUniqueWithoutRequesterInput[];
    createMany?: Prisma.FollowRequestCreateManyRequesterInputEnvelope;
    set?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    disconnect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    delete?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    connect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    update?: Prisma.FollowRequestUpdateWithWhereUniqueWithoutRequesterInput | Prisma.FollowRequestUpdateWithWhereUniqueWithoutRequesterInput[];
    updateMany?: Prisma.FollowRequestUpdateManyWithWhereWithoutRequesterInput | Prisma.FollowRequestUpdateManyWithWhereWithoutRequesterInput[];
    deleteMany?: Prisma.FollowRequestScalarWhereInput | Prisma.FollowRequestScalarWhereInput[];
};
export type FollowRequestUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: Prisma.XOR<Prisma.FollowRequestCreateWithoutTargetInput, Prisma.FollowRequestUncheckedCreateWithoutTargetInput> | Prisma.FollowRequestCreateWithoutTargetInput[] | Prisma.FollowRequestUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.FollowRequestCreateOrConnectWithoutTargetInput | Prisma.FollowRequestCreateOrConnectWithoutTargetInput[];
    upsert?: Prisma.FollowRequestUpsertWithWhereUniqueWithoutTargetInput | Prisma.FollowRequestUpsertWithWhereUniqueWithoutTargetInput[];
    createMany?: Prisma.FollowRequestCreateManyTargetInputEnvelope;
    set?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    disconnect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    delete?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    connect?: Prisma.FollowRequestWhereUniqueInput | Prisma.FollowRequestWhereUniqueInput[];
    update?: Prisma.FollowRequestUpdateWithWhereUniqueWithoutTargetInput | Prisma.FollowRequestUpdateWithWhereUniqueWithoutTargetInput[];
    updateMany?: Prisma.FollowRequestUpdateManyWithWhereWithoutTargetInput | Prisma.FollowRequestUpdateManyWithWhereWithoutTargetInput[];
    deleteMany?: Prisma.FollowRequestScalarWhereInput | Prisma.FollowRequestScalarWhereInput[];
};
export type EnumFollowRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.FollowRequestStatus;
};
export type FollowRequestCreateWithoutRequesterInput = {
    id?: string;
    status?: $Enums.FollowRequestStatus;
    createdAt?: Date | string;
    respondedAt?: Date | string | null;
    target: Prisma.UserCreateNestedOneWithoutFollowRequestsReceivedInput;
};
export type FollowRequestUncheckedCreateWithoutRequesterInput = {
    id?: string;
    targetId: string;
    status?: $Enums.FollowRequestStatus;
    createdAt?: Date | string;
    respondedAt?: Date | string | null;
};
export type FollowRequestCreateOrConnectWithoutRequesterInput = {
    where: Prisma.FollowRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.FollowRequestCreateWithoutRequesterInput, Prisma.FollowRequestUncheckedCreateWithoutRequesterInput>;
};
export type FollowRequestCreateManyRequesterInputEnvelope = {
    data: Prisma.FollowRequestCreateManyRequesterInput | Prisma.FollowRequestCreateManyRequesterInput[];
    skipDuplicates?: boolean;
};
export type FollowRequestCreateWithoutTargetInput = {
    id?: string;
    status?: $Enums.FollowRequestStatus;
    createdAt?: Date | string;
    respondedAt?: Date | string | null;
    requester: Prisma.UserCreateNestedOneWithoutFollowRequestsSentInput;
};
export type FollowRequestUncheckedCreateWithoutTargetInput = {
    id?: string;
    requesterId: string;
    status?: $Enums.FollowRequestStatus;
    createdAt?: Date | string;
    respondedAt?: Date | string | null;
};
export type FollowRequestCreateOrConnectWithoutTargetInput = {
    where: Prisma.FollowRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.FollowRequestCreateWithoutTargetInput, Prisma.FollowRequestUncheckedCreateWithoutTargetInput>;
};
export type FollowRequestCreateManyTargetInputEnvelope = {
    data: Prisma.FollowRequestCreateManyTargetInput | Prisma.FollowRequestCreateManyTargetInput[];
    skipDuplicates?: boolean;
};
export type FollowRequestUpsertWithWhereUniqueWithoutRequesterInput = {
    where: Prisma.FollowRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.FollowRequestUpdateWithoutRequesterInput, Prisma.FollowRequestUncheckedUpdateWithoutRequesterInput>;
    create: Prisma.XOR<Prisma.FollowRequestCreateWithoutRequesterInput, Prisma.FollowRequestUncheckedCreateWithoutRequesterInput>;
};
export type FollowRequestUpdateWithWhereUniqueWithoutRequesterInput = {
    where: Prisma.FollowRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.FollowRequestUpdateWithoutRequesterInput, Prisma.FollowRequestUncheckedUpdateWithoutRequesterInput>;
};
export type FollowRequestUpdateManyWithWhereWithoutRequesterInput = {
    where: Prisma.FollowRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.FollowRequestUpdateManyMutationInput, Prisma.FollowRequestUncheckedUpdateManyWithoutRequesterInput>;
};
export type FollowRequestScalarWhereInput = {
    AND?: Prisma.FollowRequestScalarWhereInput | Prisma.FollowRequestScalarWhereInput[];
    OR?: Prisma.FollowRequestScalarWhereInput[];
    NOT?: Prisma.FollowRequestScalarWhereInput | Prisma.FollowRequestScalarWhereInput[];
    id?: Prisma.StringFilter<"FollowRequest"> | string;
    requesterId?: Prisma.StringFilter<"FollowRequest"> | string;
    targetId?: Prisma.StringFilter<"FollowRequest"> | string;
    status?: Prisma.EnumFollowRequestStatusFilter<"FollowRequest"> | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"FollowRequest"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableFilter<"FollowRequest"> | Date | string | null;
};
export type FollowRequestUpsertWithWhereUniqueWithoutTargetInput = {
    where: Prisma.FollowRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.FollowRequestUpdateWithoutTargetInput, Prisma.FollowRequestUncheckedUpdateWithoutTargetInput>;
    create: Prisma.XOR<Prisma.FollowRequestCreateWithoutTargetInput, Prisma.FollowRequestUncheckedCreateWithoutTargetInput>;
};
export type FollowRequestUpdateWithWhereUniqueWithoutTargetInput = {
    where: Prisma.FollowRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.FollowRequestUpdateWithoutTargetInput, Prisma.FollowRequestUncheckedUpdateWithoutTargetInput>;
};
export type FollowRequestUpdateManyWithWhereWithoutTargetInput = {
    where: Prisma.FollowRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.FollowRequestUpdateManyMutationInput, Prisma.FollowRequestUncheckedUpdateManyWithoutTargetInput>;
};
export type FollowRequestCreateManyRequesterInput = {
    id?: string;
    targetId: string;
    status?: $Enums.FollowRequestStatus;
    createdAt?: Date | string;
    respondedAt?: Date | string | null;
};
export type FollowRequestCreateManyTargetInput = {
    id?: string;
    requesterId: string;
    status?: $Enums.FollowRequestStatus;
    createdAt?: Date | string;
    respondedAt?: Date | string | null;
};
export type FollowRequestUpdateWithoutRequesterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFollowRequestStatusFieldUpdateOperationsInput | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    target?: Prisma.UserUpdateOneRequiredWithoutFollowRequestsReceivedNestedInput;
};
export type FollowRequestUncheckedUpdateWithoutRequesterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFollowRequestStatusFieldUpdateOperationsInput | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FollowRequestUncheckedUpdateManyWithoutRequesterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFollowRequestStatusFieldUpdateOperationsInput | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FollowRequestUpdateWithoutTargetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFollowRequestStatusFieldUpdateOperationsInput | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requester?: Prisma.UserUpdateOneRequiredWithoutFollowRequestsSentNestedInput;
};
export type FollowRequestUncheckedUpdateWithoutTargetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requesterId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFollowRequestStatusFieldUpdateOperationsInput | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FollowRequestUncheckedUpdateManyWithoutTargetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requesterId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFollowRequestStatusFieldUpdateOperationsInput | $Enums.FollowRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FollowRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requesterId?: boolean;
    targetId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    respondedAt?: boolean;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["followRequest"]>;
export type FollowRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requesterId?: boolean;
    targetId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    respondedAt?: boolean;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["followRequest"]>;
export type FollowRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requesterId?: boolean;
    targetId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    respondedAt?: boolean;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["followRequest"]>;
export type FollowRequestSelectScalar = {
    id?: boolean;
    requesterId?: boolean;
    targetId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    respondedAt?: boolean;
};
export type FollowRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "requesterId" | "targetId" | "status" | "createdAt" | "respondedAt", ExtArgs["result"]["followRequest"]>;
export type FollowRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FollowRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FollowRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $FollowRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FollowRequest";
    objects: {
        requester: Prisma.$UserPayload<ExtArgs>;
        target: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        requesterId: string;
        targetId: string;
        status: $Enums.FollowRequestStatus;
        createdAt: Date;
        respondedAt: Date | null;
    }, ExtArgs["result"]["followRequest"]>;
    composites: {};
};
export type FollowRequestGetPayload<S extends boolean | null | undefined | FollowRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload, S>;
export type FollowRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FollowRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FollowRequestCountAggregateInputType | true;
};
export interface FollowRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FollowRequest'];
        meta: {
            name: 'FollowRequest';
        };
    };
    findUnique<T extends FollowRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, FollowRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FollowRequestClient<runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FollowRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FollowRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FollowRequestClient<runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FollowRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, FollowRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__FollowRequestClient<runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FollowRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FollowRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FollowRequestClient<runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FollowRequestFindManyArgs>(args?: Prisma.SelectSubset<T, FollowRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FollowRequestCreateArgs>(args: Prisma.SelectSubset<T, FollowRequestCreateArgs<ExtArgs>>): Prisma.Prisma__FollowRequestClient<runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FollowRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, FollowRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FollowRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FollowRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FollowRequestDeleteArgs>(args: Prisma.SelectSubset<T, FollowRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__FollowRequestClient<runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FollowRequestUpdateArgs>(args: Prisma.SelectSubset<T, FollowRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__FollowRequestClient<runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FollowRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, FollowRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FollowRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, FollowRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FollowRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FollowRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FollowRequestUpsertArgs>(args: Prisma.SelectSubset<T, FollowRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__FollowRequestClient<runtime.Types.Result.GetResult<Prisma.$FollowRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FollowRequestCountArgs>(args?: Prisma.Subset<T, FollowRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FollowRequestCountAggregateOutputType> : number>;
    aggregate<T extends FollowRequestAggregateArgs>(args: Prisma.Subset<T, FollowRequestAggregateArgs>): Prisma.PrismaPromise<GetFollowRequestAggregateType<T>>;
    groupBy<T extends FollowRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FollowRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: FollowRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FollowRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FollowRequestFieldRefs;
}
export interface Prisma__FollowRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    requester<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    target<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FollowRequestFieldRefs {
    readonly id: Prisma.FieldRef<"FollowRequest", 'String'>;
    readonly requesterId: Prisma.FieldRef<"FollowRequest", 'String'>;
    readonly targetId: Prisma.FieldRef<"FollowRequest", 'String'>;
    readonly status: Prisma.FieldRef<"FollowRequest", 'FollowRequestStatus'>;
    readonly createdAt: Prisma.FieldRef<"FollowRequest", 'DateTime'>;
    readonly respondedAt: Prisma.FieldRef<"FollowRequest", 'DateTime'>;
}
export type FollowRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelect<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    include?: Prisma.FollowRequestInclude<ExtArgs> | null;
    where: Prisma.FollowRequestWhereUniqueInput;
};
export type FollowRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelect<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    include?: Prisma.FollowRequestInclude<ExtArgs> | null;
    where: Prisma.FollowRequestWhereUniqueInput;
};
export type FollowRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelect<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    include?: Prisma.FollowRequestInclude<ExtArgs> | null;
    where?: Prisma.FollowRequestWhereInput;
    orderBy?: Prisma.FollowRequestOrderByWithRelationInput | Prisma.FollowRequestOrderByWithRelationInput[];
    cursor?: Prisma.FollowRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowRequestScalarFieldEnum | Prisma.FollowRequestScalarFieldEnum[];
};
export type FollowRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelect<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    include?: Prisma.FollowRequestInclude<ExtArgs> | null;
    where?: Prisma.FollowRequestWhereInput;
    orderBy?: Prisma.FollowRequestOrderByWithRelationInput | Prisma.FollowRequestOrderByWithRelationInput[];
    cursor?: Prisma.FollowRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowRequestScalarFieldEnum | Prisma.FollowRequestScalarFieldEnum[];
};
export type FollowRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelect<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    include?: Prisma.FollowRequestInclude<ExtArgs> | null;
    where?: Prisma.FollowRequestWhereInput;
    orderBy?: Prisma.FollowRequestOrderByWithRelationInput | Prisma.FollowRequestOrderByWithRelationInput[];
    cursor?: Prisma.FollowRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowRequestScalarFieldEnum | Prisma.FollowRequestScalarFieldEnum[];
};
export type FollowRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelect<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    include?: Prisma.FollowRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FollowRequestCreateInput, Prisma.FollowRequestUncheckedCreateInput>;
};
export type FollowRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FollowRequestCreateManyInput | Prisma.FollowRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FollowRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    data: Prisma.FollowRequestCreateManyInput | Prisma.FollowRequestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FollowRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FollowRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelect<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    include?: Prisma.FollowRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FollowRequestUpdateInput, Prisma.FollowRequestUncheckedUpdateInput>;
    where: Prisma.FollowRequestWhereUniqueInput;
};
export type FollowRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FollowRequestUpdateManyMutationInput, Prisma.FollowRequestUncheckedUpdateManyInput>;
    where?: Prisma.FollowRequestWhereInput;
    limit?: number;
};
export type FollowRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FollowRequestUpdateManyMutationInput, Prisma.FollowRequestUncheckedUpdateManyInput>;
    where?: Prisma.FollowRequestWhereInput;
    limit?: number;
    include?: Prisma.FollowRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FollowRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelect<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    include?: Prisma.FollowRequestInclude<ExtArgs> | null;
    where: Prisma.FollowRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.FollowRequestCreateInput, Prisma.FollowRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FollowRequestUpdateInput, Prisma.FollowRequestUncheckedUpdateInput>;
};
export type FollowRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelect<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    include?: Prisma.FollowRequestInclude<ExtArgs> | null;
    where: Prisma.FollowRequestWhereUniqueInput;
};
export type FollowRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowRequestWhereInput;
    limit?: number;
};
export type FollowRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowRequestSelect<ExtArgs> | null;
    omit?: Prisma.FollowRequestOmit<ExtArgs> | null;
    include?: Prisma.FollowRequestInclude<ExtArgs> | null;
};
