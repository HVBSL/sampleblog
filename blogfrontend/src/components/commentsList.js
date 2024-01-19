import React from 'react';

const CommentsList = ({ comments }) => (
        <>
            <h3 className="clow">Comments:</h3>
            <br></br>
            {comments&&comments.map((comment,key) => (
                <div className="comment" key={key}>
                <h4>{comment.postedBy}</h4>
                <p>{comment.comment}</p>
                </div>
            ))}
        </>
    )
  


export default CommentsList;