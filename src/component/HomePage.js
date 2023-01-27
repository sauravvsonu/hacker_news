import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsData from "./NewsData";

const HomePage = () => {
  const [isloading, setIsloading] = useState(true);
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [activepage, setActivepage] = useState(3);

  useEffect(() => {
    const data = async () => {
      try {
        let response = await axios.get(
          `http://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
        );
        setNews(response.data.hits);
        setIsloading(false);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    data();
  }, [page]);

  const pageNav = (e) => {
    const lastPage = Math.ceil(1000 / 20);

    if (e === "next") {
      if (page < lastPage - 2) {
        setPage(page + 1);
        if (page > 2) {
          setActivepage(activepage + 1);
        }
      }
    } else if (e === "prev") {
      if (page > 3) {
        setPage(page - 1);
        if (page < lastPage - 2) {
          setActivepage(activepage - 1);
        }
      }
    } else {
      setPage(e);
      if (e > 2 && e < lastPage - 3) {
        setActivepage(e);
      }
    }
  };

  return (
    <div>
      <Navbar />
      {isloading ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <div>
          <div className="container">
            {news.map((stories) => (
              <NewsData key={stories.objectID} stories={stories} />
            ))}
          </div>

          <footer>
            <div className="center footer-copyright">
              <ul className="pagination">
                <li className={page < 4 ? "disabled" : "waves-effect"}>
                  <a href="#!" onClick={() => pageNav("prev")}>
                    <i className="material-icons">chevron_left</i>
                  </a>
                </li>
                <li className={page === 1 ? "active" : "waves-effect"}>
                  <a href="#!" onClick={() => pageNav(activepage - 2)}>
                    {activepage - 2}
                  </a>
                </li>
                <li className={page === 2 ? "active" : "waves-effect"}>
                  <a href="#!" onClick={() => pageNav(activepage - 1)}>
                    {activepage - 1}
                  </a>
                </li>
                <li className={page > 2 ? "active" : "waves-effect"}>
                  <a href="#!" onClick={() => pageNav(activepage)}>
                    {activepage}
                  </a>
                </li>
                <li className="waves-effect">
                  <a href="#!" onClick={() => pageNav(activepage + 1)}>
                    {activepage + 1}
                  </a>
                </li>
                <li className="waves-effect">
                  <a href="#!" onClick={() => pageNav(activepage + 2)}>
                    {activepage + 2}
                  </a>
                </li>
                <li className={page > 47 ? "disabled" : "waves-effect"}>
                  <a href="#!" onClick={() => pageNav("next")}>
                    <i className="material-icons">chevron_right</i>
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default HomePage;
