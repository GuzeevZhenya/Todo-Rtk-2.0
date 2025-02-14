import { Todolist } from "./todolistsApi.types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BaseResponse } from "common/types"
import { DomainTodolist } from "../model/todolistsSlice"

export const todolistsApi = createApi({
  reducerPath: "todolistsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
      headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`)
    },
  }),
  tagTypes: ["Todolist"],
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      providesTags: ["Todolist"],
    }),
    addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "todo-lists",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolistsTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ title, id }) => {
        return {
          url: `todo-lists/${id}`,
          method: "PUT",
          body: { title },
        }
      },
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => {
        return {
          url: `todo-lists/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useLazyGetTodolistsQuery,
  useAddTodolistMutation,
  useUpdateTodolistsTitleMutation,
  useDeleteTodolistMutation,
} = todolistsApi

// export const _todolistsApi = {
//   getTodolists() {
//     return instance.get<Todolist[]>("todo-lists")
//   },
//   updateTodolist(payload: { id: string; title: string }) {
//     const { title, id } = payload
//     return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
//   },
//   createTodolist(title: string) {
//     return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
//   },
//   deleteTodolist(id: string) {
//     return instance.delete<BaseResponse>(`todo-lists/${id}`)
//   },
// }
