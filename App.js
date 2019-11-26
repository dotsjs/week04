const Conversation = require("./src/controller/Conversation");
const Instruction = require("./src/controller/Instruction");
const Model = require("./src/model/model");
const Print = require("./src/View/Print");

const print = new Print();
const model = new Model(print);
const instruction = new Instruction(model);
const conversation = new Conversation(instruction);
conversation.init();
