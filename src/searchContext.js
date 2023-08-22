import { createContext } from "react";

export const SearchContext = createContext({
  searchValue: "",
  onSearchChanged: () => {},
})