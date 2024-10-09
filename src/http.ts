import axios from "axios"
import { Observable } from "rxjs"
import { fromPromise } from "rxjs/internal/observable/innerFrom"

export namespace Http{
    export const get = <T>(url: string): Observable<T> => {
        return  fromPromise(
            axios
        .get<T>(url)
        .then((res) => res.data)
        )
    }

    export const post = <T>(url: string, body: any): Observable<T> => {
        return fromPromise(
            axios
        .post<T>(url, body)
        .then((res) => res.data)
        )
    }

    export const put = <T>(url: string, body: any): Observable<T> => {
        return fromPromise(
            axios
        .put<T>(url, body)
        .then((res) => res.data)
        )
    }

    export const del = <T>(url: string): Observable<T> => {
        return fromPromise(
            axios
        .delete<T>(url)
        .then((res) => res.data)
        )
    }

    export const patch = <T>(url: string, body: any): Observable<T> => {
        return fromPromise(
            axios
        .patch<T>(url, body)
        .then((res) => res.data)
        )
    }
}

