import { createGlobalStyle, styled } from "styled-components";
import PostTweetForm from "../components/post-stickie-form";
import Timeline from "../components/timeline";
import reset from "styled-reset";

const Wrapper = styled.div`
    display: grid;
    gap: 50px;
    overflow-y: scroll;
    grid-template-rows: 1fr 5fr;
    scrollbar-width: none;
`;

const HomeStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body {
    background-color: #FFCD29;
    color: Black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

export default function Home(){
    return (
        <><HomeStyles /><Wrapper>
            <PostTweetForm />
            <Timeline />
        </Wrapper></>
    );
}