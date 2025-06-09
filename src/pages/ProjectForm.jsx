import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { createProject } from "../api/api";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    data.requiredSkills = data.requiredSkills.split(",").map(s => s.trim());
    data.teamSize = data.teamSize ? Number(data.teamSize) : undefined;
    data.managerId = user._id;

    try {
      await createProject(token, data);
      alert("✅ Project created successfully");
      navigate("/manager");
    } catch (err) {
      alert("❌ Failed to create project: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-5">
          <h2 className="mb-4 text-center">Create New Project</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-3">
              <label className="form-label fw-semibold">Project Name</label>
              <input className="form-control" {...register("name", { required: true })} />
              {errors.name && <small className="text-danger">Name is required</small>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea className="form-control" rows={3} {...register("description")} />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Start Date</label>
                <input type="date" className="form-control" {...register("startDate", { required: true })} />
                {errors.startDate && <small className="text-danger">Start Date is required</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">End Date</label>
                <input type="date" className="form-control" {...register("endDate", { required: true })} />
                {errors.endDate && <small className="text-danger">End Date is required</small>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Required Skills <small className="text-muted">(comma separated)</small>
              </label>
              <input className="form-control" {...register("requiredSkills", { required: true })} />
              {errors.requiredSkills && <small className="text-danger">Required skills are required</small>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Team Size</label>
              <input type="number" className="form-control" {...register("teamSize", { min: 1 })} />
              {errors.teamSize && <small className="text-danger">Team size must be at least 1</small>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Status</label>
              <select className="form-select" {...register("status", { required: true })}>
                <option value="">-- Select Status --</option>
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && <small className="text-danger">Status is required</small>}
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2">
              Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
