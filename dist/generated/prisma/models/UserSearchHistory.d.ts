import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserSearchHistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$UserSearchHistoryPayload>;
export type AggregateUserSearchHistory = {
    _count: UserSearchHistoryCountAggregateOutputType | null;
    _min: UserSearchHistoryMinAggregateOutputType | null;
    _max: UserSearchHistoryMaxAggregateOutputType | null;
};
export type UserSearchHistoryMinAggregateOutputType = {
    id: string | null;
    searcherId: string | null;
    query: string | null;
    searchedAt: Date | null;
};
export type UserSearchHistoryMaxAggregateOutputType = {
    id: string | null;
    searcherId: string | null;
    query: string | null;
    searchedAt: Date | null;
};
export type UserSearchHistoryCountAggregateOutputType = {
    id: number;
    searcherId: number;
    query: number;
    searchedAt: number;
    _all: number;
};
export type UserSearchHistoryMinAggregateInputType = {
    id?: true;
    searcherId?: true;
    query?: true;
    searchedAt?: true;
};
export type UserSearchHistoryMaxAggregateInputType = {
    id?: true;
    searcherId?: true;
    query?: true;
    searchedAt?: true;
};
export type UserSearchHistoryCountAggregateInputType = {
    id?: true;
    searcherId?: true;
    query?: true;
    searchedAt?: true;
    _all?: true;
};
export type UserSearchHistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSearchHistoryWhereInput;
    orderBy?: Prisma.UserSearchHistoryOrderByWithRelationInput | Prisma.UserSearchHistoryOrderByWithRelationInput[];
    cursor?: Prisma.UserSearchHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserSearchHistoryCountAggregateInputType;
    _min?: UserSearchHistoryMinAggregateInputType;
    _max?: UserSearchHistoryMaxAggregateInputType;
};
export type GetUserSearchHistoryAggregateType<T extends UserSearchHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateUserSearchHistory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserSearchHistory[P]> : Prisma.GetScalarType<T[P], AggregateUserSearchHistory[P]>;
};
export type UserSearchHistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSearchHistoryWhereInput;
    orderBy?: Prisma.UserSearchHistoryOrderByWithAggregationInput | Prisma.UserSearchHistoryOrderByWithAggregationInput[];
    by: Prisma.UserSearchHistoryScalarFieldEnum[] | Prisma.UserSearchHistoryScalarFieldEnum;
    having?: Prisma.UserSearchHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserSearchHistoryCountAggregateInputType | true;
    _min?: UserSearchHistoryMinAggregateInputType;
    _max?: UserSearchHistoryMaxAggregateInputType;
};
export type UserSearchHistoryGroupByOutputType = {
    id: string;
    searcherId: string;
    query: string;
    searchedAt: Date;
    _count: UserSearchHistoryCountAggregateOutputType | null;
    _min: UserSearchHistoryMinAggregateOutputType | null;
    _max: UserSearchHistoryMaxAggregateOutputType | null;
};
export type GetUserSearchHistoryGroupByPayload<T extends UserSearchHistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserSearchHistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserSearchHistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserSearchHistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserSearchHistoryGroupByOutputType[P]>;
}>>;
export type UserSearchHistoryWhereInput = {
    AND?: Prisma.UserSearchHistoryWhereInput | Prisma.UserSearchHistoryWhereInput[];
    OR?: Prisma.UserSearchHistoryWhereInput[];
    NOT?: Prisma.UserSearchHistoryWhereInput | Prisma.UserSearchHistoryWhereInput[];
    id?: Prisma.StringFilter<"UserSearchHistory"> | string;
    searcherId?: Prisma.StringFilter<"UserSearchHistory"> | string;
    query?: Prisma.StringFilter<"UserSearchHistory"> | string;
    searchedAt?: Prisma.DateTimeFilter<"UserSearchHistory"> | Date | string;
    searcher?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserSearchHistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    searcherId?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    searchedAt?: Prisma.SortOrder;
    searcher?: Prisma.UserOrderByWithRelationInput;
};
export type UserSearchHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    searcherId_query?: Prisma.UserSearchHistorySearcherIdQueryCompoundUniqueInput;
    AND?: Prisma.UserSearchHistoryWhereInput | Prisma.UserSearchHistoryWhereInput[];
    OR?: Prisma.UserSearchHistoryWhereInput[];
    NOT?: Prisma.UserSearchHistoryWhereInput | Prisma.UserSearchHistoryWhereInput[];
    searcherId?: Prisma.StringFilter<"UserSearchHistory"> | string;
    query?: Prisma.StringFilter<"UserSearchHistory"> | string;
    searchedAt?: Prisma.DateTimeFilter<"UserSearchHistory"> | Date | string;
    searcher?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "searcherId_query">;
export type UserSearchHistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    searcherId?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    searchedAt?: Prisma.SortOrder;
    _count?: Prisma.UserSearchHistoryCountOrderByAggregateInput;
    _max?: Prisma.UserSearchHistoryMaxOrderByAggregateInput;
    _min?: Prisma.UserSearchHistoryMinOrderByAggregateInput;
};
export type UserSearchHistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserSearchHistoryScalarWhereWithAggregatesInput | Prisma.UserSearchHistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserSearchHistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserSearchHistoryScalarWhereWithAggregatesInput | Prisma.UserSearchHistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserSearchHistory"> | string;
    searcherId?: Prisma.StringWithAggregatesFilter<"UserSearchHistory"> | string;
    query?: Prisma.StringWithAggregatesFilter<"UserSearchHistory"> | string;
    searchedAt?: Prisma.DateTimeWithAggregatesFilter<"UserSearchHistory"> | Date | string;
};
export type UserSearchHistoryCreateInput = {
    id?: string;
    query: string;
    searchedAt?: Date | string;
    searcher: Prisma.UserCreateNestedOneWithoutUserSearchHistoryInput;
};
export type UserSearchHistoryUncheckedCreateInput = {
    id?: string;
    searcherId: string;
    query: string;
    searchedAt?: Date | string;
};
export type UserSearchHistoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    searcher?: Prisma.UserUpdateOneRequiredWithoutUserSearchHistoryNestedInput;
};
export type UserSearchHistoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    searcherId?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSearchHistoryCreateManyInput = {
    id?: string;
    searcherId: string;
    query: string;
    searchedAt?: Date | string;
};
export type UserSearchHistoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSearchHistoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    searcherId?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSearchHistoryListRelationFilter = {
    every?: Prisma.UserSearchHistoryWhereInput;
    some?: Prisma.UserSearchHistoryWhereInput;
    none?: Prisma.UserSearchHistoryWhereInput;
};
export type UserSearchHistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserSearchHistorySearcherIdQueryCompoundUniqueInput = {
    searcherId: string;
    query: string;
};
export type UserSearchHistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    searcherId?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    searchedAt?: Prisma.SortOrder;
};
export type UserSearchHistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    searcherId?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    searchedAt?: Prisma.SortOrder;
};
export type UserSearchHistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    searcherId?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    searchedAt?: Prisma.SortOrder;
};
export type UserSearchHistoryCreateNestedManyWithoutSearcherInput = {
    create?: Prisma.XOR<Prisma.UserSearchHistoryCreateWithoutSearcherInput, Prisma.UserSearchHistoryUncheckedCreateWithoutSearcherInput> | Prisma.UserSearchHistoryCreateWithoutSearcherInput[] | Prisma.UserSearchHistoryUncheckedCreateWithoutSearcherInput[];
    connectOrCreate?: Prisma.UserSearchHistoryCreateOrConnectWithoutSearcherInput | Prisma.UserSearchHistoryCreateOrConnectWithoutSearcherInput[];
    createMany?: Prisma.UserSearchHistoryCreateManySearcherInputEnvelope;
    connect?: Prisma.UserSearchHistoryWhereUniqueInput | Prisma.UserSearchHistoryWhereUniqueInput[];
};
export type UserSearchHistoryUncheckedCreateNestedManyWithoutSearcherInput = {
    create?: Prisma.XOR<Prisma.UserSearchHistoryCreateWithoutSearcherInput, Prisma.UserSearchHistoryUncheckedCreateWithoutSearcherInput> | Prisma.UserSearchHistoryCreateWithoutSearcherInput[] | Prisma.UserSearchHistoryUncheckedCreateWithoutSearcherInput[];
    connectOrCreate?: Prisma.UserSearchHistoryCreateOrConnectWithoutSearcherInput | Prisma.UserSearchHistoryCreateOrConnectWithoutSearcherInput[];
    createMany?: Prisma.UserSearchHistoryCreateManySearcherInputEnvelope;
    connect?: Prisma.UserSearchHistoryWhereUniqueInput | Prisma.UserSearchHistoryWhereUniqueInput[];
};
export type UserSearchHistoryUpdateManyWithoutSearcherNestedInput = {
    create?: Prisma.XOR<Prisma.UserSearchHistoryCreateWithoutSearcherInput, Prisma.UserSearchHistoryUncheckedCreateWithoutSearcherInput> | Prisma.UserSearchHistoryCreateWithoutSearcherInput[] | Prisma.UserSearchHistoryUncheckedCreateWithoutSearcherInput[];
    connectOrCreate?: Prisma.UserSearchHistoryCreateOrConnectWithoutSearcherInput | Prisma.UserSearchHistoryCreateOrConnectWithoutSearcherInput[];
    upsert?: Prisma.UserSearchHistoryUpsertWithWhereUniqueWithoutSearcherInput | Prisma.UserSearchHistoryUpsertWithWhereUniqueWithoutSearcherInput[];
    createMany?: Prisma.UserSearchHistoryCreateManySearcherInputEnvelope;
    set?: Prisma.UserSearchHistoryWhereUniqueInput | Prisma.UserSearchHistoryWhereUniqueInput[];
    disconnect?: Prisma.UserSearchHistoryWhereUniqueInput | Prisma.UserSearchHistoryWhereUniqueInput[];
    delete?: Prisma.UserSearchHistoryWhereUniqueInput | Prisma.UserSearchHistoryWhereUniqueInput[];
    connect?: Prisma.UserSearchHistoryWhereUniqueInput | Prisma.UserSearchHistoryWhereUniqueInput[];
    update?: Prisma.UserSearchHistoryUpdateWithWhereUniqueWithoutSearcherInput | Prisma.UserSearchHistoryUpdateWithWhereUniqueWithoutSearcherInput[];
    updateMany?: Prisma.UserSearchHistoryUpdateManyWithWhereWithoutSearcherInput | Prisma.UserSearchHistoryUpdateManyWithWhereWithoutSearcherInput[];
    deleteMany?: Prisma.UserSearchHistoryScalarWhereInput | Prisma.UserSearchHistoryScalarWhereInput[];
};
export type UserSearchHistoryUncheckedUpdateManyWithoutSearcherNestedInput = {
    create?: Prisma.XOR<Prisma.UserSearchHistoryCreateWithoutSearcherInput, Prisma.UserSearchHistoryUncheckedCreateWithoutSearcherInput> | Prisma.UserSearchHistoryCreateWithoutSearcherInput[] | Prisma.UserSearchHistoryUncheckedCreateWithoutSearcherInput[];
    connectOrCreate?: Prisma.UserSearchHistoryCreateOrConnectWithoutSearcherInput | Prisma.UserSearchHistoryCreateOrConnectWithoutSearcherInput[];
    upsert?: Prisma.UserSearchHistoryUpsertWithWhereUniqueWithoutSearcherInput | Prisma.UserSearchHistoryUpsertWithWhereUniqueWithoutSearcherInput[];
    createMany?: Prisma.UserSearchHistoryCreateManySearcherInputEnvelope;
    set?: Prisma.UserSearchHistoryWhereUniqueInput | Prisma.UserSearchHistoryWhereUniqueInput[];
    disconnect?: Prisma.UserSearchHistoryWhereUniqueInput | Prisma.UserSearchHistoryWhereUniqueInput[];
    delete?: Prisma.UserSearchHistoryWhereUniqueInput | Prisma.UserSearchHistoryWhereUniqueInput[];
    connect?: Prisma.UserSearchHistoryWhereUniqueInput | Prisma.UserSearchHistoryWhereUniqueInput[];
    update?: Prisma.UserSearchHistoryUpdateWithWhereUniqueWithoutSearcherInput | Prisma.UserSearchHistoryUpdateWithWhereUniqueWithoutSearcherInput[];
    updateMany?: Prisma.UserSearchHistoryUpdateManyWithWhereWithoutSearcherInput | Prisma.UserSearchHistoryUpdateManyWithWhereWithoutSearcherInput[];
    deleteMany?: Prisma.UserSearchHistoryScalarWhereInput | Prisma.UserSearchHistoryScalarWhereInput[];
};
export type UserSearchHistoryCreateWithoutSearcherInput = {
    id?: string;
    query: string;
    searchedAt?: Date | string;
};
export type UserSearchHistoryUncheckedCreateWithoutSearcherInput = {
    id?: string;
    query: string;
    searchedAt?: Date | string;
};
export type UserSearchHistoryCreateOrConnectWithoutSearcherInput = {
    where: Prisma.UserSearchHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserSearchHistoryCreateWithoutSearcherInput, Prisma.UserSearchHistoryUncheckedCreateWithoutSearcherInput>;
};
export type UserSearchHistoryCreateManySearcherInputEnvelope = {
    data: Prisma.UserSearchHistoryCreateManySearcherInput | Prisma.UserSearchHistoryCreateManySearcherInput[];
    skipDuplicates?: boolean;
};
export type UserSearchHistoryUpsertWithWhereUniqueWithoutSearcherInput = {
    where: Prisma.UserSearchHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserSearchHistoryUpdateWithoutSearcherInput, Prisma.UserSearchHistoryUncheckedUpdateWithoutSearcherInput>;
    create: Prisma.XOR<Prisma.UserSearchHistoryCreateWithoutSearcherInput, Prisma.UserSearchHistoryUncheckedCreateWithoutSearcherInput>;
};
export type UserSearchHistoryUpdateWithWhereUniqueWithoutSearcherInput = {
    where: Prisma.UserSearchHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserSearchHistoryUpdateWithoutSearcherInput, Prisma.UserSearchHistoryUncheckedUpdateWithoutSearcherInput>;
};
export type UserSearchHistoryUpdateManyWithWhereWithoutSearcherInput = {
    where: Prisma.UserSearchHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.UserSearchHistoryUpdateManyMutationInput, Prisma.UserSearchHistoryUncheckedUpdateManyWithoutSearcherInput>;
};
export type UserSearchHistoryScalarWhereInput = {
    AND?: Prisma.UserSearchHistoryScalarWhereInput | Prisma.UserSearchHistoryScalarWhereInput[];
    OR?: Prisma.UserSearchHistoryScalarWhereInput[];
    NOT?: Prisma.UserSearchHistoryScalarWhereInput | Prisma.UserSearchHistoryScalarWhereInput[];
    id?: Prisma.StringFilter<"UserSearchHistory"> | string;
    searcherId?: Prisma.StringFilter<"UserSearchHistory"> | string;
    query?: Prisma.StringFilter<"UserSearchHistory"> | string;
    searchedAt?: Prisma.DateTimeFilter<"UserSearchHistory"> | Date | string;
};
export type UserSearchHistoryCreateManySearcherInput = {
    id?: string;
    query: string;
    searchedAt?: Date | string;
};
export type UserSearchHistoryUpdateWithoutSearcherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSearchHistoryUncheckedUpdateWithoutSearcherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSearchHistoryUncheckedUpdateManyWithoutSearcherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    searchedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSearchHistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    searcherId?: boolean;
    query?: boolean;
    searchedAt?: boolean;
    searcher?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userSearchHistory"]>;
export type UserSearchHistorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    searcherId?: boolean;
    query?: boolean;
    searchedAt?: boolean;
    searcher?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userSearchHistory"]>;
export type UserSearchHistorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    searcherId?: boolean;
    query?: boolean;
    searchedAt?: boolean;
    searcher?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userSearchHistory"]>;
export type UserSearchHistorySelectScalar = {
    id?: boolean;
    searcherId?: boolean;
    query?: boolean;
    searchedAt?: boolean;
};
export type UserSearchHistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "searcherId" | "query" | "searchedAt", ExtArgs["result"]["userSearchHistory"]>;
export type UserSearchHistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    searcher?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserSearchHistoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    searcher?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserSearchHistoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    searcher?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserSearchHistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserSearchHistory";
    objects: {
        searcher: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        searcherId: string;
        query: string;
        searchedAt: Date;
    }, ExtArgs["result"]["userSearchHistory"]>;
    composites: {};
};
export type UserSearchHistoryGetPayload<S extends boolean | null | undefined | UserSearchHistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload, S>;
export type UserSearchHistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserSearchHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserSearchHistoryCountAggregateInputType | true;
};
export interface UserSearchHistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserSearchHistory'];
        meta: {
            name: 'UserSearchHistory';
        };
    };
    findUnique<T extends UserSearchHistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, UserSearchHistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserSearchHistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserSearchHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserSearchHistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, UserSearchHistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserSearchHistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserSearchHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserSearchHistoryFindManyArgs>(args?: Prisma.SelectSubset<T, UserSearchHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserSearchHistoryCreateArgs>(args: Prisma.SelectSubset<T, UserSearchHistoryCreateArgs<ExtArgs>>): Prisma.Prisma__UserSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserSearchHistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, UserSearchHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserSearchHistoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserSearchHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserSearchHistoryDeleteArgs>(args: Prisma.SelectSubset<T, UserSearchHistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__UserSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserSearchHistoryUpdateArgs>(args: Prisma.SelectSubset<T, UserSearchHistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__UserSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserSearchHistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserSearchHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserSearchHistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, UserSearchHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserSearchHistoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserSearchHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserSearchHistoryUpsertArgs>(args: Prisma.SelectSubset<T, UserSearchHistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__UserSearchHistoryClient<runtime.Types.Result.GetResult<Prisma.$UserSearchHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserSearchHistoryCountArgs>(args?: Prisma.Subset<T, UserSearchHistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserSearchHistoryCountAggregateOutputType> : number>;
    aggregate<T extends UserSearchHistoryAggregateArgs>(args: Prisma.Subset<T, UserSearchHistoryAggregateArgs>): Prisma.PrismaPromise<GetUserSearchHistoryAggregateType<T>>;
    groupBy<T extends UserSearchHistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserSearchHistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: UserSearchHistoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserSearchHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSearchHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserSearchHistoryFieldRefs;
}
export interface Prisma__UserSearchHistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    searcher<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserSearchHistoryFieldRefs {
    readonly id: Prisma.FieldRef<"UserSearchHistory", 'String'>;
    readonly searcherId: Prisma.FieldRef<"UserSearchHistory", 'String'>;
    readonly query: Prisma.FieldRef<"UserSearchHistory", 'String'>;
    readonly searchedAt: Prisma.FieldRef<"UserSearchHistory", 'DateTime'>;
}
export type UserSearchHistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.UserSearchHistoryInclude<ExtArgs> | null;
    where: Prisma.UserSearchHistoryWhereUniqueInput;
};
export type UserSearchHistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.UserSearchHistoryInclude<ExtArgs> | null;
    where: Prisma.UserSearchHistoryWhereUniqueInput;
};
export type UserSearchHistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.UserSearchHistoryInclude<ExtArgs> | null;
    where?: Prisma.UserSearchHistoryWhereInput;
    orderBy?: Prisma.UserSearchHistoryOrderByWithRelationInput | Prisma.UserSearchHistoryOrderByWithRelationInput[];
    cursor?: Prisma.UserSearchHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserSearchHistoryScalarFieldEnum | Prisma.UserSearchHistoryScalarFieldEnum[];
};
export type UserSearchHistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.UserSearchHistoryInclude<ExtArgs> | null;
    where?: Prisma.UserSearchHistoryWhereInput;
    orderBy?: Prisma.UserSearchHistoryOrderByWithRelationInput | Prisma.UserSearchHistoryOrderByWithRelationInput[];
    cursor?: Prisma.UserSearchHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserSearchHistoryScalarFieldEnum | Prisma.UserSearchHistoryScalarFieldEnum[];
};
export type UserSearchHistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.UserSearchHistoryInclude<ExtArgs> | null;
    where?: Prisma.UserSearchHistoryWhereInput;
    orderBy?: Prisma.UserSearchHistoryOrderByWithRelationInput | Prisma.UserSearchHistoryOrderByWithRelationInput[];
    cursor?: Prisma.UserSearchHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserSearchHistoryScalarFieldEnum | Prisma.UserSearchHistoryScalarFieldEnum[];
};
export type UserSearchHistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.UserSearchHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSearchHistoryCreateInput, Prisma.UserSearchHistoryUncheckedCreateInput>;
};
export type UserSearchHistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserSearchHistoryCreateManyInput | Prisma.UserSearchHistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserSearchHistoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    data: Prisma.UserSearchHistoryCreateManyInput | Prisma.UserSearchHistoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserSearchHistoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserSearchHistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.UserSearchHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSearchHistoryUpdateInput, Prisma.UserSearchHistoryUncheckedUpdateInput>;
    where: Prisma.UserSearchHistoryWhereUniqueInput;
};
export type UserSearchHistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserSearchHistoryUpdateManyMutationInput, Prisma.UserSearchHistoryUncheckedUpdateManyInput>;
    where?: Prisma.UserSearchHistoryWhereInput;
    limit?: number;
};
export type UserSearchHistoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSearchHistoryUpdateManyMutationInput, Prisma.UserSearchHistoryUncheckedUpdateManyInput>;
    where?: Prisma.UserSearchHistoryWhereInput;
    limit?: number;
    include?: Prisma.UserSearchHistoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserSearchHistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.UserSearchHistoryInclude<ExtArgs> | null;
    where: Prisma.UserSearchHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserSearchHistoryCreateInput, Prisma.UserSearchHistoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserSearchHistoryUpdateInput, Prisma.UserSearchHistoryUncheckedUpdateInput>;
};
export type UserSearchHistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.UserSearchHistoryInclude<ExtArgs> | null;
    where: Prisma.UserSearchHistoryWhereUniqueInput;
};
export type UserSearchHistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSearchHistoryWhereInput;
    limit?: number;
};
export type UserSearchHistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSearchHistorySelect<ExtArgs> | null;
    omit?: Prisma.UserSearchHistoryOmit<ExtArgs> | null;
    include?: Prisma.UserSearchHistoryInclude<ExtArgs> | null;
};
