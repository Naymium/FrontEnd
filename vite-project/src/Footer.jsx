import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="frame">
        <div className="group">
          <p className="text-wrapper">
            04066 서울특별시 마포구 와우산로 94 (상수동) 홍익대학교 제 1공학관
          </p>

          <p className="div">
            Hongik University, 94, Wausan-ro, Mapo-gu, Seoul, 04066, Republic of
            Korea
          </p>
        </div>

        <div className="group-2">
          <div className="text-wrapper-2">K124 - Laboratoy</div>

          <div className="text-wrapper-3">K515 - Office</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;