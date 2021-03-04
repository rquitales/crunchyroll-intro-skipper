function init() {
  chrome.runtime.sendMessage('trigger', (response) => {
    console.log('Skip intro button:', response);
    addSkipButton(response);
  });
}

function addSkipButton(resp: any) {
  let root = document.getElementById('vilosRoot');
  if (!root) {
    return;
  }

  let button = document.createElement('div');
  let player = document.getElementById('player0');

  button.style.zIndex = '999';
  button.style.color = 'white';
  button.style.position = 'fixed';
  button.style.right = '0';
  button.style.bottom = '80px';

  button.style.backgroundColor = 'rgba(0,0,0,0.3)';
  button.style.border = '1px solid white';
  button.style.padding = '10px 10px 9px 10px';
  button.style.margin = '0 20px 0 0';
  button.style.fontSize = '16px';
  button.style.cursor = 'pointer';
  button.style.display = 'none';
  button.id = 'skipButton';
  button.innerHTML = `SKIP INTRO<br/>${resp.text}`;

  button.onclick = () => {
    (<any>player).currentTime = resp.interval;
  };
  root.append(button);
  window.setInterval(showHideSkipButton(resp.interval), 1000);
}

function showHideSkipButton(ts: number) {
  let intro = ts;
  let skipButton = document.getElementById('skipButton');
  let player = document.getElementById('player0');

  return function () {
    if (!skipButton || !player) {
      return;
    }

    let time = parseInt((<any>player).currentTime);
    if (time < intro ) {
      skipButton.style.display = 'block';
    } else {
      skipButton.style.display = 'none';
    }
  };
}

init();
