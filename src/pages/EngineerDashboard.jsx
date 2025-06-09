import React, { useEffect, useState } from "react";
import { fetchAssignments, fetchProjects } from "../api/api";
import { useAuth } from "../context/AuthContext";
import SkillTags from "../components/SkillTags";
import { useNavigate } from "react-router-dom"; // 🧭 Add this for navigation

const EngineerDashboard = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate(); // 🧭 Initialize navigation
  const [assignments, setAssignments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const assgn = await fetchAssignments(token);
        const proj = await fetchProjects(token);
        setAssignments(assgn.filter(a => a.engineerId._id === user._id));
        setProjects(proj);
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, [token, user]);

  const getProject = (id) => projects.find(p => p._id === id) || {};

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Assignments</h2>
        <button className="btn btn-primary" onClick={() => navigate("/profile")}>
          View Profile
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {assignments.length === 0 && <p>No current assignments.</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Description</th>
            <th>Allocation %</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Required Skills</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => {
            const project = getProject(a.projectId._id);
            return (
              <tr key={a._id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{a.allocationPercentage}</td>
                <td>{a.startDate?.slice(0, 10)}</td>
                <td>{a.endDate?.slice(0, 10)}</td>
                <td><SkillTags skills={project.requiredSkills || []} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EngineerDashboard;
