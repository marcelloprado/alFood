import { useEffect, useState } from "react";
import IPrato from "../../../interfaces/IPrato";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const AdministracaoPratos = () => {
  const [pratos, setPrato] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
    .then(resposta => setPrato(resposta.data))
  },[])


  const Excluir = (pratoAhSerExcluido: IPrato) => {
    http.delete(`pratos/${pratoAhSerExcluido.id}/`)
    .then(() => {
      const listaPrato = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
      setPrato([ ...listaPrato ])
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            {/* <TableCell>Descrição</TableCell> */}
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {pratos.map(prato => <TableRow key={prato.id}>
            <TableCell>
               {prato.nome}
            </TableCell>
            {/* <TableCell>
               {prato.descricao}
            </TableCell> */}
            <TableCell>
               {prato.tag}
            </TableCell>
            <TableCell>
               <a href={prato.imagem} target="_blank" rel="noreferrer">Ver Imagem</a>
            </TableCell>
            <TableCell>
              <Link to={`/admin/restaurantes/${prato.id}`}>Editar</Link>
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => Excluir(prato)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>)}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;
