// https://jsonplaceholder.typicode.com/posts

function renderPosts() {
  const bodyElement = document.querySelector('body');
  const postsWrapperEl = document.createElement('div');

  bodyElement.append(postsWrapperEl);

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
        postAuthorLinkEl.innerHTML = `Author: <a href="$">${postAuthorName}</a>`;
        

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

        postsWrapperEl.append(postWrapperEl,commentsWrapperEl)
      });
    });
};

renderPosts();