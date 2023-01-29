import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'
import axiosWithAuth from '../axios'

function Protected() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" />
  }
  return 'You have a token so here is the protected stuff...'
}

export default function Articles(props) {
  const [ editing, setEditing ] = useState(false)
  const [ articleToEdit, setArticleToEdit ] = useState()
  const { getArticles, articles, setCurrentArticleId, currentArticleId, updateArticle, deleteArticle } = props
  // ✨ where are my props? Destructure them here
  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" />
  }

  useEffect(() => {
    // ✨ grab the articles here, on first render only
    getArticles()
  }, [])

  const handleEdit = (e) => {
    e.preventDefault();
    // const currentArticle = {article_id: e.target.id, article: {title: e.target.value.title, text: e.target.value.text, topic: e.target.value.topic}}
    // console.log(currentArticleTitle)
    // updateArticle()
    // articles.map((article) => {
    //   console.log(article.article_id)
    //   if (article.article_id === Number(e.target.id)){
    //     updateArticle(e.target.id, article)
    //   }
    //   // return (updateArticle(article.article_id, article))
    // })
    // articles.filter(article => {
    //   article.article_id === Number(e.target.id)
    //   console.log(article)
    //   updateArticle(article.article_id, article)
    // })
    // setCurrentArticleId(Number(e.target.id))
    // // logs undefined
    // console.log(currentArticleId)
    // // logs id
    // console.log(Number(e.target.id))
    // setArticleToEdit(e.target.id)
    // // logs undefined
    // console.log(articleToEdit)
  }

  const handleDelete = (e) => {
    e.preventDefault();
    const currentArticle = Number(e.target.id)
    deleteArticle(currentArticle);
    
    
  }

  return ( 
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      {
        !articles.length
          ? 'No articles yet'
          : articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button value={art} id={art.article_id} disabled={false} onClick={handleEdit}>Edit</button>
                  <button value={art} id={art.article_id} disabled={false} onClick={handleDelete}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
