import { ErrorResponse } from "pexels";

export const isError = (err: unknown): err is ErrorResponse => err instanceof Error;

export const formatQuery = (url: string) => {
    const query = String(url).substring(String(url).indexOf("?"));

    if(typeof url !== undefined) return query;
}