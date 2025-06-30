"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@app/utils";

const tabs = ["Giới thiệu", "Chi tiết sản phẩm", "Bảo quản"];

const ProductDetailExtraInfo = ({}: {}) => {
  const [isShow, setIsShow] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleShowContent = () => {
    setIsShow((prevState) => !prevState);
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 text-gray-600">
      <div className="w-full flex flex-col border-b border-gray-400">
        <div className="w-full flex gap-8 border-b border-gray-300">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              className={`relative text-sm font-semibold uppercase py-4 cursor-pointer ${
                index === activeTab
                  ? "after:absolute after:w-full after:h-[2px] after:bg-black after:bottom-[-1px] after:left-0"
                  : ""
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="w-full py-8 relative">
          <div className={cn("overflow-y-hidden text-ellipsis", isShow ? "h-auto" : "h-[120px]")}>
            Áo sơ mi được làm từ chất liệu Batiste in họa tiết nét vẽ, có độ mềm mại, tạo sự sang trọng và thoải mái khi
            mặc. Thiết kế cổ 2 ve, tay ngắn, kiểu dáng croptop năng động, trẻ trung. Với nền họa tiết bắt mắt, cùng kiểu
            dáng trẻ trung, thích hợp để nàng diện trong nhiều dịp khác nhau. Thông tin mẫu: Chiều cao: 167 cm Cân nặng:
            50 kg Số đo 3 vòng: 83-65-93 cm Mẫu mặc size M Lưu ý: Màu sắc sản phẩm thực tế sẽ có sự chênh lệch nhỏ so
            với ảnh do điều kiện ánh sáng khi chụp và màu sắc hiển thị qua màn hình máy tính/ điện thoại.
          </div>
          <button
            className="absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2 bg-white border border-gray-400 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={handleShowContent}
          >
            <ChevronDown className={cn("w-4 h-4 transition-all", isShow ? "rotate-180" : "")} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailExtraInfo;
