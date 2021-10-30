module.exports = {
  reactStrictMode: true,
  basePath: "/chume_debut",
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/main": { page: "/[pid]" },
      "/description": { page: "/[pid]" },
      "/contact": { page: "/[pid]" },
      "/debut": { page: "/[pid]" },
    };
  },
};
