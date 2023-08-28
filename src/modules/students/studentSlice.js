import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "../../services/student.service";

export const initialState = {
  students: [],
  student: {},
  colleges: [],
  isLoading: false,
  errorMessage: null,
};
export const getStudents = createAsyncThunk(
  "loadStudents",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(actions.loadStudents());
      const res = await studentService.getAll();
      thunkAPI.dispatch(actions.loadStudentsSuccess(res.data));
      return res.data;
    } catch (e) {
      console.log("----error", e.message);
      thunkAPI.dispatch(actions.loadStudentsFailed(e.message));
      return e.message;
    }
  }
);
export const getStudentById = createAsyncThunk(
  "loadStudentById",
  async (initialValue, thunkAPI) => {
    const res = await studentService.getById(initialValue);
    thunkAPI.dispatch(actions.loadStudentById(res.data));
    return res.data;
  }
);
export const getCollege = createAsyncThunk(
  "loadCollege",
  async (_, thunkAPI) => {
    const res = await studentService.getCollege();
    thunkAPI.dispatch(actions.loadColleges(res.data));
    return res.data;
  }
);
export const updateStudent = createAsyncThunk(
    "updateCollege",
    async (initialValue, thunkAPI) => {
      thunkAPI.dispatch(actions.loadStudents());
      const res = await studentService.update(initialValue);
      thunkAPI.dispatch(actions.updateStudent(res.data));
      return res.data;
    }
  );
  export const createStudent = createAsyncThunk(
    "updateCollege",
    async (initialValue, thunkAPI) => {
      thunkAPI.dispatch(actions.loadStudents());
      const res = await studentService.create(initialValue);
      if(res){
        const res = await studentService.getAll();
        thunkAPI.dispatch(actions.loadStudentsSuccess(res.data));
        return res.data;
      }
      thunkAPI.dispatch(actions.loadStudentsFailed("Create new student failed"));
      return "Create new student failed";
    }
  );
  export const deleteStudent = createAsyncThunk(
    "updateCollege",
    async (initialValue, thunkAPI) => {
      thunkAPI.dispatch(actions.loadStudents());
      const res = await studentService.deleteById(initialValue);
      if(res){
        const res = await studentService.getAll();
        thunkAPI.dispatch(actions.loadStudentsSuccess(res.data));
        return res.data;
      }
      thunkAPI.dispatch(actions.loadStudentsFailed("Delete student failed"));
      return "Delete student failed";
    }
  );

const studentSlice = createSlice({
  name: "studentReducer",
  initialState,
  reducers: {
    loadStudents: (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    loadStudentsSuccess: (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.students = action.payload.data.students;
      state.colleges = action.payload.data.colleges;
    },
    loadStudentsFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.students = [];
    },
    loadStudentById: (state, action) => {
      state.student = action.payload.data.student;
    },
    updateStudent: (state, action)=>{
        state.isLoading = false;
        state.errorMessage = null;
        state.students = action.payload.data.updateStudent;
    },
    loadColleges: (state, action) => {
      state.colleges = action.payload.data.colleges;
    },
  },
});
export const { actions, reducer } = studentSlice;
