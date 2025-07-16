import { Link } from "react-router-dom";

import "../CSS/EntireData.css";

const EntireData = () => {
    return (
        <div className = "ed-container">
            <div className="ed-line" />
            <div className="ed-head">
                <div className="ed-head-text">전체 데이터 확인</div>
                <div className="ed-head-button-nest">
                    <Link to="/">
                    <button className="ed-button-save">저장하기</button>
                    </Link>
                    <Link to="/">
                    <button className="ed-button-export">내보내기</button>
                    </Link>
                </div>
            </div>
            <div className="ed-sample-nest">
                <div className="ed-sample-instance">
                    <div className="ed-sample-text"></div>
                    <div className="ed-sample-data"></div>
                </div>
            </div>
        </div>
    )
}

export default EntireData;