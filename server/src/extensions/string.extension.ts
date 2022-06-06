declare global {
    interface String {
        isNullOrEmpty(): boolean;
    }
}

String.prototype.isNullOrEmpty = (): boolean => {
    return String(this) === undefined || String(this) === null || String(this).trim() === "";
}

export { };