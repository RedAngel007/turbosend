"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// Import Functions
const { File, Console } = winston_1.transports;
// Init Logger
const logger = (0, winston_1.createLogger)({
    level: 'info',
});
const errorStackFormat = (0, winston_1.format)((info) => {
    if (info.stack) {
        // tslint:disable-next-line:no-console
        console.log(info.stack);
        return false;
    }
    return info;
});
const consoleTransport = new Console({
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple(), errorStackFormat()),
});
logger.add(consoleTransport);
exports.default = logger;
