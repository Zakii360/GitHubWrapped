let slides = [];
let index = 0;

async function startWrapped() {
  const username = document.getElementById("username").value;

  const user = await getUser(username);
  const repos = await getRepos(username);
  const stats = buildStats(user, repos);

  const ai = await fetch("https://tvxugmumfvgnvjacwwfz.supabase.co/functions/v1/wrapped-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stats })
  });

  const aiData = await ai.json();

  buildSlides(stats, aiData.result);
  showSlide(0);

  // TikTok-style click anywhere to advance
  document.body.onclick = () => nextSlide();
}

function buildSlides(stats, ai) {
  slides = [
    `👋 @${stats.username}`,
    `📦 Repos: ${stats.repos}`,
    `⭐ Stars: ${stats.stars}`,
    `👥 Followers: ${stats.followers}`,
    `💻 Top Language: ${stats.topLanguage}`,
    `🧠 ${ai}`,
    `🔥 Wrapped Complete`
  ];
}

function showSlide(i) {
  const el = document.getElementById("slides");

  el.innerHTML = `
    <div class="slide">
      ${slides[i]}
      <div style="margin-top:20px; opacity:0.5; font-size:12px;">
        click to continue →
      </div>
    </div>
  `;
}

function nextSlide() {
  index++;

  if (index >= slides.length) {
    index = 0;
    return;
  }

  showSlide(index);

  if (index === slides.length - 1) {
    confetti();
  }
}
