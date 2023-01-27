import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewsData(stories) {
  const [urlh, seturlh] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const url = stories.stories.url;
    let urlObj = "";
    if (url) {
      urlObj = new URL(url, "https://www.google.com");
    }
    seturlh(`(${urlObj.host})`);
  }, []);

  const timeSince = (timestamp) => {
    let date = new Date(timestamp);
    let now = new Date();
    let timeDiff = now - date;
    let diffMinutes = Math.round(timeDiff / (1024 * 60));
    let diffHours = Math.round(diffMinutes / 60);
    let diffDays = Math.round(diffHours / 24);
    let diffWeeks = Math.round(diffDays / 7);
    let diffMonths = Math.round(diffWeeks / 4);
    let diffYears = Math.round(diffMonths / 12);

    if (diffYears >= 1) {
      return diffYears + " years ago";
    } else if (diffMonths >= 1) {
      return diffMonths + " months ago";
    } else if (diffWeeks >= 1) {
      return diffWeeks + " weeks ago";
    } else if (diffDays >= 1) {
      return diffDays + " days ago";
    } else if (diffHours >= 1) {
      return diffHours + " hours ago";
    } else if (diffMinutes >= 0) {
      return diffMinutes + " minutes ago";
    }
  };

  const itempage = (pg) => {
    navigate(`/item/${pg}`);
  };

  const authorpage = (pg) => {
    navigate(`/author/${pg}`);
  };

  return (
    <div>
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content" style={{ fontSize: "large" }}>
            <a href={stories.stories.url}>
              <p className="news-title">
                {stories.stories.title}{" "}
                <i>
                  <span className="grey-text">{urlh}</span>
                </i>
              </p>
            </a>
          </div>
          <div className="card-action">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => itempage(stories.stories.objectID)}
            >
              {stories.stories.points} points
            </a>{" "}
            <a
              style={{ cursor: "pointer" }}
              onClick={() => authorpage(stories.stories.author)}
            >
              by {stories.stories.author}
            </a>{" "}
            <a
              style={{ cursor: "pointer" }}
              onClick={() => itempage(stories.stories.objectID)}
            >
              {timeSince(stories.stories.created_at)} |{" "}
              {stories.stories.num_comments} comments
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsData;
