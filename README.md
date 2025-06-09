# Engineering Resource Management System ⚙️
A comprehensive MERN stack application designed to streamline engineering resource management. The system enables managers to efficiently oversee team capacity, projects, and assignments, while engineers can track and manage their own profiles and work allocations.

## 🧑‍💼 User Roles & Views
* Manager View – Team Overview Dashboard
* Visualize each engineer’s skills, seniority, availability, and utilization.
* Interactive charts to monitor team capacity and workload distribution.
* Create Project & Assignment
* Forms to create new projects with essential details.
* Assign engineers to projects with allocation percentages, roles, and timelines.
* Engineer View – My Assignments
* Engineers can log in to update their profiles.
* View current project assignments and allocation details.

## ✅ Features
* Secure Authentication: Role-based login for Managers and Engineers with protected access.
* Team Overview Dashboard: Real-time insights on team utilization, capacity, and skill distribution.
* Project Management: Create, edit, delete, and filter projects by status (active, completed, etc.).
* Assignment Management: Allocate engineers to projects with customizable allocation %, start/end dates, and roles.
* Engineer Dashboard: Personalized view for engineers to manage profile and track assignments.
* Powerful Search & Filtering: Filter engineers by skills and projects by status for quick access.

## 🚀 Getting Started
* Manager Login Credentials
Username: manager@example.com
Password: password

* Engineer Login Credentials
Username: bob@example.com

Password: password

## 🛠️ Tech Stack
* Frontend: React.js, React Router, Bootstrap
* Authentication: JWT-based secure login

## 📁 API Endpoints (Example)
* POST /auth/login – User login
* GET /engineers – Get list of engineers
* GET /projects – List projects
* POST /projects – Create new project
* POST /assignments – Assign engineers to projects

## 📄 Additional Notes
* Ensure MongoDB is running locally or configured with your cloud provider.
* Configure environment variables for database connection and JWT secret.
* Use the manager credentials for admin access to the dashboard features.

## ⚙️ Getting Started

**Clone the repo**  
   ```bash
   git clone https://github.com/your-username/engineering-resource-mgmt.git
   cd erms-fe

## 👤 Contact
* Developed by Suyash Nandurkar – feel free to reach out at suyashnandurkar53@gmail.com