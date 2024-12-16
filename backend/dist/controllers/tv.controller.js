"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = `${process.env.TV_URL}/popular?language=en-US&page=1`;
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDEzZjU3NjZiNjE5OTVlZDcxMDQ2MmJhY2ExNTMyYyIsIm5iZiI6MTczMjM0ODk0Ni45NTU1OTc2LCJzdWIiOiI2NmIyYmRkMGE4NDA5N2YwZjFiOTYwZWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wiy-6lijgueXiqNTnXN9Z-mUs8j5Fzcrlm_tSfrRy20",
    },
};
fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
