// import { isObjectIdOrHexString } from "mongoose";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import "./App.css";
import { AddForm } from "./components/form/AddForm";
import { BadList } from "./components/task-list/BadList";
import { TaskList } from "./components/task-list/TaskList";
import { Title } from "./components/title/Title";
import {
  fetchAllTasks,
  postTask,
  deleteTasks,
  updateTask,
} from "./helpers/axiosHelper";

const weeklyHrs = 24 * 7;

const App = () => {
  const [taskList, setTaskList] = useState([]);
  //   const [badList, setBadList] = useState([]);

  const [response, setResponse] = useState({
    status: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [ids, setIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await fetchAllTasks();

    result?.status === "success" && setTaskList(result.result);

    console.log(result);
  };

  const badList = taskList.filter((item) => item.taskType === "badList");
  const entryList = taskList.filter((item) => item.taskType === "taskList");

  const ttlHrBadList = badList.reduce((acc, item) => acc + item.hr, 0);
  const ttlHrEntryList = entryList.reduce((acc, item) => acc + item.hr, 0);

  const totalHRs = ttlHrBadList + ttlHrEntryList;

  //   const deleteTask = (_id) => {
  //     if (window.confirm("Are you sure you want to delete this task?")) {
  //       console.log(_id);
  //     }
  //   };

  // remove item form the task list
  const removeFromTaskList = async (ids) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const result = await deleteTasks(ids);
      console.log(result);
      setResponse(result);

      result?.status === "success"
        ? fetchData() && setIds([])
        : setResponse(result);
    }
  };

  const switchTask = async (obj) => {
    const result = await updateTask(obj);
    setResponse(result);
    result.status === "success" && fetchData();
  };

  const addToTaskList = async (newInfo) => {
    if (totalHRs + newInfo.hr <= weeklyHrs) {
      // call api to send the data to the server
      setIsLoading(true);

      //first send new data to te server and wait for te response(status, message)
      const result = await postTask(newInfo);
      setResponse(result);
      setIsLoading(false);

      result?.status === "success" ? fetchData() : setResponse(result);
    } else {
      alert("You have exceeded the weekly limit of " + weeklyHrs + "hrs");
    }
  };

  const handleOnSelectItem = (e) => {
    const { value, checked } = e.target;
    console.log(value);

    console.log(ids);

    checked
      ? setIds([...ids, value])
      : setIds(ids.filter((id) => id !== value));
  };

  console.log(ids);

  return (
    <div className="wrapper">
      <Container>
        {/* title comp */}
        <Title />

        {isLoading && <Spinner animation="border" variant="primary" />}
        {response?.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}
        {/* form comp */}
        <AddForm addToTaskList={addToTaskList} />

        <hr />

        {/* Task list comp */}
        <Row>
          <Col md="6">
            <TaskList
              taskList={entryList}
              removeFromTaskList={removeFromTaskList}
              switchTask={switchTask}
              handleOnSelectItem={handleOnSelectItem}
            />
          </Col>
          <Col md="6">
            <BadList
              badList={badList}
              removeFromTaskList={removeFromTaskList}
              switchTask={switchTask}
              ttlHrBadList={ttlHrBadList}
              handleOnSelectItem={handleOnSelectItem}
            />
          </Col>
        </Row>

        {/* total hours allocation */}

        <Row>
          <Col>
            {ids.length > 0 && (
              <Button variant="danger" onClick={() => removeFromTaskList(ids)}>
                Delete Selected task
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="mt-5">
              The total allocated hours is: {totalHRs}
              hrs
            </h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

//1. create an array to hold multiple ids
//2.on checkbox tick and un tick, put the id or remove id
//3. show delete selected button for deleting multiple task
//4. on click on that button ,call the delete axios function and pass the array
//5. if response status is success then call
//6. Done
