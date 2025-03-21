import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTableData,
  createRecord as apiCreateRecord,
  deleteRecord as apiDeleteRecord,
  updateRecord as apiUpdateRecord,
} from "../../api/requests";
import { TableRecord } from "../../types/index";

interface DataState {
  data: TableRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, thunkApi) => {
    try {
      const response = await getTableData();
      return response.data;
    } catch (error: any) {
      return thunkApi.fulfillWithValue(
        error.message || "Ошибка загрузки данных"
      );
    }
  }
);

export const createRecord = createAsyncThunk(
  "data/createRecord",
  async (record: Omit<TableRecord, "id">, thunkApi) => {
    try {
      const response = await apiCreateRecord(record);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.message || "Ошибка создания записи"
      );
    }
  }
);

export const deleteRecord = createAsyncThunk(
  "data/deleteRecord",
  async (id: string, thunkApi) => {
    try {
      const response = await apiDeleteRecord(id);
      if (response.error_code !== 0) {
        return thunkApi.rejectWithValue(
          response.error_text || "Ошибка удаления записи"
        );
      }
      return id;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.message || "Ошибка удаления записи"
      );
    }
  }
);

export const updateRecord = createAsyncThunk(
  "data/updateRecord",
  async (
    { id, updatedRecord }: { id: string; updatedRecord: TableRecord },
    thunkApi
  ) => {
    try {
      const response = await apiUpdateRecord(id, updatedRecord);
      if (response.error_code !== 0) {
        throw new Error(
          response.data.error_text || "Ошибка редактирования записи"
        );
      }
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.message || "Ошибка обновления записи"
      );
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //fetchData
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    //createRecord
    builder
      .addCase(createRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    //deleteRecord
    builder
      .addCase(deleteRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (record) => record.id !== action.payload
        );
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    //updateRecord
    builder
      .addCase(updateRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (record) => record.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearData } = dataSlice.actions;
export default dataSlice.reducer;
