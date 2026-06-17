async function generateWrapped() {
  const username = document.getElementById("username").value;
  const output = document.getElementById("output");

  output.innerHTML = "Loading...";

  try {
    const user = await getUser(username);
    const repos = await getRepos(username);

    const stats = buildStats(user, repos);

    output.innerHTML = `
      <div class="fade-in">
        <div class="title">@${stats.username} Wrapped</div>

        <div class="grid">
          <div class="card">
            <h3>Repos</h3>
            <p>${stats.repos}</p>
          </div>

          <div class="card">
            <h3>Stars</h3>
            <p>${stats.stars}</p>
          </div>

          <div class="card">
            <h3>Followers</h3>
            <p>${stats.followers}</p>
          </div>

          <div class="card">
            <h3>Top Language</h3>
            <p>${stats.topLanguage}</p>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    output.innerHTML = `<div class="card">Error loading data</div>`;
  }
}
