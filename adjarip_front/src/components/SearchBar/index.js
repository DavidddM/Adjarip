import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const ParentForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
`;

const SearchButton = styled.button`
    margin-left: 10px;
`;

function SearchBar({ onSearchHandler }) {
    return (
        <ParentForm
            onSubmit={(e) => {
                e.preventDefault();
                onSearchHandler(e.target.searchInput.value);
            }}
        >
            <input
                className="form-control col-xl-6 col-lg-8 col-md-10 col-sm-12"
                id="searchInput"
                placeholder="Search"
            ></input>
            <SearchButton className="btn btn-secondary" type="submit">
                Search
            </SearchButton>
        </ParentForm>
    );
}

SearchBar.propTypes = {
    onSearchHandler: propTypes.func.isRequired,
};

export default SearchBar;
