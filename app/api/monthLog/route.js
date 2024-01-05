"use server";

import { NextResponse } from "next/server";
import { executeQuery } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import DateFormat from "@/common/DateFormat";

export async function GET(req){
    try{
        const session = await getServerSession(options);
        const month = DateFormat.substring(0,7);
        if (session?.user.site_cd === undefined || session?.user.str_cd === undefined) {
            return NextResponse.json({ error: "세션의 매장 코드 및 브랜드 코드를 다시 확인해주에요" }, {status:401});
        }

        const sql = `SELECT site_cd,str_cd,"KAKAO" AS type,case when TRAN_RSLT = '1000' then 'sucess' ELSE 'fail' END AS result, COUNT(*) as count
                FROM mts_atalk_msg_log WHERE site_cd= '${session?.user.site_cd}' AND str_cd = '${session?.user.str_cd}' AND (TRAN_DATE >= '${month}-01 00:00:00' AND TRAN_DATE <= '${month}-31 23:59:59') GROUP BY TYPE,result UNION ALL 
                SELECT site_cd,str_cd,"SMS" AS type, case when TRAN_RSLT = '00' then 'sucess' ELSE 'fail' END AS result , COUNT(*) as count
                FROM mts_sms_msg_log WHERE site_cd= '${session?.user.site_cd}' AND str_cd = '${session?.user.str_cd}' AND (TRAN_DATE >= '${month}-01 00:00:00' AND TRAN_DATE <= '${month}-31 23:59:59') GROUP BY TYPE,result UNION ALL 
                SELECT site_cd,str_cd,case when SEND_CHNL_CODE = 'KAKAO' then 'KAKAO' ELSE 'SMS' END AS TYPE,case when TALK_RESULT = 'T-OK' then 'sucess' ELSE MSG_RESULT END AS result , COUNT(*) as count
                FROM tb_agent_message_log WHERE site_cd= '${session?.user.site_cd}' AND str_cd = '${session?.user.str_cd}' AND (REQ_SEND_DATE >= '${month}-01 00:00:00' AND REQ_SEND_DATE <= '${month}-31 23:59:59') GROUP BY TYPE,result`;

        const data = await executeQuery(sql);
        return NextResponse.json({ data: data }, { status: 200 });
    }catch(error){
        console.log(error);
        return NextResponse.json({error:"Internal Server Error"}, {status: 500});
    }

}