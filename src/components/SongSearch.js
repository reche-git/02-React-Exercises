import { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { Loader } from "./Loader";
import { SongDetails } from "./SongDetails";
import { SongForm } from "./SongForm";

export const SongSearch = () => {
  const [search, setSearch] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(false);

  //This use effect is triggered every time we submit our form
  //in the component "SongForm" thanks to the function "handleSearch" below
  useEffect(() => {
    if (search === null) return;

    const fetchData = async () => {
      const { artist, song } = search;

      //The API of TheAudioDB only provide information for the band "Coldplay" (for free users)
      let artistUrl = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
      //The API of Lyricsovh does not provide free use, so we are going to use it to display the error message
      let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

      // console.log(artistUrl);
      // console.log(songUrl);

      setLoading(true);

      //helpHttp is a helper made entirely in JS so it's compatible with any framework
      const [artistRes, songRes] = await Promise.all([
        helpHttp().get(artistUrl),
        helpHttp().get(songUrl),
      ]);

      // console.log(artistRes, songRes);

      setBio(artistRes);
      setLyric(songRes);
      setLoading(false);
    };

    fetchData();
  }, [search]);

  const handleSearch = (data) => {
    // console.log(data);
    setSearch(data);
  };

  return (
    <div>
      <h2>Song Search</h2>
      <article className="grid-1-3">
        <SongForm handleSearch={handleSearch} />
        {loading && <Loader />}
        {search && !loading && (
          <SongDetails search={search} lyric={lyric} bio={bio} />
        )}
      </article>
    </div>
  );
};
