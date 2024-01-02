"use server";

import { NextResponse } from "next/server";
import { executeQuery } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req){
    try{
        const requestBody = await req.json();
        const session = await getServerSession(options);
        console.log('payUselog',requestBody);

        if (session?.user.site_cd === undefined || session?.user.str_cd === undefined) {
            return NextResponse.json({ error: "매장 코드 및 브랜드 코드를 다시 확인해주에요" }, {status:401});
        }
        //${requestBody.selectDate.st_date} 00:00:00' AND TRAN_DATE <= '${requestBody.selectDate.end_date} 
        const auth_date_st = requestBody.selectDate.st_date.replace(/\-/g, "").substring(2) + '000000';
        const auth_date_end = requestBody.selectDate.end_date.replace(/\-/g, "").substring(2) + '235959';

        const sql = `SELECT * FROM pay_response_result where site_cd='${session?.user.site_cd}' and str_cd='${session?.user.str_cd}' 
                    and (auth_date >= '${auth_date_st}' and auth_date <= ${auth_date_end}) order by pay_res_id desc;`;

        const data = await executeQuery(sql);
        return NextResponse.json({ data: data }, { status: 200 });
    }catch(error){
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" },{ status: 500 });
    }
}