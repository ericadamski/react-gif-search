import React from "react";
import styled from "styled-components";

const colors = {
  black: "#283d3b",
  blue: "#197278",
  purple: "#d7c0d0",
  white: "#edddd4"
};

export const Container = styled.div`
  width: 35rem;
  height: 40rem;
  background-color: ${colors.black};
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
`;

export const Search = styled.input.attrs({ type: "text" })`
  padding: 0;
  margin: 0;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 1.75rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  background: transparent;
  border: none;
  margin: 1.5rem;
  border-bottom: 0.2rem solid ${colors.blue};
  color: ${colors.white};
`;

export const Items = styled.ul`
  display: ${props => (props.hidden ? "none" : "flex")};
  padding: 0;
  margin: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  flex-basis: 1;
  width: calc(100% - 3rem);
  height: calc(100% - 1.5rem);
  list-style: none;
  overflow-x: hidden;
  overflow-y: scroll;
  visibility: ${props => (props.hidden ? "hidden" : "visible")};
`;

export const Empty = styled.div`
  display: ${props => (props.hidden ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  color: ${colors.white};
  visibility: ${props => (props.hidden ? "hidden" : "visible")};
`;

const ItemWrapper = styled.li`
  padding: 0;
  margin: 0;
  overflow: hidden;
  width: calc(100% / 3);
`;

const Gif = styled.img`
  max-width: 100%;
  width: 100%;
  min-height: 100%;
`;

export const Item = ({ source }) => (
  <ItemWrapper>
    <Gif src={source} />
  </ItemWrapper>
);
