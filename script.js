function renderPosts(bodyEl) {
  const postsWrapperEl = document.createElement('div');

  bodyEl.append(postsWrapperEl);

  fetch(`https://jsonplaceholder.typicode.com/posts?_limit=15&_embed=comments&_expand=user`)
    .then(res => res.json())
    .then(data => {
      data.map(post => {
        let postWrapperEl = document.createElement('div');
        let postTitleEl = document.createElement('h2');
        let postTextEl = document.createElement('p');
        let postAuthorLinkEl = document.createElement('p');
        
        let commentsWrapperEl = document.createElement('div');
        let commentsHeaderEl = document.createElement('h3');
        
        let postTitleTxt = post.title;
        let postParagraphTxt = post.body;
        let postAuthorName = post.user.name;
        
        postTitleEl.textContent = postTitleTxt;
        postTextEl.textContent = postParagraphTxt;
        commentsHeaderEl.textContent = 'Comments:'
        postAuthorLinkEl.innerHTML = `Author: <a href="/user.html">${postAuthorName}</a>`;
        

        post.comments.map(comment => {
          let commentNameEl = document.createElement('h4');
          let commentTextEl = document.createElement('p');
          let commentAuthorEmailEl = document.createElement('span');

          commentNameEl.textContent = comment.name;            
          commentTextEl.textContent = comment.body;
          commentAuthorEmailEl.textContent = comment.email;

          commentsWrapperEl.append(commentNameEl, commentTextEl, commentAuthorEmailEl)
        });

        commentsWrapperEl.prepend(commentsHeaderEl);

        postWrapperEl.append(postTitleEl, postAuthorLinkEl, postTextEl);

        postsWrapperEl.append(postWrapperEl, commentsWrapperEl)
      });
    });
};

function renderAlbums(bodyEl) {
  const albumWrapperEl = document.createElement('div');
  albumWrapperEl.classList.add('albums-wrapper');

  bodyEl.append(albumWrapperEl);

  fetch(`https://jsonplaceholder.typicode.com/albums?_limit=15&_embed=photos&_expand=user`)
    .then(res => res.json())
    .then(albums => {
      albums.map(album => {
        let albumNameEl = document.createElement('h3');
        let albumAuthorsName = document.createElement('p');
        let albumPhotosThumbnail = document.createElement('img');

        albumNameEl.innerHTML = `<a href="/album.html">${album.title}</a>`;
        albumAuthorsName.textContent = `Created by: ${album.user.name}`;
        
        albumPhotosThumbnail.src = album.photos[0].thumbnailUrl;
        albumPhotosThumbnail.alt = album.photos[0].title;

        albumWrapperEl.append(albumNameEl, albumAuthorsName, albumPhotosThumbnail);
      });
    });
};

function init() {
  const bodyElement = document.querySelector('body');

  renderPosts(bodyElement);
  renderAlbums(bodyElement);
};

init();
