"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let server;
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
const main = () => {
    try {
        server = app_1.default.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log("Failed to connect to the server", error);
    }
};
main();
