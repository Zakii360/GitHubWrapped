async function loadLeaderboard() {
  const { data } = await supabaseClient
    .from("profiles")
    .select("*")
    .order("stars", { ascending: false })
    .limit(10);

  const board = document.getElementById("leaderboard");

  board.innerHTML = `
    <h2>🔥 Global Wrapped Leaderboard</h2>

    <div class="grid">
      ${data.map((u, i) => `
        <div class="card">
          <div>#${i + 1}</div>
          <img src="${u.avatar}" width="50" />
          <div>@${u.username}</div>
          <div>⭐ ${u.stars}</div>
          <div>📦 ${u.repos}</div>
          <div>👥 ${u.followers}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function subscribeLeaderboardLive() {
  supabaseClient
    .channel("profiles-live")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "profiles" },
      () => {
        loadLeaderboard();
      }
    )
    .subscribe();
}

loadLeaderboard();
subscribeLeaderboardLive();
