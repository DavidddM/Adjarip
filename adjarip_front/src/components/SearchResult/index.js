import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import SearchResultItem from "./SearchResultItem";

const MainContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;

function SearchResult({ data, onClickHandler }) {
    return (
        <div className="centerContentDiv">
            <MainContainer className="col-xl-6 col-lg-8 col-md-10 col-sm-12">
                {data.length > 0 &&
                    data.map((d) => (
                        <SearchResultItem
                            key={d.id}
                            data={d}
                            onClickHandler={onClickHandler}
                        />
                    ))}
            </MainContainer>
        </div>
    );
}

SearchResult.propTypes = {
    data: propTypes.array.isRequired,
    onClickHandler: propTypes.func.isRequired,
};

export default SearchResult;
