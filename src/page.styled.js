import styled from "styled-components";

export const Page = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #d7c0d0;
`;

export const Title = styled.h1`
  padding: 0;
  margin: 0;
  text-transform: uppercase;
  font-size: 3rem;
  color: #283d3b;
`;

export const Arrow = Title.extend.attrs({ children: "↓" })`
  margin: 1rem 0;
`;
