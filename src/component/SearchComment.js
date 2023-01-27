import React, { useEffect, useState } from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";

function SearchComment(prop) {
  const [urlh, seturlh] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (prop.stories.story_url) {
      seturlh("(" + prop.stories._highlightResult.story_url.value + ")");
    }
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
            <a href={prop.stories.story_url}>
              <p className="news-title">
                <span
                  dangerouslySetInnerHTML={{
                    __html: prop.stories._highlightResult.comment_text.value,
                  }}
                ></span>

                <i>
                  <span className="grey-text">
                    <span dangerouslySetInnerHTML={{ __html: urlh }}></span>
                  </span>
                </i>
              </p>
            </a>
          </div>
          <div className="card-action">
            <a
              style={{ cursor: "pointer" }}
              href="#"
              onClick={() => itempage(prop.stories.objectID)}
            >
              {prop.stories.points} points
            </a>{" "}
            <a
              style={{ cursor: "pointer" }}
              href="#"
              onClick={() => authorpage(prop.stories.author)}
            >
              by {prop.stories.author}
            </a>{" "}
            <a
              style={{ cursor: "pointer" }}
              href="#"
              onClick={() => itempage(prop.stories.objectID)}
            >
              {timeSince(prop.stories.created_at)}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComment;
