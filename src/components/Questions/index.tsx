import React, { useState } from "react";
import { type QuestionsProps } from "../../libs/types";

const Question = ({ deleteQuestion, updateData }: QuestionsProps) => {
  const [questionData, setQuestionData] = useState({
    type: "",
    question: "",
    disqualify: false,
    choices: [],
    other: false,
    max_choice: 0,
    max_video_duration: 0,
    video_time: "",
  });
  const [toggleType, setToggleType] = useState(false);
  const [selectedType, setSelectedType] = useState({ title: "Paragraph" });
  const [toggleTime, setToggleTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState({ title: "" });
  const [choices, setChoices] = useState([
    {
      value: "",
    },
  ]);

  const types = [
    {
      title: "Paragraph",
    },
    {
      title: "Short answer",
    },
    {
      title: "Yes/No",
    },
    {
      title: "Dropdown",
    },
    {
      title: "Multiple choice",
    },
    {
      title: "Date",
    },
    {
      title: "Number",
    },
    {
      title: "File upload",
    },
    {
      title: "Video question",
    },
  ];

  const time = [
    {
      title: "Minute",
    },
    {
      title: "Seconds",
    },
  ];

  const handleSelectType = (type: string) => {
    setSelectedType({ title: type });
    setQuestionData((prev) => {
      return {
        ...prev,
        type: type,
      };
    });
    setToggleType(false);
  };

  const handleSelectTime = (type: string) => {
    setSelectedTime({ title: type });
    setToggleTime(false);
    setQuestionData((prev: any) => {
      return {
        ...prev,
        video_time: type,
      };
    });
  };

  const handleSave = () => {
    updateData({
      type: selectedType?.title,
      question: questionData?.question,
      disqualify: questionData?.disqualify,
      choices: choices[0]?.value === "" ? [] : choices,
      other: questionData?.other,
      max_choice: questionData?.max_choice,
      max_video_duration: questionData?.max_video_duration,
      video_time: questionData?.video_time,
    });
  };

  const handleQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionData((prev) => {
      return {
        ...prev,
        question: e.target.value,
      };
    });
  };

  const handleChoices = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let data = [...choices];
    data[index]["value"] = e.target.value;
    setChoices(data);
  };

  const handleAddMoreChoices = () => {
    let newfield = {
      value: "",
    };

    setChoices([...choices, newfield]);
  };

  const handleOther = () => {
    setQuestionData((prev) => {
      return {
        ...prev,
        other: !questionData.other,
      };
    });
  };

  const handleMaxChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionData((prev) => {
      return {
        ...prev,
        max_choice: Number(e.target.value),
      };
    });
  };

  const handleMaxDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionData((prev) => {
      return {
        ...prev,
        max_video_duration: Number(e.target.value),
      };
    });
  };

  const handleDisqualifyCandidates = () => {
    setQuestionData((prev) => {
      return {
        ...prev,
        disqualify: !questionData.disqualify,
      };
    });
  };

  return (
    <div>
      <div>
        <div className="pt-[39px] px-[29px]">
          <div className="relative">
            <p className="mb-2 text-xl font-semibold leading-[114%]">Type</p>

            <div>
              {/* TYPE */}
              <div className="relative">
                <div
                  onClick={() => setToggleType(!toggleType)}
                  className="h-[68px] w-full flex px-[26px] cursor-pointer mb-[29px] justify-between items-center rounded-[5px] border-[#000] border-[1px]"
                >
                  <p className="text-[#979797] text-sm font-medium leading-[159.5%]">
                    {selectedType?.title}
                  </p>
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                      viewBox="0 0 12 9"
                      fill="none"
                    >
                      <path
                        d="M0 0.172119L5.79652 0.160089L11.593 0.148059L5.80507 8.32024L0 0.172119Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>

                {toggleType && (
                  <div
                    className="absolute z-[300] cursor-pointer  w-full bg-white rounded-[5px] pt-[19px] top-[53px]"
                    style={{
                      boxShadow: "3px 3px 27px 0px rgba(190, 190, 190, 0.30)",
                    }}
                  >
                    {types?.map((type, index) => {
                      return (
                        <div
                          onClick={() => handleSelectType(type?.title)}
                          key={index}
                          className={`${
                            selectedType?.title === type?.title
                              ? "bg-[#9C4DE2] text-white"
                              : "text-[#000]"
                          }`}
                        >
                          <p className="px-6 text-base font-normal leading-[39px] tracking-[-0.096px] ">
                            {type?.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                {/* QUESTION */}
                <div>
                  <p className="mb-2 text-xl font-semibold leading-[114%]">
                    Question
                  </p>

                  <input
                    type="text"
                    className="border-[#000] border-[1px] rounded-[5px] w-full h-[68px] px-[26px] outline-none text-[#979797] text-sm font-medium leading-[159.5%]"
                    placeholder="Type here"
                    onChange={(event) => handleQuestion(event)}
                  />
                </div>

                {/* YES/NO */}
                {selectedType?.title === "Yes/No" && (
                  <div className="flex mt-[25px] mb-[41px] gap-[11px] items-center">
                    <input
                      onChange={handleDisqualifyCandidates}
                      type="checkbox"
                      className="accent-[#087B2F] w-[18px] h-[18px]"
                    />
                    <p className="text-[15px] font-normal leading-6 tracking-[-0.09px] text-[#000]">
                      Disqualify candidate if the answer is no
                    </p>
                  </div>
                )}

                {/* CHOICE */}
                {(selectedType?.title === "Multiple choice" ||
                  selectedType?.title === "Dropdown") && (
                  <>
                    <p className="mt-[30px] text-xl font-medium leading-[114%] text-[#000] mb-[7px] pl-[36px]">
                      Choice
                    </p>

                    {choices?.map((choice, index) => {
                      return (
                        <div key={index} className="flex gap-[20px] flex-col">
                          <div className="flex items-center mb-[20px]">
                            <div className="w-6 h-6 pr-[7px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M4 10.5C3.2 10.5 2.5 11.2 2.5 12C2.5 12.8 3.2 13.5 4 13.5C4.8 13.5 5.5 12.8 5.5 12C5.5 11.2 4.8 10.5 4 10.5ZM4 5.5C3.2 5.5 2.5 6.2 2.5 7C2.5 7.8 3.2 8.5 4 8.5C4.8 8.5 5.5 7.8 5.5 7C5.5 6.2 4.8 5.5 4 5.5ZM4 15.5C3.2 15.5 2.5 16.2 2.5 17C2.5 17.8 3.2 18.5 4 18.5C4.8 18.5 5.5 17.8 5.5 17C5.5 16.2 4.8 15.5 4 15.5ZM7.5 6V8H21.5V6H7.5ZM7.5 18H21.5V16H7.5V18ZM7.5 13H21.5V11H7.5V13Z"
                                  fill="black"
                                />
                              </svg>
                            </div>

                            <div className="w-full">
                              <input
                                name="value"
                                type="text"
                                className="w-full outline-none h-[68px] px-[18px] rounded-[5px] border-[#A0A0A0] border-[1px] font-medium leading-[159.5%] text-sm "
                                placeholder="Type here"
                                value={choice?.value}
                                onChange={(event) =>
                                  handleChoices(event, index)
                                }
                              />
                            </div>

                            {choices.length - 1 === index && (
                              <div
                                className="w-[13px] h-[13px] ml-4 cursor-pointer"
                                onClick={handleAddMoreChoices}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="14"
                                  viewBox="0 0 15 14"
                                  fill="none"
                                >
                                  <path
                                    d="M1.77866 6.50921L1 6.51404L7.5 6.47434L14 6.43464"
                                    stroke="black"
                                    strokeWidth="3"
                                  />
                                  <path
                                    d="M7.44511 1.37632L7.44092 0.597656L7.47526 7.09769L7.47526 13.1175"
                                    stroke="black"
                                    strokeWidth="3"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex mt-[24px] mb-[41px] gap-[11px] items-center">
                      <input
                        type="checkbox"
                        className="accent-[#087B2F] w-[18px] h-[18px]"
                        onChange={handleOther}
                      />
                      <p className="text-[15px] font-normal leading-6 tracking-[-0.09px] text-[#000]">
                        Enable “Other” option
                      </p>
                    </div>
                  </>
                )}

                {/* Max choice allowed */}
                {selectedType?.title === "Multiple choice" && (
                  <div>
                    <p className="mb-2 text-xl font-semibold leading-[114%] mt-[50px]">
                      Max choice allowed
                    </p>

                    <input
                      onChange={handleMaxChoice}
                      type="number"
                      className="border-[#000] border-[1px] rounded-[5px] w-full h-[68px] px-[26px] outline-none text-[#979797] text-sm font-medium leading-[159.5%]"
                      placeholder="Enter number of choice allowed here"
                    />
                  </div>
                )}

                {/* Video */}
                {selectedType?.title === "Video question" && (
                  <div className="flex items-center gap-[20px] mt-[30px]">
                    <div className="w-[60%]">
                      <input
                        onChange={handleMaxDuration}
                        type="text"
                        className="border-[#000] border-[1px] rounded-[5px] w-full h-[68px] px-[26px] outline-none text-[#979797] text-sm font-medium leading-[159.5%]"
                        placeholder="Max duration of video"
                      />
                    </div>
                    <div className="w-[40%]">
                      <div className="relative">
                        <div
                          onClick={() => setToggleTime(!toggleTime)}
                          className="h-[68px] w-full flex px-[26px] cursor-pointer justify-between items-center rounded-[5px] border-[#000] border-[1px]"
                        >
                          <p className="text-[#979797] text-sm font-medium leading-[159.5%]">
                            {selectedTime?.title || "in (sec/min)"}
                          </p>
                          <div className="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="9"
                              viewBox="0 0 12 9"
                              fill="none"
                            >
                              <path
                                d="M0 0.172119L5.79652 0.160089L11.593 0.148059L5.80507 8.32024L0 0.172119Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                        </div>

                        {toggleTime && (
                          <div
                            className="absolute cursor-pointer  w-full bg-white rounded-[5px] pt-[19px] top-[53px]"
                            style={{
                              boxShadow:
                                "3px 3px 27px 0px rgba(190, 190, 190, 0.30)",
                            }}
                          >
                            {time?.map((time, index) => {
                              return (
                                <div
                                  onClick={() => handleSelectTime(time?.title)}
                                  key={index}
                                  className={`${
                                    selectedTime?.title === time?.title
                                      ? "bg-[#9C4DE2] text-white"
                                      : "text-[#000]"
                                  }`}
                                >
                                  <p className="px-6 text-base font-normal leading-[39px] tracking-[-0.096px] ">
                                    {time?.title}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* DELETE QUESTION AND SAVE */}
              <div className="flex mt-[43px] justify-between items-center pb-[50px] ">
                <div
                  className="bg-white flex items-center gap-[8px]"
                  style={{ borderRadius: "0px 0px 20px 20px" }}
                  onClick={deleteQuestion}
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
                  <p className="text-[#A80000] text-[15px] font-semibold leading-6 tracking-[-0.09px] cursor-pointer">
                    Delete question
                  </p>
                </div>

                <div className="">
                  <button
                    className="bg-[#087B2F] h-[35px] w-[59px] text-[#F4FBF7] text-sm text-semibold rounded-[5px]"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
