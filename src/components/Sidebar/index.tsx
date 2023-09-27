import React from "react";
import home from "../../assets/image 295.svg";
import note from "../../assets/image 298.svg";

const Sidebar = () => {
  return (
    <div
      className="w-[117.86px] h-screen flex flex-col items-center bg-white"
      style={{ boxShadow: "0px 4px 23px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="mt-[50.31px] cursor-pointer mb-[94.54px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="19"
          viewBox="0 0 23 19"
          fill="none"
        >
          <rect
            x="0.768005"
            y="0.30896"
            width="22"
            height="2.92393"
            fill="black"
          />
          <rect
            x="0.768005"
            y="8.10608"
            width="22"
            height="2.92393"
            fill="black"
          />
          <rect
            x="0.768005"
            y="15.9032"
            width="22"
            height="2.92393"
            fill="black"
          />
        </svg>
      </div>

      <div className="w-[36px] h-[35.087px] mb-[45.81px] cursor-pointer">
        <img src={home} alt="home" className="" />
      </div>

      <div className="w-[33px] h-[32.163px] cursor-pointer">
        <img src={note} alt="home" className="" />
      </div>
      <div className="h-full flex justify-center items-center flex-col ">
        <div className="bg-[#1D4ED8] rounded-full flex justify-center items-center  w-[47px] h-[47px]">
          <p className="text-white text-base font-semibold">NT</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
