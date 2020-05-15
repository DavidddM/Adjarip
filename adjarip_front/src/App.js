import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import SeasonSelector from "./components/SeasonSelector";
import Player from "./components/Player";
import settings from "./settings";
import { useAsyncGet } from "./hooks/useAsyncGet";

function App() {
    const APIURL = settings.API_BASE_URL

    const [movieId, setMovieId] = useState([]);
    const [showComp, setShowComp] = useState([]);
    const [url, setUrl] = useState([]);

    const { asyncExecution, isLoading, data, error } = useAsyncGet();

    useEffect(() => {
        document.title = "Adjarip";
    }, []);

    const loadingDiv = () => {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    };

    const errorDiv = () => {
        return (
            <div className="alert alert-danger col-xl-6 col-lg-8 col-md-10 col-sm-12" role="alert">
                Error!
            </div>
        );
    };

    const onSearchHandler = async (value) => {
        const keyword = encodeURI(value);
        asyncExecution(`${APIURL}search_film/${keyword}`, (data) =>
            data.slice(0, 8)
        );
        setShowComp("searchResult");
    };

    const movieClickHandler = async (id) => {
        asyncExecution(`${APIURL}get_seasons_count/${id}`, (data) => data.seasonsCount);
        setMovieId(id);
        setShowComp("seasonSelector");
    };

    const seasonClickHandler = async (id) => {
        asyncExecution(`${APIURL}get_season_episodes/${movieId}/${id}`);
        setShowComp("episodeSelector");
    };

    const episodeClickHandler = (link) => {
        setUrl(link);
        setShowComp("player");
    };

    return (
        <div className="App">
            <SearchBar onSearchHandler={onSearchHandler} />
            {showComp === "searchResult" && data && (
                <SearchResult
                    data={data}
                    onClickHandler={movieClickHandler}
                ></SearchResult>
            )}
            {showComp === "seasonSelector" && data && (
                <SeasonSelector
                    count={data}
                    seasonClickHandler={seasonClickHandler}
                ></SeasonSelector>
            )}
            {showComp === "episodeSelector" && data && (
                <SearchResult
                    data={data}
                    onClickHandler={episodeClickHandler}
                ></SearchResult>
            )}
            {showComp === "player" && <Player url={url} />}
            {isLoading && loadingDiv()}
            {error && errorDiv()}
        </div>
    );
}

export default App;
