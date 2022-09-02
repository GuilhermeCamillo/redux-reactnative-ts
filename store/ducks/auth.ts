import {
  ChangePasswordFormType,
  InsertCodeFormType,
  UserResponseApi,
} from "./../../types/user";
import {
  createAsyncThunk,
  createReducer,
  createAction,
} from "@reduxjs/toolkit";
import { API } from "../../services/api";
import { handleApiError } from "../../utils/error";
import { ApiError, DefaultState } from "../../types/store";
import { LoginFormType, User } from "../../types/user";
import { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// INITIAL STATE
type InitialState = DefaultState & {
  isAuthenticated: boolean;
  user?: User | null;
  idRecover?: string;
  email?: string;
};

export const INITIAL_STATE: InitialState = {
  isAuthenticated: false,
  status: "idle",
  error: null,
};

// REQUESTS
export const loginAction = createAsyncThunk<
  AxiosResponse<UserResponseApi>,
  LoginFormType,
  { rejectValue: ApiError }
>("auth/login", async (user, thunkAPI) => {
  try {
    const response = await API.post<UserResponseApi>("/user/login/", user);
    AsyncStorage.setItem("schema", response.data.user.dbname);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(handleApiError(error));
  }
});

export const recoveryAction = createAsyncThunk<
  AxiosResponse<{
    email: string;
    id: string;
    mensagem: string;
    status: number;
  }>,
  string,
  { rejectValue: ApiError }
>("auth/recovery", async (email, thunkAPI) => {
  try {
    const response = await API.post("/user/forgotpassword/", { email });
    response.data.email = email;
    return response;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(handleApiError(error));
  }
});

export const sendCodeAction = createAsyncThunk<
  AxiosResponse,
  InsertCodeFormType,
  { rejectValue: ApiError }
>("auth/sendCode", async (params, thunkAPI) => {
  const { id, code } = params;
  try {
    return await API.get(`/user/forgotpassword/?id=${id}&code=${code}`);
  } catch (error) {
    return thunkAPI.rejectWithValue(handleApiError(error));
  }
});

export const updatePasswordAction = createAsyncThunk<
  void,
  ChangePasswordFormType,
  { rejectValue: ApiError }
>("auth/updatePassword", async ({ email, new_password }, thunkAPI) => {
  try {
    return await API.put("/user/forgotpassword/", { email, new_password });
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(handleApiError(error));
  }
});

export const logoutAction = createAction("auth/logoutAction");

// REDUCER
export const authReducer = createReducer<InitialState>(
  INITIAL_STATE,
  (builder) => {
    // Login
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.status = "succeeded";
      state.user = action.payload.data.user;
    });
    builder.addCase(loginAction.pending, (state) => {
      state.isAuthenticated = false;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.status = "failed";
      state.error = action.payload;
    });
    // Recovery
    builder.addCase(
      recoveryAction.fulfilled,
      (state, { payload: { data } }) => {
        state.isAuthenticated = false;
        state.status = "succeeded";
        state.idRecover = data.id;
        state.email = data.email;
      }
    );
    builder.addCase(recoveryAction.pending, (state) => {
      state.isAuthenticated = false;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(recoveryAction.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.status = "failed";
      state.error = action.payload;
    });
    // Send Code
    builder.addCase(sendCodeAction.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.status = "succeeded";
    });
    builder.addCase(sendCodeAction.pending, (state) => {
      state.isAuthenticated = false;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(sendCodeAction.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.status = "failed";
      state.error = action.payload;
    });
    // Update Password
    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.status = "succeeded";
    });
    builder.addCase(updatePasswordAction.pending, (state) => {
      state.isAuthenticated = false;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.status = "failed";
      state.error = action.payload;
    });
    // Logout
    builder.addCase(logoutAction, (state, action) => {
      AsyncStorage.clear()
        .then()
        .catch((err) => {
          throw new Error(err);
        });
      return {
        ...state,
        isAuthenticated: false,
        status: "succeeded",
        user: null,
      };
    });
  }
);
