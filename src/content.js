// Check if article is behind a paywall
const paywallCheck = document.querySelector(".meteredContent");

// If paywall detected, get the article title
if (paywallCheck) {
  const articleTitle = document.querySelector("h1").innerText;

  // Get the author name (usually inside an 'a' or 'span' element within the header section)
  const authorNameElement = document.querySelector(
    '[data-testid="authorName"]'
  ).innerText;

  const authorName = authorNameElement ? authorNameElement : "";

  console.log(authorName, articleTitle);

  // Send the title and author name to the background script for searching
  chrome.runtime.sendMessage(
    { title: articleTitle, author: authorName },
    (response) => {
      console.log("response: " + response);
      // Check if the response is defined and has the freeLink property
      if (response && response.freeLink) {
        console.log("Free link found:", response.freeLink);

        // Create a small UI to display the free link along with author information
        const freeLinkDiv = document.createElement("div");
        freeLinkDiv.style.position = "fixed";
        freeLinkDiv.style.top = "10px";
        freeLinkDiv.style.right = "10px";
        freeLinkDiv.style.backgroundColor = "white";
        freeLinkDiv.style.padding = "10px";
        freeLinkDiv.style.border = "1px solid black";
        freeLinkDiv.innerHTML = `<p>Author: ${authorName}</p><a href="${response.freeLink}" target="_blank">Free version available</a>`;

        document.body.appendChild(freeLinkDiv);
      } else {
        console.log("No free link found or invalid response");
      }
    }
  );
}
