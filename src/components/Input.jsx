import React from 'react'

const Input = ({label, type, name, id}) => {
  return (
    <div className='mb-2'>
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} name={name} className='form-control' required />
    </div>
  )
}

export default Input
