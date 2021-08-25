import { ChangeEvent, createContext, useContext } from "react";

export interface IHeaderCheckboxContextModel {
    event: ChangeEvent<HTMLInputElement>|undefined, 
    keys: Array<string|number>;
}

export interface IHeaderCheckboxContext {
    handleHeaderCheckbox: (model: IHeaderCheckboxContextModel) => void;
}

const HeaderCheckboxContext = createContext<Partial<IHeaderCheckboxContext>>({});

export const useHeaderCheckboxContext = () => useContext(HeaderCheckboxContext);

export default HeaderCheckboxContext;
