async function init() {
  const queryParams = document.location.search;
  const urlParams = new URLSearchParams(queryParams);
  const search = urlParams.get('search');
  
  const searchResults = document.querySelector('#search-results');
  const searchPageTitle = document.createElement('h1');
  searchPageTitle.classList.add('page-title', 'search-page-title');
  searchPageTitle.textContent = `Results, search phrase: ${search}`;

  searchResults.append(searchPageTitle);

  const usersRes = await fetch(`https://jsonplaceholder.typicode.com/users?q=${search}`);
  const users = await usersRes.json();

  const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${search}`);
  const posts = await postsRes.json();

  const albumsRes = await fetch(`https://jsonplaceholder.typicode.com/albums?q=${search}`);
  const albums = await albumsRes.json()
  
  const formattedUsers = users.map(user => {
    const formattedUser = {
      id: user.id,
      title: user.name,
    }

    return formattedUser;
  });

  renderSearchResults({
    data: formattedUsers,
    parentElement: searchResults,
    title: 'Users',
    path: 'user',
  });

  renderSearchResults({
    data: posts,
    parentElement: searchResults,
    title: 'Posts',
    path: 'post',
  });

  const params = {
    data: albums,
    parentElement: searchResults,
    title: 'Albums',
    path: 'album',
  };

  renderSearchResults(params);
}

function renderSearchResults(paramsObj) {
  let { data, parentElement, title, path } = paramsObj;

  const wrapper = document.createElement('div');
  wrapper.classList.add('search-result-wrapper');
  parentElement.append(wrapper);

  const wrapperTitle = document.createElement('h2');
  wrapperTitle.classList.add('search-wrapper-title');

  wrapper.append(wrapperTitle);

  if (data.length > 0) {
    wrapperTitle.textContent = title + ':';

    const list = document.createElement('ul');
    list.classList.add('search-list');

    wrapper.append(list);

    data.map(item => {
      const itemElement = document.createElement('li');
      itemElement.classList.add('search-list-item');

      const linkElement = document.createElement('a');
      linkElement.textContent = item.title;
      linkElement.href = `./${path}.html?${path}_id=${item.id}`;

      itemElement.append(linkElement);
      list.append(itemElement);
    })
  } else {
    wrapperTitle.textContent = 'No ' + title.toLowerCase() + '... :(';
  }
}

init();