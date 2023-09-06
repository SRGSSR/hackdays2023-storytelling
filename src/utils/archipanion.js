export const search = async (text, maxResults) => {
  console.log("Starting Search...")
  return fetch(`${import.meta.env.PROD ? '' : 'https://hackdays2023-storytelling.vercel.app'}/api/serverless/proxy?text=${text}&limit=${maxResults}`, {
  }).then(r => r.json()).then(r => r.content)
};
