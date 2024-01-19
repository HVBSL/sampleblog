import { Link, useParams } from "react-router-dom";
import articles from "./article-content.js";
import NotFoundPage from "./NotFoundPage.js";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentsList from "../components/commentsList.js";
import AddCommentForm from "../components/AddCommentForm.js";
import useUser from "../hooks/useUser.js";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, downvotes: 0, comments: [] });
    const { articleid } = useParams();

    const {user, isLoading}=useUser();
    // console.log(user.email);
    // console.log(CommentsList.comments);

    useEffect(() => {
        const loadResponse = async () => {
            const token = user && await user.getIdToken();
            const headers = token || {authToken: token};
            axios.get(`/api/articles/${articleid}`,headers,)
                .then(response => {
                    // console.log(response.data);
                    setArticleInfo(response.data);
                }).catch(error => {
                    console.error(error);
                    // handle error here
                });
        }
        loadResponse();
    }, []);
    

    const articlesWithId = articles.filter(article => article.name === articleid);
    const article = articlesWithId.length > 0 ? articlesWithId[0] : null;
    // console.log(articleInfo.comments);
    // const comments= articleInfo.comments;
    const AddUpvotes= async ()=>{
        const token = user && await user.getIdToken();
        const headers = token || {authToken: token};
        const response = await axios.put(`/api/articles/${articleid}/upvotes`,null, headers);
        setArticleInfo(response.data);
    }
    const AddDownvotes= async ()=>{
        const response = await axios.put(`/api/articles/${articleid}/downvotes`);
        setArticleInfo(response.data);
    }
    if (!article) {
        return <NotFoundPage />;
    } else {
        return (
            <>
                {user&&<p>Welcome you are logged in </p>}
                <h1>{article.title}</h1>
                <div className="upvotes-section">
                    {user?
                        <><button onClick={AddUpvotes}>Upvotes</button>
                        <button onClick={AddDownvotes}>Downvotes</button></>
                        :<Link to="/login"><button>Login to react</button></Link>
                    }
                    <p>This article has {articleInfo.upvotes} upvote(s) and {articleInfo.downvotes} downvote(s)</p>
                </div>
                {
                    article.content.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                        ))
                    }
                    {user ? (
          <AddCommentForm name={articleid} newArticle={(updatedArticle) => setArticleInfo(updatedArticle)} />
        ) : (<Link to="/login">
            <button>Login to Comment</button>
          </Link>
        )}
                <CommentsList comments={articleInfo.comments}/>
            </>
        );
    }
};

export default ArticlePage;