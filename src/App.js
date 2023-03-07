import ContactForm from "./components/ContactForm";
import { CrudApi } from "./components/CrudApi";
import { CrudApp } from "./components/CrudApp";
import Modals from "./components/Modals";
import { SelectsAnidados } from "./components/SelectsAnidados";
import { SongSearch } from "./components/SongSearch";

function App() {
  return (
    <>
      <h1>Ejercicios con React</h1>
      <Modals />
      <hr />
      <CrudApp />
      <hr />
      <CrudApi />
      <hr />
      <SongSearch />
      <hr />
      <SelectsAnidados />
      <hr />
      <ContactForm />
    </>
  );
}

export default App;
