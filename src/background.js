chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message in background script:", request);
  if (request.title && request.author) {
    // Construct DuckDuckGo search query
    const query = `"${request.title}" "${request.author}" -site:medium.com`;

    // Use DuckDuckGo's HTML search results
    const searchUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(
      query
    )}`;
    console.log("[searchUrl]: " + searchUrl);
    // Fetch the search results
    fetch(searchUrl)
      .then((response) => response.text())
      .then((html) => {
        // Parse the HTML to extract the first search result
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const firstResult = doc.querySelector(".result__a"); // DuckDuckGo search result link

        if (firstResult) {
          const freeLink = firstResult.href;
          console.log("freeLink: " + freeLink);
          sendResponse({ freeLink });
        } else {
          sendResponse({ freeLink: null });
        }
      })
      .catch((error) => {
        console.error("Error fetching free version:", error);
        sendResponse({ freeLink: null });
      });

    // Keep the message channel open for async response
    return true;
  }
});
