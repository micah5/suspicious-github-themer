/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "toggle_on")) {
      on = true
      //const susHeader = document.getElementsByClassName("Header")[0].cloneNode(true)
      //document.getElementsByClassName("Header")[0].style.display = 'none'
      turnOn()
      document.cookie = `sus-github-themer=${on}`
      sendResponse(true)
    } else if (msg.text && (msg.text == "get_on")) {
      sendResponse(on)
    } else if (msg.text && (msg.text == "toggle_off")) {
      on = false
      document.cookie = `sus-github-themer=${on}`
      sendResponse(on)
    }
});

let on = false;

function check_cookie_name(name) {
  console.log('document.cookie', document.cookie)
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) return(match[2])
  else return null
}

const cookieName = this.check_cookie_name('sus-github-themer')
on = (cookieName == 'true')
if (on) {
  turnOn()
}

function turnOn() {
  const susHeader = document.getElementsByClassName("Header")[0]
  susHeader.className += " sus-Header"
  const newLogo = document.createElement("img")
  newLogo.setAttribute('src', 'https://raw.githubusercontent.com/micah5/suspicious-github-themer/master/logo.jpg')
  newLogo.setAttribute('class', 'sus-header-image')
  susHeader.getElementsByClassName("Header-link")[0].replaceWith(newLogo)
  susHeader.getElementsByClassName("js-site-search-form")[0].className += " sus-js-site-search-form"
  //document.body.className += " sus-body"
  const susSubheader = susHeader.getElementsByTagName("nav")[0].cloneNode(true)
  susHeader.getElementsByTagName("nav")[0].setAttribute('style', 'display:none !important')
  susSubheader.className += " sus-subheader"
  susHeader.parentNode.insertBefore(susSubheader, susHeader.nextSibling)
  susHeader.getElementsByClassName("header-search-key-slash")[0].src = 'https://raw.githubusercontent.com/micah5/suspicious-github-themer/master/search.png'
  susHeader.getElementsByClassName("header-search-key-slash")[0].className += ' sus-search'
  url = window.location.href
  page = url.substr(url.lastIndexOf('/') + 1)
  console.log(page)
  switch (page) {
    case 'pulls': susSubheader.getElementsByTagName("a")[0].className += " active"; break
    case 'issues': susSubheader.getElementsByTagName("a")[1].className += " active"; break
    case 'marketplace': susSubheader.getElementsByTagName("a")[3].className += " active"; break
    case 'explore': susSubheader.getElementsByTagName("a")[4].className += " active"; break
  }
  var link = document.createElement("link");
  link.href = chrome.extension.getURL("sus-github-main.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

/*
let startTime = null;

function getId() {
  var url_string = window.location.href
  var url = new URL(url_string);
  var id = url.searchParams.get("v");
  return id
}

function appendButton(elementId, url){
	var buttonEl = document.createElement("a");
  buttonEl.id = 'record-ad-time'
  buttonEl.style.cursor = "pointer"
	buttonEl.onclick = () => {
    var thisButton = document.getElementById('record-ad-time');
    if (thisButton.innerText == "🚫") {
      let id = getId()
      thisButton.getElementsByTagName('span')[0].innerText = '👌'
      startTime = document.getElementsByClassName("ytp-time-current")[0].innerHTML
    } else if (thisButton.innerText == "👌") {
      let id = getId()
      thisButton.getElementsByTagName('span')[0].innerText = '☁️'
      let endTime = document.getElementsByClassName("ytp-time-current")[0].innerHTML
      axios.post('https://sponsorship-remover.herokuapp.com/add_time', {
        startTime: startTime,
        endTime: endTime,
        id: id
      })
      .then(async function (response) {
        startTime = null
        thisButton.getElementsByTagName('span')[0].innerText = '✅'
        await new Promise(resolve => setTimeout(resolve, 1000));
        thisButton.getElementsByTagName('span')[0].innerText = '🚫'
      })
      .catch(async function (error) {
        startTime = null
        thisButton.getElementsByTagName('span')[0].innerText = '❎'
        await new Promise(resolve => setTimeout(resolve, 1000));
        thisButton.getElementsByTagName('span')[0].innerText = '🚫'
      });
    }
  };
	var buttonTextEl = document.createElement("span");
	buttonTextEl.innerText = "🚫";
  buttonTextEl.style.marginLeft = "10px";
	buttonEl.appendChild(buttonTextEl);
  var referenceNode = document.getElementsByClassName('ytp-time-display')[0]
	//referenceNode.parentNode.insertBefore(buttonEl, referenceNode.nextSibling);
  referenceNode.appendChild(buttonEl);
}
*/

//appendButton("something", "/news_events/")
/*
console.log('hi', document.readyState)
document.body.style.background = 'yellow';
if( document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log( 'document is already ready, just execute code here' );
    myInitCode();
} else {
    console.log('document not ready yet')
    document.addEventListener('DOMContentLoaded', function () {
        console.log( 'document was not ready, place code here' );
        myInitCode();
    });
}

function myInitCode() {
  console.log('dom loaded')
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', () => {
      console.log('clicked')
    });
  }
}
*/
