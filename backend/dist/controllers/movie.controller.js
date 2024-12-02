"use strict";
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
const popularMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularMovieUrl = `${process.env.MOVIE_URL}/popular?language=en-US&page=1`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`,
            },
        };
        const response = yield fetch(popularMovieUrl, options);
        const data = yield response.json();
        // console.log(data);
        res.json(data);
    }
    catch (err) {
        console.error(err);
    }
});
const upcomingMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const upcomingMovieUrl = `${process.env.MOVIE_URL}/upcoming?language=en-US&page=1`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.DETAILS_ACCESS_TOKEN}`,
            },
        };
        const response = yield fetch(upcomingMovieUrl, options);
        const data = yield response.json();
        // console.log(data);
        res.json(data);
    }
    catch (err) {
        console.error(err);
    }
});
const findMatchedTitleMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   const { title } = req.body;
    //   console.log(title, req.body);
    //   const getMovies = movieModel.getMatchedTitleMovies(title);
    //   // const findMovies = movieModel.findMovies(title);
    //   // res.status(200).json(findMovies);
    //   res.status(200).json(getMovies);
    // } catch (err) {
    //   console.error(err);
    //   res.status(404).json({ error: `${err}` });
    // }
    try {
        // console.log(req)
        const { title } = req.params;
        console.log(title);
        const findTitleMatchedUrl = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.DETAILS_ACCESS_TOKEN}`,
            },
        };
        const response = yield fetch(findTitleMatchedUrl, options);
        const data = yield response.json();
        console.log(data);
        res.json(data);
        // return data;
    }
    catch (err) {
        console.error(err);
    }
});
;
// const discoverMovies = async (req: Request, res: Response) => {
//   try {
//     const discoverMovieUrl = `${process.env.MOVIE_DISCOVER_URL}/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${process.env.DETAILS_ACCESS_TOKEN}`,
//       },
//     };
//     const response = await fetch(discoverMovieUrl, options);
//     const data = await response.json();
//     console.log(data);
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//   }
// };
const movieDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = req.params.id;
    console.log(movieId);
    try {
        const detailMovieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits,videos,reviews`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.DETAILS_ACCESS_TOKEN}`,
            },
        };
        const response = yield fetch(detailMovieUrl, options);
        const data = yield response.json();
        // console.log(data);
        res.json(data);
    }
    catch (err) {
        console.error(err);
    }
});
exports.default = {
    popularMovies,
    movieDetail,
    upcomingMovies,
    findMatchedTitleMovie,
    // discoverMovies,
};
