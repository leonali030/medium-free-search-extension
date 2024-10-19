# Medium Free Article Search Chrome Extension (WIP)

## Overview
This Chrome extension allows users to search for free versions of Medium articles that are behind a paywall. The extension sends the article's title and author to an AWS Lambda function, which acts as a proxy to search DuckDuckGo for freely available versions of the article. The extension then displays the free link directly on Medium.com.

## Features
- Automatically detects when a Medium article is behind a paywall.
- Searches for free versions of the article using AWS Lambda as a proxy.
- Displays the link to the free article directly on the Medium page.

