function renderAllUsers(bodyEl) {
  const usersWrapperEl = document.createElement('div');
  usersWrapperEl.classList.add('users-wrapper');

  bodyEl.append(usersWrapperEl);

  fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
    .then(res => res.json())
    .then(users => {
      let usersListEl = document.createElement('ul');
      usersListEl.classList.add('users-list');

      let pageHeaderEl = document.createElement('h2');
      pageHeaderEl.textContent = 'List of all users:'

      usersWrapperEl.append(pageHeaderEl, usersListEl);

      users.map(user => {
        let userListEl = document.createElement('li');
        userListEl.innerHTML = `<a href="user.html?user_id=${user.id}">${user.name} </a>Has ${user.posts.length} post(s)`

        usersListEl.append(userListEl);
      });
    });
};

function init() {
  const bodyElement = document.querySelector('body');

  renderAllUsers(bodyElement);
};

init();
