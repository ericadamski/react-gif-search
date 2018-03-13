import React, { Component } from "react";
import GifSearch from "react-gif-search";
import { Page, Title, Arrow } from "./page.styled";

class App extends Component {
  render() {
    return (
      <Page>
        <Title>Search for some gifs!</Title>
        <Arrow />
        <GifSearch />
      </Page>
    );
  }
}

export default App;
