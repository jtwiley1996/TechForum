async function newCommentHandler(event) {
    event.preventDefault();
  
    // get text and trim whitespace
    const comment_text = document.getElementById("comment_text").value.trim();
    // get post id from URL
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];
  
    if (comment_text) {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify({
          post_id,
          comment_text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }
  document
    .querySelector('.add-comment-form')
    .addEventListener('submit', newCommentHandler);