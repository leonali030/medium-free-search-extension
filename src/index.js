//this will tell us if its really a medium article

//<meta data-rh="true" property="og:site_name" content="Medium">

if (isOnMedium()) {
  if (isPaywalled()) {
    const articleTitle = document.querySelector("h1").innerText;

    // Get the author name (usually inside an 'a' or 'span' element within the header section)
    const authorNameElement = document.querySelector(
      '[data-testid="authorName"]'
    ).innerText;

    const authorName = authorNameElement ? authorNameElement : "";

    const articleSnippet = getArticleSnippet();

    chrome.runtime.sendMessage(
      { title: articleTitle, author: authorName, snippet: articleSnippet },
      (response) => {
        console.log("response: " + response);
        // Check if the response is defined and has the freeLink property
        if (response && response.freeLink) {
          console.log("Free link found:", response.freeLink);

          // Create a small UI to display the free link along with author information
          const freeLinkDiv = document.createElement("div");
          freeLinkDiv.innerHTML = `<p>Author: ${authorName}</p><a href="${response.freeLink}" target="_blank">Free version available</a>`;

          document.body.appendChild(freeLinkDiv);
        } else {
          console.log("No free link found or invalid response");
        }
      }
    );
  }
}

function isOnMedium() {
  //medium allows authors to have their own custom urls
  //so we have to look at the html on a given site to see if its a medium article
  for (const tag of document.getElementsByTagName("meta")) {
    if (tag.getAttribute("property") === "og:site_name") {
      //use open graph protocol to check if this site has sitename Medium
      if (tag.getAttribute("content") == "Medium") {
        return true;
      }
    }
  }
  return false;
}

function isPaywalled() {
  //checks if the medium article has a paywall
  console.log(document.querySelector(".meteredContent"));
  return document.querySelector(".meteredContent") != null;
}

function getAuthorInfo() {
  let authorPage = document.querySelectorAll('[data-testid="authorName"]').href;
}

function getArticleSnippet() {
  const articleBodyElement = document.querySelector("article.meteredContent");
  //contains all text of article as children
  const articleTextElements = articleBodyElement.getElementsByTagName("*");
  //get all children
  const articleSnippet = articleTextElements[4].innerText;
  //the 5th element is the beginning of the article as far as i can tell
  console.log("article snippet: ", articleSnippet);
  const paragraphs = articleSnippet.split(/\s{2,}/);
  return paragraphs[paragraphs.length - 2].slice(0, 100); //first 100 characters of bit of article before cutoff pt
}
