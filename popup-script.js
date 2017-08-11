'use strict'
window.chrome.storage.sync.get(['status', 'uppercase'], (items) => {
  if (!window.chrome.runtime.error) {
    if (items.status === undefined) {
      window.chrome.storage.sync.set({ 'status': true })
      document.getElementById('status').innerHTML = 'Off'
    } else if (items.status) {
      document.getElementById('status').innerHTML = 'Off'
    } else if (!items.status) {
      document.getElementById('status').innerHTML = 'On'
    }
    if (items.uppercase === undefined) {
      window.chrome.storage.sync.set({ 'uppercase': false })
      document.getElementById('case_status').innerHTML = 'uppercase'
      document.getElementById('case_switch').setAttribute('style', 'text-transform:uppercase;')
    } else if (items.uppercase) {
      document.getElementById('case_status').innerHTML = 'lowercase'
      document.getElementById('case_switch').setAttribute('style', 'text-transform:lowercase;')
    } else if (!items.uppercase) {
      document.getElementById('case_status').innerHTML = 'uppercase'
      document.getElementById('case_switch').setAttribute('style', 'text-transform:uppercase;')
    }
  }
})
document.getElementById('fb_button').onclick = () => {
  window.chrome.tabs.create({ url: 'http://bit.ly/ComicSansEverything' })
}
document.getElementById('font_switch').onclick = () => {
  window.chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    let activeTab = tabs[0]
    window.chrome.storage.sync.get('status', (items) => {
      if (items.status) {
        document.getElementById('status').innerText = 'On'
      } else {
        document.getElementById('status').innerText = 'Off'
      }
      window.chrome.tabs.sendMessage(activeTab.id, {'status': !items.status})
      window.chrome.storage.sync.set({ 'status': !items.status })
    })
  })
}
document.getElementById('case_switch').onclick = () => {
  window.chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    let activeTab = tabs[0]
    window.chrome.storage.sync.get('uppercase', (items) => {
      if (items.uppercase) {
        document.getElementById('case_status').innerHTML = 'uppercase'
        document.getElementById('case_switch').setAttribute('style', 'text-transform:uppercase;')
      } else {
        document.getElementById('case_status').innerHTML = 'lowercase'
        document.getElementById('case_switch').setAttribute('style', 'text-transform:lowercase;')
      }
      window.chrome.storage.sync.set({ 'uppercase': !items.uppercase })
      window.chrome.tabs.sendMessage(activeTab.id, {'uppercase': !items.uppercase})
    })
  })
}
