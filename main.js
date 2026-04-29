async function loadJson(path) {
  const response = await fetch(`${path}?_=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }
  return response.json();
}

function renderIntro(content) {
  const intro = document.getElementById("introduction");
  intro.classList.add("intro", "card");
  intro.innerHTML = `
    <img src="${content.photo}" alt="Profile photo" />
    <div>
      <h2>${content.name}</h2>
      <p class="subtitle">${content.jobTitle}</p>
      <p class="about">${content.about}</p>
      <div class="links intro-links">
        <a href="${content.cvLink}" target="_blank" rel="noopener noreferrer">CV</a>
        <a href="${content.scholarLink}" target="_blank" rel="noopener noreferrer">Google Scholar</a>
        <a href="${content.twitterLink}" target="_blank" rel="noopener noreferrer">twitter</a>
        <a href="${content.githubLink}" target="_blank" rel="noopener noreferrer">github</a>
        <span class="contact">${content.email}</span>
      </div>
    </div>
  `;

  document.getElementById("site-title").textContent = content.name;
  document.getElementById("footer-name").textContent = content.name;
}

function renderPublications(publications) {
  const container = document.getElementById("publications-list");
  container.innerHTML = publications
    .map((pub) => {
      const blog = pub.blogLink
        ? `<a href="${pub.blogLink}" target="_blank" rel="noopener noreferrer">Blog</a>`
        : "";
      const dataset = pub.datasetLink
        ? `<a href="${pub.datasetLink}" target="_blank" rel="noopener noreferrer">Dataset</a>`
        : "";
      const authors = pub.authors
        .replaceAll("G Ramírez", "<strong>G Ramírez</strong>")
        .replaceAll("G Ramirez", "<strong>G Ramirez</strong>");
      const authorLine = authors;
      const venue = pub.venue ? `<p class="venue"><em>${pub.venue}</em></p>` : "";
      const summary = pub.summary ? `<p>${pub.summary}</p>` : "";
      const mediaClass = pub.mediaClass ? ` ${pub.mediaClass}` : "";
      const media =
        pub.mediaType === "pdf"
          ? `<object class="publication-media${mediaClass}" data="${pub.image}" type="application/pdf" aria-label="Preview for ${pub.title}">
               <a href="${pub.image}" target="_blank" rel="noopener noreferrer">Open preview</a>
             </object>`
          : `<img class="publication-media${mediaClass}" src="${pub.image}" alt="Cover for ${pub.title}" />`;

      return `
      <article class="publication">
        <h3 class="publication-title">${pub.title}</h3>
        <div class="publication-left">
          ${media}
          ${venue}
        </div>
        <div class="publication-right">
          <p class="authors">${authorLine}</p>
          ${summary}
          <div class="links">
            ${blog}
            ${dataset}
            <a href="${pub.paperLink}" target="_blank" rel="noopener noreferrer">Paper</a>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

function renderNews(items) {
  const list = document.getElementById("news-list");
  list.innerHTML = items
    .map((item) => `<li><strong>${item.date}:</strong> ${item.text}</li>`)
    .join("");
}

async function init() {
  const [introResult, publicationsResult, newsResult] = await Promise.allSettled([
    loadJson("data/profile.json"),
    loadJson("data/publications.json"),
    loadJson("data/news.json"),
  ]);

  if (introResult.status === "fulfilled") {
    renderIntro(introResult.value);
  }

  if (publicationsResult.status === "fulfilled") {
    renderPublications(publicationsResult.value);
  }

  if (newsResult.status === "fulfilled") {
    renderNews(newsResult.value);
  } else {
    const list = document.getElementById("news-list");
    list.innerHTML = "<li>Could not load News data. Check data/news.json formatting.</li>";
  }

  document.getElementById("year").textContent = new Date().getFullYear();
}

init().catch((error) => {
  console.error(error);
  document.body.innerHTML = "<p style='padding:1rem'>Could not load website content.</p>";
});
