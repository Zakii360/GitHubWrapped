let slides = [];
let index = 0;
let aiLabel = "Dev Human";
let isAnimating = false;

async function startWrapped() {
  const username = document.getElementById("username").value;

  const user = await getUser(username);
  const repos = await getRepos(username);
  const stats = buildStats(user, repos);

  // AI CALL (FIXED SAFE)
  try {
    const ai = await fetch("https://tvxugmumfvgnvjacwwfz.supabase.co/functions/v1/wrapped-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stats })
    });

    const aiData = await ai.json();
    aiLabel = aiData?.result || "Dev Human";
  } catch (e) {
    aiLabel = "Dev Human";
  }

  // SAVE TO SUPABASE
  await supabaseClient.from("profiles").upsert({
    username: stats.username,
    avatar: stats.avatar,
    stars: stats.stars,
    repos: stats.repos,
    followers: stats.followers,
    top_language: stats.topLanguage
  });

  buildSlides(stats);
  showSlide(0);

  document.body.onclick = nextSlide;
}

function buildSlides(stats) {
  slides = [
    `👋 @${stats.username}`,
    `📦 Repos: ${stats.repos}`,
    `⭐ Stars: ${stats.stars}`,
    `👥 Followers: ${stats.followers}`,
    `💻 Top Language: ${stats.topLanguage}`,
    `🧠 You are: ${aiLabel}`,
    `🔥 Wrapped Complete`
  ];
}

function showSlide(i) {
  document.getElementById("slides").innerHTML =
    `<div class="slide">${slides[i]}</div>`;
}

function nextSlide() {
  if (isAnimating) return;
  isAnimating = true;

  index++;

  if (index >= slides.length) {
    index = 0;
    confetti();
    isAnimating = false;
    return;
  }

  const el = document.getElementById("slides");
  el.style.opacity = 0;

  setTimeout(() => {
    showSlide(index);
    el.style.opacity = 1;
    isAnimating = false;
  }, 180);
}
