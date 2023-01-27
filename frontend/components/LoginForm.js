import React, { useState } from 'react'
import PT from 'prop-types'
import axios from 'axios'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
  const { login, redirectToArticles } = props

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    axios.post('http://localhost:9000/api/login', values)
    .then(res => {
      login(values)
      localStorage.setItem("token", res.data.token)
      localStorage.getItem("token")
      redirectToArticles()
    })
    .catch(err => console.log(err))

  }

  const isDisabled = () => {
    // ✨ implement
    return(
      // Trimmed username must be >= 3, and
      values.username.trim().length < 3 ||
      // trimmed password must be >= 8 for
      values.password.trim().length < 8
    )
    // the button to become enabled
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
