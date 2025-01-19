chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    console.log("Received message in background script:", request);

    if (request.title && request.author && request.snippet) {
      // Construct the query for Lambda
      const query = `"${request.title}" "${request.author}" "${request.snippet} -site:medium.com`;

      // Call the Lambda API Gateway
      const lambdaApiUrl = process.env.API_URL;

      fetch(`${lambdaApiUrl}?q=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); // Parse as JSON
        })
        .then((data) => {
          if (data.link) {
            console.log("Free link found:", data.link);
            sendResponse({ freeLink: data.link });
          } else {
            console.warn("No free link found:", data.message);
            sendResponse({ freeLink: null });
          }
        })
        .catch((error) => {
          console.error("Error calling Lambda:", error);
          sendResponse({ freeLink: null });
        });

      // Keep the message channel open for async response
      return true;
    }
  } catch {
    console.log("Error with background script.");
  }
});
