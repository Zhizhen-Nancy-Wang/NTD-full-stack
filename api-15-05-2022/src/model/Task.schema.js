import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      minLength: [3, "Task is too short"],
    },
    hr: {
      type: Number,
      required: true,
      default: 0,
    },
    taskType: {
      type: String,
      default: "taskList",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", TaskSchema); // tasks
