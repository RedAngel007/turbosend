"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.isNullOrEmpty = () => {
    return String(this) === undefined || String(this) === null || String(this).trim() === "";
};
