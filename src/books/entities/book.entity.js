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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var Book = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _author_decorators;
    var _author_initializers = [];
    var _author_extraInitializers = [];
    var _genre_decorators;
    var _genre_initializers = [];
    var _genre_extraInitializers = [];
    var _publicationYear_decorators;
    var _publicationYear_initializers = [];
    var _publicationYear_extraInitializers = [];
    var _rating_decorators;
    var _rating_initializers = [];
    var _rating_extraInitializers = [];
    var _isBorrowed_decorators;
    var _isBorrowed_initializers = [];
    var _isBorrowed_extraInitializers = [];
    var _borrowDate_decorators;
    var _borrowDate_initializers = [];
    var _borrowDate_extraInitializers = [];
    var _returnDate_decorators;
    var _returnDate_initializers = [];
    var _returnDate_extraInitializers = [];
    var _borrowedBy_decorators;
    var _borrowedBy_initializers = [];
    var _borrowedBy_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var Book = _classThis = /** @class */ (function () {
        function Book_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.author = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _author_initializers, void 0));
            this.genre = (__runInitializers(this, _author_extraInitializers), __runInitializers(this, _genre_initializers, void 0));
            this.publicationYear = (__runInitializers(this, _genre_extraInitializers), __runInitializers(this, _publicationYear_initializers, void 0));
            this.rating = (__runInitializers(this, _publicationYear_extraInitializers), __runInitializers(this, _rating_initializers, void 0));
            this.isBorrowed = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _isBorrowed_initializers, void 0));
            this.borrowDate = (__runInitializers(this, _isBorrowed_extraInitializers), __runInitializers(this, _borrowDate_initializers, void 0));
            this.returnDate = (__runInitializers(this, _borrowDate_extraInitializers), __runInitializers(this, _returnDate_initializers, void 0));
            this.borrowedBy = (__runInitializers(this, _returnDate_extraInitializers), __runInitializers(this, _borrowedBy_initializers, void 0)); // User who borrowed the book, or null if not borrowed
            this.createdAt = (__runInitializers(this, _borrowedBy_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return Book_1;
    }());
    __setFunctionName(_classThis, "Book");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _title_decorators = [(0, typeorm_1.Column)()];
        _author_decorators = [(0, typeorm_1.Column)()];
        _genre_decorators = [(0, typeorm_1.Column)()];
        _publicationYear_decorators = [(0, typeorm_1.Column)({ type: 'int', name: 'publication_year', nullable: true })];
        _rating_decorators = [(0, typeorm_1.Column)({ type: 'float', default: 0 })];
        _isBorrowed_decorators = [(0, typeorm_1.Column)({ default: false })];
        _borrowDate_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _returnDate_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _borrowedBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.books; }, {
                nullable: true,
                onDelete: 'SET NULL',
            })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'timestamp' })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _author_decorators, { kind: "field", name: "author", static: false, private: false, access: { has: function (obj) { return "author" in obj; }, get: function (obj) { return obj.author; }, set: function (obj, value) { obj.author = value; } }, metadata: _metadata }, _author_initializers, _author_extraInitializers);
        __esDecorate(null, null, _genre_decorators, { kind: "field", name: "genre", static: false, private: false, access: { has: function (obj) { return "genre" in obj; }, get: function (obj) { return obj.genre; }, set: function (obj, value) { obj.genre = value; } }, metadata: _metadata }, _genre_initializers, _genre_extraInitializers);
        __esDecorate(null, null, _publicationYear_decorators, { kind: "field", name: "publicationYear", static: false, private: false, access: { has: function (obj) { return "publicationYear" in obj; }, get: function (obj) { return obj.publicationYear; }, set: function (obj, value) { obj.publicationYear = value; } }, metadata: _metadata }, _publicationYear_initializers, _publicationYear_extraInitializers);
        __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: function (obj) { return "rating" in obj; }, get: function (obj) { return obj.rating; }, set: function (obj, value) { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
        __esDecorate(null, null, _isBorrowed_decorators, { kind: "field", name: "isBorrowed", static: false, private: false, access: { has: function (obj) { return "isBorrowed" in obj; }, get: function (obj) { return obj.isBorrowed; }, set: function (obj, value) { obj.isBorrowed = value; } }, metadata: _metadata }, _isBorrowed_initializers, _isBorrowed_extraInitializers);
        __esDecorate(null, null, _borrowDate_decorators, { kind: "field", name: "borrowDate", static: false, private: false, access: { has: function (obj) { return "borrowDate" in obj; }, get: function (obj) { return obj.borrowDate; }, set: function (obj, value) { obj.borrowDate = value; } }, metadata: _metadata }, _borrowDate_initializers, _borrowDate_extraInitializers);
        __esDecorate(null, null, _returnDate_decorators, { kind: "field", name: "returnDate", static: false, private: false, access: { has: function (obj) { return "returnDate" in obj; }, get: function (obj) { return obj.returnDate; }, set: function (obj, value) { obj.returnDate = value; } }, metadata: _metadata }, _returnDate_initializers, _returnDate_extraInitializers);
        __esDecorate(null, null, _borrowedBy_decorators, { kind: "field", name: "borrowedBy", static: false, private: false, access: { has: function (obj) { return "borrowedBy" in obj; }, get: function (obj) { return obj.borrowedBy; }, set: function (obj, value) { obj.borrowedBy = value; } }, metadata: _metadata }, _borrowedBy_initializers, _borrowedBy_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Book = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Book = _classThis;
}();
exports.Book = Book;
