import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="col my-3">
        <div className="card h-100">
            <div style={{justifyContent:"flex-end", right: "0", display: "flex", position:"absolute"}}>
                <span className="badge rounded-pill bg-danger"> {source} </span>
            </div>
          <img
            src={
              !imageUrl
                ? "https://i.pinimg.com/736x/a3/57/66/a35766869e6865f6b93f4040f75fef3d.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <span className="card-text">
              <small className="text-secondary">{date.slice(0,10)} {date.slice(11, 19)}   </small>
              <p className="text-success">Author: {!author?"Unknown":author}</p>
            </span>
            <a href={newsUrl} target="_blank" rel="noreferrer">
              <button type="button" className="btn btn-dark">
                Read More
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
