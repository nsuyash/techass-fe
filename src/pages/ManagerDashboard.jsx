import React, { useEffect, useState } from "react";
import {
  fetchEngineers,
  fetchProjects,
  fetchAssignments,
  deleteProject,
} from "../api/api";
import { useAuth } from "../context/AuthContext";
import CapacityBar from "../components/CapacityBar";
import SkillTags from "../components/SkillTags";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ManagerDashboard = () => {
  const { token } = useAuth();
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);

  const [skillFilter, setSkillFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const eng = await fetchEngineers(token); // now returns allocated & remaining
        const proj = await fetchProjects(token);
        const assign = await fetchAssignments(token);
        setEngineers(eng);
        setProjects(proj);
        setAssignments(assign);
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, [token]);

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(token, projectId);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      alert("✅ Project deleted successfully");
    } catch (err) {
      alert("❌ Failed to delete project: " + err.message);
    }
  };

  const filteredEngineers = engineers.filter((eng) =>
    skillFilter.trim()
      ? eng.skills.some((skill) =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )
      : true
  );

  const filteredProjects = projects.filter((proj) =>
    statusFilter.trim()
      ? proj.status.toLowerCase() === statusFilter.toLowerCase()
      : true
  );

  const chartData = {
    labels: engineers.map((e) => e.name),
    datasets: [
      {
        label: "Utilization (%)",
        data: engineers.map((e) =>
          e.maxCapacity
            ? Math.min((e.allocated / e.maxCapacity) * 100, 100)
            : 0
        ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="container mt-4">
      <h2>Team Overview</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-4">
        <Link to="/projects/create" className="btn btn-success me-2">
          Create Project
        </Link>
        <Link to="/assignments/create" className="btn btn-primary">
          Create Assignment
        </Link>
      </div>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search engineers by skill..."
            className="form-control"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Filter projects by status</option>
            <option value="active">Active</option>
            <option value="planning">Planning</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Engineers Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Seniority</th>
            <th>Capacity</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {filteredEngineers.map((eng) => (
            <tr key={eng._id}>
              <td>{eng.name}</td>
              <td>
                <SkillTags skills={eng.skills} />
              </td>
              <td>{eng.seniority}</td>
              <td>
                <CapacityBar
                  allocatedPercent={
                    eng.maxCapacity
                      ? Math.min((eng.allocated / eng.maxCapacity) * 100, 100)
                      : 0
                  }
                />
                <small className="text-muted">
                  {eng.allocated} / {eng.maxCapacity} allocated
                </small>
              </td>
              <td>{eng.department}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Projects Table */}
      <h2 className="mt-5">Projects</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Required Skills</th>
            <th>Status</th>
            <th>Team Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((proj) => (
            <tr key={proj._id}>
              <td>{proj.name}</td>
              <td>{proj.description}</td>
              <td>
                <SkillTags skills={proj.requiredSkills} />
              </td>
              <td>{proj.status}</td>
              <td>{proj.teamSize}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteProject(proj._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chart */}
      <h2 className="mt-5">Team Utilization</h2>
      <div className="card p-4 shadow-sm">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ManagerDashboard;
