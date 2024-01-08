'use client';

import { Accordion, AccordionItem, Button, ButtonGroup } from "@nextui-org/react";
import crypto from "crypto";
import { useState, useEffect } from "react";
import { TbPigMoney } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";

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
//  -------------------------------------------------
  const [usePayWay, setUsePayWay] = useState([
    {name: "신용카드", way:"card", isActive: true},
    {name: "무통장입금", way:"bank", isActive: false}
  ]);
  const [amt, setAmt] = useState({name:"0", amt:0});
  const [payAmts, setPayAmts] = useState([
    {name:"+5천" ,  amt: 5000},
    {name:"+1만" ,  amt: 10000},
    {name:"+5만" ,  amt: 50000}
  ]);
  const [messageType, setMessageType] = useState([
    { name: " SMS ", num: 0, fee: 24 },
    { name: " LMS ", num: 0, fee: 39 },
    { name: " MMS ", num: 0, fee: 115 },
    { name: " 알림톡 텍스트 ", num: 0, fee: 18 },
    { name: " 알림톡 이미지 ", num: 0, fee: 20 },
    { name: " 친구톡 텍스트 ", num: 0, fee: 25 },
    { name: " 친구톡 이미지 ", num: 0, fee: 36 },
  ]);

  // useEffect(()=>{
  //   (async () =>{
  //     const response = await fetch("http://localhost:3000/api/userCheck",{
  //       cache:'no-store',
  //       method:'POST',
  //       body: JSON.stringify(props.params),
  //       headers:{'Content-Type': 'application/json'}
  //     });
  //     const json = await response.json();
  //     if(json?.data != undefined){
  //       console.log(json);
  //       setUser(json?.data);
  //       setLodding(true);
  //     }
  //   })();
  // }, []);
  
  function serverAuth() {
    if (amt.amt) {
      AUTHNICE.requestPay({
        clientId: "S2_af4543a0be4d49a98122e01ec2059a56",
        method: "card",
        orderId: "6f448dbb-a7ec-42e1-a261-947371030ee1",
        amount: amt.amt,
        goodsName: "나이스페이-상품",
        returnUrl: `http://localhost:3000/pay`, //API를 호출할 Endpoint 입력
        fnError: function (result) {
          alert("개발자확인용 : " + result.errorMsg + "");
        },
      });
    } else {
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

  const payWayChange = (chkey, getkey)=> {
    const payArray = [...usePayWay];
    if (!payArray[chkey].isActive) {
      payArray[chkey].isActive = !usePayWay[chkey].isActive;
      payArray[getkey].isActive = !usePayWay[getkey].isActive;
      setUsePayWay(payArray);
    }
  }

  const amtChange = (value)=>{
    if (amt.amt + value <= 50000){ 
      amt.amt += value;
      amt.name = amt.amt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      setAmt({...amt})
    }else{
      toast.error("최대 결제 금액은 50000원 이하입니다.")
    }
  };

  return (
    <><div className="flex flex-col justify-start basis-1/4 mx-2 divide-y mb-4">
      <div className="mb-4">
        {/* <div className="flex justify-between mb-4"> */}
        {/* <span>{user.str_nm ?? ""} 지점</span> */}
        <span className="text-2xl font-sans bolod font-bold">충전</span>
        <span className="text-sm max-[600px]:hidden">
          서비스를 이용하기 위한 금액을 충전할 수 있습니다.
        </span>
        {/* <span>남은 금액 : {user.amount ?? 0}원</span> */}
      </div>
      <div className="flex flex-col pb-8 ">
        <span className="mt-7 mb-4 font-bold">충전수단</span>
        <div
          className="grid grid-cols-2 rounded-md shadow-sm mb-8"
          role="group"
        >
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border border-gray-900 rounded-s-lg ${usePayWay[0].isActive
                ? "bg-gray-900 text-white dark:border-white dark:text-white  "
                : "text-gray-900 "}`}
            onClick={() => payWayChange(0, 1)}
          >
            {usePayWay[0].name}
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-y border-r border-gray-900 rounded-e-lg ${usePayWay[1].isActive
                ? "bg-gray-900 text-white dark:border-white dark:text-white  "
                : "text-gray-900 "}`}
            onClick={() => payWayChange(1, 0)}
          >
            {usePayWay[1].name}
          </button>
        </div>
        <div className="bg-[#f5f5f5] rounded-xl p-5">
          <div className="flex max-[600px]:flex-col">
            <div className="flex">
              <TbPigMoney size={24} className="my-auto" />
              <p className="font-medium pl-4 pr-12 my-auto border-r border-solid border-[#e5e5e5]">
                충전금액
              </p>
            </div>
            <div className="flex">
              <input
                type="text"
                name="price"
                title="충전금액"
                placeholder="충전금액을 선택해 주세요"
                value={`${amt.name}원`}
                readOnly
                className="bg-transparent appearance-none text-xl h-8 font-semibold outline-0 min-[600px]:ml-4 flex-auto" />
              <MdCancel
                size={24}
                className="my-auto cursor-pointer flex-auto"
                onClick={() => setAmt({ name: "0", amt: 0 })} />
            </div>
          </div>
          <div className="grid min-[600px]:grid-cols-5 max-[600px]: grid-cols-3 gap-x-2 gap-y-3 mt-5">
            {payAmts?.map((amt, i) => (
              <button
                key={i}
                className="text-gray-800 text-sm py-2 px-4 border border-gray-400 rounded shadow bg-white"
                onClick={() => amtChange(amt.amt)}
              >
                {amt.name}
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm font-normal leading-8">
          결제가 안되시나요?{" "}
          <a href="#" className="underline text-[#4b70fd]">
            카드사별 결제한도/ 결제방식을 확인해 주세요
          </a>
        </p>
        <p className="text-sm font-normal leading-8 ">
          메시지 타입별 전송가능 건수 :
          {messageType?.map((msg, i) => (
            <span key={i}>
              {msg.name}
              <span className="text-[#ff4242]">
                {Math.floor(amt.amt / msg.fee)}
              </span>
              건{messageType.length - 1 != i ? "/" : ""}
            </span>
          ))}
        </p>
      </div>
      <div className="py-8">
        <div className="float-left leading-6">
          <p className="font-medium text-xl">결제금액</p>
        </div>
        <div className="float-right leading-6">
          <p className="font-normal text-sm h-6">
            <b className="font-medium text-xl">
              <span className="mr-1 text-[#ff4242]">{amt.name}</span>원
            </b>
            {"(부가세 포함)"}
          </p>
        </div>
      </div>

      <div className="flex pt-10">
        <div className="flex-1"></div>
        <div className="shrink-0">
          <button
            onClick={serverAuth}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-14 rounded-xl w-52"
          >
            충전하기
          </button>
        </div>
        <div className="flex-1"></div>
      </div>
    </div><Footer /></>
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
