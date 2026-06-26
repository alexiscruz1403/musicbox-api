"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\n/// This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.\nmodel test {\n  id         BigInt   @id @default(autoincrement())\n  created_at DateTime @default(now()) @db.Timestamptz(6)\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"test\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"BigInt\"},{\"name\":\"created_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"test.findUnique\",\"test.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"test.findFirst\",\"test.findFirstOrThrow\",\"test.findMany\",\"data\",\"test.createOne\",\"test.createMany\",\"test.createManyAndReturn\",\"test.updateOne\",\"test.updateMany\",\"test.updateManyAndReturn\",\"create\",\"update\",\"test.upsertOne\",\"test.deleteOne\",\"test.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"test.groupBy\",\"test.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"created_at\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "LAsQBRwAACMAMB0AAAQAEB4AACMAMB8EAAAAASBAACUAIQEAAAABACABAAAAAQAgBRwAACMAMB0AAAQAEB4AACMAMB8EACQAISBAACUAIQADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACACHwQAAAABIEAAAAABAQgAAAkAIAIfBAAAAAEgQAAAAAEBCAAACwAwAQgAAAsAMAIfBAArACEgQAAsACECAAAAAQAgCAAADgAgAh8EACsAISBAACwAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBRUAACYAIBYAACcAIBcAACoAIBgAACkAIBkAACgAIAUcAAAaADAdAAAXABAeAAAaADAfBAAbACEgQAAcACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAUcAAAaADAdAAAXABAeAAAaADAfBAAbACEgQAAcACENFQAAHgAgFgAAIQAgFwAAIgAgGAAAIgAgGQAAIgAgIQQAAAABIgQAAAAEIwQAAAAEJAQAAAABJQQAAAABJgQAAAABJwQAAAABKAQAIAAhCxUAAB4AIBgAAB8AIBkAAB8AICFAAAAAASJAAAAABCNAAAAABCRAAAAAASVAAAAAASZAAAAAASdAAAAAAShAAB0AIQsVAAAeACAYAAAfACAZAAAfACAhQAAAAAEiQAAAAAQjQAAAAAQkQAAAAAElQAAAAAEmQAAAAAEnQAAAAAEoQAAdACEIIQIAAAABIgIAAAAEIwIAAAAEJAIAAAABJQIAAAABJgIAAAABJwIAAAABKAIAHgAhCCFAAAAAASJAAAAABCNAAAAABCRAAAAAASVAAAAAASZAAAAAASdAAAAAAShAAB8AIQ0VAAAeACAWAAAhACAXAAAiACAYAAAiACAZAAAiACAhBAAAAAEiBAAAAAQjBAAAAAQkBAAAAAElBAAAAAEmBAAAAAEnBAAAAAEoBAAgACEIIQgAAAABIggAAAAEIwgAAAAEJAgAAAABJQgAAAABJggAAAABJwgAAAABKAgAIQAhCCEEAAAAASIEAAAABCMEAAAABCQEAAAAASUEAAAAASYEAAAAAScEAAAAASgEACIAIQUcAAAjADAdAAAEABAeAAAjADAfBAAkACEgQAAlACEIIQQAAAABIgQAAAAEIwQAAAAEJAQAAAABJQQAAAABJgQAAAABJwQAAAABKAQAIgAhCCFAAAAAASJAAAAABCNAAAAABCRAAAAAASVAAAAAASZAAAAAASdAAAAAAShAAB8AIQAAAAAABSkEAAAAASoEAAAAASsEAAAAASwEAAAAAS0EAAAAAQEpQAAAAAEAAAAABRUABhYABxcACBgACRkACgAAAAAABRUABhYABxcACBgACRkACgECAQIDAQUGAQYHAQcIAQkKAQoMAgsNAwwPAQ0RAg4SBBETARIUARMVAhoYBRsZCw"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map