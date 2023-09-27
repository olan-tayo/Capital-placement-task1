import "./App.css";
import Sidebar from "./components/Sidebar";
import Template from "./components/template";
import upload from "../src/assets/image 308.svg";
import { useState } from "react";
import PersonalInfomation from "./containers/personalInfo/personalInfo";
import AdditionalQuestion from "./containers/Additional Question";

function App() {
  type Image = null | string;
  const [image, setImage] = useState<Image>(null);

  const handleSetFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        setImage(e?.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex">
        {/* sidebar */}
        <div>
          <Sidebar />
        </div>
        {/* content */}
        <div className="w-full h-screen overflow-auto">
          <div
            className="mt-[123px] mb-[139px] ml-[1px] bg-white w-full h-[129px] flex justify-between "
            style={{ boxShadow: " 0px 1px 18px 0px rgba(0, 0, 0, 0.12)" }}
          >
            <div className="w-1/4 py-[53px]  flex justify-center items-center">
              <p className="text-xl font-medium font-[inter]">
                Program Details
              </p>
            </div>
            <div className="w-1/4 flex items-center">
              <div className="py-[53px] w-full  flex justify-center items-center bg-[#00635B]">
                <p className="text-xl text-[#FFF] font-medium font-[inter]">
                  Application Form
                </p>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="42"
                  viewBox="0 0 21 42"
                  fill="none"
                >
                  <path d="M21 21L0 42L-2.09101e-06 0L21 21Z" fill="#00635B" />
                </svg>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-around">
              <p className="text-xl font-medium font-[inter]">Workflow</p>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="78"
                  viewBox="0 0 2 78"
                  fill="none"
                >
                  <path d="M1 0L1 78" stroke="#C4C4C4" />
                </svg>
              </div>
              <p className="text-xl font-medium font-[inter] pr-[80px]">
                Preview
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[61px] pl-[69.52px]">
            {/* IMAGE UPLOAD */}
            <div className="">
              <Template title="Upload cover image">
                <div>
                  {image ? (
                    <div>
                      <img
                        src={image}
                        alt="cover"
                        className="h-[320px] object-cover w-full"
                      />
                      <div
                        className="bg-white px-[26px] flex  items-center h-[83px] gap-[8px]"
                        style={{ borderRadius: "0px 0px 20px 20px" }}
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="34"
                            height="34"
                            viewBox="0 0 34 34"
                            fill="none"
                          >
                            <path
                              d="M9.55672 9.42862L8.54309 8.42749L17.0037 16.7854L25.4644 25.1434"
                              stroke="#A80000"
                              strokeWidth="5"
                            />
                            <path
                              d="M23.5279 10.1184L24.5299 9.10559L16.165 17.5594L8.37691 25.3474"
                              stroke="#A80000"
                              strokeWidth="5"
                            />
                          </svg>
                        </div>
                        <p
                          className="text-[#A80000] text-[15px] font-semibold leading-6 tracking-[-0.09px] cursor-pointer"
                          onClick={() => setImage(null)}
                        >
                          Delete & re-upload
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-[63.56px] pb-[57px] px-[40px] relative">
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden w-full h-[210px]"
                        onChange={(event) => handleSetFile(event)}
                      />
                      <label htmlFor="file-upload">
                        <div
                          className="border-[1px] border-[#000000] border-dashed h-[210px] rounded-[5px] cursor-pointer flex flex-col items-center justify-center w-full"
                          style={{
                            boxShadow:
                              "3px 3px 9px 0px rgba(190, 190, 190, 0.13)",
                          }}
                        >
                          <img
                            src={upload}
                            alt="upload"
                            className="w-[33px] h-[33px] pb-2"
                          />

                          <p className="text-sm font-semibold leading-[22.33px] pb-[6px]">
                            Upload cover image
                          </p>
                          <p className="text-[#979797] text-sm font-medium leading-[22.33px]">
                            16:9 ratio is recommended. Max image size 1mb
                          </p>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </Template>
            </div>

            {/* PERSONAL INFORMATION */}
            <div className="mb-[32px]">
              <PersonalInfomation />
            </div>

            {/* Additional questions*/}
            <div className="mb-[32px]">
              <AdditionalQuestion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
