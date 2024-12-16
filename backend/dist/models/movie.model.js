"use strict";
// import { v4 as uuid4 } from "uuid";
// import { Movie } from "../types/movie";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const findMovies = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findTitleMatchedUrl = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.DETAILS_ACCESS_TOKEN}`,
            },
        };
        const res = yield fetch(findTitleMatchedUrl, options);
        const data = yield res.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.error(err);
    }
});
const getMatchedTitleMovies = (title) => {
    return findMovies(title);
};
exports.default = {
    findMovies,
    getMatchedTitleMovies,
};
