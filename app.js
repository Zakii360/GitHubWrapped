let slides = [];
let index = 0;

async function startWrapped() {
  const username = document.getElementById("username").value;

  const user = await getUser(username);
  const repos = await getRepos(username);
  const stats = buildStats(user, repos);

 
  await supabaseClient.from("profiles").upsert({
    username: stats.username,
    avatar: stats.avatar,   // so I fixed the avatar thing (I forgot to put this lol)
    stars: stats.stars,
    repos: stats.repos,
    followers: stats.followers,
    top_language: stats.topLanguage
  });

  buildSlides(stats);
  showSlide(0);

  // click to continue (TikTok feel if you will [I don't actually have tiktok, I just seen vids of it])
  document.body.onclick = nextSlide;
}

function buildSlides(stats) {
  slides = [
    `👋 @${stats.username}`,
    `📦 Repos: ${stats.repos}`,
    `⭐ Stars: ${stats.stars}`,
    `👥 Followers: ${stats.followers}`,
    `💻 Top Language: ${stats.topLanguage}`,
    `🔥 Wrapped Complete`
  ];
}

function showSlide(i) {
  document.getElementById("slides").innerHTML = `
    <div class="slide">${slides[i]}</div>
  `;
}

function nextSlide() {
  index++;

  if (index >= slides.length) {
    index = 0;
    confetti();
    return;
  }

  showSlide(index);
}
