function createHeader(body) {
  const headerEl = document.createElement('header');
  const navEl = document.createElement('nav');
  const menuListEl = document.createElement('ul');
  const searchFormEl = document.createElement('form');
  const searchFormInputEl = document.createElement('input');
  const searchFormSubmitEl = document.createElement('input');

  searchFormInputEl.type = 'text';
  searchFormInputEl.name = 'search';
  searchFormInputEl.id = 'search-form';

  searchFormSubmitEl.type = 'submit';
  searchFormSubmitEl.value = 'search';

  searchFormEl.append(searchFormInputEl, searchFormSubmitEl);
  navEl.append(menuListEl, searchFormEl);
  headerEl.append(navEl);

  const menuItems = [
    {
      title: 'Home',
      path: '/index.html'
    },
    {
      title: 'Posts',
      path: '/posts.html'
    },
    {
      title: 'Users',
      path: '/users.html'
    },
    {
      title: 'Albums',
      path: '/albums.html'
    }
  ];

  menuItems.map(item => {
    const menuItemEl = document.createElement('li');
    const menuItemLinkEl = document.createElement('a');

    menuItemLinkEl.textContent = item.title;
    menuItemLinkEl.href = item.path;

    menuItemEl.append(menuItemLinkEl);
    
    menuListEl.append(menuItemEl);
  });

  searchFormEl.action = './search.html';
  

  body.append(headerEl);
};

function init() {
  const bodyElement = document.querySelector('body');

  createHeader(bodyElement);
};

init();