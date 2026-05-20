import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./Tasks.css";

function Tasks() {

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {

      const res = await API.get("/tasks");

      setTasks(res.data);

    } catch (err) {

      console.log(err);

      toast.error("Failed to fetch tasks");

    }
  };

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {

      const res = await API.get("/projects");

      setProjects(res.data);

    } catch (err) {

      console.log(err);

      toast.error("Failed to fetch projects");

    }
  };

  // FETCH USERS
  const fetchUsers = async () => {
    try {

      const res = await API.get("/users");

      setUsers(res.data);

    } catch (err) {

      console.log(err);

      toast.error("Failed to fetch users");

    }
  };

  // CREATE OR UPDATE TASK
  const createTask = async () => {

    try {

      if (editId) {

        await API.put(`/tasks/${editId}`, {
          title,
          status,
          priority,
          dueDate,
          project,
          assignedTo
        });

        toast.success("Task Updated");

        setEditId(null);

      } else {

        await API.post("/tasks", {
          title,
          status,
          priority,
          dueDate,
          project,
          assignedTo
        });

        toast.success("Task Created");

      }

      setTitle("");
      setStatus("Todo");
      setPriority("Low");
      setDueDate("");
      setProject("");
      setAssignedTo("");

      fetchTasks();

    } catch (err) {

      console.log(err);

      toast.error("Task operation failed");

    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      fetchTasks();

      toast.error("Task Deleted");

    } catch (err) {

      console.log(err);

      toast.error("Delete failed");

    }
  };

  // DELETE USER
  const deleteUser = async (id) => {

    try {

      await API.delete(`/users/${id}`);

      setUsers(
        users.filter((u) => u._id !== id)
      );

      toast.success("User Deleted");

    } catch (err) {

      console.log(err);

      toast.error("Delete failed");

    }
  };

  // LOAD DATA
  useEffect(() => {

    fetchTasks();

    fetchProjects();

    fetchUsers();

  }, []);

  // SEARCH + FILTER
  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      task.status === filterStatus;

    return matchesSearch && matchesStatus;

  });

  return (

    <div>

      <Navbar />

      <div className="tasks-container">

        <h1 className="tasks-title">
          Task Manager
        </h1>

        {/* FORM */}
        <div className="task-form">

          {/* SEARCH */}
          <input
            className="input"
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {/* FILTER */}
          <select
            className="select"
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
          >

            <option>All</option>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>

          </select>

          {/* TITLE */}
          <input
            className="input"
            placeholder="Task title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          {/* STATUS */}
          <select
            className="select"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>

          </select>

          {/* PRIORITY */}
          <select
            className="select"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >

            <option>Low</option>
            <option>Medium</option>
            <option>High</option>

          </select>

          {/* DUE DATE */}
          <input
            className="input"
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

          {/* PROJECT */}
          <select
            className="select"
            value={project}
            onChange={(e) =>
              setProject(e.target.value)
            }
          >

            <option value="">
              Select Project
            </option>

            {projects.map((p) => (

              <option
                key={p._id}
                value={p._id}
              >
                {p.name}
              </option>

            ))}

          </select>

          {/* ASSIGN USER */}
          <select
            className="select"
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(e.target.value)
            }
          >

            <option value="">
              Assign User
            </option>

            {users.map((u) => (

              <option
                key={u._id}
                value={u._id}
              >
                {u.name}
              </option>

            ))}

          </select>

          {/* CREATE BUTTON */}
          <button
            className="create-btn"
            onClick={createTask}
          >

            {
              editId
                ? "Update Task"
                : "Create Task"
            }

          </button>

        </div>

        {/* MANAGE USERS */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "30px"
          }}
        >

          <h2>Manage Users</h2>

          {users.map((u) => (

            <div
              key={u._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
                background: "#f4f4f4",
                borderRadius: "8px"
              }}
            >

              <span>{u.name}</span>

              <button
                onClick={() =>
                  deleteUser(u._id)
                }
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>

            </div>

          ))}

        </div>

        {/* TASK LIST */}
        <div className="tasks-grid">

          {filteredTasks.map((task) => (

            <div
              key={task._id}
              className="task-card"
            >

              <h3>{task.title}</h3>

              <p>
                <strong>Status:</strong>
                {" "}
                {task.status}
              </p>

              <p>
                <strong>Priority:</strong>
                {" "}
                {task.priority}
              </p>

              <p>
                <strong>Project:</strong>
                {" "}
                {
                  task.project
                    ? task.project.name
                    : "No Project"
                }
              </p>

              <p>
                <strong>Assigned To:</strong>
                {" "}
                {
                  task.assignedTo
                    ? task.assignedTo.name
                    : "Nobody"
                }
              </p>

              <p>
                <strong>Due Date:</strong>
                {" "}
                {
                  task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "No date"
                }
              </p>

              <div className="task-buttons">

                {/* EDIT */}
                <button
                  className="edit-btn"
                  onClick={() => {

                    setTitle(task.title);

                    setStatus(task.status);

                    setPriority(task.priority);

                    setDueDate(task.dueDate);

                    setProject(
                      task.project
                        ? task.project._id
                        : ""
                    );

                    setAssignedTo(
                      task.assignedTo
                        ? task.assignedTo._id
                        : ""
                    );

                    setEditId(task._id);

                  }}
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Tasks;