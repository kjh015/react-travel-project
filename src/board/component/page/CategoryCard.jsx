import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * 카테고리 카드 선택 컴포넌트
 * @param {Array} selectedList : 선택된 카테고리 문자열 배열
 * @param {Function} onSelect : 카테고리 클릭 시 콜백 (선택/해제 로직은 부모에서)
 */
const CategoryCard = ({ selectedList = [], onSelect }) => {
    const categories = [

        "축제", "공연", "행사", "체험", "쇼핑", "자연", "역사", "가족", "음식"
    ];

    // 전체 선택시 selectedList가 비거나, "전체"가 들어있을 때 강조
    const isAllSelected = !selectedList.length || selectedList.includes("전체");

    return (
        <div style={{ minWidth: 240, maxWidth: 350 }}>
            <div className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#1565c0", fontSize: "1.18rem" }}>
                <i
                    className="bi bi-tag-fill me-2"
                    style={{
                        fontSize: "1.3rem",
                        background: "linear-gradient(90deg, #42a5f5 10%, #7e57c2 80%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                />
                카테고리 선택
            </div>
            <div className="row row-cols-3 g-2">
                {categories.map(category => {
                    // "전체"는 selectedList가 비었을 때도 선택됨
                    const isSelected =
                        category === "전체"
                            ? isAllSelected
                            : selectedList.includes(category);

                    return (
                        <div className="col" key={category}>
                            <div
                                className={`text-center shadow-sm ${isSelected ? "border border-primary" : "border-0"}`}
                                onClick={() => onSelect(category)}
                                style={{
                                    borderRadius: "16px",
                                    background: isSelected
                                        ? "linear-gradient(90deg,#e3f2fd 70%,#ede7f6 100%)"
                                        : "#f7fafd",
                                    color: isSelected ? "#1760c6" : "#7b8da3",
                                    fontWeight: isSelected ? 700 : 500,
                                    cursor: "pointer",
                                    padding: "13px 0 11px",
                                    boxShadow: isSelected
                                        ? "0 4px 16px 0 rgba(33, 150, 243, 0.10)"
                                        : "0 2px 7px 0 rgba(90,120,180,0.06)",
                                    outline: "none",
                                    transform: isSelected ? "scale(1.06)" : "scale(1)",
                                    transition: "all 0.16s cubic-bezier(.5,1.7,.76,1.18)",
                                    fontSize: "1rem"
                                }}
                                tabIndex={0}
                                onKeyPress={e => {
                                    if (e.key === "Enter" || e.key === " ") onSelect(category);
                                }}
                                role="button"
                            >
                                {category}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryCard;
