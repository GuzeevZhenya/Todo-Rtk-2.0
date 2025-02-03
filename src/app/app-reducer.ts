import { createSlice } from "@reduxjs/toolkit"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
  },
  name: "app",
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
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
  },
})

export const appReducer = appSlice.reducer
export const { changeTheme, setAppStatus, setAppError } = appSlice.actions
export const { selectThemeMode, selectAppStatus, selectAppError } = appSlice.selectors
// export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
//   switch (action.type) {
//     case "CHANGE_THEME":
//       return { ...state, themeMode: action.payload.themeMode }

//     case "SET_STATUS":
//       return { ...state, status: action.payload.status }

//     case "SET_ERROR":
//       return { ...state, error: action.payload.error }

//     default:
//       return state
//   }
// }

// // Action creators
// export const changeThemeAC = (themeMode: ThemeMode) => {
//   return {
//     type: "CHANGE_THEME",
//     payload: { themeMode },
//   } as const
// }

// export const setAppStatusAC = (status: RequestStatus) => {
//   return {
//     type: "SET_STATUS",
//     payload: { status },
//   } as const
// }

// export const setAppErrorAC = (error: string | null) => {
//   return {
//     type: "SET_ERROR",
//     payload: { error },
//   } as const
// }
