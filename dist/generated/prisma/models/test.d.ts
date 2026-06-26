import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type testModel = runtime.Types.Result.DefaultSelection<Prisma.$testPayload>;
export type AggregateTest = {
    _count: TestCountAggregateOutputType | null;
    _avg: TestAvgAggregateOutputType | null;
    _sum: TestSumAggregateOutputType | null;
    _min: TestMinAggregateOutputType | null;
    _max: TestMaxAggregateOutputType | null;
};
export type TestAvgAggregateOutputType = {
    id: number | null;
};
export type TestSumAggregateOutputType = {
    id: bigint | null;
};
export type TestMinAggregateOutputType = {
    id: bigint | null;
    created_at: Date | null;
};
export type TestMaxAggregateOutputType = {
    id: bigint | null;
    created_at: Date | null;
};
export type TestCountAggregateOutputType = {
    id: number;
    created_at: number;
    _all: number;
};
export type TestAvgAggregateInputType = {
    id?: true;
};
export type TestSumAggregateInputType = {
    id?: true;
};
export type TestMinAggregateInputType = {
    id?: true;
    created_at?: true;
};
export type TestMaxAggregateInputType = {
    id?: true;
    created_at?: true;
};
export type TestCountAggregateInputType = {
    id?: true;
    created_at?: true;
    _all?: true;
};
export type TestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.testWhereInput;
    orderBy?: Prisma.testOrderByWithRelationInput | Prisma.testOrderByWithRelationInput[];
    cursor?: Prisma.testWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TestCountAggregateInputType;
    _avg?: TestAvgAggregateInputType;
    _sum?: TestSumAggregateInputType;
    _min?: TestMinAggregateInputType;
    _max?: TestMaxAggregateInputType;
};
export type GetTestAggregateType<T extends TestAggregateArgs> = {
    [P in keyof T & keyof AggregateTest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTest[P]> : Prisma.GetScalarType<T[P], AggregateTest[P]>;
};
export type testGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.testWhereInput;
    orderBy?: Prisma.testOrderByWithAggregationInput | Prisma.testOrderByWithAggregationInput[];
    by: Prisma.TestScalarFieldEnum[] | Prisma.TestScalarFieldEnum;
    having?: Prisma.testScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TestCountAggregateInputType | true;
    _avg?: TestAvgAggregateInputType;
    _sum?: TestSumAggregateInputType;
    _min?: TestMinAggregateInputType;
    _max?: TestMaxAggregateInputType;
};
export type TestGroupByOutputType = {
    id: bigint;
    created_at: Date;
    _count: TestCountAggregateOutputType | null;
    _avg: TestAvgAggregateOutputType | null;
    _sum: TestSumAggregateOutputType | null;
    _min: TestMinAggregateOutputType | null;
    _max: TestMaxAggregateOutputType | null;
};
export type GetTestGroupByPayload<T extends testGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TestGroupByOutputType[P]>;
}>>;
export type testWhereInput = {
    AND?: Prisma.testWhereInput | Prisma.testWhereInput[];
    OR?: Prisma.testWhereInput[];
    NOT?: Prisma.testWhereInput | Prisma.testWhereInput[];
    id?: Prisma.BigIntFilter<"test"> | bigint | number;
    created_at?: Prisma.DateTimeFilter<"test"> | Date | string;
};
export type testOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type testWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.testWhereInput | Prisma.testWhereInput[];
    OR?: Prisma.testWhereInput[];
    NOT?: Prisma.testWhereInput | Prisma.testWhereInput[];
    created_at?: Prisma.DateTimeFilter<"test"> | Date | string;
}, "id">;
export type testOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.testCountOrderByAggregateInput;
    _avg?: Prisma.testAvgOrderByAggregateInput;
    _max?: Prisma.testMaxOrderByAggregateInput;
    _min?: Prisma.testMinOrderByAggregateInput;
    _sum?: Prisma.testSumOrderByAggregateInput;
};
export type testScalarWhereWithAggregatesInput = {
    AND?: Prisma.testScalarWhereWithAggregatesInput | Prisma.testScalarWhereWithAggregatesInput[];
    OR?: Prisma.testScalarWhereWithAggregatesInput[];
    NOT?: Prisma.testScalarWhereWithAggregatesInput | Prisma.testScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"test"> | bigint | number;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"test"> | Date | string;
};
export type testCreateInput = {
    id?: bigint | number;
    created_at?: Date | string;
};
export type testUncheckedCreateInput = {
    id?: bigint | number;
    created_at?: Date | string;
};
export type testUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type testUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type testCreateManyInput = {
    id?: bigint | number;
    created_at?: Date | string;
};
export type testUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type testUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type testCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type testAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type testMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type testMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type testSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type testSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["test"]>;
export type testSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["test"]>;
export type testSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["test"]>;
export type testSelectScalar = {
    id?: boolean;
    created_at?: boolean;
};
export type testOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "created_at", ExtArgs["result"]["test"]>;
export type $testPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "test";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        created_at: Date;
    }, ExtArgs["result"]["test"]>;
    composites: {};
};
export type testGetPayload<S extends boolean | null | undefined | testDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$testPayload, S>;
export type testCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<testFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TestCountAggregateInputType | true;
};
export interface testDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['test'];
        meta: {
            name: 'test';
        };
    };
    findUnique<T extends testFindUniqueArgs>(args: Prisma.SelectSubset<T, testFindUniqueArgs<ExtArgs>>): Prisma.Prisma__testClient<runtime.Types.Result.GetResult<Prisma.$testPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends testFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, testFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__testClient<runtime.Types.Result.GetResult<Prisma.$testPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends testFindFirstArgs>(args?: Prisma.SelectSubset<T, testFindFirstArgs<ExtArgs>>): Prisma.Prisma__testClient<runtime.Types.Result.GetResult<Prisma.$testPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends testFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, testFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__testClient<runtime.Types.Result.GetResult<Prisma.$testPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends testFindManyArgs>(args?: Prisma.SelectSubset<T, testFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$testPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends testCreateArgs>(args: Prisma.SelectSubset<T, testCreateArgs<ExtArgs>>): Prisma.Prisma__testClient<runtime.Types.Result.GetResult<Prisma.$testPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends testCreateManyArgs>(args?: Prisma.SelectSubset<T, testCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends testCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, testCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$testPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends testDeleteArgs>(args: Prisma.SelectSubset<T, testDeleteArgs<ExtArgs>>): Prisma.Prisma__testClient<runtime.Types.Result.GetResult<Prisma.$testPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends testUpdateArgs>(args: Prisma.SelectSubset<T, testUpdateArgs<ExtArgs>>): Prisma.Prisma__testClient<runtime.Types.Result.GetResult<Prisma.$testPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends testDeleteManyArgs>(args?: Prisma.SelectSubset<T, testDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends testUpdateManyArgs>(args: Prisma.SelectSubset<T, testUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends testUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, testUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$testPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends testUpsertArgs>(args: Prisma.SelectSubset<T, testUpsertArgs<ExtArgs>>): Prisma.Prisma__testClient<runtime.Types.Result.GetResult<Prisma.$testPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends testCountArgs>(args?: Prisma.Subset<T, testCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TestCountAggregateOutputType> : number>;
    aggregate<T extends TestAggregateArgs>(args: Prisma.Subset<T, TestAggregateArgs>): Prisma.PrismaPromise<GetTestAggregateType<T>>;
    groupBy<T extends testGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: testGroupByArgs['orderBy'];
    } : {
        orderBy?: testGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, testGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: testFieldRefs;
}
export interface Prisma__testClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface testFieldRefs {
    readonly id: Prisma.FieldRef<"test", 'BigInt'>;
    readonly created_at: Prisma.FieldRef<"test", 'DateTime'>;
}
export type testFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelect<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
    where: Prisma.testWhereUniqueInput;
};
export type testFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelect<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
    where: Prisma.testWhereUniqueInput;
};
export type testFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelect<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
    where?: Prisma.testWhereInput;
    orderBy?: Prisma.testOrderByWithRelationInput | Prisma.testOrderByWithRelationInput[];
    cursor?: Prisma.testWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestScalarFieldEnum | Prisma.TestScalarFieldEnum[];
};
export type testFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelect<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
    where?: Prisma.testWhereInput;
    orderBy?: Prisma.testOrderByWithRelationInput | Prisma.testOrderByWithRelationInput[];
    cursor?: Prisma.testWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestScalarFieldEnum | Prisma.TestScalarFieldEnum[];
};
export type testFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelect<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
    where?: Prisma.testWhereInput;
    orderBy?: Prisma.testOrderByWithRelationInput | Prisma.testOrderByWithRelationInput[];
    cursor?: Prisma.testWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestScalarFieldEnum | Prisma.TestScalarFieldEnum[];
};
export type testCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelect<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.testCreateInput, Prisma.testUncheckedCreateInput>;
};
export type testCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.testCreateManyInput | Prisma.testCreateManyInput[];
    skipDuplicates?: boolean;
};
export type testCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
    data: Prisma.testCreateManyInput | Prisma.testCreateManyInput[];
    skipDuplicates?: boolean;
};
export type testUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelect<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.testUpdateInput, Prisma.testUncheckedUpdateInput>;
    where: Prisma.testWhereUniqueInput;
};
export type testUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.testUpdateManyMutationInput, Prisma.testUncheckedUpdateManyInput>;
    where?: Prisma.testWhereInput;
    limit?: number;
};
export type testUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.testUpdateManyMutationInput, Prisma.testUncheckedUpdateManyInput>;
    where?: Prisma.testWhereInput;
    limit?: number;
};
export type testUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelect<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
    where: Prisma.testWhereUniqueInput;
    create: Prisma.XOR<Prisma.testCreateInput, Prisma.testUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.testUpdateInput, Prisma.testUncheckedUpdateInput>;
};
export type testDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelect<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
    where: Prisma.testWhereUniqueInput;
};
export type testDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.testWhereInput;
    limit?: number;
};
export type testDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.testSelect<ExtArgs> | null;
    omit?: Prisma.testOmit<ExtArgs> | null;
};
