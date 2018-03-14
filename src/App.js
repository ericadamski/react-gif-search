import React, { Component } from "react";
import GifSearch from "react-gif-search";
import qs from "qs";

import { Page, Title, Arrow } from "./page.styled";

class App extends Component {
  state = { query: null };

  componentDidMount() {
    this.setState({ query: qs.parse(window.location.search.substring(1)).gif });
  }

  render() {
    const { query } = this.state;

    console.log(query);

    return (
      <Page>
        <Title>Search for some gifs!</Title>
        <Arrow />
        <GifSearch query={query} />
      </Page>
    );
  }
}

export default App;
