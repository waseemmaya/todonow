const addTask = task => {
  return {
    type: "ADD_TASK",
    task
  };
};

const updateTask = (i, task) => {
  return {
    type: "UPDATE_TASK",
    index: i,
    task: task
  };
};

const removeTask = (i, task) => {
  return {
    type: "REMOVE_TASK",
    index: i,
    task: task
  };
};

export { removeTask, addTask, updateTask };
