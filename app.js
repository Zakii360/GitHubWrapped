async function generateWrapped() {
  const username = document.getElementById("username").value;
  const output = document.getElementById("output");

  output.innerHTML = "Loading...";

  const user = await getUser(username);
  const repos = await getRepos(username);
  const stats = buildStats(user, repos);

  // save to leaderboard
  await supabaseClient.from("leaderboard").upsert({
    username: stats.username,
    stars: stats.stars,
    followers: stats.followers,
    repos: stats.repos,
    updated_at: new Date()
  });

  output.innerHTML = `
    <div class="grid">

      <div class="card">
        <img src="${stats.avatar}" width="80"/>
        <h3>@${stats.username}</h3>
      </div>

      <div class="card">⭐ ${stats.stars}</div>
      <div class="card">📦 ${stats.repos}</div>
      <div class="card">👥 ${stats.followers}</div>
      <div class="card">💻 ${stats.topLanguage}</div>

    </div>

    <button onclick="downloadCard()">Download Card</button>
  `;
}
