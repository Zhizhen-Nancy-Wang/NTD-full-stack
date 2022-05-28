import axios from "axios";

const taskApiEp = process.env.NODE_ENV==='production'?"/api/v1/tasks":"http://localhost:8000/";
console.log(process.env.NODE_ENV)

export const postTask = async (taskObj) => {
  try {
    const { data } = await axios.post(taskApiEp, taskObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchAllTasks = async () => {
  try {
    const { data } = await axios.get(taskApiEp);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTasks = async (ids) => {
  try {
    const { data } = await axios.delete(taskApiEp, { data: ids });
    console.log({ data: ids });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const updateTask = async (taskObj) => {
  try {
    const { data } = await axios.patch(taskApiEp, taskObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
