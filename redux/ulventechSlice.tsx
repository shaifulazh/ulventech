import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppThunk } from './store';
import { ListData, Datas, SomeType , payloadEdit } from './profile'

export interface dataPackage {
  listData : ListData;
  status: 'idle' | 'loading' | 'failed';
  dataToSubmit : ListData;
  submitStatus : 'init' | 'pending' | 'failed' | 'success';
  responseAfterSubmit : string
}

const initialState: dataPackage = {
  listData : [],
  status : 'idle',
  dataToSubmit : [],
  submitStatus : 'init',
  responseAfterSubmit : ''
};


export const getData = createAsyncThunk(
  'ulventech/data',
  async () => {
    const response = await axios.get('https://ulventech-react-exam.netlify.app/api/form');
    return response.data;
  }
);
export const submitData = createAsyncThunk(
  'ulventech/submit',
  async (dataToSubmit : SomeType) => { 
    const response = await axios.post('https://ulventech-react-exam.netlify.app/api/form',dataToSubmit );
    return response.data;
  }
);


export const ulventechSlice = createSlice({
  name: 'ulventech',
  initialState,
  reducers: {
    editing: (state, action: PayloadAction<payloadEdit>) => {
      let fieldName = action.payload.fieldName
      let toChange = state.dataToSubmit.find((dat) => dat.fieldName == fieldName)
      let filtering = state.dataToSubmit.filter((dat) => dat.fieldName != fieldName)
      let newEdited = { ...toChange, value: action.payload.value }
      let newData = [...filtering, newEdited]

      state.dataToSubmit = newData

       ;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getData.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getData.fulfilled, (state,action) => {
        let data = action.payload.data
        state.listData = data
        state.dataToSubmit = data
        state.status = 'idle'
      })
      .addCase(submitData.pending, (state) => {
        state.submitStatus = 'pending';
      })
      .addCase(submitData.rejected, (state) => {
        state.submitStatus = 'failed';
      }) 

      .addCase(submitData.fulfilled, (state,action) => {
        let data = action.payload.data
        state.responseAfterSubmit = JSON.stringify(data)
        state.submitStatus = 'success'
      })
  },
});

export const { editing } = ulventechSlice.actions;

export const selectListData = (state: RootState) => state.ulventech.listData;
export const selectStatus = (state: RootState) => state.ulventech.status;
export const selectSubmitStatus = (state: RootState) => state.ulventech.submitStatus;
export const selectDataToSubmit = (state : RootState) => state.ulventech.dataToSubmit
export const selectResponseAfterSubmit = (state: RootState) => state.ulventech.responseAfterSubmit


export const submitDataThunk = (): AppThunk => (
  dispatch,
  getState
) => {
  let toSubmit = selectDataToSubmit(getState())
  let data : SomeType  

  toSubmit.map((val , x) =>
       data = {
         ...data,
         [val.fieldName]: val.value
        }
  )
  dispatch(submitData(data))


};

export default ulventechSlice.reducer;
