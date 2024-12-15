"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.BooksService = void 0;
var common_1 = require("@nestjs/common");
var BooksService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BooksService = _classThis = /** @class */ (function () {
        function BooksService_1(booksRepository, usersRepository) {
            this.booksRepository = booksRepository;
            this.usersRepository = usersRepository;
        }
        BooksService_1.prototype.create = function (createBookDto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingBook, newBook;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.booksRepository.findOne({
                                where: { title: createBookDto.title },
                            })];
                        case 1:
                            existingBook = _a.sent();
                            if (existingBook) {
                                throw new common_1.BadRequestException("A book with the title \"".concat(createBookDto.title, "\" already exists."));
                            }
                            newBook = this.booksRepository.create(createBookDto);
                            return [2 /*return*/, this.booksRepository.save(newBook)];
                    }
                });
            });
        };
        BooksService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.booksRepository.find()];
                });
            });
        };
        BooksService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var book;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.booksRepository.findOne({ where: { id: id } })];
                        case 1:
                            book = _a.sent();
                            if (!book) {
                                throw new common_1.NotFoundException("Book with ID ".concat(id, " not found"));
                            }
                            return [2 /*return*/, book];
                    }
                });
            });
        };
        BooksService_1.prototype.update = function (id, updateBookDto) {
            return __awaiter(this, void 0, void 0, function () {
                var book, updatedBook;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            book = _a.sent();
                            updatedBook = Object.assign(book, updateBookDto);
                            return [2 /*return*/, this.booksRepository.save(updatedBook)];
                    }
                });
            });
        };
        BooksService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var book;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            book = _a.sent();
                            return [4 /*yield*/, this.booksRepository.remove(book)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // Assign a book to a user
        BooksService_1.prototype.giveBook = function (bookId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var book, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.booksRepository.findOne({ where: { id: bookId } })];
                        case 1:
                            book = _a.sent();
                            if (!book) {
                                throw new common_1.NotFoundException("Book with ID ".concat(bookId, " not found"));
                            }
                            // Check if the book is already borrowed
                            if (book.isBorrowed) {
                                throw new common_1.BadRequestException("Book with ID ".concat(bookId, " is already borrowed by another user"));
                            }
                            return [4 /*yield*/, this.usersRepository.findOne({ where: { id: userId } })];
                        case 2:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException("User with ID ".concat(userId, " not found"));
                            }
                            // Set the book as borrowed and assign the user
                            book.isBorrowed = true; // Mark the book as borrowed
                            book.borrowedBy = user; // Assign the book to the user
                            book.borrowDate = new Date(); // Set current date as borrow date
                            book.returnDate = null; // No return date until returned
                            // Save the updated book record to the database
                            return [2 /*return*/, this.booksRepository.save(book)];
                    }
                });
            });
        };
        // List books borrowed by a specific user
        BooksService_1.prototype.listBooksForUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { id: userId },
                                relations: ['books'], // Fetch related books
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException("User with ID ".concat(userId, " not found"));
                            }
                            return [2 /*return*/, this.booksRepository.find({ where: { borrowedBy: user } })]; // Return books borrowed by the user
                    }
                });
            });
        };
        // Return a book from a user
        BooksService_1.prototype.returnBook = function (bookId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var book;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.booksRepository.findOne({
                                where: { id: bookId },
                                relations: ['borrowedBy'],
                            })];
                        case 1:
                            book = _a.sent();
                            if (!book) {
                                throw new common_1.NotFoundException("Book with ID ".concat(bookId, " not found"));
                            }
                            if (!book.borrowedBy || book.borrowedBy.id !== userId) {
                                throw new common_1.BadRequestException("Book with ID ".concat(bookId, " is not borrowed by user with ID ").concat(userId));
                            }
                            book.isBorrowed = false; // Mark book as returned
                            book.borrowedBy = null; // Unassign the user
                            book.returnDate = new Date();
                            return [2 /*return*/, this.booksRepository.save(book)];
                    }
                });
            });
        };
        BooksService_1.prototype.listAllBorrowedBooks = function () {
            return __awaiter(this, void 0, void 0, function () {
                var books, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            console.log('Fetching borrowed books...');
                            return [4 /*yield*/, this.booksRepository.find({
                                    where: { isBorrowed: true }, // Query borrowed books
                                    relations: ['borrowedBy'], // Include borrower details
                                })];
                        case 1:
                            books = _a.sent();
                            if (books.length === 0) {
                                throw new common_1.NotFoundException('No books are currently borrowed');
                            }
                            return [2 /*return*/, books];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Error fetching borrowed books:', error_1);
                            throw error_1; // Re-throw error after logging it
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        BooksService_1.prototype.searchBookByAuthorTitleGenre = function (title, author, genre) {
            return __awaiter(this, void 0, void 0, function () {
                var queryBuilder, books, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            queryBuilder = this.booksRepository.createQueryBuilder('book');
                            if (title) {
                                queryBuilder.andWhere('book.title ILIKE :title', {
                                    title: "%".concat(title, "%"),
                                });
                            }
                            if (author) {
                                queryBuilder.andWhere('book.author ILIKE :author', {
                                    author: "%".concat(author, "%"),
                                });
                            }
                            if (genre) {
                                queryBuilder.andWhere('book.genre ILIKE :genre', {
                                    genre: "%".concat(genre, "%"),
                                });
                            }
                            return [4 /*yield*/, queryBuilder.getMany()];
                        case 1:
                            books = _a.sent();
                            if (books.length === 0) {
                                throw new common_1.NotFoundException('No books found for the given search criteria');
                            }
                            return [2 /*return*/, books];
                        case 2:
                            error_2 = _a.sent();
                            console.error('Error searching books:', error_2);
                            throw error_2; // Re-throw error after logging
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return BooksService_1;
    }());
    __setFunctionName(_classThis, "BooksService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BooksService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BooksService = _classThis;
}();
exports.BooksService = BooksService;
