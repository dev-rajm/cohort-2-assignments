import mongoose from 'mongoose';
import Account from '../models/account.model.js';

export const getBalance = async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    console.log(`Error while getting balance: ${error.message}`);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const transferBalance = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: 'Insufficient balance amount',
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: 'Invalid account',
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } },
      { session }
    );

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: 'Transfer successful',
    });
  } catch (error) {
    console.log(`Error in transfer controller: ${error.message}`);
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
