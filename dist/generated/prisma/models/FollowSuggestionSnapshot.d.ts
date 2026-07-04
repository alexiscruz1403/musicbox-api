import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FollowSuggestionSnapshotModel = runtime.Types.Result.DefaultSelection<Prisma.$FollowSuggestionSnapshotPayload>;
export type AggregateFollowSuggestionSnapshot = {
    _count: FollowSuggestionSnapshotCountAggregateOutputType | null;
    _min: FollowSuggestionSnapshotMinAggregateOutputType | null;
    _max: FollowSuggestionSnapshotMaxAggregateOutputType | null;
};
export type FollowSuggestionSnapshotMinAggregateOutputType = {
    userId: string | null;
    generatedAt: Date | null;
};
export type FollowSuggestionSnapshotMaxAggregateOutputType = {
    userId: string | null;
    generatedAt: Date | null;
};
export type FollowSuggestionSnapshotCountAggregateOutputType = {
    userId: number;
    payload: number;
    generatedAt: number;
    _all: number;
};
export type FollowSuggestionSnapshotMinAggregateInputType = {
    userId?: true;
    generatedAt?: true;
};
export type FollowSuggestionSnapshotMaxAggregateInputType = {
    userId?: true;
    generatedAt?: true;
};
export type FollowSuggestionSnapshotCountAggregateInputType = {
    userId?: true;
    payload?: true;
    generatedAt?: true;
    _all?: true;
};
export type FollowSuggestionSnapshotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowSuggestionSnapshotWhereInput;
    orderBy?: Prisma.FollowSuggestionSnapshotOrderByWithRelationInput | Prisma.FollowSuggestionSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FollowSuggestionSnapshotCountAggregateInputType;
    _min?: FollowSuggestionSnapshotMinAggregateInputType;
    _max?: FollowSuggestionSnapshotMaxAggregateInputType;
};
export type GetFollowSuggestionSnapshotAggregateType<T extends FollowSuggestionSnapshotAggregateArgs> = {
    [P in keyof T & keyof AggregateFollowSuggestionSnapshot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFollowSuggestionSnapshot[P]> : Prisma.GetScalarType<T[P], AggregateFollowSuggestionSnapshot[P]>;
};
export type FollowSuggestionSnapshotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowSuggestionSnapshotWhereInput;
    orderBy?: Prisma.FollowSuggestionSnapshotOrderByWithAggregationInput | Prisma.FollowSuggestionSnapshotOrderByWithAggregationInput[];
    by: Prisma.FollowSuggestionSnapshotScalarFieldEnum[] | Prisma.FollowSuggestionSnapshotScalarFieldEnum;
    having?: Prisma.FollowSuggestionSnapshotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FollowSuggestionSnapshotCountAggregateInputType | true;
    _min?: FollowSuggestionSnapshotMinAggregateInputType;
    _max?: FollowSuggestionSnapshotMaxAggregateInputType;
};
export type FollowSuggestionSnapshotGroupByOutputType = {
    userId: string;
    payload: runtime.JsonValue;
    generatedAt: Date;
    _count: FollowSuggestionSnapshotCountAggregateOutputType | null;
    _min: FollowSuggestionSnapshotMinAggregateOutputType | null;
    _max: FollowSuggestionSnapshotMaxAggregateOutputType | null;
};
export type GetFollowSuggestionSnapshotGroupByPayload<T extends FollowSuggestionSnapshotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FollowSuggestionSnapshotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FollowSuggestionSnapshotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FollowSuggestionSnapshotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FollowSuggestionSnapshotGroupByOutputType[P]>;
}>>;
export type FollowSuggestionSnapshotWhereInput = {
    AND?: Prisma.FollowSuggestionSnapshotWhereInput | Prisma.FollowSuggestionSnapshotWhereInput[];
    OR?: Prisma.FollowSuggestionSnapshotWhereInput[];
    NOT?: Prisma.FollowSuggestionSnapshotWhereInput | Prisma.FollowSuggestionSnapshotWhereInput[];
    userId?: Prisma.StringFilter<"FollowSuggestionSnapshot"> | string;
    payload?: Prisma.JsonFilter<"FollowSuggestionSnapshot">;
    generatedAt?: Prisma.DateTimeFilter<"FollowSuggestionSnapshot"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type FollowSuggestionSnapshotOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type FollowSuggestionSnapshotWhereUniqueInput = Prisma.AtLeast<{
    userId?: string;
    AND?: Prisma.FollowSuggestionSnapshotWhereInput | Prisma.FollowSuggestionSnapshotWhereInput[];
    OR?: Prisma.FollowSuggestionSnapshotWhereInput[];
    NOT?: Prisma.FollowSuggestionSnapshotWhereInput | Prisma.FollowSuggestionSnapshotWhereInput[];
    payload?: Prisma.JsonFilter<"FollowSuggestionSnapshot">;
    generatedAt?: Prisma.DateTimeFilter<"FollowSuggestionSnapshot"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "userId">;
export type FollowSuggestionSnapshotOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    _count?: Prisma.FollowSuggestionSnapshotCountOrderByAggregateInput;
    _max?: Prisma.FollowSuggestionSnapshotMaxOrderByAggregateInput;
    _min?: Prisma.FollowSuggestionSnapshotMinOrderByAggregateInput;
};
export type FollowSuggestionSnapshotScalarWhereWithAggregatesInput = {
    AND?: Prisma.FollowSuggestionSnapshotScalarWhereWithAggregatesInput | Prisma.FollowSuggestionSnapshotScalarWhereWithAggregatesInput[];
    OR?: Prisma.FollowSuggestionSnapshotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FollowSuggestionSnapshotScalarWhereWithAggregatesInput | Prisma.FollowSuggestionSnapshotScalarWhereWithAggregatesInput[];
    userId?: Prisma.StringWithAggregatesFilter<"FollowSuggestionSnapshot"> | string;
    payload?: Prisma.JsonWithAggregatesFilter<"FollowSuggestionSnapshot">;
    generatedAt?: Prisma.DateTimeWithAggregatesFilter<"FollowSuggestionSnapshot"> | Date | string;
};
export type FollowSuggestionSnapshotCreateInput = {
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFollowSuggestionSnapshotInput;
};
export type FollowSuggestionSnapshotUncheckedCreateInput = {
    userId: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Date | string;
};
export type FollowSuggestionSnapshotUpdateInput = {
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFollowSuggestionSnapshotNestedInput;
};
export type FollowSuggestionSnapshotUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowSuggestionSnapshotCreateManyInput = {
    userId: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Date | string;
};
export type FollowSuggestionSnapshotUpdateManyMutationInput = {
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowSuggestionSnapshotUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowSuggestionSnapshotNullableScalarRelationFilter = {
    is?: Prisma.FollowSuggestionSnapshotWhereInput | null;
    isNot?: Prisma.FollowSuggestionSnapshotWhereInput | null;
};
export type FollowSuggestionSnapshotCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
};
export type FollowSuggestionSnapshotMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
};
export type FollowSuggestionSnapshotMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
};
export type FollowSuggestionSnapshotCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FollowSuggestionSnapshotCreateWithoutUserInput, Prisma.FollowSuggestionSnapshotUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FollowSuggestionSnapshotCreateOrConnectWithoutUserInput;
    connect?: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
};
export type FollowSuggestionSnapshotUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FollowSuggestionSnapshotCreateWithoutUserInput, Prisma.FollowSuggestionSnapshotUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FollowSuggestionSnapshotCreateOrConnectWithoutUserInput;
    connect?: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
};
export type FollowSuggestionSnapshotUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FollowSuggestionSnapshotCreateWithoutUserInput, Prisma.FollowSuggestionSnapshotUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FollowSuggestionSnapshotCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FollowSuggestionSnapshotUpsertWithoutUserInput;
    disconnect?: Prisma.FollowSuggestionSnapshotWhereInput | boolean;
    delete?: Prisma.FollowSuggestionSnapshotWhereInput | boolean;
    connect?: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FollowSuggestionSnapshotUpdateToOneWithWhereWithoutUserInput, Prisma.FollowSuggestionSnapshotUpdateWithoutUserInput>, Prisma.FollowSuggestionSnapshotUncheckedUpdateWithoutUserInput>;
};
export type FollowSuggestionSnapshotUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FollowSuggestionSnapshotCreateWithoutUserInput, Prisma.FollowSuggestionSnapshotUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FollowSuggestionSnapshotCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FollowSuggestionSnapshotUpsertWithoutUserInput;
    disconnect?: Prisma.FollowSuggestionSnapshotWhereInput | boolean;
    delete?: Prisma.FollowSuggestionSnapshotWhereInput | boolean;
    connect?: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FollowSuggestionSnapshotUpdateToOneWithWhereWithoutUserInput, Prisma.FollowSuggestionSnapshotUpdateWithoutUserInput>, Prisma.FollowSuggestionSnapshotUncheckedUpdateWithoutUserInput>;
};
export type FollowSuggestionSnapshotCreateWithoutUserInput = {
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Date | string;
};
export type FollowSuggestionSnapshotUncheckedCreateWithoutUserInput = {
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Date | string;
};
export type FollowSuggestionSnapshotCreateOrConnectWithoutUserInput = {
    where: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
    create: Prisma.XOR<Prisma.FollowSuggestionSnapshotCreateWithoutUserInput, Prisma.FollowSuggestionSnapshotUncheckedCreateWithoutUserInput>;
};
export type FollowSuggestionSnapshotUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.FollowSuggestionSnapshotUpdateWithoutUserInput, Prisma.FollowSuggestionSnapshotUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FollowSuggestionSnapshotCreateWithoutUserInput, Prisma.FollowSuggestionSnapshotUncheckedCreateWithoutUserInput>;
    where?: Prisma.FollowSuggestionSnapshotWhereInput;
};
export type FollowSuggestionSnapshotUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.FollowSuggestionSnapshotWhereInput;
    data: Prisma.XOR<Prisma.FollowSuggestionSnapshotUpdateWithoutUserInput, Prisma.FollowSuggestionSnapshotUncheckedUpdateWithoutUserInput>;
};
export type FollowSuggestionSnapshotUpdateWithoutUserInput = {
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowSuggestionSnapshotUncheckedUpdateWithoutUserInput = {
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowSuggestionSnapshotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    payload?: boolean;
    generatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["followSuggestionSnapshot"]>;
export type FollowSuggestionSnapshotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    payload?: boolean;
    generatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["followSuggestionSnapshot"]>;
export type FollowSuggestionSnapshotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    payload?: boolean;
    generatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["followSuggestionSnapshot"]>;
export type FollowSuggestionSnapshotSelectScalar = {
    userId?: boolean;
    payload?: boolean;
    generatedAt?: boolean;
};
export type FollowSuggestionSnapshotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "payload" | "generatedAt", ExtArgs["result"]["followSuggestionSnapshot"]>;
export type FollowSuggestionSnapshotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FollowSuggestionSnapshotIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FollowSuggestionSnapshotIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $FollowSuggestionSnapshotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FollowSuggestionSnapshot";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        payload: runtime.JsonValue;
        generatedAt: Date;
    }, ExtArgs["result"]["followSuggestionSnapshot"]>;
    composites: {};
};
export type FollowSuggestionSnapshotGetPayload<S extends boolean | null | undefined | FollowSuggestionSnapshotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload, S>;
export type FollowSuggestionSnapshotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FollowSuggestionSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FollowSuggestionSnapshotCountAggregateInputType | true;
};
export interface FollowSuggestionSnapshotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FollowSuggestionSnapshot'];
        meta: {
            name: 'FollowSuggestionSnapshot';
        };
    };
    findUnique<T extends FollowSuggestionSnapshotFindUniqueArgs>(args: Prisma.SelectSubset<T, FollowSuggestionSnapshotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FollowSuggestionSnapshotClient<runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FollowSuggestionSnapshotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FollowSuggestionSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FollowSuggestionSnapshotClient<runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FollowSuggestionSnapshotFindFirstArgs>(args?: Prisma.SelectSubset<T, FollowSuggestionSnapshotFindFirstArgs<ExtArgs>>): Prisma.Prisma__FollowSuggestionSnapshotClient<runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FollowSuggestionSnapshotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FollowSuggestionSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FollowSuggestionSnapshotClient<runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FollowSuggestionSnapshotFindManyArgs>(args?: Prisma.SelectSubset<T, FollowSuggestionSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FollowSuggestionSnapshotCreateArgs>(args: Prisma.SelectSubset<T, FollowSuggestionSnapshotCreateArgs<ExtArgs>>): Prisma.Prisma__FollowSuggestionSnapshotClient<runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FollowSuggestionSnapshotCreateManyArgs>(args?: Prisma.SelectSubset<T, FollowSuggestionSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FollowSuggestionSnapshotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FollowSuggestionSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FollowSuggestionSnapshotDeleteArgs>(args: Prisma.SelectSubset<T, FollowSuggestionSnapshotDeleteArgs<ExtArgs>>): Prisma.Prisma__FollowSuggestionSnapshotClient<runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FollowSuggestionSnapshotUpdateArgs>(args: Prisma.SelectSubset<T, FollowSuggestionSnapshotUpdateArgs<ExtArgs>>): Prisma.Prisma__FollowSuggestionSnapshotClient<runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FollowSuggestionSnapshotDeleteManyArgs>(args?: Prisma.SelectSubset<T, FollowSuggestionSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FollowSuggestionSnapshotUpdateManyArgs>(args: Prisma.SelectSubset<T, FollowSuggestionSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FollowSuggestionSnapshotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FollowSuggestionSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FollowSuggestionSnapshotUpsertArgs>(args: Prisma.SelectSubset<T, FollowSuggestionSnapshotUpsertArgs<ExtArgs>>): Prisma.Prisma__FollowSuggestionSnapshotClient<runtime.Types.Result.GetResult<Prisma.$FollowSuggestionSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FollowSuggestionSnapshotCountArgs>(args?: Prisma.Subset<T, FollowSuggestionSnapshotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FollowSuggestionSnapshotCountAggregateOutputType> : number>;
    aggregate<T extends FollowSuggestionSnapshotAggregateArgs>(args: Prisma.Subset<T, FollowSuggestionSnapshotAggregateArgs>): Prisma.PrismaPromise<GetFollowSuggestionSnapshotAggregateType<T>>;
    groupBy<T extends FollowSuggestionSnapshotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FollowSuggestionSnapshotGroupByArgs['orderBy'];
    } : {
        orderBy?: FollowSuggestionSnapshotGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FollowSuggestionSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowSuggestionSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FollowSuggestionSnapshotFieldRefs;
}
export interface Prisma__FollowSuggestionSnapshotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FollowSuggestionSnapshotFieldRefs {
    readonly userId: Prisma.FieldRef<"FollowSuggestionSnapshot", 'String'>;
    readonly payload: Prisma.FieldRef<"FollowSuggestionSnapshot", 'Json'>;
    readonly generatedAt: Prisma.FieldRef<"FollowSuggestionSnapshot", 'DateTime'>;
}
export type FollowSuggestionSnapshotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    include?: Prisma.FollowSuggestionSnapshotInclude<ExtArgs> | null;
    where: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
};
export type FollowSuggestionSnapshotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    include?: Prisma.FollowSuggestionSnapshotInclude<ExtArgs> | null;
    where: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
};
export type FollowSuggestionSnapshotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    include?: Prisma.FollowSuggestionSnapshotInclude<ExtArgs> | null;
    where?: Prisma.FollowSuggestionSnapshotWhereInput;
    orderBy?: Prisma.FollowSuggestionSnapshotOrderByWithRelationInput | Prisma.FollowSuggestionSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowSuggestionSnapshotScalarFieldEnum | Prisma.FollowSuggestionSnapshotScalarFieldEnum[];
};
export type FollowSuggestionSnapshotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    include?: Prisma.FollowSuggestionSnapshotInclude<ExtArgs> | null;
    where?: Prisma.FollowSuggestionSnapshotWhereInput;
    orderBy?: Prisma.FollowSuggestionSnapshotOrderByWithRelationInput | Prisma.FollowSuggestionSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowSuggestionSnapshotScalarFieldEnum | Prisma.FollowSuggestionSnapshotScalarFieldEnum[];
};
export type FollowSuggestionSnapshotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    include?: Prisma.FollowSuggestionSnapshotInclude<ExtArgs> | null;
    where?: Prisma.FollowSuggestionSnapshotWhereInput;
    orderBy?: Prisma.FollowSuggestionSnapshotOrderByWithRelationInput | Prisma.FollowSuggestionSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowSuggestionSnapshotScalarFieldEnum | Prisma.FollowSuggestionSnapshotScalarFieldEnum[];
};
export type FollowSuggestionSnapshotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    include?: Prisma.FollowSuggestionSnapshotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FollowSuggestionSnapshotCreateInput, Prisma.FollowSuggestionSnapshotUncheckedCreateInput>;
};
export type FollowSuggestionSnapshotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FollowSuggestionSnapshotCreateManyInput | Prisma.FollowSuggestionSnapshotCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FollowSuggestionSnapshotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    data: Prisma.FollowSuggestionSnapshotCreateManyInput | Prisma.FollowSuggestionSnapshotCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FollowSuggestionSnapshotIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FollowSuggestionSnapshotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    include?: Prisma.FollowSuggestionSnapshotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FollowSuggestionSnapshotUpdateInput, Prisma.FollowSuggestionSnapshotUncheckedUpdateInput>;
    where: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
};
export type FollowSuggestionSnapshotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FollowSuggestionSnapshotUpdateManyMutationInput, Prisma.FollowSuggestionSnapshotUncheckedUpdateManyInput>;
    where?: Prisma.FollowSuggestionSnapshotWhereInput;
    limit?: number;
};
export type FollowSuggestionSnapshotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FollowSuggestionSnapshotUpdateManyMutationInput, Prisma.FollowSuggestionSnapshotUncheckedUpdateManyInput>;
    where?: Prisma.FollowSuggestionSnapshotWhereInput;
    limit?: number;
    include?: Prisma.FollowSuggestionSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FollowSuggestionSnapshotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    include?: Prisma.FollowSuggestionSnapshotInclude<ExtArgs> | null;
    where: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
    create: Prisma.XOR<Prisma.FollowSuggestionSnapshotCreateInput, Prisma.FollowSuggestionSnapshotUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FollowSuggestionSnapshotUpdateInput, Prisma.FollowSuggestionSnapshotUncheckedUpdateInput>;
};
export type FollowSuggestionSnapshotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    include?: Prisma.FollowSuggestionSnapshotInclude<ExtArgs> | null;
    where: Prisma.FollowSuggestionSnapshotWhereUniqueInput;
};
export type FollowSuggestionSnapshotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowSuggestionSnapshotWhereInput;
    limit?: number;
};
export type FollowSuggestionSnapshotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSuggestionSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.FollowSuggestionSnapshotOmit<ExtArgs> | null;
    include?: Prisma.FollowSuggestionSnapshotInclude<ExtArgs> | null;
};
