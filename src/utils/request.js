import instance from "./instance"

export const LOGIN = (data) => instance.post("login",data)

export const SEARCH_PODCAST = (params) => instance.get("search", { params })