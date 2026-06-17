const BASE = "https://api.github.com";

async function getUser(username) {
  const res = await fetch(`${BASE}/users/${username}`);
  return res.json();
}

async function getRepos(username) {
  const res = await fetch(`${BASE}/users/${username}/repos?per_page=100`);
  return res.json();
}
