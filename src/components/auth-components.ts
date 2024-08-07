import {styled} from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10vh 0px;
`;

export const Title = styled.h1`
    font-weight: bold;
    font-size: 42px;
`;

export const SubTitle = styled.h3`
    margin-top: 1em;
    font-size: 25px;
`;

export const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;

export const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

export const Switcher = styled.span`
    margin-top: 20px;
    a{
        color: #1d9bf0;
    }
`;

export const Container = styled.div`
    background-color: #FFCD29;
    width: 60vmax;
    padding: 10vw 6vw;
`;