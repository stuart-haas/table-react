import { ChangeEvent, createContext } from "react";

export interface IRowCheckboxContextModel {
    event: ChangeEvent<HTMLInputElement>|undefined, 
    key: string|number;
}

export interface IRowCheckboxContext {
    handleRowCheckbox: (model: IRowCheckboxContextModel) => void;
}

const RowCheckboxContext = createContext<Partial<IRowCheckboxContext>>({});

export default RowCheckboxContext;
