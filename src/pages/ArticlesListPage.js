// import { Link } from "react-router-dom";
import articles from "./article-content";
import ArticleList from "../components/articlesList";

const ArticleListPage = () => {
    return (
        <>
            <h1>Article List</h1>
            <ArticleList articles={articles} />
        </>
    );
}

export default ArticleListPage;