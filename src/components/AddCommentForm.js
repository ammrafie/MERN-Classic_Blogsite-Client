import React, {useState} from "react";

const AddCommentForm = ({articleName, setArticleInfo}) => {
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: 'post',
            // Bcz server is expecting the commentText to be called as just 'text'
            // And when we're sending a request body, we need to add JSON.stringify which truns json obj to string,(which the server can parse)
            body: JSON.stringify({username, text: commentText}),
            // When sending post request with a json body, we need to specify a header
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const body = await result.json();
        setArticleInfo(body);

        setUsername('');
        setCommentText('');
    }

    return (
        <div className="commentForm">
            <h3>Add a Comment</h3>
            <label className="username">
                Name:
                <input type="text" value={username} 
                    onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label className="commentText">
                Comment:
                <textarea rows="4" cols="50" value={commentText} 
                    onChange={(event) => setCommentText(event.target.value)} />
            </label>
            <button onClick={() => addComment()}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm;