import fetch from 'node-fetch';

const search = async (text, maxResults) => {
    console.log("Starting Search...")
    const similarResults = await similar(text, maxResults)
    console.log(similarResults)
    const keys = similarResults.map(r => r.key);
    const idsResults = await ids(keys)
    const objectIds = idsResults.map(i => i.objectId)
    let os = await objects(objectIds);

    idsResults.forEach((idResult, index) => {
        const objectIdToSearchFor = idResult.objectId
        const foundObject = os.find((object) =>
            object.objectid === objectIdToSearchFor
        )
        idResult.path = foundObject.path;
        idResult.score = similarResults[index].value;
        idResult.term = text;
    })
    let filteredResult = idsResults.filter((r, index, array) => !array.slice(0, index).find(r2 => r2.path === r.path));
    if (filteredResult.length !== idsResults.length) {
        console.log(`Filtered Results from ${idsResults.length} to ${filteredResult.length}`);
    }
    return filteredResult;
}

const headers = {
    "accept": "application/json, text/plain, */*",
    "content-type": "application/json",
    "authorization": "Basic c2VzYW06w7ZmZm5lZGljaA==",
};
const similar = (text, maxResults = "10") =>
    fetch("https://srghackathon.archipanion.com/api/v1/find/segments/similar", {
        "headers": headers,
        "body": `{"config":{"maxResults":${maxResults}},"terms":[{"type":"TEXT","categories":["visualtextcoembedding"],"data":"${text}"}],"messageType":"Q_SIM"}`,
        "method": "POST",
    }).then(r => r.json()).then(r => r.results[0].content);

const ids = (ids) => {
    let body = `{"ids":[${ids.map(i => `"${i}"`).join(",")}]}`;
    // console.log("body", body);
    return fetch("https://srghackathon.archipanion.com/api/v1/find/segments/by/id", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "authorization": "Basic c2VzYW06w7ZmZm5lZGljaA==",
            "content-type": "application/json",
        },
        "body": body,
        "method": "POST"
    }).then(r => r.json()).then(r => r.content);
};

const objects = (ids) => {
    let body = `{"ids":[${ids.map(i => `"${i}"`).join(",")}]}`;
    // console.log(body);
    return fetch("https://srghackathon.archipanion.com/api/v1/find/object/by/id", {
        "headers": headers,
        "body": body,
        "method": "POST"
    }).then(r => r.json()).then(r => r.content);
};

export default async (request, res) => {
    console.log('request', request);
    const { searchParams } = new URL(request.url);
    const maxResults = searchParams.get('maxResults') || 10;
    const text = searchParams.get('text');
    const content = await search(text, maxResults);

    console.log('content', content);

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ content }));
};
