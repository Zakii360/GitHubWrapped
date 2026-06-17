function buildStats(user, repos) {
  const languages = {};

  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  const topLanguage =
    Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const stars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  return {
    username: user.login,
    followers: user.followers,
    repos: repos.length,
    stars,
    topLanguage
  };
}
