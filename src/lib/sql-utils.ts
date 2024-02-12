import { SqliteBool } from "@/database/types"

export function toSqliteBool(val: boolean): SqliteBool {
    return val ? "1" : "0"
}

export function fromSqliteBool(val: SqliteBool): boolean {
    return val === "1"
}
