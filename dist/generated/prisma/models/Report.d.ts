import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReportModel = runtime.Types.Result.DefaultSelection<Prisma.$ReportPayload>;
export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null;
    _min: ReportMinAggregateOutputType | null;
    _max: ReportMaxAggregateOutputType | null;
};
export type ReportMinAggregateOutputType = {
    id: string | null;
    reporterId: string | null;
    targetType: $Enums.ReportTargetType | null;
    targetId: string | null;
    reason: string | null;
    status: $Enums.ReportStatus | null;
    createdAt: Date | null;
};
export type ReportMaxAggregateOutputType = {
    id: string | null;
    reporterId: string | null;
    targetType: $Enums.ReportTargetType | null;
    targetId: string | null;
    reason: string | null;
    status: $Enums.ReportStatus | null;
    createdAt: Date | null;
};
export type ReportCountAggregateOutputType = {
    id: number;
    reporterId: number;
    targetType: number;
    targetId: number;
    reason: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type ReportMinAggregateInputType = {
    id?: true;
    reporterId?: true;
    targetType?: true;
    targetId?: true;
    reason?: true;
    status?: true;
    createdAt?: true;
};
export type ReportMaxAggregateInputType = {
    id?: true;
    reporterId?: true;
    targetType?: true;
    targetId?: true;
    reason?: true;
    status?: true;
    createdAt?: true;
};
export type ReportCountAggregateInputType = {
    id?: true;
    reporterId?: true;
    targetType?: true;
    targetId?: true;
    reason?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type ReportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReportCountAggregateInputType;
    _min?: ReportMinAggregateInputType;
    _max?: ReportMaxAggregateInputType;
};
export type GetReportAggregateType<T extends ReportAggregateArgs> = {
    [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReport[P]> : Prisma.GetScalarType<T[P], AggregateReport[P]>;
};
export type ReportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithAggregationInput | Prisma.ReportOrderByWithAggregationInput[];
    by: Prisma.ReportScalarFieldEnum[] | Prisma.ReportScalarFieldEnum;
    having?: Prisma.ReportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReportCountAggregateInputType | true;
    _min?: ReportMinAggregateInputType;
    _max?: ReportMaxAggregateInputType;
};
export type ReportGroupByOutputType = {
    id: string;
    reporterId: string;
    targetType: $Enums.ReportTargetType;
    targetId: string;
    reason: string;
    status: $Enums.ReportStatus;
    createdAt: Date;
    _count: ReportCountAggregateOutputType | null;
    _min: ReportMinAggregateOutputType | null;
    _max: ReportMaxAggregateOutputType | null;
};
export type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReportGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReportGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReportGroupByOutputType[P]>;
}>>;
export type ReportWhereInput = {
    AND?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    OR?: Prisma.ReportWhereInput[];
    NOT?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    id?: Prisma.StringFilter<"Report"> | string;
    reporterId?: Prisma.StringFilter<"Report"> | string;
    targetType?: Prisma.EnumReportTargetTypeFilter<"Report"> | $Enums.ReportTargetType;
    targetId?: Prisma.StringFilter<"Report"> | string;
    reason?: Prisma.StringFilter<"Report"> | string;
    status?: Prisma.EnumReportStatusFilter<"Report"> | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string;
    reporter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    review?: Prisma.XOR<Prisma.ReviewNullableScalarRelationFilter, Prisma.ReviewWhereInput> | null;
};
export type ReportOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reporterId?: Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    reporter?: Prisma.UserOrderByWithRelationInput;
    review?: Prisma.ReviewOrderByWithRelationInput;
};
export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    OR?: Prisma.ReportWhereInput[];
    NOT?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    reporterId?: Prisma.StringFilter<"Report"> | string;
    targetType?: Prisma.EnumReportTargetTypeFilter<"Report"> | $Enums.ReportTargetType;
    targetId?: Prisma.StringFilter<"Report"> | string;
    reason?: Prisma.StringFilter<"Report"> | string;
    status?: Prisma.EnumReportStatusFilter<"Report"> | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string;
    reporter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    review?: Prisma.XOR<Prisma.ReviewNullableScalarRelationFilter, Prisma.ReviewWhereInput> | null;
}, "id">;
export type ReportOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reporterId?: Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ReportCountOrderByAggregateInput;
    _max?: Prisma.ReportMaxOrderByAggregateInput;
    _min?: Prisma.ReportMinOrderByAggregateInput;
};
export type ReportScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReportScalarWhereWithAggregatesInput | Prisma.ReportScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReportScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReportScalarWhereWithAggregatesInput | Prisma.ReportScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Report"> | string;
    reporterId?: Prisma.StringWithAggregatesFilter<"Report"> | string;
    targetType?: Prisma.EnumReportTargetTypeWithAggregatesFilter<"Report"> | $Enums.ReportTargetType;
    targetId?: Prisma.StringWithAggregatesFilter<"Report"> | string;
    reason?: Prisma.StringWithAggregatesFilter<"Report"> | string;
    status?: Prisma.EnumReportStatusWithAggregatesFilter<"Report"> | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Report"> | Date | string;
};
export type ReportCreateInput = {
    id?: string;
    targetType: $Enums.ReportTargetType;
    reason: string;
    status?: $Enums.ReportStatus;
    createdAt?: Date | string;
    reporter: Prisma.UserCreateNestedOneWithoutReportsInput;
    review?: Prisma.ReviewCreateNestedOneWithoutReportsInput;
};
export type ReportUncheckedCreateInput = {
    id?: string;
    reporterId: string;
    targetType: $Enums.ReportTargetType;
    targetId: string;
    reason: string;
    status?: $Enums.ReportStatus;
    createdAt?: Date | string;
};
export type ReportUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumReportTargetTypeFieldUpdateOperationsInput | $Enums.ReportTargetType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reporter?: Prisma.UserUpdateOneRequiredWithoutReportsNestedInput;
    review?: Prisma.ReviewUpdateOneWithoutReportsNestedInput;
};
export type ReportUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumReportTargetTypeFieldUpdateOperationsInput | $Enums.ReportTargetType;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportCreateManyInput = {
    id?: string;
    reporterId: string;
    targetType: $Enums.ReportTargetType;
    targetId: string;
    reason: string;
    status?: $Enums.ReportStatus;
    createdAt?: Date | string;
};
export type ReportUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumReportTargetTypeFieldUpdateOperationsInput | $Enums.ReportTargetType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumReportTargetTypeFieldUpdateOperationsInput | $Enums.ReportTargetType;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportListRelationFilter = {
    every?: Prisma.ReportWhereInput;
    some?: Prisma.ReportWhereInput;
    none?: Prisma.ReportWhereInput;
};
export type ReportOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReportCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reporterId?: Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReportMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reporterId?: Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReportMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reporterId?: Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReportCreateNestedManyWithoutReporterInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput> | Prisma.ReportCreateWithoutReporterInput[] | Prisma.ReportUncheckedCreateWithoutReporterInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReporterInput | Prisma.ReportCreateOrConnectWithoutReporterInput[];
    createMany?: Prisma.ReportCreateManyReporterInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUncheckedCreateNestedManyWithoutReporterInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput> | Prisma.ReportCreateWithoutReporterInput[] | Prisma.ReportUncheckedCreateWithoutReporterInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReporterInput | Prisma.ReportCreateOrConnectWithoutReporterInput[];
    createMany?: Prisma.ReportCreateManyReporterInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUpdateManyWithoutReporterNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput> | Prisma.ReportCreateWithoutReporterInput[] | Prisma.ReportUncheckedCreateWithoutReporterInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReporterInput | Prisma.ReportCreateOrConnectWithoutReporterInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutReporterInput | Prisma.ReportUpsertWithWhereUniqueWithoutReporterInput[];
    createMany?: Prisma.ReportCreateManyReporterInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutReporterInput | Prisma.ReportUpdateWithWhereUniqueWithoutReporterInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutReporterInput | Prisma.ReportUpdateManyWithWhereWithoutReporterInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportUncheckedUpdateManyWithoutReporterNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput> | Prisma.ReportCreateWithoutReporterInput[] | Prisma.ReportUncheckedCreateWithoutReporterInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReporterInput | Prisma.ReportCreateOrConnectWithoutReporterInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutReporterInput | Prisma.ReportUpsertWithWhereUniqueWithoutReporterInput[];
    createMany?: Prisma.ReportCreateManyReporterInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutReporterInput | Prisma.ReportUpdateWithWhereUniqueWithoutReporterInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutReporterInput | Prisma.ReportUpdateManyWithWhereWithoutReporterInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReviewInput, Prisma.ReportUncheckedCreateWithoutReviewInput> | Prisma.ReportCreateWithoutReviewInput[] | Prisma.ReportUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReviewInput | Prisma.ReportCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.ReportCreateManyReviewInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUncheckedCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReviewInput, Prisma.ReportUncheckedCreateWithoutReviewInput> | Prisma.ReportCreateWithoutReviewInput[] | Prisma.ReportUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReviewInput | Prisma.ReportCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.ReportCreateManyReviewInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReviewInput, Prisma.ReportUncheckedCreateWithoutReviewInput> | Prisma.ReportCreateWithoutReviewInput[] | Prisma.ReportUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReviewInput | Prisma.ReportCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutReviewInput | Prisma.ReportUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.ReportCreateManyReviewInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutReviewInput | Prisma.ReportUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutReviewInput | Prisma.ReportUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportUncheckedUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReviewInput, Prisma.ReportUncheckedCreateWithoutReviewInput> | Prisma.ReportCreateWithoutReviewInput[] | Prisma.ReportUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReviewInput | Prisma.ReportCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutReviewInput | Prisma.ReportUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.ReportCreateManyReviewInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutReviewInput | Prisma.ReportUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutReviewInput | Prisma.ReportUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type EnumReportTargetTypeFieldUpdateOperationsInput = {
    set?: $Enums.ReportTargetType;
};
export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReportStatus;
};
export type ReportCreateWithoutReporterInput = {
    id?: string;
    targetType: $Enums.ReportTargetType;
    reason: string;
    status?: $Enums.ReportStatus;
    createdAt?: Date | string;
    review?: Prisma.ReviewCreateNestedOneWithoutReportsInput;
};
export type ReportUncheckedCreateWithoutReporterInput = {
    id?: string;
    targetType: $Enums.ReportTargetType;
    targetId: string;
    reason: string;
    status?: $Enums.ReportStatus;
    createdAt?: Date | string;
};
export type ReportCreateOrConnectWithoutReporterInput = {
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput>;
};
export type ReportCreateManyReporterInputEnvelope = {
    data: Prisma.ReportCreateManyReporterInput | Prisma.ReportCreateManyReporterInput[];
    skipDuplicates?: boolean;
};
export type ReportUpsertWithWhereUniqueWithoutReporterInput = {
    where: Prisma.ReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReportUpdateWithoutReporterInput, Prisma.ReportUncheckedUpdateWithoutReporterInput>;
    create: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput>;
};
export type ReportUpdateWithWhereUniqueWithoutReporterInput = {
    where: Prisma.ReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReportUpdateWithoutReporterInput, Prisma.ReportUncheckedUpdateWithoutReporterInput>;
};
export type ReportUpdateManyWithWhereWithoutReporterInput = {
    where: Prisma.ReportScalarWhereInput;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyWithoutReporterInput>;
};
export type ReportScalarWhereInput = {
    AND?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
    OR?: Prisma.ReportScalarWhereInput[];
    NOT?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
    id?: Prisma.StringFilter<"Report"> | string;
    reporterId?: Prisma.StringFilter<"Report"> | string;
    targetType?: Prisma.EnumReportTargetTypeFilter<"Report"> | $Enums.ReportTargetType;
    targetId?: Prisma.StringFilter<"Report"> | string;
    reason?: Prisma.StringFilter<"Report"> | string;
    status?: Prisma.EnumReportStatusFilter<"Report"> | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string;
};
export type ReportCreateWithoutReviewInput = {
    id?: string;
    targetType: $Enums.ReportTargetType;
    reason: string;
    status?: $Enums.ReportStatus;
    createdAt?: Date | string;
    reporter: Prisma.UserCreateNestedOneWithoutReportsInput;
};
export type ReportUncheckedCreateWithoutReviewInput = {
    id?: string;
    reporterId: string;
    targetType: $Enums.ReportTargetType;
    reason: string;
    status?: $Enums.ReportStatus;
    createdAt?: Date | string;
};
export type ReportCreateOrConnectWithoutReviewInput = {
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateWithoutReviewInput, Prisma.ReportUncheckedCreateWithoutReviewInput>;
};
export type ReportCreateManyReviewInputEnvelope = {
    data: Prisma.ReportCreateManyReviewInput | Prisma.ReportCreateManyReviewInput[];
    skipDuplicates?: boolean;
};
export type ReportUpsertWithWhereUniqueWithoutReviewInput = {
    where: Prisma.ReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReportUpdateWithoutReviewInput, Prisma.ReportUncheckedUpdateWithoutReviewInput>;
    create: Prisma.XOR<Prisma.ReportCreateWithoutReviewInput, Prisma.ReportUncheckedCreateWithoutReviewInput>;
};
export type ReportUpdateWithWhereUniqueWithoutReviewInput = {
    where: Prisma.ReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReportUpdateWithoutReviewInput, Prisma.ReportUncheckedUpdateWithoutReviewInput>;
};
export type ReportUpdateManyWithWhereWithoutReviewInput = {
    where: Prisma.ReportScalarWhereInput;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyWithoutReviewInput>;
};
export type ReportCreateManyReporterInput = {
    id?: string;
    targetType: $Enums.ReportTargetType;
    targetId: string;
    reason: string;
    status?: $Enums.ReportStatus;
    createdAt?: Date | string;
};
export type ReportUpdateWithoutReporterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumReportTargetTypeFieldUpdateOperationsInput | $Enums.ReportTargetType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    review?: Prisma.ReviewUpdateOneWithoutReportsNestedInput;
};
export type ReportUncheckedUpdateWithoutReporterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumReportTargetTypeFieldUpdateOperationsInput | $Enums.ReportTargetType;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportUncheckedUpdateManyWithoutReporterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumReportTargetTypeFieldUpdateOperationsInput | $Enums.ReportTargetType;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportCreateManyReviewInput = {
    id?: string;
    reporterId: string;
    targetType: $Enums.ReportTargetType;
    reason: string;
    status?: $Enums.ReportStatus;
    createdAt?: Date | string;
};
export type ReportUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumReportTargetTypeFieldUpdateOperationsInput | $Enums.ReportTargetType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reporter?: Prisma.UserUpdateOneRequiredWithoutReportsNestedInput;
};
export type ReportUncheckedUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumReportTargetTypeFieldUpdateOperationsInput | $Enums.ReportTargetType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportUncheckedUpdateManyWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumReportTargetTypeFieldUpdateOperationsInput | $Enums.ReportTargetType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reporterId?: boolean;
    targetType?: boolean;
    targetId?: boolean;
    reason?: boolean;
    status?: boolean;
    createdAt?: boolean;
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.Report$reviewArgs<ExtArgs>;
}, ExtArgs["result"]["report"]>;
export type ReportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reporterId?: boolean;
    targetType?: boolean;
    targetId?: boolean;
    reason?: boolean;
    status?: boolean;
    createdAt?: boolean;
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.Report$reviewArgs<ExtArgs>;
}, ExtArgs["result"]["report"]>;
export type ReportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reporterId?: boolean;
    targetType?: boolean;
    targetId?: boolean;
    reason?: boolean;
    status?: boolean;
    createdAt?: boolean;
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.Report$reviewArgs<ExtArgs>;
}, ExtArgs["result"]["report"]>;
export type ReportSelectScalar = {
    id?: boolean;
    reporterId?: boolean;
    targetType?: boolean;
    targetId?: boolean;
    reason?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type ReportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reporterId" | "targetType" | "targetId" | "reason" | "status" | "createdAt", ExtArgs["result"]["report"]>;
export type ReportInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.Report$reviewArgs<ExtArgs>;
};
export type ReportIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.Report$reviewArgs<ExtArgs>;
};
export type ReportIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.Report$reviewArgs<ExtArgs>;
};
export type $ReportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Report";
    objects: {
        reporter: Prisma.$UserPayload<ExtArgs>;
        review: Prisma.$ReviewPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reporterId: string;
        targetType: $Enums.ReportTargetType;
        targetId: string;
        reason: string;
        status: $Enums.ReportStatus;
        createdAt: Date;
    }, ExtArgs["result"]["report"]>;
    composites: {};
};
export type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReportPayload, S>;
export type ReportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReportCountAggregateInputType | true;
};
export interface ReportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Report'];
        meta: {
            name: 'Report';
        };
    };
    findUnique<T extends ReportFindUniqueArgs>(args: Prisma.SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReportFindFirstArgs>(args?: Prisma.SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReportFindManyArgs>(args?: Prisma.SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReportCreateArgs>(args: Prisma.SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReportCreateManyArgs>(args?: Prisma.SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReportDeleteArgs>(args: Prisma.SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReportUpdateArgs>(args: Prisma.SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReportDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReportUpdateManyArgs>(args: Prisma.SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReportUpsertArgs>(args: Prisma.SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReportCountArgs>(args?: Prisma.Subset<T, ReportCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReportCountAggregateOutputType> : number>;
    aggregate<T extends ReportAggregateArgs>(args: Prisma.Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>;
    groupBy<T extends ReportGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReportGroupByArgs['orderBy'];
    } : {
        orderBy?: ReportGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReportFieldRefs;
}
export interface Prisma__ReportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    reporter<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    review<T extends Prisma.Report$reviewArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Report$reviewArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReportFieldRefs {
    readonly id: Prisma.FieldRef<"Report", 'String'>;
    readonly reporterId: Prisma.FieldRef<"Report", 'String'>;
    readonly targetType: Prisma.FieldRef<"Report", 'ReportTargetType'>;
    readonly targetId: Prisma.FieldRef<"Report", 'String'>;
    readonly reason: Prisma.FieldRef<"Report", 'String'>;
    readonly status: Prisma.FieldRef<"Report", 'ReportStatus'>;
    readonly createdAt: Prisma.FieldRef<"Report", 'DateTime'>;
}
export type ReportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportCreateInput, Prisma.ReportUncheckedCreateInput>;
};
export type ReportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReportCreateManyInput | Prisma.ReportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    data: Prisma.ReportCreateManyInput | Prisma.ReportCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReportIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportUpdateInput, Prisma.ReportUncheckedUpdateInput>;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyInput>;
    where?: Prisma.ReportWhereInput;
    limit?: number;
};
export type ReportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyInput>;
    where?: Prisma.ReportWhereInput;
    limit?: number;
    include?: Prisma.ReportIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateInput, Prisma.ReportUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReportUpdateInput, Prisma.ReportUncheckedUpdateInput>;
};
export type ReportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    limit?: number;
};
export type Report$reviewArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
};
export type ReportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
};
