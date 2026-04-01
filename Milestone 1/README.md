Employee & Admin Dashboard System

A responsive web application for managing employee data and tasks through role-based dashboards — built with vanilla JavaScript, Fetch API, and the Random User API.

 Project Overview

The **Employee & Admin Dashboard System** is a frontend web application that simulates a real-world HR management interface. It provides separate dashboards for **Admins** and **Employees**, enabling dynamic management of employee records and task assignments — all powered by live API data.

This project demonstrates core frontend development skills including API integration, dynamic UI rendering, and interactive data manipulation using JavaScript Array Higher-Order Functions (HOFs).

---

Objective

To build a fully responsive web application that:

- Fetches real employee data from a public API using `fetch`
- Displays and manages employee records dynamically
- Implements search, filtering, and sorting exclusively using JavaScript HOFs (`map`, `filter`, `sort`, `find`, `reduce`)
- Provides an interactive, role-based dashboard experience

---

API Used

**Random User API** — https://randomuser.me/

Used to dynamically fetch employee data (names, photos, departments, roles) via the Fetch API. This replaces the need for a backend database during development.

---

Features

Authentication System
- Login screen with role selection: **Admin** or **Employee**
- Role-based UI rendering — each role sees a different dashboard

Admin Dashboard
- View the full list of all employees fetched from the API
- Assign tasks to employees
- Manage and update task statuses

Employee Dashboard
- View personal profile and assigned tasks
- Mark tasks as completed / in-progress
- Track task completion status

Search
- Search employees by **name** or **role** in real time
- Implemented using `.filter()` HOF
- Debounced input to avoid excessive re-renders on every keystroke

Filtering
- Filter employees by **department**
- Filter tasks by **status** (pending / in-progress / completed)
- Implemented using `.filter()` HOF

Sorting
- Sort employee list by **name** (A–Z / Z–A)
- Sort tasks by **priority** and **completion status**
- Implemented using `.sort()` HOF

Task Interactions
- Mark tasks as complete with a single click
- Real-time status update on the dashboard

Data Persistence
- User preferences and task updates saved via **Local Storage**
- Dark/Light mode preference persisted across sessions

Dark Mode / Light Mode
- Theme toggle button available on all pages
- Theme preference saved to Local Storage

---

 Bonus Features

| Feature | Description |
|---|---|
| **Debounced Search** | Limits search re-renders to improve performance |
| **Pagination** | Employee list split across pages for better readability |
| **Loading Indicators** | Spinner shown during API fetch calls |
| **Local Storage** | Persists favorites, task states, and theme preference |



Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, layout, responsive design |
| JavaScript (ES6+) | Logic, DOM manipulation, HOFs |
| Fetch API | API calls to Random User API |
| Local Storage | Client-side data persistence |

 No external frameworks or libraries are used. This is a **JavaScript** project.



 Project Structure

```
employee-dashboard/
│
├── index.html          # Login / landing page
├── admin.html          # Admin dashboard page
├── employee.html       # Employee dashboard page
│
├── css/
│   └── style.css       # Main stylesheet (responsive design)
│
├── js/
│   ├── api.js          # Fetch API calls and data handling
│   ├── auth.js         # Login and role-based routing logic
│   ├── admin.js        # Admin dashboard logic
│   ├── employee.js     # Employee dashboard logic
│   └── utils.js        # Reusable helpers (search, filter, sort, debounce)
│
└── README.md
```




