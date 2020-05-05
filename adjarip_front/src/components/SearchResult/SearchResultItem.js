import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

//#region Components
const MainDiv = styled.div`
    background-color: white;
    border: 2px solid #d5d5d5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 184px;
    height: 276px;
    margin: 5px;
    &:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        border: 0;
        cursor: pointer;
    }
    overflow: hidden;
    background: url(${(props) => props.poster});
    background-size: cover;
    background-position: center center;
`;
const TitleDiv = styled.div`
    font-size: 15px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    color: white;
    width: 100%;

    background: -webkit-linear-gradient(
        bottom,
        rgb(7, 7, 7) 0%,
        rgba(7, 7, 7, 0) 100%
    );

    padding: 10px 0 4px 0;
`;

const TitleSpan = styled.span`
    width: 90%;
`;

//#endregion

function SearchResultItem({ data, onClickHandler }) {
    return (
        <MainDiv
            poster={data.poster}
            id={data.id}
            onClick={({ target }) => onClickHandler(target.id)}
        >
            <TitleDiv>
                <TitleSpan>
                    {data.title}
                </TitleSpan>
            </TitleDiv>
        </MainDiv>
    );
}

SearchResultItem.propTypes = {
    data: propTypes.object.isRequired,
    onClickHandler: propTypes.func.isRequired,
};

export default SearchResultItem;
