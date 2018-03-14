import React from "react";
import styled, { injectGlobal } from "styled-components";

const colors = {
  black: "#283d3b",
  blue: "#197278",
  purple: "#d7c0d0",
  white: "#edddd4"
};

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
`;

export const Container = styled.div`
  font-family: "Roboto", sans-serif;
  position: relative;
  width: 35rem;
  height: 40rem;
  background-color: ${colors.black};
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  outline: none;
`;

export const Items = styled.ul`
  display: ${props => (props.hidden ? "none" : "flex")};
  padding: 0;
  margin: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  flex-basis: 1;
  width: calc(100% - 3rem);
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

const MessageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  background-color: ${colors.black};
  opacity: 0.8;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Message = styled.p`
  margin: 0;
  font-size: ${props => (props.small ? 1 : 1.75)}rem;
  opacity: 1;
`;

const Overlay = styled.div`
  position: absolute:
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
`;

export const Item = ({ source, title, selected, onClick }) => (
  <ItemWrapper onClick={onClick}>
    {selected && <Overlay>{title}</Overlay>}
    <Gif src={source} />
  </ItemWrapper>
);

export const CopiedMessage = ({ name, url }) => (
  <MessageContainer>
    <Message>{`🎉Copied GIF ${name}!🔥`}</Message>
    <Message small>{url}</Message>
  </MessageContainer>
);
