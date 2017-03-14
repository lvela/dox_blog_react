import React from 'react'
import Article from './Article'

export default function Articles(props) {
  return (
    <div className="col-3-4">
      {props.articles.length > 0
        ? props.articles.map((article) =>
            <Article {...article} key={article.id}/>
          )
        : 'No articles'
      }
    </div>
  )
}
