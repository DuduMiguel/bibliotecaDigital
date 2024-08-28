import { Routes, Route } from "react-router-dom";
import MenuSuperior from "./components/MenuSuperior";
import InclusaoJogos from "./components/InclusaoJogos";
import ManuntencaoJogos from "./components/ManutencaoJogos"
import ResumoJogos from "./components/ResumoJogos"
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
    <MenuSuperior></MenuSuperior>
    <Routes>
      <Route path="/" element={<InclusaoJogos></InclusaoJogos>}></Route>
      <Route path="manuntencao" element={<ManuntencaoJogos></ManuntencaoJogos>}></Route>
      <Route path="resumo" element={<ResumoJogos></ResumoJogos>}></Route>
    </Routes>
    </Fragment>
  );
}

export default App;
