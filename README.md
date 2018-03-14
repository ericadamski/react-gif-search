# react-gif-search

🕵️‍♀️ A simple bit of react to query giphy.com

# Usage

[![Edit React Gif Search - Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/048

```javascript
import React from "react";
import { render } from "react-dom";

import GifSearch from "react-gif-search";

const App = () => (
  <GifSearch
    // Feed a search term directly to the API
    query="doggo"
    // A callback for when a search is actually made
    onDidSearch={term => console.log(`Searching for ${term}.`)}
  />
);

render(<App />, document.getElementById("root"));
```
