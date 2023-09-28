import axios from "axios";

export const fetchData = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_CP_API}${process.env.REACT_APP_CP_VERSION}/programs/${process.env.REACT_APP_CP_PROGRAM_ID}/application-form`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_CP_API}${process.env.REACT_APP_CP_VERSION}/programs/${process.env.REACT_APP_CP_PROGRAM_ID}/application-form`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
