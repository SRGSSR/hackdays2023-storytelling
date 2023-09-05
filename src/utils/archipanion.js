export const search = async (text, maxResults) => {
  console.log("Starting Search...")
  const similarResults = await similar(text, maxResults)
  console.log(similarResults)
  const keys = similarResults.map(r => r.key);
  const idsResults = await ids(keys)
  const objectIds = idsResults.map(i => i.objectId)
  let os = await objects(objectIds);
  // console.log(objectIds)
  // console.log(os.map(i => i.objectid))
  idsResults.forEach((idResult, index) => {
    const objectIdToSearchFor = idResult.objectId
    const foundObject = os.find((object) =>
      object.objectid === objectIdToSearchFor
    )
    idResult.path = foundObject.path;
    idResult.score = similarResults[index].value;
    idResult.term = text;
  })
  return idsResults
}

export const similar = (text, maxResults = "10") =>
  fetch("https://proxy.cors.sh/https://srghackathon.archipanion.com/api/v1/find/segments/similar", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "content-type": "application/json",
      "authorization": "Basic c2VzYW06w7ZmZm5lZGljaA==",
      "x-cors-api-key": "temp_bfb716dec2d7acb0adacf507f2b32243"
    },
    "body": `{"config":{"maxResults":${maxResults}},"terms":[{"type":"TEXT","categories":["visualtextcoembedding"],"data":"${text}"}],"messageType":"Q_SIM"}`,
    "method": "POST",
  }).then(r => r.json()).then(r => r.results[0].content);

export const ids = (ids) => {
  let body = `{"ids":[${ids.map(i => `"${i}"`).join(",")}]}`;
  // console.log("body", body);
  return fetch("https://proxy.cors.sh/https://srghackathon.archipanion.com/api/v1/find/segments/by/id", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "authorization": "Basic c2VzYW06w7ZmZm5lZGljaA==",
      "content-type": "application/json",
      "x-cors-api-key": "temp_bfb716dec2d7acb0adacf507f2b32243"
    },
    "body": body,
    "method": "POST"
  }).then(r => r.json()).then(r => r.content);
};

export const objects = (ids) => {
  let body = `{"ids":[${ids.map(i => `"${i}"`).join(",")}]}`;
  // console.log(body);
  return fetch("https://proxy.cors.sh/https://srghackathon.archipanion.com/api/v1/find/object/by/id", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "authorization": "Basic c2VzYW06w7ZmZm5lZGljaA==",
      "content-type": "application/json",
      "x-cors-api-key": "temp_bfb716dec2d7acb0adacf507f2b32243"
    },
    "body": body,
    "method": "POST"
  }).then(r => r.json()).then(r => r.content);
};
