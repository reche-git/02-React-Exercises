import Message from "./Message";
import { SongArtist } from "./SongArtist";
import { SongLyric } from "./SongLyric";

export const SongDetails = ({ search, lyric, bio }) => {
  if (!lyric || !bio) return null;
  return (
    <>
      {lyric.error || lyric.name === "AbortError" || lyric.err ? (
        <Message
          msg={`Error: Lyrics for "<em>${search.song}</em>" not found`}
          bgColor="#dc3545"
        />
      ) : (
        <SongLyric title={search.song} lyrics={lyric.lyrics}/>
      )}
      {bio.artists ? (
        <SongArtist artist={bio.artists[0]}/>
      ) : (
        <Message
          msg={`Error: Artist "<em>${search.artist}</em>" not found`}
          bgColor="#dc3545"
        />
      )}
    </>
  );
};
