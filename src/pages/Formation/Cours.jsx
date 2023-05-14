import React from 'react'
import List from './List'

export default function Cours({user}) {
  return (
    <section>{user ? (
        <div className="col-div" id='list'>
            <List />
        </div>
    ) : (
        <div className="col-div" style={{marginTop:"140px"}}>
            <h1>Vous devez vous connecter pour accéder au cours</h1>
        </div>
    ) }</section>
  )
}
