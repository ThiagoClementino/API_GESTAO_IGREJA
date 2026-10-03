import mongoose from "mongoose";

import {
  members,
  generateUniqueId,
} from "../models/members.js";

import financeiro from "../models/financeiro.js";

import {
  generateMatricula,
} from "../models/counter.js";

// ==========================================
// MEMBROS
// ==========================================

async function getMembers(
  req,
  res
) {
  try {
    const lista =
      await members.find().lean();

    return res
      .status(200)
      .json(lista);
  } catch (erro) {
    console.error(
      "Erro ao buscar membros:",
      erro
    );

    return res.status(500).json({
      erro:
        "Não foi possível buscar os membros",
    });
  }
}

async function getMember(
  req,
  res
) {
  try {
    const member =
      await members.findOne({
        _id: req.params.id,
      });

    if (!member) {
      return res.status(404).json({
        erro:
          "Membro não encontrado",
      });
    }

    return res
      .status(200)
      .json(member);
  } catch (erro) {
    console.error(
      "Erro ao buscar membro:",
      erro
    );

    return res.status(500).json({
      erro:
        "Erro ao buscar membro",
    });
  }
}

async function getMemberschek(
  req,
  res
) {
  return res.status(200).json({
    mensagem: "API ok",
  });
}

async function postMembers(
  req,
  res
) {
  try {
    const {
      _id: ignoredId,
      matricula: ignoredMatricula,
      ...payload
    } = req.body;

    const _id =
      await generateUniqueId();

    const matricula =
      await generateMatricula(
        "members",
        "MEN"
      );

    const novoMembro =
      new members({
        _id,
        ...payload,
        matricula,
      });

    await novoMembro.save();

    return res
      .status(201)
      .json(novoMembro);
  } catch (erro) {
    console.error(
      "Erro ao cadastrar membro:",
      erro
    );

    return res.status(500).json({
      erro:
        "Dados não lançados",
      mongo:
        erro.message,
    });
  }
}

async function putMembers(
  req,
  res
) {
  try {
    const {
      _id,
      matricula,
      ...payload
    } = req.body;

    const membro =
      await members.findByIdAndUpdate(
        req.params.id,
        payload,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!membro) {
      return res.status(404).json({
        erro:
          "Membro não encontrado",
      });
    }

    return res
      .status(200)
      .json(membro);
  } catch (erro) {
    console.error(
      "Erro ao atualizar membro:",
      erro
    );

    return res.status(500).json({
      erro:
        "Não foi possível atualizar os dados",
    });
  }
}

async function deleteMembers(
  req,
  res
) {
  try {
    const membro =
      await members.findByIdAndDelete(
        req.params.id
      );

    if (!membro) {
      return res.status(404).json({
        erro:
          "Membro não encontrado",
      });
    }

    return res.status(200).json({
      mensagem:
        "Membro deletado com sucesso",
    });
  } catch (erro) {
    console.error(
      "Erro ao excluir membro:",
      erro
    );

    return res.status(500).json({
      erro:
        "Não foi possível excluir os dados",
    });
  }
}

// ==========================================
// FINANCEIRO
// ==========================================

async function getfinance(
  req,
  res
) {
  try {
    const lista =
      await financeiro
        .find()
        .lean();

    return res
      .status(200)
      .json(lista);
  } catch (erro) {
    console.error(
      "Erro ao buscar lançamentos:",
      erro
    );

    return res.status(500).json({
      erro:
        "Não foi possível buscar os lançamentos",
    });
  }
}

async function getfinanceById(
  req,
  res
) {
  try {
    const { id } =
      req.params;

    let lancamento =
      await financeiro
        .findById(id)
        .lean();

    if (
      !lancamento &&
      mongoose.Types.ObjectId
        .isValid(id)
    ) {
      lancamento =
        await financeiro
          .collection
          .findOne({
            _id:
              new mongoose
                .Types.ObjectId(
                  id
                ),
          });
    }

    if (!lancamento) {
      return res.status(404).json({
        erro:
          "Lançamento não encontrado",
      });
    }

    return res
      .status(200)
      .json(lancamento);
  } catch (erro) {
    console.error(
      "Erro ao buscar lançamento:",
      erro
    );

    return res.status(500).json({
      erro:
        "Não foi possível buscar o lançamento",
    });
  }
}

async function postfinance(
  req,
  res
) {
  try {
    const {
      _id: ignoredId,
      matricula: ignoredMatricula,
      ...payload
    } = req.body;

    const matricula =
      await generateMatricula(
        "financeiros",
        "FIN"
      );

    const novoLancamento =
      new financeiro({
        ...payload,
        matricula,
      });

    await novoLancamento.save();

    return res
      .status(201)
      .json(novoLancamento);
  } catch (erro) {
    console.error(
      "Erro ao cadastrar lançamento:",
      erro
    );

    return res.status(500).json({
      erro:
        "Dados não lançados",
      mongo:
        erro.message,
    });
  }
}

async function putfinance(
  req,
  res
) {
  try {
    const { id } =
      req.params;

    const {
      _id,
      matricula,
      ...payload
    } = req.body;

    let lancamento =
      await financeiro
        .findByIdAndUpdate(
          id,
          payload,
          {
            new: true,
            runValidators: true,
          }
        );

    if (
      !lancamento &&
      mongoose.Types.ObjectId
        .isValid(id)
    ) {
      const objectId =
        new mongoose.Types.ObjectId(
          id
        );

      const resultado =
        await financeiro
          .collection
          .updateOne(
            {
              _id: objectId,
            },
            {
              $set: payload,
            }
          );

      if (
        resultado.matchedCount >
        0
      ) {
        lancamento =
          await financeiro
            .collection
            .findOne({
              _id: objectId,
            });
      }
    }

    if (!lancamento) {
      return res.status(404).json({
        erro:
          "Lançamento não encontrado",
      });
    }

    return res
      .status(200)
      .json(lancamento);
  } catch (erro) {
    console.error(
      "Erro ao atualizar lançamento:",
      erro
    );

    return res.status(500).json({
      erro:
        "Não foi possível atualizar os dados",
    });
  }
}

async function deletefinance(
  req,
  res
) {
  try {
    const { id } =
      req.params;

    let resultado =
      await financeiro.deleteOne({
        _id: id,
      });

    if (
      resultado.deletedCount === 0 &&
      mongoose.Types.ObjectId
        .isValid(id)
    ) {
      resultado =
        await financeiro
          .collection
          .deleteOne({
            _id:
              new mongoose
                .Types.ObjectId(id),
          });
    }

    if (
      resultado.deletedCount ===
      0
    ) {
      return res.status(404).json({
        erro:
          "Lançamento não encontrado",
      });
    }

    return res.status(200).json({
      mensagem:
        "Lançamento deletado com sucesso",
    });
  } catch (erro) {
    console.error(
      "Erro ao excluir lançamento:",
      erro
    );

    return res.status(500).json({
      erro:
        "Não foi possível excluir os dados",
    });
  }
}

export {
  getMember,
  getMemberschek,
  getMembers,
  postMembers,
  deleteMembers,
  putMembers,

  getfinance,
  getfinanceById,
  postfinance,
  deletefinance,
  putfinance,
};