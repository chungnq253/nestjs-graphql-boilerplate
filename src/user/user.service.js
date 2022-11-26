"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var UserService = /** @class */ (function () {
    function UserService() {
        this.users = [
            {
                id: 1,
                email: 'john@gmail.com',
                password: 'changeme'
            },
            {
                id: 2,
                email: 'maria@gmail.com',
                password: 'guess'
            },
            {
                id: 2,
                email: 'chungnq253@gmail.com',
                password: 'depzailuan'
            },
        ];
    }
    UserService.prototype.create = function (createUserInput) {
        createUserInputs;
        return 'This action adds a new user';
    };
    UserService.prototype.findAll = function () {
        return this.users;
    };
    UserService.prototype.findOne = function (email) {
        return this.users.find(function (user) { return user.email === email; });
    };
    UserService.prototype.update = function (id, updateUserInput) {
        return "This action updates a #".concat(id, " user");
    };
    UserService.prototype.remove = function (id) {
        return "This action removes a #".concat(id, " user");
    };
    UserService = __decorate([
        (0, common_1.Injectable)()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;