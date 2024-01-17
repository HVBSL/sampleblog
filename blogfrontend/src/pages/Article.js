import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";

const ArticlePage = () => {
    // const [articleInfo, setArticleInfo] = useState({ upvotes: 0, downvotes: 0, comments: [] });
    const { articleid } = useParams();
    console.log(articleid);

    // useEffect(() => {
    //     const loadResponse = async () => {
    //         await axios.get(`/api/articles/${articleid}`)
    //             .then(response => {
    //                 console.log(response.data);
    //                 setArticleInfo(response.data);
    //             }).catch(error => {
    //                 console.error(error);
    //                 // handle error here
    //             });
    //     }
    //     loadResponse();
    // }, [articleid]);
    const articlesWithId = articles.filter(article => article.name === articleid);
    const article = articlesWithId.length > 0 ? articlesWithId[0] : null;

    if (!article) {
        return <NotFoundPage />;
    } else {
        return (
            <>
                <h1>{article.title}</h1>
                {/* <p>This article has {articleInfo.upvotes} upvote(s)</p> */}
                {
                    article.content.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))
                }
            </>
        );
    }
};

export default ArticlePage;