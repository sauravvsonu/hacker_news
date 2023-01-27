import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";
import SearchData from "./SearchData";
import SearchComment from "./SearchComment";
import { useParams } from "react-router";

function SearchPage() {
  const [isloading, setIsloading] = useState(true);
  const { query: queryPrams } = useParams();
  const [query, setQuery] = useState(queryPrams);
  const [page, setPage] = useState(1);
  const [hitsPerPage, sethitsPerPage] = useState(20);
  const [tag, setTag] = useState("story");
  const [filter, setFilter] = useState("popularity");
  const [time, setTime] = useState("");
  const [numericFilter, setNumericFilter] = useState("");
  const [stories, setStories] = useState([]);
  const [activepage, setActivepage] = useState(3);
  const [numPages, setNumPages] = useState(50);

  const handleQuery = (query) => {
    setQuery(query);
  };

  const handlePage = (page) => {
    setPage(page.target.value);
  };

  const handleHitsPerPage = (hitsPerPage) => {
    sethitsPerPage(hitsPerPage.target.value);
  };

  const handleTag = (tag) => {
    setIsloading(true);
    setTag(tag.target.value);
  };

  const handleFilter = (filter) => {
    setFilter(filter.target.value);
  };

  const handleTime = (time) => {
    setTime(time.target.value);
    let numFilter = "";
    switch (time.target.value) {
      case "2":
        setFilter("date");
        numFilter = "created_at_i>86400";
        break;
      case "3":
        setFilter("date");
        numFilter = "created_at_i>604800";

        break;
      case "4":
        setFilter("date");
        numFilter = "created_at_i>2592000";

        break;
      case "5":
        setFilter("date");
        numFilter = "created_at_i>31104000";

        break;

      default:
        numFilter = "";
        break;
    }
    setNumericFilter(numFilter);
  };

  const handleNumericFilter = (numericFilter) => {
    setNumericFilter(numericFilter);
  };

  useEffect(() => {
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = "";
        filter === "popularity"
          ? (response = await axios.get(
              `http://hn.algolia.com/api/v1/search?tags=${tag}&numericFilters=${numericFilter}&query=${query}&page=${page}&hitsPerPage=${hitsPerPage}`
            ))
          : (response = await axios.get(
              `http://hn.algolia.com/api/v1/search_by_date?tags=${tag}&numericFilters=${numericFilter}&query=${query}&page=${page}&hitsPerPage=${hitsPerPage}`
            ));

        setStories(response.data.hits);
        setNumPages(response.data.nbPages);
        setIsloading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [query, page, hitsPerPage, tag, filter, time, numericFilter]);

  const pageNav = (e) => {
    const lastPage = numPages;
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
      <Navbar page="searchPage" query={handleQuery} />
      <div className="row" style={{ marginTop: "1rem" }}>
        <div className="input-field col s6 m3 l2">
          <select onChange={(e) => handleTag(e)}>
            <option value="story" selected>
              Stories
            </option>
            <option value="comment">Comment</option>
          </select>
          <label>Select Type</label>
        </div>
        <div className="input-field col s6 m3 l2">
          <select onChange={(e) => handleFilter(e)}>
            <option value="popularity" selected>
              Popularity
            </option>
            <option value="date">Date</option>
          </select>
          <label>Filter By</label>
        </div>
        <div className="input-field col s6 m3 l2">
          <select onChange={(e) => handleTime(e)}>
            <option value="1" selected>
              All Time
            </option>
            <option value="2">Last 24hr</option>
            <option value="3">Past Week</option>
            <option value="4">Past Month</option>
            <option value="5">Past Year</option>
          </select>
          <label>Select Time</label>
        </div>
        <div className="input-field right col s6 m3 l2">
          <select onChange={(e) => handleHitsPerPage(e)}>
            <option value="20" selected>
              20
            </option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
          <label>Hits Per Page</label>
        </div>
      </div>
      {isloading ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <div>
          <div className="container">
            {stories.length === 0 ? (
              <div className="center">
                <h4>No Results Found</h4>
              </div>
            ) : (
              <div>
                {stories.map((stories) =>
                  tag === "story" ? (
                    <SearchData
                      key={stories.objectID}
                      stories={stories}
                      tags={tag}
                    />
                  ) : (
                    <SearchComment key={stories.objectID} stories={stories} />
                  )
                )}

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
        </div>
      )}
    </div>
  );
}

export default SearchPage;
