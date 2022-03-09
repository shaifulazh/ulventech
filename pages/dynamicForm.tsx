import React, { useState, useEffect } from 'react';
import { ListData, Datas, SomeType, payloadEdit } from '../redux/profile'
import { Container, AppBar, Button, Toolbar, Typography, InputLabel, FormControl, MenuItem, TextField, Box, Select } from '@mui/material';
import { getData, selectListData, selectStatus, editing, submitDataThunk, selectResponseAfterSubmit, selectSubmitStatus } from '../redux/ulventechSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useSelector } from 'react-redux';


const DynamicForm = () => {
  const listdata = useAppSelector(selectListData)
  const dispatch = useAppDispatch();
  const submitStatus = useAppSelector(selectSubmitStatus)
  const status = useAppSelector(selectStatus)
  const responeAfterSubmit = useSelector(selectResponseAfterSubmit)

  const handleChange = (fieldName) => (e) => {

    const payloadEdit: payloadEdit = {
      fieldName: fieldName,
      value: fieldName == 'age' ? Number(e.target.value) : e.target.value
    }
    dispatch(editing(payloadEdit))

  }

  const handleSubmit = () => {

    dispatch(submitDataThunk())


  }

  return (
    <Container maxWidth={'md'} >
      <Box mt={10} sx={{ display: 'grid', width: '100%' }}>
        <Typography variant={'h6'} mb={4}>Dynamic Form</Typography >

        {listdata && listdata.map((x, i) => {
          const splitRealData = (x.fieldName).replace(/([A-Z])/g, ' $1').trim()
          let label = splitRealData.charAt(0).toLocaleUpperCase() + splitRealData.slice(1)

          if (x.fieldName == 'gender') {
            return (<FormControl key={i}>

              <TextField
                sx={{ my: 1 }}
                id="select"
                onChange={handleChange(x.fieldName)}
                select
                label={label}
                defaultValue={x.value}


              >
                {x.options.map((options, idx) => <MenuItem key={idx} value={options} >{options}</MenuItem>)}

              </TextField>
            </FormControl>
            )

          }

          return (<TextField
            type={(x.fieldName == 'age') ? 'number' : 'text'}
            key={i}
            id="outlined-required"
            label={label}
            sx={{ my: 1 }}
            defaultValue={x.value}
            onChange={handleChange(x.fieldName)}
            multiline={x.fieldName == 'testimonial'}
          />)
        })}

      </Box>
      <Box my={1}>
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </Box>
      {submitStatus == 'success'  && (
        <Box my={3}>

          <Typography variant={'h6'} mb={4}>Response</Typography >

          <Typography variant={'body2'} mb={2}>{responeAfterSubmit}</Typography >
        </Box>
      )}
      {status == 'failed' || submitStatus == 'failed' && <span>Failed to load/submit data from Ulventect API {responeAfterSubmit}</span>}
    </Container>
  )
}



export default DynamicForm