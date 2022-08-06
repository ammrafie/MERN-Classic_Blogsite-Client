import React from "react";

const CommentsList = ({comments}) => (
    <div className="commentSection">
    <h3 style={{marginTop:40,marginBottom:0}}>Comments:</h3>
    {comments.map((comment, key) => (
        <div className="comment" key={key}>
            <h4>{comment.username}</h4>
            <p>{comment.text}</p>
        </div>
    ))}
    </div>
);

export default CommentsList;