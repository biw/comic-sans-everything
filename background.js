'use strict'

let cssOverwrite = '* {font-family: Comic Sans MS !important}'

// if we dont have the styleDom, create it
let styleDom = document.getElementById('comic-sans-everything-style')
if (!styleDom) {
  styleDom = document.querySelector('head').appendChild(document.createElement('style'))
  styleDom.id = 'comic-sans-everything-style'
  styleDom.rel = 'stylesheet'
  styleDom.type = 'text/css'
}
window.chrome.storage.sync.get('status', (items) => {
  if (!window.chrome.runtime.error) {
    if (items.status || items.status === undefined) {
      styleDom.innerText = cssOverwrite
    } else {
      console.log(items.status)
      styleDom.innerText = ''
    }
  }
})
window.chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message) {
      styleDom.innerText = cssOverwrite
    } else {
      styleDom.innerText = ''
    }
  }
)
