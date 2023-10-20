import { autor } from "../models/Autor.js";

class AutorController {

  static async listaAutores (req, res, next) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      next(erro);
    }
  }
  
  static async listarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      const listarAutorPorId = await autor.findById(id);
      if (listarAutorPorId !== null) {
        res.status(200).send(listarAutorPorId);
      } else {
        res.status(404).send({ message: "Id do Autor não localizado." });
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor (req, res, next) {
    try{
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor (req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado" });
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirAutor (req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor excluído com sucesso" });
    } catch (erro) {
      next(erro);
    }
  }

}

export default AutorController;
