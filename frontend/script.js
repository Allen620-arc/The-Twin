document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postForm");
  const blogPostsContainer = document.getElementById("blogPostsContainer");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const postData = {
      title: formData.get("title"),
      content: formData.get("content"),
      author: formData.get("author"),
    };

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Handle success, e.g., display a success message or redirect to a confirmation page
        console.log("Blog post created successfully");
        form.reset(); // Optional: Reset the form after successful submission
      } else {
        // Handle error response
        console.error("Failed to create blog post");
      }
    } catch (error) {
      // Handle network errors
      console.error("An error occurred:", error);
    }
  });

  fetchBlogPosts();

  async function fetchBlogPosts() {
    try {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const posts = await response.json();

        // Clear existing content in the container
        blogPostsContainer.innerHTML = "";

        // Loop through the posts and create HTML elements to display them
        posts.forEach((post) => {
          const article = document.createElement("article");
          const title = document.createElement("h2");
          title.textContent = post.title;
          const content = document.createElement("p");
          content.textContent = post.content;
          const publishedDate = document.createElement("p");
          publishedDate.textContent = `Published on ${post.publishedDate}`;
          const author = document.createElement("p");
          author.textContent = `by ${post.author}`;

          article.appendChild(title);
          article.appendChild(content);
          article.appendChild(publishedDate);
          article.appendChild(author);

          blogPostsContainer.appendChild(article);
        });
      } else {
        console.error("Failed to fetch blog posts");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
});
