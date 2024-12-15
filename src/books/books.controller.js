"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
// src/books/books.controller.ts
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var roles_decorator_1 = require("../auth/roles/roles.decorator");
var roles_guard_1 = require("../auth/roles/roles.guard");
var throttler_1 = require("@nestjs/throttler");
var BooksController = function () {
    var _classDecorators = [(0, common_1.Controller)('books'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, throttler_1.ThrottlerGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _giveBook_decorators;
    var _listBooksForUser_decorators;
    var _listBooksBorrowed_decorators;
    var _returnBook_decorators;
    var _searchBooks_decorators;
    var BooksController = _classThis = /** @class */ (function () {
        function BooksController_1(booksService) {
            this.booksService = (__runInitializers(this, _instanceExtraInitializers), booksService);
        }
        BooksController_1.prototype.create = function (createBookDto) {
            return this.booksService.create(createBookDto);
        };
        BooksController_1.prototype.findAll = function () {
            return this.booksService.findAll();
        };
        BooksController_1.prototype.findOne = function (id) {
            return this.booksService.findOne(id);
        };
        BooksController_1.prototype.update = function (id, updateBookDto) {
            return this.booksService.update(id, updateBookDto);
        };
        BooksController_1.prototype.remove = function (id) {
            return this.booksService.remove(id);
        };
        BooksController_1.prototype.giveBook = function (bookId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.booksService.giveBook(bookId, userId)];
                });
            });
        };
        BooksController_1.prototype.listBooksForUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.booksService.listBooksForUser(userId)];
                });
            });
        };
        BooksController_1.prototype.listBooksBorrowed = function () {
            return __awaiter(this, void 0, void 0, function () {
                var borrowedBooks, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('Fetching borrowed books...');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.booksService.listAllBorrowedBooks()];
                        case 2:
                            borrowedBooks = _a.sent();
                            console.log('Borrowed Books:', borrowedBooks);
                            return [2 /*return*/, borrowedBooks];
                        case 3:
                            error_1 = _a.sent();
                            console.error('Error fetching borrowed books:', error_1);
                            throw new common_1.NotFoundException('No borrowed books found');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        BooksController_1.prototype.returnBook = function (bookId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.booksService.returnBook(bookId, userId)];
                });
            });
        };
        BooksController_1.prototype.searchBooks = function (title, author, genre) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log('Searching for books with:', { title: title, author: author, genre: genre });
                    return [2 /*return*/, this.booksService.searchBookByAuthorTitleGenre(title, author, genre)];
                });
            });
        };
        return BooksController_1;
    }());
    __setFunctionName(_classThis, "BooksController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)('admin')];
        _findAll_decorators = [(0, common_1.Get)('all'), (0, roles_decorator_1.Roles)('user', 'admin', 'guest')];
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, roles_decorator_1.Roles)('user', 'admin')];
        _update_decorators = [(0, common_1.Patch)(':id'), (0, roles_decorator_1.Roles)('admin')];
        _remove_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)('admin')];
        _giveBook_decorators = [(0, common_1.Patch)(':bookId/assign/:userId')];
        _listBooksForUser_decorators = [(0, common_1.Get)('user/:userId')];
        _listBooksBorrowed_decorators = [(0, common_1.Post)('borrowed')];
        _returnBook_decorators = [(0, common_1.Patch)(':bookId/return/:userId')];
        _searchBooks_decorators = [(0, common_1.Post)('search')];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _giveBook_decorators, { kind: "method", name: "giveBook", static: false, private: false, access: { has: function (obj) { return "giveBook" in obj; }, get: function (obj) { return obj.giveBook; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listBooksForUser_decorators, { kind: "method", name: "listBooksForUser", static: false, private: false, access: { has: function (obj) { return "listBooksForUser" in obj; }, get: function (obj) { return obj.listBooksForUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listBooksBorrowed_decorators, { kind: "method", name: "listBooksBorrowed", static: false, private: false, access: { has: function (obj) { return "listBooksBorrowed" in obj; }, get: function (obj) { return obj.listBooksBorrowed; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _returnBook_decorators, { kind: "method", name: "returnBook", static: false, private: false, access: { has: function (obj) { return "returnBook" in obj; }, get: function (obj) { return obj.returnBook; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _searchBooks_decorators, { kind: "method", name: "searchBooks", static: false, private: false, access: { has: function (obj) { return "searchBooks" in obj; }, get: function (obj) { return obj.searchBooks; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BooksController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BooksController = _classThis;
}();
exports.BooksController = BooksController;