import { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { useModal } from "../hooks/useModal";
import { Loader } from "./Loader";
import Modal from "./Modal";
import { SongDetails } from "./SongDetails";
import { SongForm } from "./SongForm";

export const SongSearch = () => {
  const [search, setSearch] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, openModal, closeModal] = useModal(false);

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

      <button className="btn btn-primary btn-lg" onClick={openModal}>
        About Crud API
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="ExplinationModal">
          <h3>About Song Search</h3>
          <p>
            Time to see the amazing{" "}
            <a
              href="https://github.com/reche-git/02-React-Exercises/tree/master/src/hooks"
              rel="noreferrer"
              target="_blank"
            >
              "hookFetch"
            </a>{" "}
            in action!
          </p>
          <hr />
          <p>I used 2 APIs for this:</p>
          <ul>
            <li>
              <a
                href="https://www.theaudiodb.com/api_guide.php"
                rel="noreferrer"
                target="_blank"
              >
                The Audio DB
              </a>
              {""}: a community Database of audio artwork and metadata with a
              JSON API. The free trial only allow you to search "coldplay"... so
              please limit yourself to search "coldplay"...
            </li>
            <li>
              <a
                href="https://lyricsovh.docs.apiary.io/#"
                rel="noreferrer"
                target="_blank"
              >
                Lyrics.ovh
              </a>
              {""}: allows you to find the lyrics for a song quickly and without
              ads. This API doesn't allow free calls anymore. So we are using it
              to show the custom{" "}
              <mark style={{ backgroundColor: "#ff0000" }}>error</mark> made in
              the hook "hookFetch"!
            </li>
          </ul>
          <hr />
          <p></p>
        </div>
      </Modal>
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
