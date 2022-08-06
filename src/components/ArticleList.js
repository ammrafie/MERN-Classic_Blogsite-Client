import React from "react";
import { Link } from 'react-router-dom';

const ArticleList = ({articles}) => (
    articles.map((article,key) => (
        <div className='article-list-item-container' key={key}>
            <Link className='article-list-item' to={`/article/${article.name}`}>
                <h3>{article.title}</h3>
                <p>{article.content[0].substring(0,150)}...</p>
            </Link>
        </div>
    ))
)

export default ArticleList;