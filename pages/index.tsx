import Head from 'next/head'
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ListData, Datas, SomeType } from './profile'
import { Container, AppBar, Button, Toolbar, Typography, InputLabel, FormControl, MenuItem, TextField, Box, Select } from '@mui/material';
import DynamicForm from './dynamicForm';
import Circular from './circular';
import Disable from './disable'

const  Home = ()=> {
  const [loading, setLoading] = useState({loading :false, disable:false});
  const [response, setResponse] = useState();
  const [data, setData] = useState<ListData>([{
    fieldName: '',
    type: '',
    value: '',
    options: []
  }]);

  const [toSubmit, setToSubmit] = useState<ListData>([{
    fieldName: '',
    type: '',
    value: '',
    options: []
  }]);

  const [objek, setObjek] = useState<SomeType>({
    firstName: '',
    lastName: '',
    emailAddress: '',

  })

  useEffect(() => {
    axios.get('https://ulventech-react-exam.netlify.app/api/form').then(({ data: realData }) => {

      setData(realData.data)
      setToSubmit(realData.data)
      setLoading(prev=>({ ...prev, loading:true}))
    })
  }, []);

  useEffect(() => {
    toSubmit.map((val, x) => {
      if (val.fieldName == 'age') {
        setObjek((prevState) => ({
          ...prevState,
          [val.fieldName]: parseInt(val.value)
        }))
      }
      else {
        setObjek(prevState => ({
          ...prevState,
          [val.fieldName]: val.value
        }))
      }
    })

  }, [toSubmit])

  useEffect(() => {

  }, [response])

  const editing = (fieldName) => (e) => {

    let toChange = toSubmit.find((dat) => dat.fieldName == fieldName)
    let filtering = toSubmit.filter((dat) => dat.fieldName != fieldName)
    let newEdited = { ...toChange, value: e.target.value }
    let newData = [...filtering, newEdited]


    setToSubmit(newData)
  }


  const handleSubmit = () => {
    setLoading(prev=>({ ...prev, disable:true }))
    axios.post('https://ulventech-react-exam.netlify.app/api/form', objek).then((res) => {
      setResponse(res.data)
      setLoading(prev=>({ ...prev, disable:false}))
    })


  }

  return (<>
      <AppBar position="absolute" >
        <Toolbar variant="dense">
        </Toolbar>


      </AppBar >
    <Box  mt={7} >

      {loading.disable && <Disable/>}
      
      {loading.loading ? <DynamicForm data={data} editing={editing} handleSubmit={handleSubmit} response={response}/>: <Circular/>}
    </Box>
  </>
  )
}



export default Home 