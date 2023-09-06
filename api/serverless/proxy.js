import fetch from 'node-fetch';

export default (request) => {
    const maxResults = 1;
    const text = "Auto";
    const content = fetch("https://srghackathon.archipanion.com/api/v1/find/segments/similar", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json",
            "authorization": "Basic c2VzYW06w7ZmZm5lZGljaA==",
        },
        "body": `{"config":{"maxResults":${maxResults}},"terms":[{"type":"TEXT","categories":["visualtextcoembedding"],"data":"${text}"}],"messageType":"Q_SIM"}`,
        "method": "POST",
    }).then(r => r.json()).then(r => r.results[0].content)

    return new Response(`Hello, ${content}`);
};
