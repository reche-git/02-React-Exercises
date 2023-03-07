import useFetch from "../hooks/useFetch";
import { Loader } from "./Loader.js";
import { Message } from "./Message";

export const SelectList = ({ title, url, handleChange }) => {
  const { data, error, loading } = useFetch(url);
  // console.log(data, error, loading);

  if (!data) return null;

  if (error) {
    return (
      <Message
        msg={`Error ${error.status}: ${error.statusText}`}
        bgColor="#dc3545"
      />
    );
  }

  let id = `select-${title}`;
  let label = title.charAt(0).toUpperCase() + title.slice(1);
  let options = data.response[title];
  // console.log(options);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      {loading && <Loader />}
      <select name={id} id={id} onChange={handleChange}>
        <option value="">Search a {title}</option>
        {data && options.map((el) => <option value={el} key={el}>{el}</option>)}
      </select>
    </>
  );
};
