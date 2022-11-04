import createHeader from './header.js';

async function renderAlbum(bodyEl, albumId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/?_embed=photos&_expand=user`);
  const album = await res.json();

  let albumNameEl = document.createElement('h1');
  let albumAuthorsNameEl = document.createElement('h3');
  let albumPhotosWrapperEl = document.createElement('div');
  albumPhotosWrapperEl.classList.add('album-photos-wrapper');

  albumNameEl.textContent = album.title;
  albumAuthorsNameEl.innerHTML = `By: <a href="/user.html?user_id=${album.user.id}">${album.user.name}</a>`;

  album.photos.map(photo => {
    let photoEl = document.createElement('img');

    photoEl.src = photo.url;
    photoEl.alt = photo.title;

    albumPhotosWrapperEl.append(photoEl);
  });

  bodyEl.append(albumNameEl, albumAuthorsNameEl, albumPhotosWrapperEl);
};

function init() {
  const bodyElement = document.querySelector('body');
  const queryParams = document.location.search;
  const urlParams = new URLSearchParams(queryParams);
  const albumId = urlParams.get('album_id');

  createHeader();
  renderAlbum(bodyElement, albumId);
};

init();
