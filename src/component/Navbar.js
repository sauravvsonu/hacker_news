import React, { useState, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import {  useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const Navbar = ({ page, query }) => {
  const [searchValue, setSearchValue] = useState("");
  const { query: queryPrams } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    setSearchValue(queryPrams);
  }, []);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    if (page === "searchPage") query(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchValue}`);
  };

  return (
    <nav>
      <div className="nav-wrapper row">
        <div className="col s3">
          <a href="/" className="brand-logo">
            Hacker News
          </a>
        </div>

        <div className="col s9">
          <ul className="">
            <li style={{ width: "100%" }}>
              <form onSubmit={handleSubmit}>
                <div className="input-field row">
                  <div className="col s9">
                    <input
                      className="white"
                      id="search"
                      type="search"
                      value={searchValue}
                      onChange={handleSearch}
                      placeholder="Search..."
                      style={{ display: "inline", height: "3rem" }}
                      required
                    />
                  </div>
                  <div className="col s3">
                    <label
                      className="label-icon"
                      htmlFor="search"
                      onClick={handleSubmit}
                    >
                      <i
                        className="material-icons"
                        style={{ cursor: "pointer" }}
                      >
                        search
                      </i>
                    </label>
                  </div>
                </div>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
