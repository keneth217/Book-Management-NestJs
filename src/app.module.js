"use strict";
import { PoemsaiModule } from './poemsai/poemsai.module';
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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var Joi = require("@hapi/joi");
var devtools_integration_1 = require("@nestjs/devtools-integration");
var throttler_1 = require("@nestjs/throttler");
var books_module_1 = require("./books/books.module");
var users_module_1 = require("./users/users.module");
var auth_module_1 = require("./auth/auth.module");
var roles_module_1 = require("./roles/roles.module");
var passport_1 = require("@nestjs/passport");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                devtools_integration_1.DevtoolsModule.register({
                    http: process.env.NODE_ENV !== 'production',
                }),
                throttler_1.ThrottlerModule.forRoot([
                    {
                        ttl: 60000,
                        limit: 10,
                    },
                ]),
                // Initialize ConfigModule and validate .env variables
                config_1.ConfigModule.forRoot({
                    isGlobal: true, // Makes config available globally
                    validationSchema: Joi.object({
                        DATABASE_HOST: Joi.string().required(),
                        DATABASE_PORT: Joi.number().required(),
                        DATABASE_USER: Joi.string().required(),
                        DATABASE_PASSWORD: Joi.string().required(),
                        DATABASE_NAME: Joi.string().required(),
                        NODE_ENV: Joi.string()
                            .valid('development', 'production')
                            .default('development'),
                    }),
                }),
                passport_1.PassportModule.register({ session: true }),
                // Configure TypeORM using validated .env variables
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (configService) { return ({
                        type: 'postgres',
                        host: configService.get('DATABASE_HOST'),
                        port: configService.get('DATABASE_PORT'),
                        username: configService.get('DATABASE_USER'),
                        password: configService.get('DATABASE_PASSWORD'),
                        database: configService.get('DATABASE_NAME'),
                        synchronize: true,
                        entities: ['dist/**/*.entity{.ts,.js}'],
                    }); },
                    inject: [config_1.ConfigService],
                }),
                books_module_1.BooksModule,
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                roles_module_1.RolesModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
