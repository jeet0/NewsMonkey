import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title=`${capitalize(props.category)} - NewsMonkey`



const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const updateNews = async () => {
  props.setProgress(10)
  setLoading(true)
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pageSize=${props.pageSize}`;
  props.setProgress(70)
  let data = await fetch(url)
  let parsedData = await data.json()
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setLoading(false)
  props.setProgress(100)

}
useEffect(() => {
  updateNews();
},[])

const fetchMoreData = async () => {
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page + 1}&pageSize=${props.pageSize}`;
  setPage(page + 1) 
  let data = await fetch(url)
  let parsedData = await data.json()
  setArticles(articles.concat(parsedData.articles))
  setLoading(false)

};




return (
  <>
    <h1 className='text-center' style={{ margin: "90px 0 10px" }}>NewsMonkey - Top {capitalize(props.category)} Headlines</h1>
    {loading && <Spinner />}
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults}
      loader={<Spinner />}
    >
      <div className='container'>
        <div className='row'>
          {!loading && articles.map(el => {
            return <div className='col-md-4' key={el.url}>
              <NewsItem title={el.title} description={el.description} source={el.source.name} author={el.author} date={el.publishedAt} imageUrl={el.urlToImage ? el.urlToImage : "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE="} newsUrl={el.url} />
            </div>
          })}
        </div>


      </div>
    </InfiniteScroll>
  </>
)}


  News.defaultProps ={
    country: "in",
    pageSize: 9,
    category: "general"
  }

  News.propTypes ={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }



export default News
