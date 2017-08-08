'use strict'
window.chrome.storage.sync.get('status', (items) => {
  if (!window.chrome.runtime.error) {
    if (items.status === undefined) {
      window.chrome.storage.sync.set({ 'status': true })
      document.getElementById('status').innerHTML = 'Off'
    } else if (items.status) {
      document.getElementById('status').innerHTML = 'Off'
    } else if (!items.status) {
      document.getElementById('status').innerHTML = 'On'
    }
  }
})
document.getElementById('fb_button').onclick = () => {
  window.chrome.tabs.create({ url: 'http://bit.ly/ComicSansEverything' })
}
document.getElementById('font_switch').onclick = (tab) => {
  window.chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    let activeTab = tabs[0]
    window.chrome.storage.sync.get('status', (items) => {
      console.log('current status is', items.status)
      if (items.status) {
        document.getElementById('status').innerText = 'On'
      } else {
        document.getElementById('status').innerText = 'Off'
      }
      window.chrome.tabs.sendMessage(activeTab.id, {'message': !items.status})
      window.chrome.storage.sync.set({ 'status': !items.status })
    })
  })
}
