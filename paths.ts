import "module-alias/register";

import { addAliases } from "module-alias";

addAliases({
    "@controllers": `${__dirname}/controllers`,
    "@services": `${__dirname}/services`,
    "@middlewares": `${__dirname}/middlewares`,
    "@types": `${__dirname}/types`,
    "@interfaces": `${__dirname}/interfaces`,
    "@utils": `${__dirname}/utils`,
    "@routes": `${__dirname}/routes`,
});
