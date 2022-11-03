function renderPost(bodyEl, postId) {
  const postWrapperEl = document.createElement('div');
  postWrapperEl.classList.add('post-wrapper');

  bodyEl.append(postWrapperEl);

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}?_expand=user&_embed=comments`)
    .then(res => res.json())
    .then(post => {
      let postNameEl = document.createElement('h2');
      let postAuthorEl = document.createElement('h4');
      let postContentEl = document.createElement('p');
      let linkToOtherAuthorPostsEl = document.createElement('a');

      let commentsWrapperEl = document.createElement('div');
      let commentsHeaderEl = document.createElement('h3');

      postNameEl.textContent = post.title;
      postAuthorEl.innerHTML = `By: <a href="/user.html?user_id=${post.user.id}">${post.user.name}</a>`;
      postContentEl.textContent = post.body;
      linkToOtherAuthorPostsEl.textContent = 'More posts by the author...';
      linkToOtherAuthorPostsEl.href = '/posts.html?post_id=' + post.id;
      commentsHeaderEl.textContent = 'Comments:';

      postWrapperEl.append(postNameEl, postAuthorEl, postContentEl);

      post.comments.map(comment => {
        let commentNameEl = document.createElement('h4');
        let commentTextEl = document.createElement('p');
        let commentAuthorEmailEl = document.createElement('span');

        commentNameEl.textContent = comment.name;            
        commentTextEl.textContent = comment.body;
        commentAuthorEmailEl.textContent = comment.email;

        commentsWrapperEl.append(commentNameEl, commentTextEl, commentAuthorEmailEl)
      });

      bodyEl.append(commentsHeaderEl, commentsWrapperEl, linkToOtherAuthorPostsEl)
    });
};

function init() {
  const bodyElement = document.querySelector('body');
  const queryParams = document.location.search;
  const urlParams = new URLSearchParams(queryParams);
  const postId = urlParams.get('post_id');
  const userId = urlParams.get('user_id');

  renderPost(bodyElement, postId);
};

init();

