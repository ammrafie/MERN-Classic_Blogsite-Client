import React from "react";



const UpvotesSections = ({articleName, upvotes, setArticleInfo}) => {
    const upvoteArticle = async () => {
        const result = await fetch(`/api/articles/${articleName}/upvote`, {
            method: 'post',
        });
        const body = await result.json();
        setArticleInfo(body);
    }


    return (
        <div className="upvoteSection">
            <button onClick={() => upvoteArticle()}>Add Upvote</button>
            <p className='upvoteStatus'>This post have been upvoted {upvotes} times</p>
        </div>
    );
    
}

export default UpvotesSections;