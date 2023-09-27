import React from "react";
import { type TemplateProps } from "../../libs/types.js";

const Template = ({ title, children }: TemplateProps) => {
  return (
    <div>
      <div>
        <div
          className="bg-[#D0F7FA] w-[595px] h-[77.437px] flex items-center pl-[32px]"
          style={{
            borderRadius: "20px 20px 0px 0px",
            boxShadow: "3px 3px 14px 0px rgba(190, 190, 190, 0.30)",
          }}
        >
          <p className="text-[25px] font-semibold leading-[114%] text-[#000] ">
            {title}
          </p>
        </div>
        <div
          className="bg-white w-[595px]"
          style={{
            borderRadius: "0px 0px 20px 20px",
            boxShadow: "3px 3px 14px 0px rgba(190, 190, 190, 0.30)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Template;
