import React, { Component } from "react";
import unfetch from "unfetch";
import Downshift from "downshift";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/switch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/debounceTime";

import { Container, Search, Items, Item, Empty } from "./index.styled";

const URI = `http://api.giphy.com/`;

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

  componentDidMount() {
    this.search$
      .debounceTime(250)
      .do(term => console.log(`Searching for ${term}...`))
      .subscribe(term => this.extract(term, search(term)));

    Observable.fromEvent(this.gifList, "scroll").subscribe(event =>
      console.log(event)
    );
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

  render() {
    const { images } = this.state;

    return (
      <Downshift onInputValueChange={this.search.bind(this)}>
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
              {images.map(image => (
                <Item
                  {...getItemProps({ item: image })}
                  key={image.id}
                  title={image.title}
                  source={image.display.url}
                />
              ))}
            </Items>
            <Empty hidden={images.length > 1}>Nothing Found 😭</Empty>
          </Container>
        )}
      </Downshift>
    );
  }
}
