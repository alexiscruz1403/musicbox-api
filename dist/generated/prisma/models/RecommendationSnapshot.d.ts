import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RecommendationSnapshotModel = runtime.Types.Result.DefaultSelection<Prisma.$RecommendationSnapshotPayload>;
export type AggregateRecommendationSnapshot = {
    _count: RecommendationSnapshotCountAggregateOutputType | null;
    _min: RecommendationSnapshotMinAggregateOutputType | null;
    _max: RecommendationSnapshotMaxAggregateOutputType | null;
};
export type RecommendationSnapshotMinAggregateOutputType = {
    userId: string | null;
    generatedAt: Date | null;
};
export type RecommendationSnapshotMaxAggregateOutputType = {
    userId: string | null;
    generatedAt: Date | null;
};
export type RecommendationSnapshotCountAggregateOutputType = {
    userId: number;
    payload: number;
    generatedAt: number;
    _all: number;
};
export type RecommendationSnapshotMinAggregateInputType = {
    userId?: true;
    generatedAt?: true;
};
export type RecommendationSnapshotMaxAggregateInputType = {
    userId?: true;
    generatedAt?: true;
};
export type RecommendationSnapshotCountAggregateInputType = {
    userId?: true;
    payload?: true;
    generatedAt?: true;
    _all?: true;
};
export type RecommendationSnapshotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationSnapshotWhereInput;
    orderBy?: Prisma.RecommendationSnapshotOrderByWithRelationInput | Prisma.RecommendationSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RecommendationSnapshotCountAggregateInputType;
    _min?: RecommendationSnapshotMinAggregateInputType;
    _max?: RecommendationSnapshotMaxAggregateInputType;
};
export type GetRecommendationSnapshotAggregateType<T extends RecommendationSnapshotAggregateArgs> = {
    [P in keyof T & keyof AggregateRecommendationSnapshot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRecommendationSnapshot[P]> : Prisma.GetScalarType<T[P], AggregateRecommendationSnapshot[P]>;
};
export type RecommendationSnapshotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationSnapshotWhereInput;
    orderBy?: Prisma.RecommendationSnapshotOrderByWithAggregationInput | Prisma.RecommendationSnapshotOrderByWithAggregationInput[];
    by: Prisma.RecommendationSnapshotScalarFieldEnum[] | Prisma.RecommendationSnapshotScalarFieldEnum;
    having?: Prisma.RecommendationSnapshotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecommendationSnapshotCountAggregateInputType | true;
    _min?: RecommendationSnapshotMinAggregateInputType;
    _max?: RecommendationSnapshotMaxAggregateInputType;
};
export type RecommendationSnapshotGroupByOutputType = {
    userId: string;
    payload: runtime.JsonValue;
    generatedAt: Date;
    _count: RecommendationSnapshotCountAggregateOutputType | null;
    _min: RecommendationSnapshotMinAggregateOutputType | null;
    _max: RecommendationSnapshotMaxAggregateOutputType | null;
};
export type GetRecommendationSnapshotGroupByPayload<T extends RecommendationSnapshotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RecommendationSnapshotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RecommendationSnapshotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RecommendationSnapshotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RecommendationSnapshotGroupByOutputType[P]>;
}>>;
export type RecommendationSnapshotWhereInput = {
    AND?: Prisma.RecommendationSnapshotWhereInput | Prisma.RecommendationSnapshotWhereInput[];
    OR?: Prisma.RecommendationSnapshotWhereInput[];
    NOT?: Prisma.RecommendationSnapshotWhereInput | Prisma.RecommendationSnapshotWhereInput[];
    userId?: Prisma.StringFilter<"RecommendationSnapshot"> | string;
    payload?: Prisma.JsonFilter<"RecommendationSnapshot">;
    generatedAt?: Prisma.DateTimeFilter<"RecommendationSnapshot"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RecommendationSnapshotOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type RecommendationSnapshotWhereUniqueInput = Prisma.AtLeast<{
    userId?: string;
    AND?: Prisma.RecommendationSnapshotWhereInput | Prisma.RecommendationSnapshotWhereInput[];
    OR?: Prisma.RecommendationSnapshotWhereInput[];
    NOT?: Prisma.RecommendationSnapshotWhereInput | Prisma.RecommendationSnapshotWhereInput[];
    payload?: Prisma.JsonFilter<"RecommendationSnapshot">;
    generatedAt?: Prisma.DateTimeFilter<"RecommendationSnapshot"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "userId">;
export type RecommendationSnapshotOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    _count?: Prisma.RecommendationSnapshotCountOrderByAggregateInput;
    _max?: Prisma.RecommendationSnapshotMaxOrderByAggregateInput;
    _min?: Prisma.RecommendationSnapshotMinOrderByAggregateInput;
};
export type RecommendationSnapshotScalarWhereWithAggregatesInput = {
    AND?: Prisma.RecommendationSnapshotScalarWhereWithAggregatesInput | Prisma.RecommendationSnapshotScalarWhereWithAggregatesInput[];
    OR?: Prisma.RecommendationSnapshotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RecommendationSnapshotScalarWhereWithAggregatesInput | Prisma.RecommendationSnapshotScalarWhereWithAggregatesInput[];
    userId?: Prisma.StringWithAggregatesFilter<"RecommendationSnapshot"> | string;
    payload?: Prisma.JsonWithAggregatesFilter<"RecommendationSnapshot">;
    generatedAt?: Prisma.DateTimeWithAggregatesFilter<"RecommendationSnapshot"> | Date | string;
};
export type RecommendationSnapshotCreateInput = {
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRecommendationSnapshotInput;
};
export type RecommendationSnapshotUncheckedCreateInput = {
    userId: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt: Date | string;
};
export type RecommendationSnapshotUpdateInput = {
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRecommendationSnapshotNestedInput;
};
export type RecommendationSnapshotUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationSnapshotCreateManyInput = {
    userId: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt: Date | string;
};
export type RecommendationSnapshotUpdateManyMutationInput = {
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationSnapshotUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationSnapshotNullableScalarRelationFilter = {
    is?: Prisma.RecommendationSnapshotWhereInput | null;
    isNot?: Prisma.RecommendationSnapshotWhereInput | null;
};
export type RecommendationSnapshotCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
};
export type RecommendationSnapshotMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
};
export type RecommendationSnapshotMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
};
export type RecommendationSnapshotCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecommendationSnapshotCreateWithoutUserInput, Prisma.RecommendationSnapshotUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RecommendationSnapshotCreateOrConnectWithoutUserInput;
    connect?: Prisma.RecommendationSnapshotWhereUniqueInput;
};
export type RecommendationSnapshotUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecommendationSnapshotCreateWithoutUserInput, Prisma.RecommendationSnapshotUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RecommendationSnapshotCreateOrConnectWithoutUserInput;
    connect?: Prisma.RecommendationSnapshotWhereUniqueInput;
};
export type RecommendationSnapshotUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecommendationSnapshotCreateWithoutUserInput, Prisma.RecommendationSnapshotUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RecommendationSnapshotCreateOrConnectWithoutUserInput;
    upsert?: Prisma.RecommendationSnapshotUpsertWithoutUserInput;
    disconnect?: Prisma.RecommendationSnapshotWhereInput | boolean;
    delete?: Prisma.RecommendationSnapshotWhereInput | boolean;
    connect?: Prisma.RecommendationSnapshotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RecommendationSnapshotUpdateToOneWithWhereWithoutUserInput, Prisma.RecommendationSnapshotUpdateWithoutUserInput>, Prisma.RecommendationSnapshotUncheckedUpdateWithoutUserInput>;
};
export type RecommendationSnapshotUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecommendationSnapshotCreateWithoutUserInput, Prisma.RecommendationSnapshotUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RecommendationSnapshotCreateOrConnectWithoutUserInput;
    upsert?: Prisma.RecommendationSnapshotUpsertWithoutUserInput;
    disconnect?: Prisma.RecommendationSnapshotWhereInput | boolean;
    delete?: Prisma.RecommendationSnapshotWhereInput | boolean;
    connect?: Prisma.RecommendationSnapshotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RecommendationSnapshotUpdateToOneWithWhereWithoutUserInput, Prisma.RecommendationSnapshotUpdateWithoutUserInput>, Prisma.RecommendationSnapshotUncheckedUpdateWithoutUserInput>;
};
export type RecommendationSnapshotCreateWithoutUserInput = {
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt: Date | string;
};
export type RecommendationSnapshotUncheckedCreateWithoutUserInput = {
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt: Date | string;
};
export type RecommendationSnapshotCreateOrConnectWithoutUserInput = {
    where: Prisma.RecommendationSnapshotWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecommendationSnapshotCreateWithoutUserInput, Prisma.RecommendationSnapshotUncheckedCreateWithoutUserInput>;
};
export type RecommendationSnapshotUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.RecommendationSnapshotUpdateWithoutUserInput, Prisma.RecommendationSnapshotUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RecommendationSnapshotCreateWithoutUserInput, Prisma.RecommendationSnapshotUncheckedCreateWithoutUserInput>;
    where?: Prisma.RecommendationSnapshotWhereInput;
};
export type RecommendationSnapshotUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.RecommendationSnapshotWhereInput;
    data: Prisma.XOR<Prisma.RecommendationSnapshotUpdateWithoutUserInput, Prisma.RecommendationSnapshotUncheckedUpdateWithoutUserInput>;
};
export type RecommendationSnapshotUpdateWithoutUserInput = {
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationSnapshotUncheckedUpdateWithoutUserInput = {
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationSnapshotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    payload?: boolean;
    generatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recommendationSnapshot"]>;
export type RecommendationSnapshotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    payload?: boolean;
    generatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recommendationSnapshot"]>;
export type RecommendationSnapshotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    payload?: boolean;
    generatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recommendationSnapshot"]>;
export type RecommendationSnapshotSelectScalar = {
    userId?: boolean;
    payload?: boolean;
    generatedAt?: boolean;
};
export type RecommendationSnapshotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "payload" | "generatedAt", ExtArgs["result"]["recommendationSnapshot"]>;
export type RecommendationSnapshotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RecommendationSnapshotIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RecommendationSnapshotIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RecommendationSnapshotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RecommendationSnapshot";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        payload: runtime.JsonValue;
        generatedAt: Date;
    }, ExtArgs["result"]["recommendationSnapshot"]>;
    composites: {};
};
export type RecommendationSnapshotGetPayload<S extends boolean | null | undefined | RecommendationSnapshotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload, S>;
export type RecommendationSnapshotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RecommendationSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecommendationSnapshotCountAggregateInputType | true;
};
export interface RecommendationSnapshotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RecommendationSnapshot'];
        meta: {
            name: 'RecommendationSnapshot';
        };
    };
    findUnique<T extends RecommendationSnapshotFindUniqueArgs>(args: Prisma.SelectSubset<T, RecommendationSnapshotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RecommendationSnapshotClient<runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RecommendationSnapshotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RecommendationSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecommendationSnapshotClient<runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RecommendationSnapshotFindFirstArgs>(args?: Prisma.SelectSubset<T, RecommendationSnapshotFindFirstArgs<ExtArgs>>): Prisma.Prisma__RecommendationSnapshotClient<runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RecommendationSnapshotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RecommendationSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecommendationSnapshotClient<runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RecommendationSnapshotFindManyArgs>(args?: Prisma.SelectSubset<T, RecommendationSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RecommendationSnapshotCreateArgs>(args: Prisma.SelectSubset<T, RecommendationSnapshotCreateArgs<ExtArgs>>): Prisma.Prisma__RecommendationSnapshotClient<runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RecommendationSnapshotCreateManyArgs>(args?: Prisma.SelectSubset<T, RecommendationSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RecommendationSnapshotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RecommendationSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RecommendationSnapshotDeleteArgs>(args: Prisma.SelectSubset<T, RecommendationSnapshotDeleteArgs<ExtArgs>>): Prisma.Prisma__RecommendationSnapshotClient<runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RecommendationSnapshotUpdateArgs>(args: Prisma.SelectSubset<T, RecommendationSnapshotUpdateArgs<ExtArgs>>): Prisma.Prisma__RecommendationSnapshotClient<runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RecommendationSnapshotDeleteManyArgs>(args?: Prisma.SelectSubset<T, RecommendationSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RecommendationSnapshotUpdateManyArgs>(args: Prisma.SelectSubset<T, RecommendationSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RecommendationSnapshotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RecommendationSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RecommendationSnapshotUpsertArgs>(args: Prisma.SelectSubset<T, RecommendationSnapshotUpsertArgs<ExtArgs>>): Prisma.Prisma__RecommendationSnapshotClient<runtime.Types.Result.GetResult<Prisma.$RecommendationSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RecommendationSnapshotCountArgs>(args?: Prisma.Subset<T, RecommendationSnapshotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RecommendationSnapshotCountAggregateOutputType> : number>;
    aggregate<T extends RecommendationSnapshotAggregateArgs>(args: Prisma.Subset<T, RecommendationSnapshotAggregateArgs>): Prisma.PrismaPromise<GetRecommendationSnapshotAggregateType<T>>;
    groupBy<T extends RecommendationSnapshotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RecommendationSnapshotGroupByArgs['orderBy'];
    } : {
        orderBy?: RecommendationSnapshotGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RecommendationSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecommendationSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RecommendationSnapshotFieldRefs;
}
export interface Prisma__RecommendationSnapshotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RecommendationSnapshotFieldRefs {
    readonly userId: Prisma.FieldRef<"RecommendationSnapshot", 'String'>;
    readonly payload: Prisma.FieldRef<"RecommendationSnapshot", 'Json'>;
    readonly generatedAt: Prisma.FieldRef<"RecommendationSnapshot", 'DateTime'>;
}
export type RecommendationSnapshotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    include?: Prisma.RecommendationSnapshotInclude<ExtArgs> | null;
    where: Prisma.RecommendationSnapshotWhereUniqueInput;
};
export type RecommendationSnapshotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    include?: Prisma.RecommendationSnapshotInclude<ExtArgs> | null;
    where: Prisma.RecommendationSnapshotWhereUniqueInput;
};
export type RecommendationSnapshotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    include?: Prisma.RecommendationSnapshotInclude<ExtArgs> | null;
    where?: Prisma.RecommendationSnapshotWhereInput;
    orderBy?: Prisma.RecommendationSnapshotOrderByWithRelationInput | Prisma.RecommendationSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecommendationSnapshotScalarFieldEnum | Prisma.RecommendationSnapshotScalarFieldEnum[];
};
export type RecommendationSnapshotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    include?: Prisma.RecommendationSnapshotInclude<ExtArgs> | null;
    where?: Prisma.RecommendationSnapshotWhereInput;
    orderBy?: Prisma.RecommendationSnapshotOrderByWithRelationInput | Prisma.RecommendationSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecommendationSnapshotScalarFieldEnum | Prisma.RecommendationSnapshotScalarFieldEnum[];
};
export type RecommendationSnapshotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    include?: Prisma.RecommendationSnapshotInclude<ExtArgs> | null;
    where?: Prisma.RecommendationSnapshotWhereInput;
    orderBy?: Prisma.RecommendationSnapshotOrderByWithRelationInput | Prisma.RecommendationSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecommendationSnapshotScalarFieldEnum | Prisma.RecommendationSnapshotScalarFieldEnum[];
};
export type RecommendationSnapshotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    include?: Prisma.RecommendationSnapshotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationSnapshotCreateInput, Prisma.RecommendationSnapshotUncheckedCreateInput>;
};
export type RecommendationSnapshotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RecommendationSnapshotCreateManyInput | Prisma.RecommendationSnapshotCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RecommendationSnapshotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    data: Prisma.RecommendationSnapshotCreateManyInput | Prisma.RecommendationSnapshotCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RecommendationSnapshotIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RecommendationSnapshotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    include?: Prisma.RecommendationSnapshotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationSnapshotUpdateInput, Prisma.RecommendationSnapshotUncheckedUpdateInput>;
    where: Prisma.RecommendationSnapshotWhereUniqueInput;
};
export type RecommendationSnapshotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RecommendationSnapshotUpdateManyMutationInput, Prisma.RecommendationSnapshotUncheckedUpdateManyInput>;
    where?: Prisma.RecommendationSnapshotWhereInput;
    limit?: number;
};
export type RecommendationSnapshotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationSnapshotUpdateManyMutationInput, Prisma.RecommendationSnapshotUncheckedUpdateManyInput>;
    where?: Prisma.RecommendationSnapshotWhereInput;
    limit?: number;
    include?: Prisma.RecommendationSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RecommendationSnapshotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    include?: Prisma.RecommendationSnapshotInclude<ExtArgs> | null;
    where: Prisma.RecommendationSnapshotWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecommendationSnapshotCreateInput, Prisma.RecommendationSnapshotUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RecommendationSnapshotUpdateInput, Prisma.RecommendationSnapshotUncheckedUpdateInput>;
};
export type RecommendationSnapshotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    include?: Prisma.RecommendationSnapshotInclude<ExtArgs> | null;
    where: Prisma.RecommendationSnapshotWhereUniqueInput;
};
export type RecommendationSnapshotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationSnapshotWhereInput;
    limit?: number;
};
export type RecommendationSnapshotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationSnapshotOmit<ExtArgs> | null;
    include?: Prisma.RecommendationSnapshotInclude<ExtArgs> | null;
};
