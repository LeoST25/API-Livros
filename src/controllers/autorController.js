import NaoEncontrado from "../erros/naoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

  static async listaAutores (req, res, next) {
    try {
      const listaAutores = await autores.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      next(erro);
    }
  }
  
  static async listarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      const listarAutorPorId = await autores.findById(id);
      if (listarAutorPorId !== null) {
        res.status(200).send(listarAutorPorId);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor (req, res, next) {
    try{
      const novoAutor = await autores.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      if (autorResultado !== null) 
      {
        res.status(200).json({ message: "Autor atualizado com sucesso." });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }  

  static async excluirAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findByIdAndDelete(id);

      if (autorResultado !== null) {
        res.status(200).json({ message: "Autor removido com sucesso." });
      } else {
        next (new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

}

export default AutorController;
