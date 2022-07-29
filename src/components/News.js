import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 12,
        category: "bussiness",
        totalResults: 0
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        totalResults: PropTypes.number
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    headline = (category) => {
        if(category === "general"){
            return ""
        }
        else{
            return `- ${this.capitalize(category)}`
        }
    }
    
    updatePage = async () => {
        this.props.setProgress(10);
        this.setState({ page: this.state.page + 1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        console.log(url);
        let data = await fetch(url);
        let parsedData = await data.json()
        this.props.setProgress(40)

        document.title = `Nyusu - ${this.capitalize(this.props.category)}`

        this.setState({
            loading: false,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
        })
        this.props.setProgress(100)

    };

    fetchMoreData = async() => {
        this.setState({ page: this.state.page + 1, loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        console.log(url)
        let data = await fetch(url);
        let parsedData = await data.json()
        
        document.title = `Nyusu - ${this.capitalize(this.props.category)}`
        
        this.setState({
            loading: false,
            articles: this.state.articles.concat(parsedData.articles),
        })
        // console.log(this.state.articles.length, this.state.totalResults)
    }

    async componentDidMount() {
        this.updatePage()
    }

    render() {
        return (
            <>

                <h1 className='text-center'>{`Top Headlines${this.headline(this.props.category)}`}</h1>
                <div className="container">
                {this.state.loading && <Spinner />}
                <InfiniteScroll 
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}>

                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""}
                                description={element.description ? element.description : ""} imageUrl={element.urlToImage}
                                newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                </InfiniteScroll>
                </div>

                {/* <div className="my-3 container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;
                        Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </>
        )
    }
}

export default News