'use strict'

const setStatus = (status) => {
  // this might seemed reversed, it is
  // we want to show the user the opposite of what the current status is
  if (status === true) {
    document.getElementById('status').innerHTML = 'Off'
  } else if (status === false) {
    document.getElementById('status').innerHTML = 'On'
  }
}

const setUppercase = (uppercase) => {
  // this might seemed revered, it is, see `setStatus`
  if (uppercase === true) {
    document.getElementById('case_status').innerHTML = 'lowercase'
    document.getElementById('case_switch').setAttribute(
      'style', 'text-transform:lowercase;'
    )
  } else if (uppercase === false) {
    document.getElementById('case_status').innerHTML = 'uppercase'
    document.getElementById('case_switch').setAttribute(
      'style', 'text-transform:uppercase;'
    )
  }
}

window.chrome.storage.sync.get(['status', 'uppercase'], (items) => {
  // if there are no errors starting chrome calls
  if (!window.chrome.runtime.error) {
    // if this is the first time the extension starts
    if (items.status === undefined) {
      window.chrome.storage.sync.set({ 'status': true })
      setStatus(true)
    } else if (items.status) {
      setStatus(false)
    } else if (!items.status) {
      setStatus(false)
    }

    // if this is the first time the extension starts
    if (items.uppercase === undefined) {
      window.chrome.storage.sync.set({ 'uppercase': false })
      setUppercase(false)
    } else if (items.uppercase) {
      setUppercase(true)
    } else if (!items.uppercase) {
      setUppercase(false)
    }
  }
})

// when people click the credit button
document.getElementById('twttr_button').onclick = () => {
  // open up a new tab with Github
  window.chrome.tabs.create({
    url: 'https://github.com/719ben/https://github.com/719Ben/comic-sans-everything'
  })
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
        document.getElementById('case_switch').setAttribute(
          'style', 'text-transform:uppercase;'
        )
      } else {
        document.getElementById('case_status').innerHTML = 'lowercase'
        document.getElementById('case_switch').setAttribute(
          'style', 'text-transform:lowercase;'
        )
      }
      window.chrome.storage.sync.set({ 'uppercase': !items.uppercase })
      window.chrome.tabs.sendMessage(activeTab.id, {'uppercase': !items.uppercase})
    })
  })
}
