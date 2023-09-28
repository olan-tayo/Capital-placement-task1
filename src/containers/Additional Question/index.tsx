import React, { useEffect, useState } from "react";
import Template from "../../components/template";
import { type Data } from "../../libs/types";
import Question from "../../components/Questions";
import edit from "../../assets/image 156.svg";
import { updateData } from "../../services/api";

const AdditionalQuestion = ({ request }: any) => {
  const time = [
    {
      title: "Minute",
    },
    {
      title: "Seconds",
    },
  ];
  const [isAddQuestion, setIsAddQuestion] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>(request?.customisedQuestions);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [toggleTime, setToggleTime] = useState(false);

  const handleDeleteQuestion = () => {
    setIsAddQuestion(false);
  };

  const handleEditQuestions = (index: number) => {
    setSelectedIndex(index);
  };

  const handleOther = (index: number) => {
    let prevData = [...data];
    prevData[index]["other"] = !data[index].other;
  };

  const handleMaxDuration = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let prevData = [...data];
    prevData[index]["maxVideoDuration"] = Number(e.target.value);
  };

  const handleMaxChoice = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let prevData = [...data];
    prevData[index]["maxChoice"] = Number(e.target.value);
  };

  const handleUpdateQuestion = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let prevData = [...data];
    prevData[index]["question"] = e.target.value;
  };

  const handleChoices = (
    e: React.ChangeEvent<HTMLInputElement>,
    choicesIndex: number,
    index: number
  ) => {
    let prevData = [...data];
    prevData[index]["choices"][choicesIndex]["value"] = e.target.value;
  };

  const handleAddMoreChoices = (index: number) => {
    const newChoice = {
      value: "",
    };
    const prevData = [...data];
    if (prevData[index] && Array.isArray(prevData[index]["choices"])) {
      prevData[index]["choices"].push(newChoice);
    }
    setData(prevData);
  };

  const handleDeleteSavedQuestion = (index: number) => {
    let prevData = [...data];
    prevData.splice(index, 1);
    setData(prevData);
  };

  const handleSelectTime = (index: number, time: string) => {
    let prevData = [...data];
    prevData[index]["videoTime"] = time;
  };

  // UPDATE A QUESTION AND CALL ENDPOINT
  const handleUpdateSavedQuestion = (
    index: number,
    question: Data,
    type: string,
    id: string
  ) => {
    const questions = data.map((questionData) => {
      if (questionData.id === id) {
        return {
          ...questionData,
          type: type?.replace(" ", ""),
          id: question?.id,
          question: question?.question,
          disqualify: question?.disqualify,
          choices: question?.choices,
          other: question?.other,
          maxChoice: question?.maxChoice || 0,
          maxVideoDuration: question?.maxVideoDuration || 0,
          videoTime: question?.videoTime || "",
        };
      }
      return questionData;
    });

    setData(questions);

    handleUpdateQuestions(questions);
  };

  // CALL ENDPOINT TO UPDATE QUESTIONS
  const handleUpdateQuestions = async (updatedData: Data[]) => {
    let newUpdatedData = updatedData.map((item) => ({
      ...item,
      choices: Array.isArray(item.choices)
        ? item.choices.map((choice) =>
            typeof choice === "string" ? choice : choice?.value
          )
        : [],
    }));

    const updatedRequest = {
      ...request,
      customisedQuestions: newUpdatedData,
    };

    const newData = {
      data: {
        id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        type: "applicationForm",
        attributes: updatedRequest,
      },
    };

    try {
      await updateData(newData);
      setSelectedIndex(null);
    } catch (error) {
      // console.log(error);
    }
  };

  // CREATE A NEW QUESTION
  const handleSave = (newData: Data) => {
    let updatedNewData = {
      ...newData,
      type: newData?.type?.replace(" ", ""),
    };
    setData((prev) => [...prev, newData]);
    handleUpdateQuestions([...data, updatedNewData]);

    setIsAddQuestion(false);
  };
  useEffect(() => {
    setData(request?.customisedQuestions);
  }, [request]);
  return (
    <div>
      <Template title="Additional questions">
        <div className="pl-[30px] pr-[48px] pt-[38px]">
          {data?.map((questions, index) => {
            return (
              <div
                key={index}
                className="mt-[20px] mb-[30px] border-b-[#C4C4C4] pb-[25px] border-b-[1px]"
              >
                <p className="text-sm text-[#979797] font-medium leading-[159.5%] mb-[9px]">
                  {questions?.type}
                </p>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleEditQuestions(index)}
                >
                  <p className="text-xl text-[#000] font-semibold leading-[114%]">
                    {questions?.question}
                  </p>
                  <img
                    src={edit}
                    alt="Edit Icon"
                    className="w-[18px] h-[17px]"
                  />
                </div>

                {selectedIndex === index && (
                  <div className="mt-[30px]">
                    <div>
                      <p className="text-[20px] font-semibold leading-[114%] pb-[8px]">
                        Question
                      </p>

                      <input
                        defaultValue={questions?.question}
                        onChange={(e) => handleUpdateQuestion(e, index)}
                        type="text"
                        className="border-[#000] border-[1px] rounded-[5px] w-full h-[68px] px-[26px] outline-none text-[#979797] text-sm font-medium leading-[159.5%]"
                        placeholder="Type here"
                        // onChange={(event) => handleQuestion(event)}
                      />
                    </div>

                    {(questions?.type === "Multiple Choice" ||
                      questions?.type === "Dropdown") && (
                      <div className="flex mt-[24px] mb-[41px] gap-[11px] items-center">
                        <input
                          defaultChecked={questions?.other}
                          type="checkbox"
                          className="accent-[#087B2F] w-[18px] h-[18px]"
                          onChange={() => handleOther(index)}
                        />
                        <p className="text-[15px] font-normal leading-6 tracking-[-0.09px] text-[#000]">
                          Enable “Other” option
                        </p>
                      </div>
                    )}

                    {(questions?.type === "Multiple Choice" ||
                      questions?.type === "Dropdown") && (
                      <div>
                        <p className="mt-[30px] text-xl font-medium leading-[114%] text-[#000] mb-[7px] pl-[36px]">
                          Choice
                        </p>

                        {questions?.choices?.map((choice, choicesindex) => {
                          return (
                            <div
                              key={index}
                              className="flex gap-[20px] flex-col"
                            >
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
                                    defaultValue={choice?.value}
                                    onChange={(event) =>
                                      handleChoices(event, choicesindex, index)
                                    }
                                  />
                                </div>

                                {questions?.choices.length - 1 ===
                                  choicesindex && (
                                  <div
                                    className="w-[13px] h-[13px] ml-4 cursor-pointer"
                                    onClick={() => handleAddMoreChoices(index)}
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
                      </div>
                    )}

                    {/* Max choice allowed */}
                    {questions?.type === "Multiple Choice" && (
                      <div>
                        <p className="mb-2 text-xl font-semibold leading-[114%] mt-[50px]">
                          Max choice allowed
                        </p>

                        <input
                          defaultValue={questions?.maxChoice}
                          onChange={(event) => handleMaxChoice(event, index)}
                          type="number"
                          className="border-[#000] border-[1px] rounded-[5px] w-full h-[68px] px-[26px] outline-none text-[#979797] text-sm font-medium leading-[159.5%]"
                          placeholder="Enter number of choice allowed here"
                        />
                      </div>
                    )}

                    {/* Video */}
                    {questions?.type === "Video Question" && (
                      <div className="flex items-center gap-[20px] mt-[30px]">
                        <div className="w-[60%]">
                          <input
                            onChange={(event) =>
                              handleMaxDuration(event, index)
                            }
                            defaultValue={questions?.maxVideoDuration}
                            type="number"
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
                                {questions?.videoTime || "in (sec/min)"}
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
                                {time?.map((time, videoindex) => {
                                  return (
                                    <div
                                      onClick={() =>
                                        handleSelectTime(index, time?.title)
                                      }
                                      key={videoindex}
                                      className={`${
                                        questions?.videoTime === time?.title
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

                    {/* DELETE QUESTION AND SAVE */}
                    <div className="flex mt-[43px] justify-between items-center pb-[50px] ">
                      <div
                        className="bg-white flex items-center gap-[8px]"
                        style={{ borderRadius: "0px 0px 20px 20px" }}
                        onClick={() => handleDeleteSavedQuestion(index)}
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
                          onClick={() =>
                            handleUpdateSavedQuestion(
                              index,
                              questions,
                              questions?.type,
                              questions?.id
                            )
                          }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
  );
};

export default AdditionalQuestion;
