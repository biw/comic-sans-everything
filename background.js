'use strict'

let fontOverwrite = '* {font-family: Comic Sans MS !important}'
let transformOverwrite = '* {text-transform:uppercase}'

// if we don't have the styleDom, create it
let styleDom = document.getElementById('comic-sans-everything-style')
if (!styleDom) {
  styleDom = document.querySelector('head').appendChild(document.createElement('style'))
  styleDom.id = 'comic-sans-everything-style'
  styleDom.rel = 'stylesheet'
  styleDom.type = 'text/css'
}
const updateStyle = () => {
  window.chrome.storage.sync.get(['status', 'uppercase'], (items) => {
    if (!window.chrome.runtime.error) {
      if (items.status && items.uppercase) {
        styleDom.innerText = fontOverwrite + transformOverwrite
      } else if (items.status) {
        styleDom.innerText = fontOverwrite
      } else {
        styleDom.innerText = ''
      }
    }
  })
}

// run once on file load
updateStyle()

// runs every time the `popup-script.js` file send a message to `background.js`
window.chrome.runtime.onMessage.addListener(updateStyle)
