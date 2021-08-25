import { ChangeEvent, createContext } from "react";

export interface IHeaderCheckboxContextModel {
    event: ChangeEvent<HTMLInputElement>|undefined, 
    keys: Array<string|number>;
}

export interface IHeaderCheckboxContext {
    handleHeaderCheckbox: (model: IHeaderCheckboxContextModel) => void;
}

const HeaderCheckboxContext = createContext<Partial<IHeaderCheckboxContext>>({});

export default HeaderCheckboxContext;
