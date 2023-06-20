"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const module_alias_1 = require("module-alias");
(0, module_alias_1.addAliases)({
    "@controllers": `${__dirname}/controllers`,
    "@services": `${__dirname}/services`,
    "@middlewares": `${__dirname}/middlewares`,
    "@types": `${__dirname}/types`,
    "@interfaces": `${__dirname}/interfaces`,
    "@utils": `${__dirname}/utils`,
    "@routes": `${__dirname}/routes`,
});
