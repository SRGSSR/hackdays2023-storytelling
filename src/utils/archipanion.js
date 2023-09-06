export const search = async (text, maxResults) => {
    console.log("Starting Search...")

  return fetch(`/api/serverless/proxy?text=${text}&limit=${maxResults}`, {
  }).then(r => r.json()).then(r => r.results[0].content)
};
