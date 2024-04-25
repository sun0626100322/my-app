'use server'
import ArticleCard from "@/component/article-card";

async function getArticles() {
const res = await fetch("https://6624ec9d04457d4aaf9d5501.mockapi.io/article")
if(!res.ok) {
throw new Error('Error')
}
return res.json();
}
async function ArticlePage() {
const articles = await getArticles();
console.log(articles)
return (
<div>
{
    articles.map((article, index) => (
<ArticleCard key={index} id={article.id} title={article.title} content={articles.content}/>))
}



</div>)
}
export default ArticlePage;