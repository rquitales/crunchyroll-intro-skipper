const TimeStampRegex = /[0-9]{1,2}\:[0-9]{1,2}/
const CommentKeywordRegex = /time|title|tc|card|intro|recap|end|start/i

chrome.runtime.onMessage.addListener(function (_, sender, sendResponse: (response: any) => void): boolean {
  if (!sender || !sender.tab || !sender.tab.url) {
    return false
  }

  let sourceURL = sender.tab.url

  fetch(sourceURL)
    .then(response => response.text())
    .then(data => {
      return data.substr(data.search('talkboxid') + 13, 30)
    })
    .then(talkboxID => {
      return checkComments(talkboxID, sourceURL!, sendResponse)
    })
    .then(prev => {
      if (prev) {
        return
      }
      useAdBreaks(sourceURL!, sendResponse)
    })
    .catch(error => alert({ error: error }))

  return true
})

function useAdBreaks(sourceURL: string, sendResponse: (response: any) => void): void {
  fetch(sourceURL)
    .then(response => response.text())
    .then(data => {
      let resp = parseInt(data.substr(data.search('ad_breaks') + 69, 10)) / 1000
      sendResponse({
        interval: resp,
        source: 'ad_breaks',
        text: `Ad-break: ${Math.floor(resp / 60)}:${Math.floor(resp % 60)}`,
      })
    })
}

async function checkComments(talkboxID: string, referralID: string, sendResponse: (response: any) => void): Promise<boolean> {
  let url = `https://www.crunchyroll.com/comments?pg=0&talkboxid=${talkboxID}&sort=score_desc%2Cdate_desc&replycount=10&threadlimit=5&pagelimit=10`

  let useComments = await fetch(url, {
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
    .then(response => response.json())
    .then(data => {
      return parseComments(data, sendResponse)
    })

  return useComments
}

function parseComments(data: any, sendResponse: (response: any) => void): boolean {
  let stack = []

  // Add top level (parent) comments to stack.
  for (let div of data) {
    stack.push(div)
  }

  // Traverse comments with BFS.
  while (stack.length > 0) {
    let curr = stack.shift()

    if (!curr) {
      continue
    }

    if (curr.children && curr.children.length != 0) {
      curr.children.forEach((child: any) => {
        stack.push(child)
      })
    }

    const comment: string | undefined = curr.comment.body

    if (comment === undefined) {
      continue
    }

    // If comment has keywords indicating a timestamp, or only has one word, check/send timestamp.
    if (CommentKeywordRegex.test(comment) || comment.split(' ').length === 1) {
      if (sendTimeStamp(comment, sendResponse)) {
        return true
      }
    }
  }

  return false
}

function tsToSeconds(word: string): number {
  let minutes = parseInt(word.split(':')[0]) * 60
  let seconds = parseInt(word.split(':')[1])
  return minutes + seconds
}

function sendTimeStamp(comment: string, sendResponse: (response: any) => void): boolean {
  let extracted = comment.match(TimeStampRegex)
  if (extracted === null) {
    return false
  }

  let tsStr: string = extracted[0]

  sendResponse({
    interval: tsToSeconds(tsStr),
    source: 'comments',
    text: comment,
  })

  return true
}
