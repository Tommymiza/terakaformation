import React from 'react'

export default function Cours({user}) {
  return (
    <section>{user ? (
        <div className="col-div">
            <h1>Bienvenue dans les cours TERAKA</h1>
        </div>
    ) : (
        <div className="col-div">
            <h1>Vous devez vous connecter pour accéder au cours</h1>
        </div>
    ) }</section>
  )
}
