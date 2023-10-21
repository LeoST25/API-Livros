import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { 
      type: String, 
      required: [true, "O título do livro é obrigatório."] 
    },
    autor: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autores",  
      required: [true, "O(a) autor(a) é obrigatório."] },
    editora: { 
      type: String, 
      required: [true, "A editora é obrigatória."]
    },
    preço: { type: Number },
    paginas: { type: Number }
  }, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;
