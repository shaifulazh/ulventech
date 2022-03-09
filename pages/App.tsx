import Head from 'next/head'
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ListData, Datas, SomeType } from './profile'
import { Container, AppBar, Button, Toolbar, Typography, InputLabel, FormControl, MenuItem, TextField, Box, Select } from '@mui/material';
import DynamicForm from './dynamicForm';
import Circular from './circular';
import Disable from './disable'
import { getData ,selectListData, selectSubmitStatus ,selectStatus} from './redux/ulventechSlice';
import {useAppDispatch,useAppSelector} from './redux/hooks'

const  App = ()=> {
  const dispatch = useAppDispatch();
  const submitStatus = useAppSelector(selectSubmitStatus)
  const status = useAppSelector(selectStatus)

  useEffect(() => {
    dispatch(getData())

  }, []);
  return (<>
      <AppBar position="absolute" >
        <Toolbar variant="dense">
        </Toolbar>


      </AppBar >
    <Box  mt={7} >

      {status  == 'loading' ? <Circular/> : <DynamicForm />}

      {submitStatus == 'pending' && <Disable/>}
      

    </Box>
  </>
  )
}



export default App 