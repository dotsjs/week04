const Conversation = require("./src/controller/Conversation");
const Git = require("./src/controller/Git");
const Util = require("./src/controller/Util");

const git = new Git();
const util = new Util();
const conversation = new Conversation({ git, util });
conversation.init();
