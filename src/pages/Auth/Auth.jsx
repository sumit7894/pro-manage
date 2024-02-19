import React from 'react'
import AuthForm from '../../components/Auth/AuthForm/AuthForm'
import Banner from '../../components/Auth/Banner/Banner'

const Auth = () => {
  return (
    <div style={{display:"flex"}}>
        <Banner/>
        <AuthForm/>
    </div>
  )
}

export default Auth