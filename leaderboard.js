let previousData = [];

async function loadLeaderboard() {
  const { data } = await supabaseClient
    .from("profiles")
    .select("*")
    .order("stars", { ascending: false })
    .limit(10);

  const board = document.getElementById("leaderboard");

  board.innerHTML = `
    <h2>🔥 Global Leaderboard</h2>
    <div class="grid">
      ${data.map((u, i) => {
        const prevIndex = previousData.findIndex(p => p.username === u.username);
        const movedUp = prevIndex > i;

        return `
          <div class="card" style="
            transform: ${movedUp ? 'scale(1.05)' : 'scale(1)'};
            border: ${movedUp ? '1px solid #6366f1' : 'none'};
            transition: 0.4s;
          ">
            <div>#${i + 1}</div>
            <div>@${u.username}</div>
            <div>⭐ ${u.stars}</div>
            <div>👥 ${u.followers}</div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  previousData = data;
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
