export default function CompanyFooter() {
    const styles = {
      footer: {
        "z-index": 1,
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "150px",
        "font-size": "0.8em",
      },
    };
  return (
    <footer className="sm:pl-64" style={styles.footer}>
      <header className="text-lg">스마트 캐스트</header>
      <main className="flex-col">
        <div className="mt-4 text-base">
          대표이사 : 최선욱, 황상현 | 주소: 서울특별시 영등포구 당산로 41길
          11,W동 1106호{"(당산동4가, 당산SKV1센터)"}
        </div>
        <div className="text-base">
          사업자 등록번호 : 402-86-09481 | 메일 : qna@smartcast.co.kr
        </div>
        <div className="text-base">
          대표번호 : 1877-1286 | 고객센터 : 1522-0201 | FAX : 031-909-5523
        </div>
      </main>
    </footer>
  );
}
