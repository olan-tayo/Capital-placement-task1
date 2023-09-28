import { ReactNode } from "react";

type Choices = {
  value: string;
};

export type TemplateProps = {
  title: string;
  children: ReactNode;
};

export type SwitchProps = {
  isOn: boolean;
  handleToggle: () => void;
  colorOne: string;
  colorTwo: string;
};

export type PersonalInfo = {
  id: string;
  title: string;
  value: string;
  internalUse: boolean;
  show: boolean;
};

export type QuestionsProps = {
  deleteQuestion: () => void;
  updateData: (newData: Data) => void;
};

export type Data = {
  id: string;
  type: string;
  question: string;
  disqualify: boolean;
  choices: Choices[];
  other: boolean;
  maxChoice: number;
  maxVideoDuration: number;
  videoTime: string | null;
};

export type Info = {
  internalUse: boolean;
  show: boolean;
};

export type PersonalInfoRequest = {
  choices: string[];
  disqualify: boolean;
  id: string;
  maxChoice: number;
  other: boolean;
  question: string;
  type: string;
};

export type Request = {
  currentResidence: Info;
  dateOfBirth: Info;
  emailId: Info;
  firstName: Info;
  gender: Info;
  idNumber: Info;
  lastName: Info;
  nationality: Info;
  personalQuestions: PersonalInfoRequest[];
  phoneNumber: Info;
};
