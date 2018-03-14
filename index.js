import React, { Component } from "react";
import unfetch from "unfetch";
import Downshift from "downshift";
import { last } from "ramda";
import PropTypes from "prop-types";
import copy from "copy-to-clipboard";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/switch";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/throttleTime";

import {
  Container,
  Search,
  Items,
  Item,
  Empty,
  CopiedMessage
} from "./index.styled";

const URI = `https://api.giphy.com/`;

function search(term, offset) {
  const searchUri = `${URI}v1/gifs/search?api_key=${
    process.env.GIPHY_API_KEY
  }&q=${term}${offset ? `&offset=${offset}` : ""}`;

  return fetch(searchUri, {
    mode: "cors",
    headers: {
      "Access-Control-Request-Headers":
        "access-control-allow-origin,access-control-allow-headers",
      "Content-Type": "text/plain"
    }
  });
}

function fetch() {
  return Observable.fromPromise(unfetch.apply(unfetch, arguments)).switchMap(
    res => res.json()
  );
}

export default class GifSearch extends Component {
  state = { term: "", pagination: {}, images: [] };
  search$ = new Subject();

  static propTypes = {
    query: PropTypes.string,
    onDidSearch: PropTypes.func
  };

  componentDidMount() {
    this.search$
      .debounceTime(250)
      .do(term => {
        console.log(`Searching for ${term}...`);
        this.props.onDidSearch && this.props.onDidSearch(term);
      })
      .subscribe(term => this.extract(term, search(term)));

    Observable.fromEvent(this.gifList, "scroll")
      .map(
        () =>
          Math.round(
            last(this.gifList.childNodes).getBoundingClientRect().bottom
          ) -
            this.gifList.clientHeight <=
          Math.round(this.gifList.getBoundingClientRect().bottom)
      )
      .filter(canScroll => canScroll)
      .throttleTime(500)
      .map(() => this.state.term)
      .subscribe(term =>
        this.extract(term, search(term, this.state.pagination.offset + 25))
      );
  }

  componentWillReceiveProps({ query }) {
    query !== this.state.term && this.search(query || "");
  }

  extract(term, source$) {
    return source$
      .map(({ data, pagination }) => ({
        images: data.map(gif => ({
          id: gif.id,
          title: gif.title,
          url: gif.url,
          og: gif.images.original,
          display: gif.images.fixed_height
        })),
        pagination
      }))
      .subscribe(({ images, pagination }) =>
        this.setState(state => ({
          images: state.term === term ? state.images.concat(images) : images,
          pagination,
          term
        }))
      );
  }

  search(term) {
    term.length > 0 && this.search$.next(term);
  }

  flash({ title, og }) {
    const { url } = og;

    this.setState({ name: title, url }, () =>
      setTimeout(() => this.setState({ name: undefined, url: undefined }), 2500)
    );
  }

  render() {
    const { term, images, name, url } = this.state;

    return (
      <Downshift inputValue={term} onInputValueChange={this.search.bind(this)}>
        {({
          getInputProps,
          getRootProps,
          getItemProps,
          inputValue,
          selectedItem,
          highlightedIndex
        }) => (
          <Container {...getRootProps({ refKey: "innerRef" })}>
            <Search {...getInputProps({ placeholder: "🕵️‍♀️ Gifs?" })} />
            <Items
              hidden={images.length < 1}
              innerRef={n => (this.gifList = n)}
            >
              {images.map((image, index) => (
                <Item
                  {...getItemProps({
                    item: image,
                    key: image.id,
                    title: image.title,
                    source: image.display.url
                  })}
                  onClick={() => (copy(image.og.url), this.flash(image))}
                />
              ))}
            </Items>
            <Empty hidden={images.length > 1}>Nothing Found 😭</Empty>
            {name && url && <CopiedMessage name={name} url={url} />}
          </Container>
        )}
      </Downshift>
    );
  }
}
