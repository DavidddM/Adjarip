import React from "react";
import VideoPlayer from "./VideoPlayer";

function Player({ url }) {
    return (
        <div className="centerContentDiv">
            <VideoPlayer
                {...{
                    autoplay: true,
                    controls: true,
                    fullscreen: {},
                    sources: [
                        {
                            src: url,
                            type: "video/mp4",
                        },
                    ],
                }}
            />
        </div>
    );
}

export default Player;
