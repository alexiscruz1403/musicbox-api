import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TrendingSnapshotModel = runtime.Types.Result.DefaultSelection<Prisma.$TrendingSnapshotPayload>;
export type AggregateTrendingSnapshot = {
    _count: TrendingSnapshotCountAggregateOutputType | null;
    _min: TrendingSnapshotMinAggregateOutputType | null;
    _max: TrendingSnapshotMaxAggregateOutputType | null;
};
export type TrendingSnapshotMinAggregateOutputType = {
    id: string | null;
    snapshotAt: Date | null;
};
export type TrendingSnapshotMaxAggregateOutputType = {
    id: string | null;
    snapshotAt: Date | null;
};
export type TrendingSnapshotCountAggregateOutputType = {
    id: number;
    payload: number;
    snapshotAt: number;
    _all: number;
};
export type TrendingSnapshotMinAggregateInputType = {
    id?: true;
    snapshotAt?: true;
};
export type TrendingSnapshotMaxAggregateInputType = {
    id?: true;
    snapshotAt?: true;
};
export type TrendingSnapshotCountAggregateInputType = {
    id?: true;
    payload?: true;
    snapshotAt?: true;
    _all?: true;
};
export type TrendingSnapshotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrendingSnapshotWhereInput;
    orderBy?: Prisma.TrendingSnapshotOrderByWithRelationInput | Prisma.TrendingSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.TrendingSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TrendingSnapshotCountAggregateInputType;
    _min?: TrendingSnapshotMinAggregateInputType;
    _max?: TrendingSnapshotMaxAggregateInputType;
};
export type GetTrendingSnapshotAggregateType<T extends TrendingSnapshotAggregateArgs> = {
    [P in keyof T & keyof AggregateTrendingSnapshot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTrendingSnapshot[P]> : Prisma.GetScalarType<T[P], AggregateTrendingSnapshot[P]>;
};
export type TrendingSnapshotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrendingSnapshotWhereInput;
    orderBy?: Prisma.TrendingSnapshotOrderByWithAggregationInput | Prisma.TrendingSnapshotOrderByWithAggregationInput[];
    by: Prisma.TrendingSnapshotScalarFieldEnum[] | Prisma.TrendingSnapshotScalarFieldEnum;
    having?: Prisma.TrendingSnapshotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TrendingSnapshotCountAggregateInputType | true;
    _min?: TrendingSnapshotMinAggregateInputType;
    _max?: TrendingSnapshotMaxAggregateInputType;
};
export type TrendingSnapshotGroupByOutputType = {
    id: string;
    payload: runtime.JsonValue;
    snapshotAt: Date;
    _count: TrendingSnapshotCountAggregateOutputType | null;
    _min: TrendingSnapshotMinAggregateOutputType | null;
    _max: TrendingSnapshotMaxAggregateOutputType | null;
};
export type GetTrendingSnapshotGroupByPayload<T extends TrendingSnapshotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TrendingSnapshotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TrendingSnapshotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TrendingSnapshotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TrendingSnapshotGroupByOutputType[P]>;
}>>;
export type TrendingSnapshotWhereInput = {
    AND?: Prisma.TrendingSnapshotWhereInput | Prisma.TrendingSnapshotWhereInput[];
    OR?: Prisma.TrendingSnapshotWhereInput[];
    NOT?: Prisma.TrendingSnapshotWhereInput | Prisma.TrendingSnapshotWhereInput[];
    id?: Prisma.StringFilter<"TrendingSnapshot"> | string;
    payload?: Prisma.JsonFilter<"TrendingSnapshot">;
    snapshotAt?: Prisma.DateTimeFilter<"TrendingSnapshot"> | Date | string;
};
export type TrendingSnapshotOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    snapshotAt?: Prisma.SortOrder;
};
export type TrendingSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TrendingSnapshotWhereInput | Prisma.TrendingSnapshotWhereInput[];
    OR?: Prisma.TrendingSnapshotWhereInput[];
    NOT?: Prisma.TrendingSnapshotWhereInput | Prisma.TrendingSnapshotWhereInput[];
    payload?: Prisma.JsonFilter<"TrendingSnapshot">;
    snapshotAt?: Prisma.DateTimeFilter<"TrendingSnapshot"> | Date | string;
}, "id">;
export type TrendingSnapshotOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    snapshotAt?: Prisma.SortOrder;
    _count?: Prisma.TrendingSnapshotCountOrderByAggregateInput;
    _max?: Prisma.TrendingSnapshotMaxOrderByAggregateInput;
    _min?: Prisma.TrendingSnapshotMinOrderByAggregateInput;
};
export type TrendingSnapshotScalarWhereWithAggregatesInput = {
    AND?: Prisma.TrendingSnapshotScalarWhereWithAggregatesInput | Prisma.TrendingSnapshotScalarWhereWithAggregatesInput[];
    OR?: Prisma.TrendingSnapshotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TrendingSnapshotScalarWhereWithAggregatesInput | Prisma.TrendingSnapshotScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TrendingSnapshot"> | string;
    payload?: Prisma.JsonWithAggregatesFilter<"TrendingSnapshot">;
    snapshotAt?: Prisma.DateTimeWithAggregatesFilter<"TrendingSnapshot"> | Date | string;
};
export type TrendingSnapshotCreateInput = {
    id?: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    snapshotAt?: Date | string;
};
export type TrendingSnapshotUncheckedCreateInput = {
    id?: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    snapshotAt?: Date | string;
};
export type TrendingSnapshotUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    snapshotAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrendingSnapshotUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    snapshotAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrendingSnapshotCreateManyInput = {
    id?: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    snapshotAt?: Date | string;
};
export type TrendingSnapshotUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    snapshotAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrendingSnapshotUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    snapshotAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrendingSnapshotCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    snapshotAt?: Prisma.SortOrder;
};
export type TrendingSnapshotMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    snapshotAt?: Prisma.SortOrder;
};
export type TrendingSnapshotMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    snapshotAt?: Prisma.SortOrder;
};
export type TrendingSnapshotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    payload?: boolean;
    snapshotAt?: boolean;
}, ExtArgs["result"]["trendingSnapshot"]>;
export type TrendingSnapshotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    payload?: boolean;
    snapshotAt?: boolean;
}, ExtArgs["result"]["trendingSnapshot"]>;
export type TrendingSnapshotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    payload?: boolean;
    snapshotAt?: boolean;
}, ExtArgs["result"]["trendingSnapshot"]>;
export type TrendingSnapshotSelectScalar = {
    id?: boolean;
    payload?: boolean;
    snapshotAt?: boolean;
};
export type TrendingSnapshotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "payload" | "snapshotAt", ExtArgs["result"]["trendingSnapshot"]>;
export type $TrendingSnapshotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TrendingSnapshot";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        payload: runtime.JsonValue;
        snapshotAt: Date;
    }, ExtArgs["result"]["trendingSnapshot"]>;
    composites: {};
};
export type TrendingSnapshotGetPayload<S extends boolean | null | undefined | TrendingSnapshotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload, S>;
export type TrendingSnapshotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TrendingSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TrendingSnapshotCountAggregateInputType | true;
};
export interface TrendingSnapshotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TrendingSnapshot'];
        meta: {
            name: 'TrendingSnapshot';
        };
    };
    findUnique<T extends TrendingSnapshotFindUniqueArgs>(args: Prisma.SelectSubset<T, TrendingSnapshotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TrendingSnapshotClient<runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TrendingSnapshotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TrendingSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrendingSnapshotClient<runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TrendingSnapshotFindFirstArgs>(args?: Prisma.SelectSubset<T, TrendingSnapshotFindFirstArgs<ExtArgs>>): Prisma.Prisma__TrendingSnapshotClient<runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TrendingSnapshotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TrendingSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrendingSnapshotClient<runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TrendingSnapshotFindManyArgs>(args?: Prisma.SelectSubset<T, TrendingSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TrendingSnapshotCreateArgs>(args: Prisma.SelectSubset<T, TrendingSnapshotCreateArgs<ExtArgs>>): Prisma.Prisma__TrendingSnapshotClient<runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TrendingSnapshotCreateManyArgs>(args?: Prisma.SelectSubset<T, TrendingSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TrendingSnapshotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TrendingSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TrendingSnapshotDeleteArgs>(args: Prisma.SelectSubset<T, TrendingSnapshotDeleteArgs<ExtArgs>>): Prisma.Prisma__TrendingSnapshotClient<runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TrendingSnapshotUpdateArgs>(args: Prisma.SelectSubset<T, TrendingSnapshotUpdateArgs<ExtArgs>>): Prisma.Prisma__TrendingSnapshotClient<runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TrendingSnapshotDeleteManyArgs>(args?: Prisma.SelectSubset<T, TrendingSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TrendingSnapshotUpdateManyArgs>(args: Prisma.SelectSubset<T, TrendingSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TrendingSnapshotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TrendingSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TrendingSnapshotUpsertArgs>(args: Prisma.SelectSubset<T, TrendingSnapshotUpsertArgs<ExtArgs>>): Prisma.Prisma__TrendingSnapshotClient<runtime.Types.Result.GetResult<Prisma.$TrendingSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TrendingSnapshotCountArgs>(args?: Prisma.Subset<T, TrendingSnapshotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TrendingSnapshotCountAggregateOutputType> : number>;
    aggregate<T extends TrendingSnapshotAggregateArgs>(args: Prisma.Subset<T, TrendingSnapshotAggregateArgs>): Prisma.PrismaPromise<GetTrendingSnapshotAggregateType<T>>;
    groupBy<T extends TrendingSnapshotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TrendingSnapshotGroupByArgs['orderBy'];
    } : {
        orderBy?: TrendingSnapshotGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TrendingSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrendingSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TrendingSnapshotFieldRefs;
}
export interface Prisma__TrendingSnapshotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TrendingSnapshotFieldRefs {
    readonly id: Prisma.FieldRef<"TrendingSnapshot", 'String'>;
    readonly payload: Prisma.FieldRef<"TrendingSnapshot", 'Json'>;
    readonly snapshotAt: Prisma.FieldRef<"TrendingSnapshot", 'DateTime'>;
}
export type TrendingSnapshotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
    where: Prisma.TrendingSnapshotWhereUniqueInput;
};
export type TrendingSnapshotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
    where: Prisma.TrendingSnapshotWhereUniqueInput;
};
export type TrendingSnapshotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
    where?: Prisma.TrendingSnapshotWhereInput;
    orderBy?: Prisma.TrendingSnapshotOrderByWithRelationInput | Prisma.TrendingSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.TrendingSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TrendingSnapshotScalarFieldEnum | Prisma.TrendingSnapshotScalarFieldEnum[];
};
export type TrendingSnapshotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
    where?: Prisma.TrendingSnapshotWhereInput;
    orderBy?: Prisma.TrendingSnapshotOrderByWithRelationInput | Prisma.TrendingSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.TrendingSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TrendingSnapshotScalarFieldEnum | Prisma.TrendingSnapshotScalarFieldEnum[];
};
export type TrendingSnapshotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
    where?: Prisma.TrendingSnapshotWhereInput;
    orderBy?: Prisma.TrendingSnapshotOrderByWithRelationInput | Prisma.TrendingSnapshotOrderByWithRelationInput[];
    cursor?: Prisma.TrendingSnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TrendingSnapshotScalarFieldEnum | Prisma.TrendingSnapshotScalarFieldEnum[];
};
export type TrendingSnapshotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrendingSnapshotCreateInput, Prisma.TrendingSnapshotUncheckedCreateInput>;
};
export type TrendingSnapshotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TrendingSnapshotCreateManyInput | Prisma.TrendingSnapshotCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TrendingSnapshotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
    data: Prisma.TrendingSnapshotCreateManyInput | Prisma.TrendingSnapshotCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TrendingSnapshotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrendingSnapshotUpdateInput, Prisma.TrendingSnapshotUncheckedUpdateInput>;
    where: Prisma.TrendingSnapshotWhereUniqueInput;
};
export type TrendingSnapshotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TrendingSnapshotUpdateManyMutationInput, Prisma.TrendingSnapshotUncheckedUpdateManyInput>;
    where?: Prisma.TrendingSnapshotWhereInput;
    limit?: number;
};
export type TrendingSnapshotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrendingSnapshotUpdateManyMutationInput, Prisma.TrendingSnapshotUncheckedUpdateManyInput>;
    where?: Prisma.TrendingSnapshotWhereInput;
    limit?: number;
};
export type TrendingSnapshotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
    where: Prisma.TrendingSnapshotWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrendingSnapshotCreateInput, Prisma.TrendingSnapshotUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TrendingSnapshotUpdateInput, Prisma.TrendingSnapshotUncheckedUpdateInput>;
};
export type TrendingSnapshotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
    where: Prisma.TrendingSnapshotWhereUniqueInput;
};
export type TrendingSnapshotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrendingSnapshotWhereInput;
    limit?: number;
};
export type TrendingSnapshotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrendingSnapshotSelect<ExtArgs> | null;
    omit?: Prisma.TrendingSnapshotOmit<ExtArgs> | null;
};
