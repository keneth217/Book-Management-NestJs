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
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1(usersRepository, rolesRepository) {
            this.usersRepository = usersRepository;
            this.rolesRepository = rolesRepository;
        }
        // Create a new user
        UsersService_1.prototype.create = function (createUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var defaultRole, _a, _b, newUser;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(!createUserDto.roles || createUserDto.roles.length === 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.rolesRepository.findOne({
                                    where: { name: 'user' },
                                })];
                        case 1:
                            defaultRole = _c.sent();
                            createUserDto.roles = [defaultRole];
                            return [3 /*break*/, 4];
                        case 2:
                            // If roles are provided as strings (role names), convert them to Role entities
                            _a = createUserDto;
                            return [4 /*yield*/, Promise.all(createUserDto.roles.map(function (roleName) { return __awaiter(_this, void 0, void 0, function () {
                                    var role;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.rolesRepository.findOne({
                                                    where: { name: roleName.name },
                                                })];
                                            case 1:
                                                role = _a.sent();
                                                if (!role) {
                                                    throw new common_1.NotFoundException("Role with name ".concat(roleName, " not found"));
                                                }
                                                return [2 /*return*/, role];
                                        }
                                    });
                                }); }))];
                        case 3:
                            // If roles are provided as strings (role names), convert them to Role entities
                            _a.roles = _c.sent();
                            _c.label = 4;
                        case 4:
                            // Hash the password before saving
                            _b = createUserDto;
                            return [4 /*yield*/, bcrypt.hash(createUserDto.password, 10)];
                        case 5:
                            // Hash the password before saving
                            _b.password = _c.sent();
                            newUser = this.usersRepository.create(createUserDto);
                            return [2 /*return*/, this.usersRepository.save(newUser)];
                    }
                });
            });
        };
        UsersService_1.prototype.assignRole = function (userId, roleName) {
            return __awaiter(this, void 0, void 0, function () {
                var user, role;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { id: userId },
                                relations: ['roles'],
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException("User with ID ".concat(userId, " not found"));
                            }
                            return [4 /*yield*/, this.rolesRepository.findOne({
                                    where: { name: roleName },
                                })];
                        case 2:
                            role = _a.sent();
                            if (!role) {
                                throw new common_1.NotFoundException("Role with name \"".concat(roleName, "\" does not exist"));
                            }
                            if (user.roles.some(function (r) { return r.name === roleName; })) {
                                throw new common_1.BadRequestException("User already has the role \"".concat(roleName, "\""));
                            }
                            user.roles.push(role);
                            return [2 /*return*/, this.usersRepository.save(user)];
                    }
                });
            });
        };
        // Find users by role
        UsersService_1.prototype.findUsersByRole = function (roleName) {
            return __awaiter(this, void 0, void 0, function () {
                var role;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.rolesRepository.findOne({
                                where: { name: roleName },
                                relations: ['users'],
                            })];
                        case 1:
                            role = _a.sent();
                            if (!role) {
                                throw new common_1.NotFoundException("Role ".concat(roleName, " not found"));
                            }
                            return [2 /*return*/, role.users];
                    }
                });
            });
        };
        // Update user by UUID
        UsersService_1.prototype.update = function (id, updateUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, updatedUser;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            user = _b.sent();
                            if (!updateUserDto.password) return [3 /*break*/, 3];
                            _a = updateUserDto;
                            return [4 /*yield*/, bcrypt.hash(updateUserDto.password, 10)];
                        case 2:
                            _a.password = _b.sent();
                            _b.label = 3;
                        case 3:
                            updatedUser = Object.assign(user, updateUserDto);
                            return [2 /*return*/, this.usersRepository.save(updatedUser)];
                    }
                });
            });
        };
        // Find one user by UUID
        UsersService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { id: id },
                                relations: ['roles'],
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException("User with ID ".concat(id, " not found"));
                            }
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        // Find all users
        UsersService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersRepository.find({ relations: ['roles'] })];
                });
            });
        };
        // Remove user by UUID
        UsersService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, this.usersRepository.remove(user)];
                    }
                });
            });
        };
        // Initialize default roles and admin user
        UsersService_1.prototype.onModuleInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var defaultRoles, _i, defaultRoles_1, roleName, role, admin, adminRole, adminUser, _a, _b;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            defaultRoles = ['admin', 'user', 'guest'];
                            _i = 0, defaultRoles_1 = defaultRoles;
                            _d.label = 1;
                        case 1:
                            if (!(_i < defaultRoles_1.length)) return [3 /*break*/, 5];
                            roleName = defaultRoles_1[_i];
                            return [4 /*yield*/, this.rolesRepository.findOne({
                                    where: { name: roleName },
                                })];
                        case 2:
                            role = _d.sent();
                            if (!!role) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.rolesRepository.save(this.rolesRepository.create({ name: roleName }))];
                        case 3:
                            _d.sent();
                            _d.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 1];
                        case 5: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { userName: 'admin' },
                                relations: ['roles'],
                            })];
                        case 6:
                            admin = _d.sent();
                            if (!!admin) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.rolesRepository.findOne({
                                    where: { name: 'admin' },
                                })];
                        case 7:
                            adminRole = _d.sent();
                            _b = (_a = this.usersRepository).create;
                            _c = {
                                name: 'Admin User',
                                userName: 'admin',
                                email: 'admin@example.com'
                            };
                            return [4 /*yield*/, bcrypt.hash('admin123', 10)];
                        case 8:
                            adminUser = _b.apply(_a, [(_c.password = _d.sent(),
                                    _c.roles = [adminRole],
                                    _c)]);
                            return [4 /*yield*/, this.usersRepository.save(adminUser)];
                        case 9:
                            _d.sent();
                            console.log('Default admin user created');
                            _d.label = 10;
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.findUserByName = function (userName) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { userName: userName },
                                relations: ['roles'],
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException("User with username ".concat(userName, " not found"));
                            }
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UsersService_1.prototype.removeRole = function (userId, roleName) {
            return __awaiter(this, void 0, void 0, function () {
                var user, role;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { id: userId },
                                relations: ['roles'],
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException("User with ID ".concat(userId, " not found"));
                            }
                            role = user.roles.find(function (r) { return r.name === roleName; });
                            if (!role) {
                                throw new common_1.NotFoundException("User does not have the role \"".concat(roleName, "\""));
                            }
                            user.roles = user.roles.filter(function (r) { return r.name !== roleName; });
                            return [2 /*return*/, this.usersRepository.save(user)];
                    }
                });
            });
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;
