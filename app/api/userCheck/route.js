import { NextResponse } from "next/server";
import { executeQuery } from "@/app/lib/db";

export async function POST(req) {
    try {
        const requestBody = await req.json();
        // console.log(requestBody);
        if (requestBody?.site_cd === undefined || requestBody?.str_cd === undefined) {
            return NextResponse.json({ error: "매장 코드 및 브랜드 코드를 다시 확인해주에요" }, {status:401});
        }
        const sql = `select str_nm,amount from store_atalk_pay where site_cd = '${requestBody.site_cd}' and str_cd = '${requestBody.str_cd}'`;
        const [data]= await executeQuery(sql);

        console.log(data);
        return NextResponse.json({data: data},{status:200});
    }catch(error){
        return NextResponse.json({ error: "Internal Server Error", msg:error, status:500 });
    }
}
