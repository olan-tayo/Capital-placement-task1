import "./App.css";
import Sidebar from "./components/Sidebar";
import Template from "./components/template";
import upload from "../src/assets/image 308.svg";
import { useState } from "react";
import { Switch } from "./components/Switch";
import { type PersonalInfo, Data } from "../src/libs/types";
import Question from "./components/Questions";

function App() {
  type Image = null | string;
  const [image, setImage] = useState<Image>(null);
  const [isAddQuestion, setIsAddQuestion] = useState<boolean>(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo[]>([
    {
      title: "Phone",
      value: "",
      internal: false,
      hide: false,
    },
    {
      title: "Nationality",
      value: "",
      internal: false,
      hide: false,
    },
    {
      title: "Current Residence ",
      value: "",
      internal: false,
      hide: false,
    },
    {
      title: "ID Number",
      value: "",
      internal: false,
      hide: false,
    },
    {
      title: "Date of Birth",
      value: "",
      internal: false,
      hide: false,
    },
    {
      title: "Gender",
      value: "",
      internal: false,
      hide: false,
    },
  ]);

  const [data, setData] = useState({
    type: "",
    question: "",
    disqualify: false,
    other: false,
    max_choice: 0,
    max_video_duration: 0,
    video_time: "",
  });

  const handleSetFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        setImage(e?.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleToggleSwitch = (index: number) => {
    const updatedPersonalInfo = [...personalInfo];
    updatedPersonalInfo[index].hide = !updatedPersonalInfo[index].hide;
    setPersonalInfo(updatedPersonalInfo);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedPersonalInfo = [...personalInfo];
    updatedPersonalInfo[index].value = event.target.value;
    setPersonalInfo(updatedPersonalInfo);
  };

  const handleInternalCheckbox = (index: number) => {
    const updatedPersonalInfo = [...personalInfo];
    updatedPersonalInfo[index].internal = !updatedPersonalInfo[index].internal;
    setPersonalInfo(updatedPersonalInfo);
  };

  const handleDeleteQuestion = () => {
    setIsAddQuestion(false);
  };

  const handleSave = (newData: Data) => {
    console.log(newData);
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
              <Template title="Personal Information">
                <div className="pt-[38px] pl-[30px] pr-[48px]">
                  {/* FIRST NAME */}
                  <div>
                    <label className="text-[25px] font-semibold leading-[114%] text-[#000]">
                      First Name
                      <input
                        type="text"
                        className="w-full border-b-[1px] pt-[25px] border-b-[#C4C4C4] mb-[23px] outline-none"
                      />
                    </label>
                  </div>

                  {/* LAST NAME */}
                  <div>
                    <label className="text-[25px] font-semibold leading-[114%] text-[#000]">
                      Last Name
                      <input
                        type="text"
                        className="w-full border-b-[1px] pt-[25px] border-b-[#C4C4C4] mb-[23px] outline-none"
                      />
                    </label>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[25px] font-semibold leading-[114%] text-[#000]">
                      Email
                      <input
                        type="text"
                        className="w-full border-b-[1px] pt-[25px] border-b-[#C4C4C4] mb-[23px] outline-none"
                      />
                    </label>
                  </div>

                  <div>
                    {personalInfo?.map((info, index) => {
                      return (
                        <div key={index}>
                          <div className="flex justify-between items-center">
                            <p className="text-[25px] font-semibold leading-[114%] text-[#000]">
                              {info?.title}

                              {info?.title === "Phone" && (
                                <span className="text-[15px] font-normal">
                                  (without dial code)
                                </span>
                              )}
                            </p>

                            <div className="flex gap-6 items-center">
                              <div className="flex items-center gap-4">
                                <input
                                  type="checkbox"
                                  checked={info?.internal}
                                  onChange={() => handleInternalCheckbox(index)}
                                  className="w-[18px] h-[18px] accent-[#087B2F] "
                                />
                                <p className="text-[#666] text-[15px] font-normal leading-6 tracking-[-0.09px]">
                                  Internal
                                </p>
                              </div>
                              <div className="flex gap-4">
                                <Switch
                                  isOn={!info?.hide}
                                  handleToggle={() => handleToggleSwitch(index)}
                                  colorOne="#F4F4F4"
                                  colorTwo="#087B2F"
                                />

                                <p className="text-[#666] text-base font-normal leading-6 font-[Noto Sans]">
                                  {info?.hide ? "Show" : "Hide"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <input
                            className="w-full border-b-[1px] pt-[25px] border-b-[#C4C4C4] mb-[23px] outline-none"
                            onChange={(event) => handleChange(event, index)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  {isAddQuestion ? (
                    <div>
                      <Question
                        deleteQuestion={handleDeleteQuestion}
                        updateData={handleSave}
                      />
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-[20.19px] py-[64px] pl-[30px] pr-[48px] cursor-pointer"
                      onClick={() => setIsAddQuestion(!isAddQuestion)}
                    >
                      <div className="w-[24px] h-[24px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M2.42465 11.9094L1 11.9183L12.8925 11.8456L24.7851 11.773"
                            stroke="black"
                            strokeWidth="5"
                          />
                          <path
                            d="M12.7915 2.51806L12.7838 1.0934L12.8466 12.986L12.8466 24"
                            stroke="black"
                            strokeWidth="5"
                          />
                        </svg>
                      </div>
                      <p className="text-[15px] font-semibold leading-6 tracking-[-0.09px]">
                        Add a question
                      </p>
                    </div>
                  )}
                </div>
              </Template>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
