const BASE = "https://api.github.com";

async function getUser(username) {
  return (await fetch(`${BASE}/users/${username}`)).json();
}

async function getRepos(username) {
  return (await fetch(`${BASE}/users/${username}/repos?per_page=100`)).json();
}
