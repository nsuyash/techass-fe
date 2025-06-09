import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../api/api";

const ProfilePage = () => {
  const { token, user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    seniority: "",
    skills: [],
  });

  const [editMode, setEditMode] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        department: user.department || "",
        seniority: user.seniority || "",
        skills: user.skills || [],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (skillInput && !formData.skills.includes(skillInput)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // await updateProfile(token, user._id, formData);
      setSuccess("✅ Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Profile</h2>
        {!editMode && (
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        )}
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!editMode ? (
        <div className="card p-4 shadow-sm">
          <h5>Name: <span className="text-muted">{formData.name}</span></h5>
          <h5>Department: <span className="text-muted">{formData.department}</span></h5>
          {user.role === "engineer" && (
            <>
              <h5>Seniority: <span className="text-muted text-capitalize">{formData.seniority}</span></h5>
              <h5>Skills:</h5>
              <div>
                {formData.skills.length > 0 ? (
                  formData.skills.map(skill => (
                    <span key={skill} className="badge bg-secondary me-2">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-muted">No skills listed</p>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label>Department</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {user.role === "engineer" && (
            <>
              <div className="mb-3">
                <label>Seniority</label>
                <select
                  name="seniority"
                  value={formData.seniority}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select level</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid</option>
                  <option value="senior">Senior</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Skills</label>
                <div className="d-flex mb-2">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="form-control me-2"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="btn btn-outline-primary"
                  >
                    Add
                  </button>
                </div>
                <div>
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="badge bg-secondary me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      {skill} ✕
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="d-flex justify-content-between">
            <button className="btn btn-success" type="submit">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditMode(false);
                setSuccess("");
                setError("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
