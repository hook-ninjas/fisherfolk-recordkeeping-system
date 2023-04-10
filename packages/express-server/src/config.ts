const url =
  process.env.VITE_PROD === 'true'
    ? process.env.VITE_SERVER_URL
    : 'http://localhost:4000/graphql'

module.exports = url;