import React from 'react';

const CommentsList = ({ comments }) => {
    if(comments){
        return(
        <>
        <h3 className="clow">Comments:</h3>
        <br></br>
        {comments.map((comment,key) => (
            <div className="comment" key={key}>
            <h4>{comment.postedBy}</h4>
            <p>{comment.comment}</p>
            </div>
        ))}
    </>
  )}
}

export default CommentsList;