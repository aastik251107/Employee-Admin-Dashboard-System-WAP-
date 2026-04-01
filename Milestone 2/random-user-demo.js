const loadUsersBtn = document.getElementById("load-users-btn");
const refreshUsersBtn = document.getElementById("refresh-users-btn");
const statusBox = document.getElementById("status");
const userList = document.getElementById("user-list");

async function fetchUsers() {
  statusBox.textContent = "Loading users...";
  userList.innerHTML = "";
  loadUsersBtn.disabled = true;
  refreshUsersBtn.disabled = true;

  try {
    const response = await fetch("https://randomuser.me/api/?results=6");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    renderUsers(data.results);
    statusBox.textContent = `Loaded ${data.results.length} random users successfully.`;
  } catch (error) {
    statusBox.textContent = "Unable to fetch users right now. Please try again.";
    userList.innerHTML = `
      <article class="empty-state">
        <h2>Fetch failed</h2>
        <p>${error.message}</p>
      </article>
    `;
  } finally {
    loadUsersBtn.disabled = false;
    refreshUsersBtn.disabled = false;
  }
}

function renderUsers(users) {
  userList.innerHTML = users
    .map((user) => {
      const fullName = `${user.name.first} ${user.name.last}`;
      const address = `${user.location.city}, ${user.location.country}`;

      return `
        <article class="card">
          <img src="${user.picture.large}" alt="${fullName}" />
          <h2>${fullName}</h2>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Location:</strong> ${address}</p>
        </article>
      `;
    })
    .join("");
}

loadUsersBtn.addEventListener("click", fetchUsers);
refreshUsersBtn.addEventListener("click", fetchUsers);
