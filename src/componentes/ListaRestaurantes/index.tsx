import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import { IParametrosBusca } from "../../interfaces/IParametrosBusca";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");

  const [paginaAnterior, setPaginaAnterior] = useState("");
  const [busca, setBusca] = useState("");

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios
      .get<IPaginacao<IRestaurante>>(url, opcoes)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
        console.log(carregarDados);
      })
      .catch((erro) => {});
  };

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const opcoes = {
      params: {} as IParametrosBusca,
    };

    if (busca) {
      opcoes.params.search = busca;
    }
  };

  useEffect(() => {
    // obter restaurantes
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>

      <form onSubmit={buscar} />
      <div>
        <input
          type="text"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />
        <button type="submit">Buscar</button>
      </div>

      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}

      <button
        onClick={() => carregarDados(paginaAnterior)}
        disabled={!paginaAnterior}
      >
        Página Anterior
      </button>

      <button
        onClick={() => carregarDados(proximaPagina)}
        disabled={!proximaPagina}
      >
        Próxima Página
      </button>
    </section>
  );
};

export default ListaRestaurantes;

//

//   return (
//
//
