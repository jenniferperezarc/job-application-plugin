document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('open-form');
  
  if (button) {
    button.addEventListener('click', () => {
      chrome.tabs.create({
        url: chrome.runtime.getURL('jobsave.html')
      });
    });
  }
});
