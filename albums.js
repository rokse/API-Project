import createHeader from './header.js';

function renderAllAlbums(bodyEl) {
  const albumsWrapperEl = document.createElement('div');
  albumsWrapperEl.classList.add('albums-wrapper')
  
  bodyEl.append(albumsWrapperEl);

  fetch('https://jsonplaceholder.typicode.com/albums?_limit=15&_embed=photos&_expand=user')
  .then(res => res.json())
  .then(albums => {
    albums.map(album => {
        let albumWrapperEl = document.createElement('div');
        albumWrapperEl.classList.add('album-wrapper');

        let albumNameEl = document.createElement('h3');
        let albumAuthorsNameEl = document.createElement('p');
        let albumPhotosCountEl = document.createElement('p');
        let albumPhotosThumbnailEl = document.createElement('img');

        albumNameEl.innerHTML = `<a href="/album.html?album_id=${album.id}">${album.title}</a>`;
        albumAuthorsNameEl.innerHTML = `Created by: <a href="/user.html?user_id=${album.user.id}">${album.user.name}</a>`;
        albumPhotosCountEl.textContent = `Total photos: ${album.photos.length}` 
        
        albumPhotosThumbnailEl.src = album.photos[0].thumbnailUrl;
        albumPhotosThumbnailEl.alt = album.photos[0].title;

        albumWrapperEl.append(albumNameEl, albumAuthorsNameEl, albumPhotosCountEl, albumPhotosThumbnailEl);

        albumsWrapperEl.append(albumWrapperEl);
      });
    });
};

// function currentPageMarkOnNavEl() {
//   console.log(document.location.pathname)
//   let currentPath = document.location.pathname;

//   if (currentPath === )
// };

function init() {
  const bodyElement = document.querySelector('body');

  createHeader();
  renderAllAlbums(bodyElement);
};

init();
