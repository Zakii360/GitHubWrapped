async function loadLeaderboard() {
  const { data, error } = await supabaseClient
    .from("leaderboard")
    .select("*")
    .order("stars", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Leaderboard error:", error);
    return;
  }

  const board = document.getElementById("leaderboard");

  if (!data || data.length === 0) {
    board.innerHTML = `<p>No data yet.</p>`;
    return;
  }

  board.innerHTML = `
    <h2>🔥 Leaderboard</h2>

    <div class="grid">
      ${data.map((u, index) => `
        <div class="card">
          <div style="font-size:18px; opacity:0.7;">#${index + 1}</div>
          <div style="font-weight:bold;">@${u.username}</div>
          <div>⭐ ${u.stars}</div>
          <div>👥 ${u.followers}</div>
          <div>📦 ${u.repos}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function subscribeLeaderboardLive() {
  supabaseClient
    .channel("leaderboard-live")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "leaderboard",
      },
      (payload) => {
        console.log("Leaderboard update:", payload);

        // refresh UI on any change
        loadLeaderboard();
      }
    )
    .subscribe();
}


function flashLeaderboard() {
  const el = document.getElementById("leaderboard");
  el.style.transition = "0.2s";
  el.style.transform = "scale(1.01)";
  setTimeout(() => {
    el.style.transform = "scale(1)";
  }, 150);
}

/**
 * Initialize everything
 */
loadLeaderboard();
subscribeLeaderboardLive();
