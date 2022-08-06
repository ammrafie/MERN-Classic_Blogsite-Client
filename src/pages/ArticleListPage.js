import React from 'react';
import articleContent from './article-contents';
import ArticleList from '../components/ArticleList';


const ArticleListPage = () => {
    return (
        <div className='page'>
            <h1>Articles</h1>
            <ArticleList articles={articleContent}/>
        </div>
    );
}

export default ArticleListPage;