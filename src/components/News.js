import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component{
  
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0

    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}- News Wave`;
    // document.title = `${this.capitalizeFirstLetter(this.props.category.toLowerCase())}- News Wave`;
  }
  // ye render ke badd run hoga
  // async updateNews( )
  // {
  //     const url = `https://newsapi.org/v2/top-headlines?country=
  //     ${this.props.country}&category=${this.props.category}
  //     &apiKey=4dbd20d5e2d949d2bfee1d47da88ace4&page=${this.state.page}
  //     ${this.state.page}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true});
  //     // jab component mount ho raha hoga toh bhi loading lagta hai
  //     let data= await fetch(url);
  //     // async functions wait kar sakta hai promises ko resolve karne ke liye
  //     let parsedData = await data.json();
  //     console.log(parsedData);
  //     this.setState({articles:parsedData.articles,
  //         totalResults :parsedData.totalResults,
  //         loading:false })

  // }

  async componentDidMount() {
    // this.updateNews();
    this.props.setProgress(10);
    console.log("render1");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    // jab component mount ho raha hoga toh bhi loading lagta hai
    let data = await fetch(url);
    this.props.setProgress(30);
    // async functions wait kar sakta hai promises ko resolve karne ke liye
    let parsedData = await data.json();
    this.props.setProgress(50);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });  
    this.props.setProgress(100);
  }
  handlePrevClick = async () => {
    console.log("Previous");
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    // async functions wait kar sakta hai promises ko resolve karne ke liye
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
    // this.setState({page: this.state - 1});
    // this.updateNews();
    this.props.setProgress(100);
  };
  handleNextClick = async () => {
    console.log("Next");
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      // async functions wait kar sakta hai promises ko resolve karne ke liye
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
    // this.setState({page: this.state + 1});
    // this.updateNews();
    this.props.setProgress(100);
  };
   fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    console.log("render1");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // jab component mount ho raha hoga toh bhi loading lagta hai
    let data = await fetch(url);
    // async functions wait kar sakta hai promises ko resolve karne ke liye
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false,
    });

  };

  render() {
    console.log("render2");
    return (
      <>
        <h1 className="text-center my-3 mx-3" style={{ margin: "35px 0px" }}>
          NewsWave - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        {/* agar loading === true hai then you can show the spinner */}
        {/* spinner kaa componenet */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="conatiner">

        
         

         
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
          </div>
          
        </InfiniteScroll>
      
        
      </>
    );
  }
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
