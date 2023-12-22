import { NextResponse } from "next/server";
import { executeQuery } from "../../lib/db";

export async function GET() {
    const sql = `select * from tb_str_msg_manager limit 1`;
   const [data] = await executeQuery(sql);
//    if (error) {
//      return NextResponse.json({ error });
//    }
   return NextResponse.json({ data: data }, { status: 200 });
}
