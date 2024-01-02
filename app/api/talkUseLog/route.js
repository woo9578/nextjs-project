"use server";

import { NextResponse } from "next/server";
import { executeQuery } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req) {
  try {
    // Access the request body
    const requestBody = await req.json();
    const session = await getServerSession(options);
    console.log(session, requestBody);
    // Your logic here, for example, executing a SQL query
    if (session?.user.site_cd === undefined || session?.user.str_cd === undefined) {
        return NextResponse.json({ error: "매장 코드 및 브랜드 코드를 다시 확인해주에요" }, {status:401});
    }
    // const sql = `select * from talk_msg_log where site_cd ='${requestBody.site_cd}' and str_cd = '${requestBody.str_cd}' order by use_seq desc`;
    // const sql = `select * from talk_msg_log where (send_time >= '${requestBody.selectDate.st_date} 00:00:00' AND send_time <= '${requestBody.selectDate.end_date} 23:59:59') and  
    //             site_cd ='${requestBody.site_cd}' and str_cd = '${requestBody.str_cd}'`;
    const sql = `SELECT site_cd,str_cd,"KAKAO" AS type,DATE_FORMAT(TRAN_DATE,'%Y-%m-%d %T') AS send_time,concat(substring(tran_phone,1,3) , '****', substring(tran_phone,-4)) AS phone,TRAN_MSG AS talk_msg, case when TRAN_RSLT = '1000' then 'sucess' ELSE 'fail' END AS result 
                FROM mts_atalk_msg_log WHERE site_cd= '${session?.user.site_cd}' AND str_cd = '${session?.user.str_cd}' AND (TRAN_DATE >= '${requestBody.selectDate.st_date} 00:00:00' AND TRAN_DATE <= '${requestBody.selectDate.end_date} 23:59:59') UNION ALL 
                SELECT site_cd,str_cd,"SMS" AS type, DATE_FORMAT(TRAN_DATE,'%Y-%m-%d %T') AS send_time,concat(substring(tran_phone,1,3) , '****', substring(tran_phone,-4)) AS phone,TRAN_MSG AS talk_msg, case when TRAN_RSLT = '00' then 'sucess' ELSE 'fail' END AS result 
                FROM mts_sms_msg_log WHERE site_cd= '${session?.user.site_cd}' AND str_cd = '${session?.user.str_cd}' AND (TRAN_DATE >= '${requestBody.selectDate.st_date} 00:00:00' AND TRAN_DATE <= '${requestBody.selectDate.end_date} 23:59:59') UNION ALL 
                SELECT site_cd,str_cd,case when SEND_CHNL_CODE = 'KAKAO' then 'KAKAO' ELSE 'SMS' END AS TYPE,DATE_FORMAT(REQ_SEND_DATE,'%Y-%m-%d %T') AS send_time, concat(substring(RECV_NO,1,3) , '****', substring(RECV_NO,-4)) AS phone, TALK_MSG, case when TALK_RESULT = 'T-OK' then 'sucess' ELSE MSG_RESULT END AS result 
                FROM tb_agent_message_log WHERE site_cd= '${session?.user.site_cd}' AND str_cd = '${session?.user.str_cd}' AND (REQ_SEND_DATE >= '${requestBody.selectDate.st_date} 00:00:00' AND REQ_SEND_DATE <= '${requestBody.selectDate.end_date} 23:59:59');`;
    
    const data = await executeQuery(sql);

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
