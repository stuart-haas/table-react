import { baseURL } from "services/api";

export const buildUrl =  (path: string, params?: any) => {
    let url = new URL(path, baseURL);
    params && Object.keys(params).forEach((e) => {
        url.searchParams.append(e, params[e])
    });
    return url;
}