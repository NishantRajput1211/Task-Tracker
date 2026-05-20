import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

import "./Dashboard.css";

function Dashboard() {

  const [tasks, setTasks] =
    useState([]);

  // FETCH TASKS
  const fetchTasks =
    async () => {

      try {

        const res =
          await API.get("/tasks");

        setTasks(res.data);

      } catch (err) {

        console.log(err);

      }

    };

  useEffect(() => {

    fetchTasks();

  }, []);

  // STATS
  const total =
    tasks.length;

  const completed =
    tasks.filter(
      (task) =>
        task.status === "Done"
    ).length;

  const overdue =
    tasks.filter((task) => {

      return (
        task.dueDate &&
        new Date(task.dueDate)
        < new Date() &&
        task.status !== "Done"
      );

    }).length;

  return (

    <div>

      <Navbar />

      <div className="dashboard-container">

        <h1 className="dashboard-title">
          Dashboard
        </h1>

        <div className="stats-grid">

          {/* TOTAL TASKS */}
          <div className="stat-card total">

            <h2>Total Tasks</h2>

            <div className="stat-number">
              {total}
            </div>

          </div>

          {/* COMPLETED TASKS */}
          <div className="stat-card completed">

            <h2>Completed Tasks</h2>

            <div className="stat-number">
              {completed}
            </div>

          </div>

          {/* OVERDUE TASKS */}
          <div className="stat-card overdue">

            <h2>Overdue Tasks</h2>

            <div className="stat-number">
              {overdue}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;