import { ReactNode } from "react";

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
  title: string;
  value: string;
  internal: boolean;
  hide: boolean;
};

export type QuestionsProps = {
  deleteQuestion: () => void;
  updateData: (newData: Data) => void;
};

type Choices = {
  value: string;
};

export type Data = {
  type: string;
  question: string;
  disqualify: boolean;
  choices: Choices[];
  other: boolean;
  max_choice: number;
  max_video_duration: number;
  video_time: string | null;
};
