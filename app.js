async function generateWrapped() {
  const username = document.getElementById("username").value;
  const output = document.getElementById("output");

  output.innerHTML = "Loading...";

  try {
    const user = await getUser(username);
    const repos = await getRepos(username);

    const stats = buildStats(user, repos);

    output.innerHTML = `
      <div class="card">
        <h2>@${stats.username}</h2>
        <p>Repos: ${stats.repos}</p>
        <p>Stars: ${stats.stars}</p>
        <p>Followers: ${stats.followers}</p>
        <p>Top Language: ${stats.topLanguage}</p>
      </div>
    `;
  } catch (err) {
    output.innerHTML = "Error fetching data.";
  }
}
