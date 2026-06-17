async function generateWrapped() {
  const username = document.getElementById("username").value;

  const user = await getUser(username);
  const repos = await getRepos(username);
  const stats = buildStats(user, repos);

  // SAVE TO SUPABASE GLOBAL LEADERBOARD
  await supabaseClient.from("profiles").upsert({
    username: stats.username,
    avatar: stats.avatar,
    stars: stats.stars,
    repos: stats.repos,
    followers: stats.followers,
    top_language: stats.topLanguage,
    updated_at: new Date()
  });

  document.getElementById("output").innerHTML = `
    <div class="grid">
      <div class="card">@${stats.username}</div>
      <div class="card">⭐ ${stats.stars}</div>
      <div class="card">📦 ${stats.repos}</div>
      <div class="card">👥 ${stats.followers}</div>
      <div class="card">💻 ${stats.topLanguage}</div>
    </div>
  `;
}
