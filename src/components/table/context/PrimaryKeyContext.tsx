import { createContext } from "react";

const PrimaryKeyContext = createContext<undefined|string>("id");

export default PrimaryKeyContext;
