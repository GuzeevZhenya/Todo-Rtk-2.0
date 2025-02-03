import { UnknownAction } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/auth/model/auth-reducer"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./app-reducer"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

// export type AppDispatch = typeof store.dispatch

// Создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>

// @ts-ignore
window.store = store
