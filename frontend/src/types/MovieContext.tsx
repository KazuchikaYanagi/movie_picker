import { createContext } from "react";

export type MovieContextType = {
  search: string;
  setSearch: (value: string) => void;
  backdropImage: {
    backdrop_path: string | null;
    title: string;
    release_date: string;
    vote_average: number;
  };
  setBackdropImage: (data: {
    backdrop_path: string | null;
    title: string;
    release_date: string;
    vote_average: number;
  }) => void;
};

export const MovieData = createContext<MovieContextType | null>(null);
