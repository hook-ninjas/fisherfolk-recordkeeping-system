const url =
  import.meta.env.VITE_PROD === 'true'
    ? import.meta.env.VITE_SERVER_URL
    : 'http://localhost:4000/graphql';
// console.log("Using URL:", url);
// console.log(import.meta.env.VITE_SERVER_URL);
// console.log(import.meta.env.VITE_PROD);

export default url;