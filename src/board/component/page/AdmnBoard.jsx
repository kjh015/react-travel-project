import AdmnMenu from "./AdmnMenu";

const AdmnBoard = () => {
    return (
        <div className="container">
            <div className="row">
                {/* 왼쪽: 관리자 메뉴 */}
                <div className="col-md-3 col-lg-2 p-0 border-end">
                    <AdmnMenu />
                </div>
                {/* 오른쪽: 본문 영역 */}
                <div className="col-md-9 col-lg-10">
                    <h4 style={{ marginTop: '80px' }}>게시판 관리 페이지</h4>
                    {/* 여기에 추가적인 관리 UI를 배치하세요 */}
                </div>
            </div>
        </div>
    );
};

export default AdmnBoard;
