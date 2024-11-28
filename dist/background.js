chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message in background script:", request);
  if (request.title && request.author) {
    // Construct DuckDuckGo search query
    const query = `"${request.title}" "${request.author}" -site:medium.com`;

    // Use DuckDuckGo's HTML search results
    //add aws lambda call here

    // Keep the message channel open for async response
    return true;
  }
});
