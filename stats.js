function buildStats(user, repos) {
  const lang = {};

  repos.forEach(r => {
    if (r.language) lang[r.language] = (lang[r.language] || 0) + 1;
  });

  const topLanguage =
    Object.entries(lang).sort((a,b)=>b[1]-a[1])[0]?.[0] || "N/A";

  return {
    username: user.login,
    avatar: user.avatar_url,
    repos: repos.length,
    stars: repos.reduce((a,r)=>a+r.stargazers_count,0),
    followers: user.followers,
    topLanguage
  };
}
