import { createContext, useContext } from "react";

const SelectedContext = createContext<Array<any>>([]);

export const useSelectedContext = () => useContext(SelectedContext);

export default SelectedContext;
