import React from "react";

const Newsitem = (props) => {
  let { title, description, imgurl, newsurl, author, date, source } = props;
  return (
    <div className="size-my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className=" badge rounded-pill bg-dark"> {source} </span>
        </div>

        <img
          src={
            !imgurl
              ? "https://img.decrypt.co/insecure/rs:fill:1024:512:1:0/plain/https://cdn.decrypt.co/wp-content/uploads/2022/11/Genesis-Trading-Down-shutterstock_2227571015-16x9-1-gID_2.jpg@png"
              : imgurl
          }
          className="card-img-top"
          alt="..."
        />

        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-success">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>

          <a
            rel="noreferrer"
            href={newsurl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            {" "}
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
