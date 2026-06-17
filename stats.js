function buildStats(user, repos) {
  const langMap = {};

  repos.forEach(r => {
    if (r.language) {
      langMap[r.language] = (langMap[r.language] || 0) + 1;
    }
  });

  const topLanguage =
    Object.entries(langMap).sort((a,b)=>b[1]-a[1])[0]?.[0] || "N/A";

  return {
    username: user.login,
    avatar: user.avatar_url,
    stars: repos.reduce((a,r)=>a+r.stargazers_count,0),
    repos: repos.length,
    followers: user.followers,
    topLanguage
  };
}
