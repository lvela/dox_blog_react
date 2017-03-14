import React from 'react'
import {API_HOST} from '../../utils/constants'


const Article = (article) => {
  return (
    <div className="article">
      <a href={`${API_HOST}/articles/${article.id}`}>
        <div className="hero-secondary" style={{backgroundImage: `url(${API_HOST}${article.hero_image_url})`}}>
          <h1>{article.title}</h1>
        </div>
      </a>
      <p className="article-body">
        {article.body}
      </p>
      <p className="meta">
        {article.created_at}
        <span className="stick"> | </span>
        {article.author ? article.author.name : ''}
      </p>
      <hr/>
    </div>
  )
}

export default Article;
