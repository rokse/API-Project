function renderAlbum(bodyEl, albumId) {
  fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/?_embed=photos&_expand=user`)
    .then(res => res.json())
    .then(album => {
      console.log(album.user.id)
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
    });
};

function init() {
  const bodyElement = document.querySelector('body');
  const queryParams = document.location.search;
  const urlParams = new URLSearchParams(queryParams);
  const albumId = urlParams.get('album_id');

  renderAlbum(bodyElement, albumId);
};

init();
