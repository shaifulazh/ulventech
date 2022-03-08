import Head from 'next/head'
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ListData, Datas, SomeType } from './profile'
import { Container, AppBar, Button, Toolbar, Typography, InputLabel, FormControl, MenuItem, TextField, Box, Select } from '@mui/material';

const DynamicForm = ({data,editing,handleSubmit,response})=> {
 
    return (
        <Container maxWidth={'md'} >
        <Box mt={10} sx={{ display: 'grid', width: '100%' }}>
          <Typography variant={'h6'} mb={4}>Dynamic Form</Typography >

          {data.length > 1 && data.map((x, i) => {
            const splitRealData = (x.fieldName).replace(/([A-Z])/g, ' $1').trim()
            let label = splitRealData.charAt(0).toLocaleUpperCase() + splitRealData.slice(1)

            if (x.fieldName == 'gender') {
              return (<FormControl key={i}>

                <TextField
                sx={{ my: 1 }}
                  id="select"
                  onChange={editing(x.fieldName)}
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
              type={(x.fieldName =='age')? 'number': 'text'}
              key={i}
              id="outlined-required"
              label={label}
              sx={{ my: 1 }}
              defaultValue={x.value}
              onChange={editing(x.fieldName)}
              multiline={x.fieldName == 'testimonial'}
            />)
          })}

        </Box>
        <Box my={1}>
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </Box>
        {response && (
          <Box my={3}>

            <Typography variant={'h6'} mb={4}>Response</Typography >

            <Typography variant={'body2'} mb={2}>{JSON.stringify(response)}</Typography >
          </Box>
        )}
      </Container>
    )
  }



  export default DynamicForm