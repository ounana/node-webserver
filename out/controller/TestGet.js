"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new class TestGet {
    constructor() {
        this.PATH = '/api/get';
    }
    GET(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const { __query } = req;
        res.end(JSON.stringify(__query));
    }
};
//# sourceMappingURL=TestGet.js.map