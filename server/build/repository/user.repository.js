"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_entity_1 = require("../entities/user.entity");
const utils_1 = require("../utils");
require("../extensions/string.extension");
exports.UserRepository = utils_1.DB.getRepository(user_entity_1.User).extend({});
