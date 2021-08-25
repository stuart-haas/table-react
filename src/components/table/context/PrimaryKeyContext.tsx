import { createContext, useContext } from "react";

export interface IPrimaryKeyContext {
    primaryKey: string|undefined
}

const PrimaryKeyContext = createContext<Partial<IPrimaryKeyContext>>({
    primaryKey: "id",
});

export const usePrimaryKeyContext = () => useContext(PrimaryKeyContext);

export default PrimaryKeyContext;
