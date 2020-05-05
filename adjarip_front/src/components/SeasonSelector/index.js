import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const MainContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

const SeasonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        border: 0;
        cursor: pointer;
    }
    border: 1px solid #d5d5d5;
    width: 100px;
    height: 100px;
    margin: 5px;
    font-size: 40px;
`;

function SeasonSelector({ count, seasonClickHandler }) {
    const seasons = [...Array(count).keys()].map((x) => ++x);
    return (
        <div className="centerContentDiv">
            <MainContainer className="col-xl-6 col-lg-8 col-md-10 col-sm-12">
                {seasons.length > 0 &&
                    seasons.map((s) => (
                        <SeasonDiv
                            id={s}
                            key={s}
                            onClick={({ target }) => {
                                seasonClickHandler(target.id);
                            }}
                        >
                            {s}
                        </SeasonDiv>
                    ))}
            </MainContainer>
        </div>
    );
}

SeasonSelector.propTypes = {
    count: propTypes.number.isRequired,
    seasonClickHandler: propTypes.func.isRequired,
};

export default SeasonSelector;
