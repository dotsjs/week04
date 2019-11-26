const Conversation = require("./src/controller/Conversation");
const Instruction = require("./src/controller/Instruction");
const Model = require("./src/model/model");

const model = new Model();
const instruction = new Instruction(model);
const conversation = new Conversation(instruction);
conversation.init();
