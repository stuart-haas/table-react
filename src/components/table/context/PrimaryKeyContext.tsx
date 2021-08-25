import { createContext } from "react";

export interface IPrimaryKeyContext {
    primaryKey: string|undefined
}

const PrimaryKeyContext = createContext<Partial<IPrimaryKeyContext>>({
    primaryKey: "id",
});

export default PrimaryKeyContext;
