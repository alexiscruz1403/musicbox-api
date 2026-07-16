import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CatalogSearchHistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$CatalogSearchHistoryPayload>;
export type AggregateCatalogSearchHistory = {
    _count: CatalogSearchHistoryCountAggregateOutputType | null;
    _min: CatalogSearchHistoryMinAggregateOutputType | null;
    _max: CatalogSearchHistoryMaxAggregateOutputType | null;
};
export type CatalogSearchHistoryMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    query: string | null;
    searchedAt: Date | null;
};
export type CatalogSearchHistoryMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    query: string | null;
    searchedAt: Date | null;
};
export type CatalogSearchHistoryCountAggregateOutputType = {
    id: number;
    userId: number;
    query: number;
    searchedAt: number;
    _all: number;
};
export type CatalogSearchHistoryMinAggregateInputType = {
    id?: true;
    userId?: true;
    query?: true;
    searchedAt?: true;
};
export type CatalogSearchHistoryMaxAggregateInputType = {
    id?: true;
    userId?: true;
    query?: true;
    searchedAt?: true;
};
export type CatalogSearchHistoryCountAggregateInputType = {
    id?: true;
    userId?: true;
    query?: true;
    searchedAt?: true;
    _all?: true;
};
export type CatalogSearchHistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CatalogSearchHistoryWhereInput;
    orderBy?: Prisma.CatalogSearchHistoryOrderByWithRelationInput | Prisma.CatalogSearchHistoryOrderByWithRelationInput[];
    cursor?: Prisma.CatalogSearchHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CatalogSearchHistoryCountAggregateInputType;
    _min?: CatalogSearchHistoryMinAggregateInputType;
    _max?: CatalogSearchHistoryMaxAggregateInputType;
};
export type GetCatalogSearchHistoryAggregateType<T extends CatalogSearchHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateCatalogSearchHistory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCatalogSearchHistory[P]> : Prisma.GetScalarType<T[P], AggregateCatalogSearchHistory[P]>;
};
export type CatalogSearchHistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CatalogSearchHistoryWhereInput;
    orderBy?: Prisma.CatalogSearchHistoryOrderByWithAggregationInput | Prisma.CatalogSearchHistoryOrderByWithAggregationInput[];
    by: Prisma.CatalogSearchHistoryScalarFieldEnum[] | Prisma.CatalogSearchHistoryScalarFieldEnum;
    having?: Prisma.CatalogSearchHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CatalogSearchHistoryCountAggregateInputType | true;
    _min?: CatalogSearchHistoryMinAggregateInputType;
    _max?: CatalogSearchHistoryMaxAggregateInputType;
};
export type CatalogSearchHistoryGroupByOutputType = {
    id: string;
    userId: string;
    query: string;
    searchedAt: Date;
    _count: CatalogSearchHistoryCountAggregateOutputType | null;
    _min: CatalogSearchHistoryMinAggregateOutputType | null;
    _max: CatalogSearchHistoryMaxAggregateOutputType | null;
};
export type GetCatalogSearchHistoryGroupByPayload<T extends CatalogSearchHistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CatalogSearchHistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CatalogSearchHistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CatalogSearchHistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CatalogSearchHistoryGroupByOutputType[P]>;
}>>;
export type CatalogSearchHistoryWhereInput = {
    AND?: Prisma.CatalogSearchHistoryWhereInput | Prisma.CatalogSearchHistoryWhereInput[];
    OR?: Prisma.CatalogSearchHistoryWhereInput[];
    NOT?: Prisma.CatalogSearchHistoryWhereInput | Prisma.CatalogSearchHistoryWhereInput[];
    id?: Prisma.StringFilter<"CatalogSearchHistory"> | string;
    userId?: Prisma.StringFilter<"CatalogSearchHistory"> | string;
    query?: Prisma.StringFilter<"CatalogSearchHistory"> | string;
    searchedAt?: Prisma.DateTimeFilter<"CatalogSearchHistory"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type CatalogSearchHistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    searchedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type CatalogSearchHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_query?: Prisma.CatalogSearchHistoryUserIdQueryCompoundUniqueInput;
    AND?: Prisma.CatalogSearchHistoryWhereInput | Prisma.CatalogSearchHistoryWhereInput[];
    OR?: Prisma.CatalogSearchHistoryWhereInput[];
    NOT?: Prisma.CatalogSearchHistoryWhereInput | Prisma.CatalogSearchHistoryWhereInput[];
    userId?: Prisma.StringFilter<"CatalogSearchHistory"> | string;
    query?: Prisma.StringFilter<"CatalogSearchHistory"> | string;
    searchedAt?: Prisma.DateTimeFilter<"CatalogSearchHistory"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId_query">;
export type CatalogSearchHistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    searchedAt?: Prisma.SortOrder;
    _count?: Prisma.CatalogSearchHistoryCountOrderByAggregateInput;
    _max?: Prisma.CatalogSearchHistoryMaxOrderByAggregateInput;
    _min?: Prisma.CatalogSearchHistoryMinOrderByAggregateInput;
};
export type CatalogSearchHistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.CatalogSearchHistoryScalarWhereWithAggregatesInput | Prisma.CatalogSearchHistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.CatalogSearchHistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CatalogSearchHistoryScalarWhereWithAggregatesInput | Prisma.CatalogSearchHistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CatalogSearchHistory"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"CatalogSearchHistory"> | string;
    query?: Prisma.StringWithAggregatesFilter<"CatalogSearchHistory"> | string;
    searchedAt?: Prisma.DateTimeWithAggregatesFilter<"CatalogSearchHistory"> | Date | string;
};
export type CatalogSearchHistoryCreateInput = {
    id?: string;
    query: string;
    searchedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCatalogSearchHistoryInput;
};
export type CatalogSearchHistoryUncheckedCreateInput = {
    id?: string;
    userId: string;
    query: string;
    searchedAt?: Date | string;
};
export type CatalogSearchHistoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCatalogSearchHistoryNestedInput;
};
export type CatalogSearchHistoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CatalogSearchHistoryCreateManyInput = {
    id?: string;
    userId: string;
    query: string;
    searchedAt?: Date | string;
};
export type CatalogSearchHistoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CatalogSearchHistoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CatalogSearchHistoryListRelationFilter = {
    every?: Prisma.CatalogSearchHistoryWhereInput;
    some?: Prisma.CatalogSearchHistoryWhereInput;
    none?: Prisma.CatalogSearchHistoryWhereInput;
};
export type CatalogSearchHistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CatalogSearchHistoryUserIdQueryCompoundUniqueInput = {
    userId: string;
    query: string;
};
export type CatalogSearchHistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    searchedAt?: Prisma.SortOrder;
};
export type CatalogSearchHistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    searchedAt?: Prisma.SortOrder;
};
export type CatalogSearchHistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    searchedAt?: Prisma.SortOrder;
};
export type CatalogSearchHistoryCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CatalogSearchHistoryCreateWithoutUserInput, Prisma.CatalogSearchHistoryUncheckedCreateWithoutUserInput> | Prisma.CatalogSearchHistoryCreateWithoutUserInput[] | Prisma.CatalogSearchHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CatalogSearchHistoryCreateOrConnectWithoutUserInput | Prisma.CatalogSearchHistoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CatalogSearchHistoryCreateManyUserInputEnvelope;
    connect?: Prisma.CatalogSearchHistoryWhereUniqueInput | Prisma.CatalogSearchHistoryWhereUniqueInput[];
};
export type CatalogSearchHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CatalogSearchHistoryCreateWithoutUserInput, Prisma.CatalogSearchHistoryUncheckedCreateWithoutUserInput> | Prisma.CatalogSearchHistoryCreateWithoutUserInput[] | Prisma.CatalogSearchHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CatalogSearchHistoryCreateOrConnectWithoutUserInput | Prisma.CatalogSearchHistoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CatalogSearchHistoryCreateManyUserInputEnvelope;
    connect?: Prisma.CatalogSearchHistoryWhereUniqueInput | Prisma.CatalogSearchHistoryWhereUniqueInput[];
};
export type CatalogSearchHistoryUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CatalogSearchHistoryCreateWithoutUserInput, Prisma.CatalogSearchHistoryUncheckedCreateWithoutUserInput> | Prisma.CatalogSearchHistoryCreateWithoutUserInput[] | Prisma.CatalogSearchHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CatalogSearchHistoryCreateOrConnectWithoutUserInput | Prisma.CatalogSearchHistoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CatalogSearchHistoryUpsertWithWhereUniqueWithoutUserInput | Prisma.CatalogSearchHistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CatalogSearchHistoryCreateManyUserInputEnvelope;
    set?: Prisma.CatalogSearchHistoryWhereUniqueInput | Prisma.CatalogSearchHistoryWhereUniqueInput[];
    disconnect?: Prisma.CatalogSearchHistoryWhereUniqueInput | Prisma.CatalogSearchHistoryWhereUniqueInput[];
    delete?: Prisma.CatalogSearchHistoryWhereUniqueInput | Prisma.CatalogSearchHistoryWhereUniqueInput[];
    connect?: Prisma.CatalogSearchHistoryWhereUniqueInput | Prisma.CatalogSearchHistoryWhereUniqueInput[];
    update?: Prisma.CatalogSearchHistoryUpdateWithWhereUniqueWithoutUserInput | Prisma.CatalogSearchHistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CatalogSearchHistoryUpdateManyWithWhereWithoutUserInput | Prisma.CatalogSearchHistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CatalogSearchHistoryScalarWhereInput | Prisma.CatalogSearchHistoryScalarWhereInput[];
};
export type CatalogSearchHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CatalogSearchHistoryCreateWithoutUserInput, Prisma.CatalogSearchHistoryUncheckedCreateWithoutUserInput> | Prisma.CatalogSearchHistoryCreateWithoutUserInput[] | Prisma.CatalogSearchHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CatalogSearchHistoryCreateOrConnectWithoutUserInput | Prisma.CatalogSearchHistoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CatalogSearchHistoryUpsertWithWhereUniqueWithoutUserInput | Prisma.CatalogSearchHistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CatalogSearchHistoryCreateManyUserInputEnvelope;
    set?: Prisma.CatalogSearchHistoryWhereUniqueInput | Prisma.CatalogSearchHistoryWhereUniqueInput[];
    disconnect?: Prisma.CatalogSearchHistoryWhereUniqueInput | Prisma.CatalogSearchHistoryWhereUniqueInput[];
    delete?: Prisma.CatalogSearchHistoryWhereUniqueInput | Prisma.CatalogSearchHistoryWhereUniqueInput[];
    connect?: Prisma.CatalogSearchHistoryWhereUniqueInput | Prisma.CatalogSearchHistoryWhereUniqueInput[];
    update?: Prisma.CatalogSearchHistoryUpdateWithWhereUniqueWithoutUserInput | Prisma.CatalogSearchHistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CatalogSearchHistoryUpdateManyWithWhereWithoutUserInput | Prisma.CatalogSearchHistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CatalogSearchHistoryScalarWhereInput | Prisma.CatalogSearchHistoryScalarWhereInput[];
};
export type CatalogSearchHistoryCreateWithoutUserInput = {
    id?: string;
    query: string;
    searchedAt?: Date | string;
};
export type CatalogSearchHistoryUncheckedCreateWithoutUserInput = {
    id?: string;
    query: string;
    searchedAt?: Date | string;
};
export type CatalogSearchHistoryCreateOrConnectWithoutUserInput = {
    where: Prisma.CatalogSearchHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CatalogSearchHistoryCreateWithoutUserInput, Prisma.CatalogSearchHistoryUncheckedCreateWithoutUserInput>;
};
export type CatalogSearchHistoryCreateManyUserInputEnvelope = {
    data: Prisma.CatalogSearchHistoryCreateManyUserInput | Prisma.CatalogSearchHistoryCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CatalogSearchHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CatalogSearchHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.CatalogSearchHistoryUpdateWithoutUserInput, Prisma.CatalogSearchHistoryUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CatalogSearchHistoryCreateWithoutUserInput, Prisma.CatalogSearchHistoryUncheckedCreateWithoutUserInput>;
};
export type CatalogSearchHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CatalogSearchHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.CatalogSearchHistoryUpdateWithoutUserInput, Prisma.CatalogSearchHistoryUncheckedUpdateWithoutUserInput>;
};
export type CatalogSearchHistoryUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CatalogSearchHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.CatalogSearchHistoryUpdateManyMutationInput, Prisma.CatalogSearchHistoryUncheckedUpdateManyWithoutUserInput>;
};
export type CatalogSearchHistoryScalarWhereInput = {
    AND?: Prisma.CatalogSearchHistoryScalarWhereInput | Prisma.CatalogSearchHistoryScalarWhereInput[];
    OR?: Prisma.CatalogSearchHistoryScalarWhereInput[];
    NOT?: Prisma.CatalogSearchHistoryScalarWhereInput | Prisma.CatalogSearchHistoryScalarWhereInput[];
    id?: Prisma.StringFilter<"CatalogSearchHistory"> | string;
    userId?: Prisma.StringFilter<"CatalogSearchHistory"> | string;
    query?: Prisma.StringFilter<"CatalogSearchHistory"> | string;
    searchedAt?: Prisma.DateTimeFilter<"CatalogSearchHistory"> | Date | string;
};
export type CatalogSearchHistoryCreateManyUserInput = {
    id?: string;
    query: string;
    searchedAt?: Date | string;
};
export type CatalogSearchHistoryUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CatalogSearchHistoryUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CatalogSearchHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CatalogSearchHistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    query?: boolean;
    searchedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["catalogSearchHistory"]>;
export type CatalogSearchHistorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    query?: boolean;
    searchedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["catalogSearchHistory"]>;
export type CatalogSearchHistorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    query?: boolean;
    searchedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["catalogSearchHistory"]>;
export type CatalogSearchHistorySelectScalar = {
    id?: boolean;
    userId?: boolean;
    query?: boolean;
    searchedAt?: boolean;
};
export type CatalogSearchHistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "query" | "searchedAt", ExtArgs["result"]["catalogSearchHistory"]>;
export type CatalogSearchHistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CatalogSearchHistoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CatalogSearchHistoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CatalogSearchHistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CatalogSearchHistory";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        query: string;
        searchedAt: Date;
    }, ExtArgs["result"]["catalogSearchHistory"]>;
    composites: {};
};
export type CatalogSearchHistoryGetPayload<S extends boolean | null | undefined | CatalogSearchHistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload, S>;
export type CatalogSearchHistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CatalogSearchHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CatalogSearchHistoryCountAggregateInputType | true;
};
export interface CatalogSearchHistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CatalogSearchHistory'];
        meta: {
            name: 'CatalogSearchHistory';
        };
    };
    findUnique<T extends CatalogSearchHistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, CatalogSearchHistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CatalogSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CatalogSearchHistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CatalogSearchHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CatalogSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CatalogSearchHistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, CatalogSearchHistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__CatalogSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CatalogSearchHistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CatalogSearchHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CatalogSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CatalogSearchHistoryFindManyArgs>(args?: Prisma.SelectSubset<T, CatalogSearchHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CatalogSearchHistoryCreateArgs>(args: Prisma.SelectSubset<T, CatalogSearchHistoryCreateArgs<ExtArgs>>): Prisma.Prisma__CatalogSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CatalogSearchHistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, CatalogSearchHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CatalogSearchHistoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CatalogSearchHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CatalogSearchHistoryDeleteArgs>(args: Prisma.SelectSubset<T, CatalogSearchHistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__CatalogSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CatalogSearchHistoryUpdateArgs>(args: Prisma.SelectSubset<T, CatalogSearchHistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__CatalogSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CatalogSearchHistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, CatalogSearchHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CatalogSearchHistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, CatalogSearchHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CatalogSearchHistoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CatalogSearchHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CatalogSearchHistoryUpsertArgs>(args: Prisma.SelectSubset<T, CatalogSearchHistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__CatalogSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$CatalogSearchHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CatalogSearchHistoryCountArgs>(args?: Prisma.Subset<T, CatalogSearchHistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CatalogSearchHistoryCountAggregateOutputType> : number>;
    aggregate<T extends CatalogSearchHistoryAggregateArgs>(args: Prisma.Subset<T, CatalogSearchHistoryAggregateArgs>): Prisma.PrismaPromise<GetCatalogSearchHistoryAggregateType<T>>;
    groupBy<T extends CatalogSearchHistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CatalogSearchHistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: CatalogSearchHistoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CatalogSearchHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCatalogSearchHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CatalogSearchHistoryFieldRefs;
}
export interface Prisma__CatalogSearchHistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CatalogSearchHistoryFieldRefs {
    readonly id: Prisma.FieldRef<"CatalogSearchHistory", 'String'>;
    readonly userId: Prisma.FieldRef<"CatalogSearchHistory", 'String'>;
    readonly query: Prisma.FieldRef<"CatalogSearchHistory", 'String'>;
    readonly searchedAt: Prisma.FieldRef<"CatalogSearchHistory", 'DateTime'>;
}
export type CatalogSearchHistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.CatalogSearchHistoryInclude<ExtArgs> | null;
    where: Prisma.CatalogSearchHistoryWhereUniqueInput;
};
export type CatalogSearchHistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.CatalogSearchHistoryInclude<ExtArgs> | null;
    where: Prisma.CatalogSearchHistoryWhereUniqueInput;
};
export type CatalogSearchHistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.CatalogSearchHistoryInclude<ExtArgs> | null;
    where?: Prisma.CatalogSearchHistoryWhereInput;
    orderBy?: Prisma.CatalogSearchHistoryOrderByWithRelationInput | Prisma.CatalogSearchHistoryOrderByWithRelationInput[];
    cursor?: Prisma.CatalogSearchHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CatalogSearchHistoryScalarFieldEnum | Prisma.CatalogSearchHistoryScalarFieldEnum[];
};
export type CatalogSearchHistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.CatalogSearchHistoryInclude<ExtArgs> | null;
    where?: Prisma.CatalogSearchHistoryWhereInput;
    orderBy?: Prisma.CatalogSearchHistoryOrderByWithRelationInput | Prisma.CatalogSearchHistoryOrderByWithRelationInput[];
    cursor?: Prisma.CatalogSearchHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CatalogSearchHistoryScalarFieldEnum | Prisma.CatalogSearchHistoryScalarFieldEnum[];
};
export type CatalogSearchHistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.CatalogSearchHistoryInclude<ExtArgs> | null;
    where?: Prisma.CatalogSearchHistoryWhereInput;
    orderBy?: Prisma.CatalogSearchHistoryOrderByWithRelationInput | Prisma.CatalogSearchHistoryOrderByWithRelationInput[];
    cursor?: Prisma.CatalogSearchHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CatalogSearchHistoryScalarFieldEnum | Prisma.CatalogSearchHistoryScalarFieldEnum[];
};
export type CatalogSearchHistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.CatalogSearchHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CatalogSearchHistoryCreateInput, Prisma.CatalogSearchHistoryUncheckedCreateInput>;
};
export type CatalogSearchHistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CatalogSearchHistoryCreateManyInput | Prisma.CatalogSearchHistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CatalogSearchHistoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    data: Prisma.CatalogSearchHistoryCreateManyInput | Prisma.CatalogSearchHistoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CatalogSearchHistoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CatalogSearchHistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.CatalogSearchHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CatalogSearchHistoryUpdateInput, Prisma.CatalogSearchHistoryUncheckedUpdateInput>;
    where: Prisma.CatalogSearchHistoryWhereUniqueInput;
};
export type CatalogSearchHistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CatalogSearchHistoryUpdateManyMutationInput, Prisma.CatalogSearchHistoryUncheckedUpdateManyInput>;
    where?: Prisma.CatalogSearchHistoryWhereInput;
    limit?: number;
};
export type CatalogSearchHistoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CatalogSearchHistoryUpdateManyMutationInput, Prisma.CatalogSearchHistoryUncheckedUpdateManyInput>;
    where?: Prisma.CatalogSearchHistoryWhereInput;
    limit?: number;
    include?: Prisma.CatalogSearchHistoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CatalogSearchHistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.CatalogSearchHistoryInclude<ExtArgs> | null;
    where: Prisma.CatalogSearchHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CatalogSearchHistoryCreateInput, Prisma.CatalogSearchHistoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CatalogSearchHistoryUpdateInput, Prisma.CatalogSearchHistoryUncheckedUpdateInput>;
};
export type CatalogSearchHistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.CatalogSearchHistoryInclude<ExtArgs> | null;
    where: Prisma.CatalogSearchHistoryWhereUniqueInput;
};
export type CatalogSearchHistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CatalogSearchHistoryWhereInput;
    limit?: number;
};
export type CatalogSearchHistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CatalogSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.CatalogSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.CatalogSearchHistoryInclude<ExtArgs> | null;
};
