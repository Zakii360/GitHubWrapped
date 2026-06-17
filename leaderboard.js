let prev = [];

async function loadLeaderboard() {
  const { data } = await supabaseClient
    .from("profiles")
    .select("*")
    .order("stars", { ascending: false })
    .limit(10);

  const board = document.getElementById("leaderboard");

  board.innerHTML = `
    <h2>🏆 Global Leaderboard</h2>

    <div class="grid">
      ${data.map((u, i) => {
        const oldIndex = prev.findIndex(p => p.username === u.username);
        const movedUp = oldIndex > i;

        return `
          <div class="card" style="
            border:${movedUp ? '1px solid #6366f1' : 'none'};
          ">
            <img src="${u.avatar || ''}" width="50" />
            <div>#${i + 1}</div>
            <div>@${u.username}</div>
            <div>⭐ ${u.stars}</div>
            <div>👥 ${u.followers}</div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  prev = data;
}

function subscribeLeaderboardLive() {
  supabaseClient
    .channel("profiles-live")
    .on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "profiles"
    }, () => {
      loadLeaderboard();
    })
    .subscribe();
}

loadLeaderboard();
subscribeLeaderboardLive();
