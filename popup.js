/*document.getElementById('recordTime').onclick = () => {
  chrome.tabs.query({"active": true, "lastFocusedWindow": true}, (tabs) => {
    tabURL = tabs[0].url;
    let tab = tabs[0]
    this.times.push('kk slider')
    chrome.tabs.sendMessage(tab.id, { text: "report_back" },
      (element) => {
        alert("button was clicked yeeessss " + element);
      });
  });
};*/

new Vue({
  el: '#app',
  data: {
    on: false
  },
  mounted: function () {
    console.log('started', document)
    chrome.tabs.query({"active": true, "lastFocusedWindow": true}, (tabs) => {
      let tab = tabs[0]
      chrome.tabs.sendMessage(tab.id, { text: "get_on" },
        (res) => {
          console.log('got on', res)
          this.on = res
          console.log('huh', this.on)
        });
    });
  },
  methods: {
    toggleOn: function() {
      chrome.tabs.query({"active": true, "lastFocusedWindow": true}, (tabs) => {
        let tab = tabs[0]
        chrome.tabs.sendMessage(tab.id, { text: "toggle_on" },
          (res) => {
            console.log('element', res)
            if (res == true) {
              this.on = true
            }
          });
      });
    },
    openLink: function(url) {
      chrome.tabs.create({ url: url })
    }
  }
})
