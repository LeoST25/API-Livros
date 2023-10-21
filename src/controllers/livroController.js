/* eslint-disable no-undef */
import NaoEncontrado from "../erros/naoEncontrado.js";
import livro from "../models/Livro.js";
//import { autor } from "../models/Autor.js";

class LivroController {

  static async listarLivros (req, res, next) {
    try {
      const listaLivros = await livro.find({}).populate("autor").exec();
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (livroEncontrado !== null) {
        res.status(200).send(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livros = new livro(req.body);

      const livroResultado = await livros.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static async atualizarLivro (req, res, next) {
    try {
      const id = req.params.id;

      const livroResultado = await livro.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultado !== null) {
        res.status(200).json({ message: "Livro atualizado" });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirLivro (req, res, next) {
    try {
      const id = req.params.id;

      const livroResultado = await livro.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).json({ message: "Livro excluído com sucesso" });
      } else {
        next(NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorEditora (req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status (200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;
