import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          console.log("predicate", action.type)
          return action.type.endWith("/pending")
        },
        (state, action) => {
          state.status = "loading"
        },
      )
      .addMatcher(
        (action) => {
          console.log("predicate", action.type)
          return action.type.endWith("/rejected")
        },
        (state, action) => {
          state.status = "failed"
        },
      )
      .addMatcher(
        (action) => {
          console.log("predicate", action.type)
          return action.type.endWith("/fulfiled")
        },
        (state, action) => {
          state.status = "succeeded"
        },
      )
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { changeTheme, setAppError, setAppStatus, setIsLoggedIn } = appSlice.actions
export const { selectAppStatus, selectAppError, selectThemeMode, selectIsLoggedIn } = appSlice.selectors
export const appReducer = appSlice.reducer
