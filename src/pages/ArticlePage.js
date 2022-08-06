import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import articleContent from './article-contents';
import ArticleList from '../components/ArticleList';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import UpvotesSections from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = ({match}) => {
    
    // const name = match.params.name;
    const {name} = useParams();    
    const article = articleContent.find(article => article.name === name);
    const otherArticles = articleContent.filter(article => article.name!==name)

    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []});

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
            // console.log(body)
        };
        fetchData();

    }, [name]);

    if (!article) return <NotFoundPage />

    return (
        <div className='page'>
            <h1>{article.title}</h1>

            <UpvotesSections articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
            {article.content.map((paragraph, key) => (<p key={key}>{paragraph}</p>))}
            
            <CommentsList comments={articleInfo.comments}/>
            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/> 

            <h2 style={{marginTop: 50}} >Other Articles</h2>
            <ArticleList articles={otherArticles}/>
        </div>
    );
}

export default ArticlePage;