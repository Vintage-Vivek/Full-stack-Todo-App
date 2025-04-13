const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    toDo: {
        type: String,
        required: [true, "Task description is required"],
        trim: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('toDo', toDoSchema);



// const toDoSchema = new mongoose.Schema({
//     toDo: {
//         type: String,
//         required: true,
//     }
// })

// module.exports = mongoose.model('toDo', toDoSchema);