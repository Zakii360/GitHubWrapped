let slides = [];
let index = 0;
let statsGlobal = null;
let aiPersonality = "";

async function startWrapped() {
  const username = document.getElementById("username").value;

  const user = await getUser(username);
  const repos = await getRepos(username);

  const stats = buildStats(user, repos);
  statsGlobal = stats;

  // AI CALL (EDGE FUNCTION)
  const ai = await fetch("https://tvxugmumfvgnvjacwwfz.supabase.co/functions/v1/wrapped-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stats })
  });

  const aiData = await ai.json();
  aiPersonality = aiData.result;

  // SAVE TO LEADERBOARD
  await supabaseClient.from("profiles").upsert({
    username: stats.username,
    avatar: stats.avatar,
    stars: stats.stars,
    repos: stats.repos,
    followers: stats.followers,
    top_language: stats.topLanguage
  });

  buildSlides(stats, aiPersonality);
  showSlide(0);
}

function buildSlides(stats, ai) {
  slides = [
    `👋 Welcome @${stats.username}`,
    `📦 Repos: ${stats.repos}`,
    `⭐ Stars: ${stats.stars}`,
    `👥 Followers: ${stats.followers}`,
    `💻 Top Language: ${stats.topLanguage}`,
    `🧠 You are a: ${ai}`,
    `🔥 FINAL WRAPPED`
  ];
}

function showSlide(i) {
  const el = document.getElementById("slides");

  el.innerHTML = `<div class="slide">${slides[i]}</div>`;

  setTimeout(() => {
    index++;
    if (index < slides.length) {
      showSlide(index);
    } else {
      confetti();
    }
  }, 1500);
}
