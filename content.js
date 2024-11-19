// Check if article is behind a paywall
const paywallCheck = document.querySelector('.meteredContent');

if (paywallCheck) {
  const articleTitle = document.querySelector('h1').innerText;

  // Get the author name (usually inside an 'a' or 'span' element within the header section)
  const authorNameElement = document.querySelector('[data-testid="authorName"]');
  const authorName = authorNameElement ? authorNameElement.innerText : '';

  console.log('Detected paywalled article by:', authorName, articleTitle);

  // Send the title and author name to the background script for searching
  chrome.runtime.sendMessage({ title: articleTitle, author: authorName }, (response) => {
    console.log('Response from background script:', response);

    // Check if the response is defined and has the freeLink property
    if (response && response.freeLink) {
      console.log('Free link found:', response.freeLink);

      // Create a small UI for the "Free Version Found" button
      const popupContainer = document.createElement('div');
      popupContainer.style.position = 'fixed';
      popupContainer.style.top = '50%';
      popupContainer.style.right = '10px';
      popupContainer.style.transform = 'translateY(-50%)';
      popupContainer.style.backgroundColor = '#ffffff';
      popupContainer.style.padding = '15px';
      popupContainer.style.border = '1px solid #000000';
      popupContainer.style.borderRadius = '5px';
      popupContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      popupContainer.style.zIndex = '10000';
      popupContainer.style.fontFamily = 'Arial, sans-serif';

      // Add the button
      const freeVersionButton = document.createElement('button');
      freeVersionButton.textContent = 'Free Version Found';
      freeVersionButton.style.backgroundColor = '#0073e6';
      freeVersionButton.style.color = 'white';
      freeVersionButton.style.border = 'none';
      freeVersionButton.style.padding = '10px 20px';
      freeVersionButton.style.cursor = 'pointer';
      freeVersionButton.style.borderRadius = '5px';

      // Open the free link in a new tab when the button is clicked
      freeVersionButton.addEventListener('click', () => {
        window.open(response.freeLink, '_blank');
      });

      // Append the button to the popup container
      popupContainer.appendChild(freeVersionButton);

      // Append the popup container to the body
      document.body.appendChild(popupContainer);
    } else {
      console.log('No free link found or invalid response');
    }
  });
}
