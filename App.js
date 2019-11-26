const Conversation = require("./src/Conversation");
const Git = require("./src/instruction/Git");
const Util = require("./src/instruction/Util");

const git = new Git();
const util = new Util();
const conversation = new Conversation({ git, util });
conversation.init();
