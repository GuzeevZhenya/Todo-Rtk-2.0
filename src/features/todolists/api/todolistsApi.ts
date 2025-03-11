import { Todolist } from "./todolistsApi.types"
import { BaseResponse } from "common/types"
import { DomainTodolist } from "../model/todolistsSlice"
import { baseApi } from "app/baseApi"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => {
        return {
          url: "todo-lists",
          method: "GET",
        }
      },
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
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
