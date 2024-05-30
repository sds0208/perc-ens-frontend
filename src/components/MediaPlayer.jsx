const MediaPlayer = ({ audioSrc }) => {
  return (
    <div className="media-player">
      <iframe
        id="media-iframe"
        className={
          audioSrc.includes("youtube") ? "youtube-iframe" : "soundcloud-iframe"
        }
        width="300"
        height="100"
        autoPlay={true}
        allowFullScreen="true"
        scrolling="no"
        frameBorder="no"
        src={audioSrc}
      ></iframe>
    </div>
  );
};

export default MediaPlayer;
