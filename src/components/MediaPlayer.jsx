import { useEffect, useRef } from "react";

const MediaPlayer = ({ audioSrc }) => {
  const audioTag = useRef();
  const queryString = audioSrc.includes("?")
    ? "&auto_play=true&autoplay=1"
    : "?auto_play=true&autoplay=1";

  useEffect(() => {
    if (audioSrc.includes("mp3")) {
      audioTag.current.play();
    } else {
      audioTag.current.pause();
    }
  }, [audioSrc]);

  return (
    <div className="media-player">
      <iframe
        id="media-iframe"
        className={
          audioSrc.includes("youtube")
            ? "youtube-iframe"
            : audioSrc.includes("soundcloud")
            ? "soundcloud-iframe"
            : "hide"
        }
        width="300"
        height="150"
        allow="autoplay"
        allowFullScreen={true}
        scrolling="no"
        frameBorder="no"
        src={
          audioSrc.includes("mp3") || audioSrc === ""
            ? ""
            : `${audioSrc}${queryString}`
        }
      ></iframe>
      <audio
        ref={audioTag}
        controls
        src={audioSrc.includes("mp3") ? audioSrc : null}
        className={audioSrc.includes("mp3") ? "mp3-player" : "mp3-player hide"}
      ></audio>
    </div>
  );
};

export default MediaPlayer;
