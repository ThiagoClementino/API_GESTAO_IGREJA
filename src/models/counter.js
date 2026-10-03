import mongoose from "mongoose";

const counterSchema =
  new mongoose.Schema(
    {
      _id: {
        type: String,
        required: true,
      },

      sequence: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    {
      versionKey: false,
    }
  );

const Counter = mongoose.model(
  "Counter",
  counterSchema,
  "counters"
);

const generateMatricula = async (
  counterId,
  prefix
) => {
  const counter =
    await Counter.findOneAndUpdate(
      {
        _id: counterId,
      },
      {
        $inc: {
          sequence: 1,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

  return `${prefix}-${String(
    counter.sequence
  ).padStart(4, "0")}`;
};

export {
  Counter,
  generateMatricula,
};