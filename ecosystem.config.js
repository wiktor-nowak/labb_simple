module.exports = {
  apps: [
    {
      name: "labb-studio",
      script: "server.js",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
