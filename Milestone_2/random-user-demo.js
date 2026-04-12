const loadUsersBtn = document.getElementById("load-users-btn");
const refreshUsersBtn = document.getElementById("refresh-users-btn");
const statusBox = document.getElementById("status");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search-input");
const countryFilter = document.getElementById("country-filter");
const sortSelect = document.getElementById("sort-select");

let allUsers = [];

async function fetchUsers() {
  statusBox.textContent = "Loading users...";
  userList.innerHTML = "";
  loadUsersBtn.disabled = true;
  refreshUsersBtn.disabled = true;

  try {
    const response = await fetch("https://randomuser.me/api/?results=8");
    const data = await response.json();

    allUsers = data.results.map(function (user) {
      return {
        fullName: user.name.first + " " + user.name.last,
        email: user.email,
        phone: user.phone,
        country: user.location.country,
        city: user.location.city,
        picture: user.picture.large
      };
    });

    populateCountryFilter(allUsers);
    updateView();
  } catch (error) {
    statusBox.textContent = "Unable to fetch users right now.";
    userList.innerHTML = `
      <article class="empty-state">
        <h2>Fetch failed</h2>
        <p>Please try again.</p>
      </article>
    `;
  } finally {
    loadUsersBtn.disabled = false;
    refreshUsersBtn.disabled = false;
  }
}

function populateCountryFilter(users) {
  const countries = users
    .map(function (user) {
      return user.country;
    })
    .filter(function (country, index, array) {
      return array.indexOf(country) === index;
    })
    .sort(function (a, b) {
      a = a.toLowerCase();
      b = b.toLowerCase();

      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

  countryFilter.innerHTML = '<option value="all">All Countries</option>' +
    countries.map(function (country) {
      return '<option value="' + country + '">' + country + '</option>';
    }).join("");
}

function getVisibleUsers() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedCountry = countryFilter.value;
  const sortValue = sortSelect.value;

  const filteredUsers = allUsers.filter(function (user) {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.country.toLowerCase().includes(searchValue);

    const matchesCountry =
      selectedCountry === "all" || user.country === selectedCountry;

    return matchesSearch && matchesCountry;
  });

  return filteredUsers.sort(function (a, b) {
    const nameA = a.fullName.toLowerCase();
    const nameB = b.fullName.toLowerCase();
    const countryA = a.country.toLowerCase();
    const countryB = b.country.toLowerCase();

    if (sortValue === "name-asc") {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
    }

    if (sortValue === "name-desc") {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
    }

    if (sortValue === "country-asc") {
      if (countryA < countryB) return -1;
      if (countryA > countryB) return 1;
    }

    if (sortValue === "country-desc") {
      if (countryA > countryB) return -1;
      if (countryA < countryB) return 1;
    }

    return 0;
  });
}

function updateView() {
  if (allUsers.length === 0) {
    statusBox.textContent = "Click the button to fetch users.";
    userList.innerHTML = "";
    return;
  }

  const visibleUsers = getVisibleUsers();

  if (visibleUsers.length === 0) {
    statusBox.textContent = "No users matched your search or filter.";
    userList.innerHTML = `
      <article class="empty-state">
        <h2>No users found</h2>
        <p>Try a different search, filter, or sort option.</p>
      </article>
    `;
    return;
  }

  statusBox.textContent = "Showing " + visibleUsers.length + " of " + allUsers.length + " users.";

  userList.innerHTML = visibleUsers.map(function (user) {
    return `
      <article class="card">
        <img src="${user.picture}" alt="${user.fullName}">
        <h2>${user.fullName}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Location:</strong> ${user.city}, ${user.country}</p>
      </article>
    `;
  }).join("");
}

loadUsersBtn.addEventListener("click", fetchUsers);
refreshUsersBtn.addEventListener("click", fetchUsers);
searchInput.addEventListener("input", updateView);
countryFilter.addEventListener("change", updateView);
sortSelect.addEventListener("change", updateView);
