/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import conectNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexao = await conectNaDatabase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
routes(app);

app.use(manipuladorDeErros);

app.delete("/livros/:id", (req, res) => {
  // eslint-disable-next-line no-undef
  const index = buscaLivro(req.params.id);
  livros.splice(index, 1);
  res.status(200).send("Livro removido com sucesso");
});

export default app;