import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createAssignment, fetchEngineers, fetchProjects } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AssignmentForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eng, proj] = await Promise.all([
          fetchEngineers(token),
          fetchProjects(token),
        ]);
        setEngineers(eng);
        setProjects(proj);
      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchError('❌ Failed to load engineers or projects.');
      }
    };
    loadData();
  }, [token]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createAssignment(token, data);
      alert('✅ Assignment created successfully');
      reset();
      navigate('/manager'); // Redirect only after successful assignment
    } catch (err) {
      console.error(err);
      alert('❌ Failed to create assignment: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Assign Engineer to Project</h2>

      {fetchError && <div className="alert alert-danger">{fetchError}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 shadow-sm bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Engineer</label>
          <select className="form-select" {...register('engineerId', { required: true })}>
            <option value="">-- Select Engineer --</option>
            {engineers.map((e) => (
              <option key={e._id} value={e._id}>{e.name}</option>
            ))}
          </select>
          {errors.engineerId && <small className="text-danger">Engineer is required</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Project</label>
          <select className="form-select" {...register('projectId', { required: true })}>
            <option value="">-- Select Project --</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
          {errors.projectId && <small className="text-danger">Project is required</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Allocation (%)</label>
          <input
            type="number"
            className="form-control"
            {...register('allocationPercentage', { required: true, min: 1, max: 100 })}
          />
          {errors.allocationPercentage && (
            <small className="text-danger">Allocation must be between 1-100%</small>
          )}
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Start Date</label>
            <input type="date" className="form-control" {...register('startDate', { required: true })} />
            {errors.startDate && <small className="text-danger">Start date is required</small>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">End Date</label>
            <input type="date" className="form-control" {...register('endDate', { required: true })} />
            {errors.endDate && <small className="text-danger">End date is required</small>}
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Role</label>
          <input type="text" className="form-control" {...register('role', { required: true })} />
          {errors.role && <small className="text-danger">Role is required</small>}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Assigning...' : 'Assign Engineer'}
        </button>
      </form>
    </div>
  );
};

export default AssignmentForm;
