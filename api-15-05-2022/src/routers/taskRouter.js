import express from "express";
import {
  insertTask,
  readTasks,
  deleteTask,
  deleteMultipleTasks,
  updateTask,
} from "../model/Task.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await readTasks();
  console.log(result);
  res.json({
    status: "success",
    result,
  });
});

router.post("/", async (req, res) => {
  try {
    const result = await insertTask(req.body);

    result._id
      ? res.json({
          status: "success",
          message: "Task has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to insert task, please try again",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: "Unable to insert task, please try again",
    });
  }
});

router.patch("/", async (req, res) => {
  const { _id, taskType } = req.body;
  const result = await updateTask({ _id }, { taskType });
  console.log(result);

  result._id
    ? res.json({
        status: "success",
        message: "Task has been updated",
      })
    : res.json({
        status: "error",
        message: "Unable to update the task",
      });
});
// router.delete("/:_id", async (req, res) => {
router.delete("/", async (req, res) => {
  const { deletedCount } = await deleteMultipleTasks(req.body);

  deletedCount
    ? res.json({
        status: "success",
        message: "selected task has been deleted",
      })
    : res.json({
        status: "error",
        message: "Invalid request",
      });
});

export default router;
