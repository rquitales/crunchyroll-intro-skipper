chrome.runtime.onMessage.addListener(function (_, _, sendResponse) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    sourceURL = tabs[0].url;

    fetch(sourceURL)
      .then((response) => response.text())
      .then((data) => {
        return data.substr(data.search('talkboxid') + 13, 30);
      })
      .then((talkboxID) => {
        return checkComments(talkboxID, sourceURL, sendResponse);
      })
      .then((prev) => {
        if (prev) {
          return;
        }
        useAdBreaks(sourceURL, sendResponse);
      })
      .catch((error) => alert({ error: error }));
  });

  return true;
});

function useAdBreaks(sourceURL, sendResponse) {
  fetch(sourceURL)
    .then((response) => response.text())
    .then((data) => {
      console.log(data.search('ad_breaks'));
      let resp =
        parseInt(data.substr(data.search('ad_breaks') + 69, 10)) / 1000;
      sendResponse({ interval: resp, source: 'ad_breaks' });
    });
}

async function checkComments(talkboxID, referralID, sendResponse) {
  let useComments;

  let url = `https://www.crunchyroll.com/comments?pg=0&talkboxid=${talkboxID}&sort=score_desc%2Cdate_desc&replycount=10&threadlimit=5&pagelimit=10`;

  useComments = await fetch(url, {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-requested-with': 'XMLHttpRequest',
    },
    referrer: referralID,
    referrerPolicy: 'origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      return parseComments(data, sendResponse);
    });

  return useComments;
}

function parseComments(data, sendResponse) {
  var timestampRegex = /^[0-9]+\:[0-9]{1,2}$/;
  var tcRegex = /time|title|tc|card|intro|recap|end/i;

  let stack = [];
  for (let div of data) {
    stack.push(div);
  }

  while (stack.length > 0) {
    curr = stack.shift();

    if (!curr) {
      continue;
    }

    if (curr.children && curr.children.length != 0) {
      for (const child of curr.children) {
        stack.push(child);
      }
    }
    if (curr.comment.body === undefined) {
      console.log(curr);
      continue;
    }
    words = curr.comment.body.split(' ');

    let ok = false;

    for (const word of words) {
      if (tcRegex.test(word)) {
        ok = true;
        break;
      }
    }

    if (ok) {
      for (const word of words) {
        if (timestampRegex.test(word)) {
          let minutes = parseInt(word.split(':')[0]) * 60;
          let seconds = parseInt(word.split(':')[1]);
          sendResponse({ interval: minutes + seconds, source: 'comments' });
          return true;
        }
      }
    }
  }
  return false;
}
