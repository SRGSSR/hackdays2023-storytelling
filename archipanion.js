import fetch from "node-fetch";

export const similar = (text, maxResults = "10") =>
    fetch("https://srghackathon.archipanion.com/api/v1/find/segments/similar", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en;q=0.9,fr;q=0.8",
            "authorization": "Basic c2VzYW06w7ZmZm5lZGljaA==",
            "content-type": "application/json",
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "_ga=GA1.1.617322084.1693906725; __hstc=167100385.bfb29dbb2432a327da09ca2c39f3f053.1693906725851.1693906725851.1693906725851.1; hubspotutk=bfb29dbb2432a327da09ca2c39f3f053; __hssrc=1; __hssc=167100385.1.1693906725852; __hs_opt_out=no; __hs_initial_opt_in=true; _ga_PCPQWJRFVK=GS1.1.1693906725.1.1.1693906757.0.0.0",
            "Referer": "https://srghackathon.archipanion.com/?q=auto",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{"config":{"maxResults":${maxResults}},"terms":[{"type":"TEXT","categories":["visualtextcoembedding"],"data":"${text}"}],"messageType":"Q_SIM"}`,
        "method": "POST"
    }).then(r => r.json()).then(r => r.results[0].content);

export const ids = (ids) =>
    fetch("https://srghackathon.archipanion.com/api/v1/find/segments/by/id", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en;q=0.9,fr;q=0.8",
            "authorization": "Basic c2VzYW06w7ZmZm5lZGljaA==",
            "content-type": "application/json",
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "_ga=GA1.1.617322084.1693906725; __hstc=167100385.bfb29dbb2432a327da09ca2c39f3f053.1693906725851.1693906725851.1693906725851.1; hubspotutk=bfb29dbb2432a327da09ca2c39f3f053; __hssrc=1; __hssc=167100385.1.1693906725852; __hs_opt_out=no; __hs_initial_opt_in=true; _ga_PCPQWJRFVK=GS1.1.1693906725.1.1.1693906757.0.0.0",
            "Referer": "https://srghackathon.archipanion.com/?q=auto",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{"ids":[${ids.join(",")}}]}`,
        "method": "POST"
    }).then(r => r.json());

export const objects = (ids) =>
    fetch("https://srghackathon.archipanion.com/api/v1/find/object/by/id", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en;q=0.9,fr;q=0.8",
            "authorization": "Basic c2VzYW06w7ZmZm5lZGljaA==",
            "content-type": "application/json",
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "_ga=GA1.1.617322084.1693906725; __hstc=167100385.bfb29dbb2432a327da09ca2c39f3f053.1693906725851.1693906725851.1693906725851.1; hubspotutk=bfb29dbb2432a327da09ca2c39f3f053; __hssrc=1; __hssc=167100385.1.1693906725852; __hs_opt_out=no; __hs_initial_opt_in=true; _ga_PCPQWJRFVK=GS1.1.1693906725.1.1.1693906757.0.0.0",
            "Referer": "https://srghackathon.archipanion.com/?q=auto",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{"ids":[${ids.join(",")}}]}`,
        "method": "POST"
}).then(r => r.json());
