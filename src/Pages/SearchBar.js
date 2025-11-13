import React, { useState } from 'react'
import {Box,TextField,Button} from '@mui/material'

const SearchBar = ({onSearch,initialValue="",placeHolder}) => {
    const [value,setValue]=useState(initialValue);

  const handelKey=(e)=>{
    if(e.key==="Enter") handelClick();

  }

  const handelClick=()=>{
    onSearch(value.trim())
  }


  return (
    <Box sx={{display:'flex',gap:1 ,justifyContent:'center' ,p:2}}>
        <TextField value={value}
        size='small'
        placeholder={placeHolder}
        onChange={(event)=>setValue(event.target.value)}
        onKeyDown={handelKey}
        sx={{width:320}}
        >

        </TextField>
        <Button variant='contained' onClick={handelClick}>Search</Button>
    </Box>
  )
}

export default SearchBar
