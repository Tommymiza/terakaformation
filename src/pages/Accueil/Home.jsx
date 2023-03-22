import React from 'react'
import Formulaire from "./Formulaire";
import Formation from "../Formation/Formation";

export default function Home({user}) {
  return (
    <section>{user ? <Formation /> : <Formulaire />}</section>
  )
}
