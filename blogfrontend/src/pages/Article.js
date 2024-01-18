import { useParams } from "react-router-dom";
import articles from "./article-content.js";
import NotFoundPage from "./NotFoundPage.js";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentsList from "../components/commentsList.js";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, downvotes: 0, comments: [] });
    const { articleid } = useParams();
    // console.log(CommentsList.comments);

    useEffect(() => {
        const loadResponse = async () => {
            axios.get(`/api/articles/${articleid}`)
                .then(response => {
                    console.log(response.data);
                    setArticleInfo(response.data);
                }).catch(error => {
                    console.error(error);
                    // handle error here
                });
        }
        loadResponse();
    }, [articleid]);
    

    const articlesWithId = articles.filter(article => article.name === articleid);
    const article = articlesWithId.length > 0 ? articlesWithId[0] : null;
    console.log(articleInfo.comments);
    // const comments= articleInfo.comments;
    if (!article) {
        return <NotFoundPage />;
    } else {
        return (
            <>
                <h1>{article.title}</h1>
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
                {
                    article.content.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))
                }
                <CommentsList comments={articleInfo.comments}/>
            </>
        );
    }
};

export default ArticlePage;