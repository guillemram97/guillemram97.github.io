async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }
  return response.json();
}

async function initBlog() {
  const config = await loadJson("data/config.json");
  const posts = await loadJson("data/posts.json");

  document.getElementById("blog-title").textContent = config.title;
  document.getElementById("blog-description").textContent = config.description;

  const postsRoot = document.getElementById("posts");
  postsRoot.innerHTML = posts
    .map(
      (post) => `
      <article class="post">
        <h3>${post.title}</h3>
        <p><strong>${post.date}</strong></p>
        <p>${post.summary}</p>
        <p><a href="${post.url}" target="_blank" rel="noopener noreferrer">Read post</a></p>
      </article>
    `
    )
    .join("");
}

initBlog().catch((error) => {
  console.error(error);
  document.body.innerHTML = "<p style='padding:1rem'>Could not load blog content.</p>";
});
