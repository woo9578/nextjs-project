'use client';

import crypto from "crypto";
import { useState, useEffect } from "react";

export default function About(props) {
  const [user, setUser] = useState({});
  const [lodding , setLodding] = useState(false);
  const [payAmt, setPayAmt] = useState([
     { amt: 10000, click: false },
     { amt: 50000, click: false },
     { amt: 100000, click: false },
     { amt: 150000, click: false },
     { amt: 200000, click: false },
     { amt: 300000, click: false },
  ]);
  const [pay, setPay] = useState({ amt: 0, key :null});
  useEffect(()=>{
    (async () =>{
      const response = await fetch("http://localhost:3000/api/userCheck",{
        cache:'no-store',
        method:'POST',
        body: JSON.stringify(props.params),
        headers:{'Content-Type': 'application/json'}
      });
      const json = await response.json();
      if(json?.data != undefined){
        console.log(json);
        setUser(json?.data);
        setLodding(true);
      }
    })();
  }, []);
  
  function serverAuth() {
    if (pay.amt){
      AUTHNICE.requestPay({
        clientId: "S2_af4543a0be4d49a98122e01ec2059a56",
        method: "card",
        orderId: "6f448dbb-a7ec-42e1-a261-947371030ee1",
        amount: 1004,
        goodsName: "나이스페이-상품",
        returnUrl: `http://localhost:3000/pay/${props.params.site_cd}/${props.params.str_cd}`, //API를 호출할 Endpoint 입력
        fnError: function (result) {
          alert("개발자확인용 : " + result.errorMsg + "");
        },
      });
    }else{
      alert("금액을 선택해주세요");
    }
  }

  const onclick = (key) =>{
    const payArray = payAmt;
    pay.key != null ? payArray[pay.key].click = !payAmt[pay.key].click : ''; 
    payArray[key].click = !payAmt[key].click; 
    
    setPay({ ...pay, ["amt"]: payAmt[key].amt, ["key"]: key });
    setPayAmt((prev) => [...payArray]);
  }

    // console.log(props.params);
  // return(
  //   <>
  //   { 
  //     lodding ?(
  //       // <><button onClick={serverAuth}>serverAuth 결제하기</button><div>{user.str_nm}</div></>
  //       <>
          
  //       </>
  //       ):(
  //       <>Logging....</>
  //     )
  //   }
  //   </>
  // );
  return (
    <div className="flex flex-col justify-start h-screen basis-1/4 mx-4 divide-y">
      <div className="flex justify-between mb-4">
        <span>{user.str_nm ?? ""} 지점</span>
        <span>남은 금액 : {user.amount ?? 0}원</span>
      </div>
      <div className=" pt-4 grid grid-cols-3 gap-x-4 gap-y-4 mb-4">
        {payAmt?.map((value, i) => (
          <button
            key={value.amt}
            className={`${value.click ? "bg-blue-500" : "bg-white"} text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow `}
            onClick={() => onclick(i)}
          >
            {value.amt}
          </button>
        ))}
      </div>

      <button
        onClick={serverAuth}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        충전하기
      </button>
    </div>
  );
//     const merchantKey =
//       "EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==";

//   function nicepayStart() {
//     goPay(document.payForm);
//   }

//   //[PC 결제창 전용]결제 최종 요청시 실행됩니다. <<'nicepaySubmit()' 이름 수정 불가능>>
//   function nicepaySubmit() {
//     document.payForm.submit();
//   }

//   //[PC 결제창 전용]결제창 종료 함수 <<'nicepayClose()' 이름 수정 불가능>>
//   function nicepayClose() {
//     alert("결제가 취소 되었습니다");
//   }

//   const [mid, setmid] = useState(
//     crypto
//       .createHash("sha256")
//       .update("20231212161133nicepay00m1004" + merchantKey)
//       .digest("hex")
//   );

//   return (
//     <>
//       <>pay me</>
//       <form
//         name="payForm"
//         method="post"
//         action="/authReq"
//         accept-charset="euc-kr"
//       >
//         <table>
//           <tbody>
//             <tr>
//               <th>PayMethod</th>
//               <td>
//                 <input type="text" name="PayMethod" value="" />
//               </td>
//             </tr>
//             <tr>
//               <th>GoodsName</th>
//               <td>
//                 <input type="text" name="GoodsName" value="알림톡 충전" />
//               </td>
//             </tr>
//             <tr>
//               <th>Amt</th>
//               <td>
//                 <input type="text" name="Amt" value="1004" />
//               </td>
//             </tr>
//             <tr>
//               <th>MID</th>
//               <td>
//                 <input type="text" name="MID" value="nicepay00m" />
//               </td>
//             </tr>
//             <tr>
//               <th>Moid</th>
//               <td>
//                 <input type="text" name="Moid" value="1568756486" />
//               </td>
//             </tr>
//             <tr>
//               <th>BuyerName</th>
//               <td>
//                 <input type="text" name="BuyerName" value="<%=buyerName%>" />
//               </td>
//             </tr>
//             <tr>
//               <th>BuyerEmail</th>
//               <td>
//                 <input type="text" name="BuyerEmail" value="<%=buyerEmail%>" />
//               </td>
//             </tr>
//             <tr>
//               <th>BuyerTel</th>
//               <td>
//                 <input type="text" name="BuyerTel" value="<%=buyerTel%>" />
//               </td>
//             </tr>
//             <tr>
//               <th>ReturnURL [Mobile only]</th>
//               <td>
//                 <input type="text" name="ReturnURL" value="/pay" />
//               </td>
//             </tr>
//             <tr>
//               <th>Virtual Account Expiration Date(YYYYMMDD)</th>
//               <td>
//                 <input type="text" name="VbankExpDate" value="" />
//               </td>
//             </tr>

//             <input type="hidden" name="NpLang" defaultValue="KO" />
//             <input type="hidden" name="GoodsCl" defaultValue="1" />
//             <input type="hidden" name="TransType" defaultValue="0" />
//             <input type="hidden" name="CharSet" defaultValue="utf-8" />
//             <input type="hidden" name="ReqReserved" defaultValue="" />

//             <input type="hidden" name="EdiDate" defaultValue="20231212161133" />
//             <input type="hidden" name="SignData" defaultValue="<%=signData%>" />
//           </tbody>
//         </table>
//         <a href="#" className="btn_blue" onClick={nicepayStart}>
//           REQUEST
//         </a>
//       </form>
//     </>
//   );
}
