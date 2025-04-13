const tododata = require("../model/tododata");

module.exports.getTodos = async (req, res) => {
    try {
        const toDos = await tododata.find();
        res.status(200).send(toDos);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message, msg: "Failed to fetch tasks!" });
    }
};

module.exports.saveToDo = async (req, res) => {
    const { toDo } = req.body;

    if (!toDo || typeof toDo !== "string") {
        return res.status(400).send({ msg: "Invalid input for task!" });
    }

    try {
        const sanitizedToDo = toDo.trim();
        const data = await tododata.create({ toDo: sanitizedToDo });
        res.status(201).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message, msg: "Failed to save task!" });
    }
};

module.exports.updateToDo = async (req, res) => {
    const { id } = req.params;
    const { toDo } = req.body;

    if (!id || !toDo || typeof toDo !== "string") {
        return res.status(400).send({ msg: "Invalid input for task or ID!" });
    }

    try {
        const sanitizedToDo = toDo.trim();
        await tododata.findByIdAndUpdate(id, { toDo: sanitizedToDo });
        res.status(200).send("Updated Successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message, msg: "Failed to update task!" });
    }
};

module.exports.deleteToDo = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ msg: "Invalid ID!" });
    }

    try {
        await tododata.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message, msg: "Failed to delete task!" });
    }
};
