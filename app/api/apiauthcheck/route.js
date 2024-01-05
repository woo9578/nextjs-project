"use server"

import { NextResponse } from "next/server";
import { executeQuery } from "../../lib/db";
import bcrypt from "bcrypt"

export async function POST(req) {
  try {
    // Access the request body
    const requestBody = await req.json();
    // Your logic here, for example, executing a SQL query
    const sql = `select u.*, s.amount from user_m as u LEFT JOIN store_atalk_pay AS s ON u.site_cd = s.site_cd AND u.str_cd = s.str_cd where USER_CD = 'smartcast' limit 1`;
    const [data] = await executeQuery(sql);

    // Respond with the data
    // return null
    if (await bcrypt.compare(requestBody.password, data.USER_PS)){
      delete data?.USER_PS;
      return NextResponse.json({ data: data }, { status: 200 });
    }else{
      return NextResponse.json({ error: "아이디 혹은 패스워드가 틀렸습니다." },{ status: 500 });  
    }


  } catch (error) {
    console.error(error);

    // If there's an error, respond with an error status and message
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
