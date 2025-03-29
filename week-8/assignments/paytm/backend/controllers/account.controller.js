import Account from '../models/account.model.js';

export const getBalance = async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  res.status(200).json({
    balance: account.balance,
  });
};

export const transferBalance = async (req, res) => {
  const { to, amount } = req.body;
  const account = await Account.findOne({ userId: req.userId });

  if (account.balance < amount) {
    return res.status(400).json({
      message: 'Insufficient balance amount',
    });
  }

  const toAccount = Account.findOne({ userId: to });
  if (!toAccount) {
    return res.status(400).json({
      message: 'Invalid account',
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    {
      $inc: { balance: -amount },
    }
  );

  await Account.updateOne(
    { userId: to },
    {
      $inc: { balance: amount },
    }
  );

  res.status(200).json({
    message: 'Transfer successful',
  });
};
