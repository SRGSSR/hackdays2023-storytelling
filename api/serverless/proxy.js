import fetch from 'node-fetch';

export default async (request, res) => {
    console.log('request', request);
    const maxResults = 1;
    const text = "Auto";
    const content = await fetch("https://srghackathon.archipanion.com/api/v1/find/segments/similar", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json",
            "authorization": "Basic c2VzYW06w7ZmZm5lZGljaA==",
        },
        "body": `{"config":{"maxResults":${maxResults}},"terms":[{"type":"TEXT","categories":["visualtextcoembedding"],"data":"${text}"}],"messageType":"Q_SIM"}`,
        "method": "POST",
    }).then(r => {
        console.log('result', r.status, r.statusText);
        return r.json();
    }).then(r => r.results[0].content)

    console.log('content', content);

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ content }));
};
