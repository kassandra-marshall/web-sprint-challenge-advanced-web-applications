import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axiosWithAuth from '../axios'
import axios from 'axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { 
    /* ✨ implement */ 
    navigate('/', {replace:true}) 
  }

  const redirectToArticles = () => { /* ✨ implement */
    navigate('/articles')
    
  }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    window.localStorage.removeItem("token")
    // and a message saying "Goodbye!" should be set in its proper state.
    setMessage("Goodbye!")
    // In any case, we should redirect the browser back to the login screen,
    redirectToLogin()
    // using the helper above.
  }
// HELP
  const login = ({ username, password }) => {
    // ✨ implement
    setMessage('') 
    setSpinnerOn(true)
    const loginValues = {username, password}
    axios.post(loginUrl, loginValues)
    .then(res => 
      {localStorage.setItem('token', res.data.token)
        // localStorage.getItem('token');
        setMessage(res.data.message)
        setSpinnerOn(false)
        redirectToArticles()
      }).catch(err => console.log(err))
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!

    // if (username === 'foo' && password === '12345678'){
    //   setSpinnerOn(true)
    //   redirectToArticles()
    //   // axiosWithAuth().get(articlesUrl)
    //   // .then(res => {
    //   //   console.log(res)
    //   //   setMessage(res.data.message)
    //     setSpinnerOn(false)
    //   // })
    //   // .catch(err => {
    //   //   console.log(err)
    //   //   setSpinnerOn(false)
    //   // })
    // }
  }

  const getArticles = () => {
    // ✨ implement
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().get('/articles')
    .then(res => {
      setSpinnerOn(false)
      setMessage(res.data.message)
      setArticles(res.data.articles)
    })
    .catch(err => {
      setSpinnerOn(false)
      console.log({err})
      redirectToLogin()
      // setMessage(err.response.data.message)
    })
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
  }

  const postArticle = article => {
    // ✨ implement
    setMessage('');
    setSpinnerOn(true);
    axiosWithAuth().post('/articles', article)
    .then(res => {
      setSpinnerOn(false)
      console.log(res)
      setArticles([...articles, res.data.article])
      setMessage(res.data.message)
    })
    .catch(err => {
      setSpinnerOn(false)
      console.log(err)})
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.


  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    axiosWithAuth().put(`/articles/${article_id}`, article)
    .then(res => {
      setArticles([...articles, res.data])
      navigate('/articles')
    })
    .catch(err => {
      console.log({err})
    })
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
    console.log(article_id)
    axiosWithAuth().delete(`/articles/${article_id}`)
    .then(res => {
      setArticles(articles.filter(article => (article.article_id !== Number(article_id))))
      setMessage(res.data.message)})
    .catch(err => console.log(err))
    // 
    // setMessage(`Article ${article_id} was deleted`)
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} redirectToArticles={redirectToArticles}/>} />
          {/* look back at protected routes module 2 obj 2 or mod 2 guided project */}
          <Route path="articles" element={
            <>
              <ArticleForm 
              postArticle={postArticle}
              setCurrentArticleId={setCurrentArticleId}
              currentArticleId={currentArticleId}
              updateArticle={updateArticle}
              
              />
              <Articles 
                getArticles={getArticles}
                articles={articles}
                setCurrentArticleId={setCurrentArticleId} 
                currentArticleId={currentArticleId}
                updateArticle={updateArticle}
                deleteArticle={deleteArticle}/>
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
