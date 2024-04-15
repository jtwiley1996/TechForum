// Function set up so users can create new blog posts
async function newPostHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector("#update-title").value.trim();
    const content = document.querySelector("#update-content").value.trim();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    if (title && content) {
      const response = await fetch(`/api/dashboard/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  // Event Listener
  document
    .querySelector(".update-post-form")
    .addEventListener("submit", newPostHandler);
  