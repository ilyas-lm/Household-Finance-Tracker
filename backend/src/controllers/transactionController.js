import Transaction from "../models/Transaction.js";


// add tst

export const addTransaction = async (req, res) => {
    const { type, category, amount, date, note } = req.body;

    try {
        if (!type || !category || !amount) {
            return res.status(400).json({ message: "category and amount are required"})
        }

     const transaction = await Transaction.create({
        user: req.user.id,
        type,
        category,
        amount,
        date: date || Date.now(),
        note,
    });

      res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get tst   
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({date: -1});
        res.json(transactions); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update tst
export const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if(!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        if (transaction.user.toString() !==req.user.id) {
            return res.status(401).json({ message: "Not authoriwzed" });
        }

        const updateTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updateTransaction)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete tst
export const deleteTransaction = async(req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: " Transaction not foound" });
        }

        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await transaction.deleteOne();
        res.json({ message: "Transaction deleted" });
    } catch (error) {
        res.status(500).json({ message: "error.message" });
    }
};