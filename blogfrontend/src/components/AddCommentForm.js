import {useState} from "react";
import axios from "axios"
import useUser from "../hooks/useUser";

const AddCommentForm = ({articleName,newArticle})=>{
    const [name, setName]= useState('');
    const [commentText, setCommentText]= useState('');
    const {user} = useUser();

    const addComments=async ()=>{
        const token = user && await user.getIdToken();
        const headers = token || {authToken: token};
        // setName(user.email);
        const response=await axios.post(`/api/articles/${articleName}/comments/`,{
            postedBy: name,
            comment: commentText,
        },null,headers);
        await newArticle(response.data);
        // catch(err=>console.log(err)));
        setName('');
        setCommentText('');
    }

    return(
        <div id="add-comment-form">
            <h3>Add Comments form</h3>
                {user&&<p>You are posting this comments as {user.email}</p>}
                    <textarea 
                        value={commentText}
                        onChange={e=>setCommentText(e.target.value)}
                        rows="5" 
                        cols="50" />
                <button onClick={addComments}>Add Comments</button>

        </div>
    )
}

export default AddCommentForm;