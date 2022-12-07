import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import "./Spinner";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setArticle] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  // document.title = `${capitalizeFirstLetter(props.category)} - NEWSAPP`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticle(parsedData.articles);
    setTotalResult(parsedData.totalResult);
    setLoading(false);
    props.setProgress(100);
  };

  // const handlePrevclick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };

  // const handleNextclick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticle(article.concat(parsedData.articles));
    setTotalResult(parsedData.totalResults);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // {item?.user ? item.user.charAt(0) : "UU"}
  return (
    article && (
      <>
        <h1 className="text-center" style={{ margin: "25px 0px" }}>
          NewsApp -Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {console.log(article)}
        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length !== totalResult}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {article.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 80) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 70)
                          : ""
                      }
                      imgurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  );
};
News.defaultprop = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.Proptype = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
