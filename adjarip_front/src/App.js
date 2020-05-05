import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import SeasonSelector from "./components/SeasonSelector";
import Player from "./components/Player";
import axios from "axios";

function App() {
    const [searchResult, setSearchResult] = useState([]);
    const [movieId, setMovieId] = useState([]);
    const [movieSeasonsCount, setMovieSeasonsCount] = useState([]);
    const [movieSeasonEps, setMovieSeasonEps] = useState([]);
    const [showComp, setShowComp] = useState([]);
    const [url, setUrl] = useState([]);

    const onSearchHandler = async (value) => {
        const keyword = encodeURI(value);
        try {
            const response = await axios.get(
                `http://192.168.0.105:5000/search_film/${keyword}`
            );
            console.log(response.data);
            setSearchResult(response.data.slice(0, 8));
            setShowComp("searchResult");
        } catch (err) {
            setShowComp(false);
        }
    };

    const movieClickHandler = async (id) => {
        try {
            const response = await axios.get(
                `http://192.168.0.105:5000/get_seasons_count/${id}`
            );
            console.log(response.data);
            setMovieId(id);
            setMovieSeasonsCount(response.data.seasonsCount);
            setShowComp("seasonSelector");
        } catch (err) {
            setShowComp(false);
        }
    };

    const seasonClickHandler = async (id) => {
        try {
            const response = await axios.get(
                `http://192.168.0.105:5000/get_season_episodes/${movieId}/${id}`
            );
            console.log(response.data);
            setMovieSeasonEps(response.data);
            setShowComp("episodeSelector");
        } catch (err) {
            setShowComp(false);
        }
    };

    const episodeClickHandler = (link) => {
        setUrl(link);
        setShowComp("player");
    };

    return (
        <div className="App">
            <SearchBar onSearchHandler={onSearchHandler} />
            {showComp === "searchResult" && (
                <SearchResult
                    data={searchResult}
                    onClickHandler={movieClickHandler}
                ></SearchResult>
            )}
            {showComp === "seasonSelector" && (
                <SeasonSelector
                    count={movieSeasonsCount}
                    seasonClickHandler={seasonClickHandler}
                ></SeasonSelector>
            )}
            {showComp === "episodeSelector" && (
                <SearchResult
                    data={movieSeasonEps}
                    onClickHandler={episodeClickHandler}
                ></SearchResult>
            )}
            {showComp === "player" && <Player url={url} />}
        </div>
    );
}

export default App;
