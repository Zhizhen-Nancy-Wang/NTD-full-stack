import TaskSchema from "./Task.schema.js";

// ======== queries

// insert task
export const insertTask = (taskObj) => {
  return TaskSchema(taskObj).save();
};

// read task
export const readTasks = () => {
  return TaskSchema.find();
};

// delete single task
export const deleteTask = (_id) => {
  return TaskSchema.findByIdAndDelete(_id);
};

//@ids as an array
export const deleteMultipleTasks = (_ids) => {
  return TaskSchema.deleteMany({ _id: { $in: _ids } });
};

export const updateTask = (filter, obj) => {
  return TaskSchema.findOneAndUpdate(filter, obj, { new: true });
};
