const API_BASE = "http://localhost:3000";

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const fetchProfile = async (token) => {
    const res = await fetch(`${API_BASE}/auth/profile`, {
    headers: { Authorization: `${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

export const fetchEngineers = async (token) => {
  const res = await fetch(`${API_BASE}/engineers/`, {
    headers: { Authorization: `${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch engineers");
  return res.json();
};

export const fetchProjects = async (token) => {
  const res = await fetch(`${API_BASE}/projects`, {
    headers: { Authorization: `${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

export const createProject = async (token, projectData) => {
  const res = await fetch(`${API_BASE}/projects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `${token}` },
    body: JSON.stringify(projectData),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
};

export const deleteProject = async (token, projectId) => {
  const res = await fetch(`${API_BASE}/projects/${projectId}`, {
    method: "DELETE",
    headers: { Authorization: `${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
};


export const fetchAssignments = async (token) => {
  const res = await fetch(`${API_BASE}/assignments/`, {
    headers: { Authorization: `${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch assignments");
  return res.json();
};

export const createAssignment = async (token, assignmentData) => {
  const res = await fetch(`${API_BASE}/assignments`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `${token}` },
    body: JSON.stringify(assignmentData),
  });
  if (!res.ok) throw new Error("Failed to create assignment");
  return res.json();
};

export const updateProfile = async (token, userId, updates) => {
  const res = await fetch(`/auth/profile/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(updates),
  });

  return await res.json();
};
