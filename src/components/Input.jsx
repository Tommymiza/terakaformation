import { TextField } from '@mui/material'
import React from 'react'

const Input = ({label, type, name, id}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: "row",
      alignItems: "center",
      gap: "20px",
    }}>
        <div style={{width: "120px", textAlign: "end", lineHeight: "15px"}}><label htmlFor={id}>{label}</label></div>
        <TextField id={id} type={type} name={name} required={label.includes('*')} inputProps={{style: {height: 1, width:"150px"}}} />
    </div>
  )
}

export default Input
