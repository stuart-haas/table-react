import { useEffect, useMemo, useState } from "react";
import api from "services/api";
import { buildUrl } from "./functions";

export const useFetch = (path: string, params?: any) => {
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const url = useMemo(() => {
        return buildUrl(path, params);
    }, [path, params]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            api.get(url.toString())
                .then((response) => {
                    const { data } = response;
                    setData(data);
                    setIsLoading(false);
                }).catch((error) => {
                    setError(error);
                })
        };
        fetchData();
    }, [url]);

    return { data, error, isLoading };
}