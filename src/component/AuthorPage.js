import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AuthorPage = () => {
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    // console.log(id);
    const fetchData = async () => {
      const result = await axios(`http://hn.algolia.com/api/v1/users/${id}`);
      setUser(result.data);
      //   console.log(result.data);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const date = new Date(user.created_at);
    setDate(date.toLocaleDateString());
  }, [user.created_at]);

  return (
    <div>
      <nav>
        <div className="nav-wrapper row">
          <div className="col s3">
            <a href="/" className="brand-logo">
              Hacker News
            </a>
          </div>
        </div>
      </nav>

      <div className="row container">
        <div className="col s12 m12">
          <div className="card ">
            <div className="card-content ">
              <span className="card-title">Author Details</span>
              <div className="row">
                <span className="col s3">Username :</span>
                <span className="col s6"> {user.username}</span>
              </div>
              <div className="row">
                <span className="col s3">Karma :</span>
                <span className="col s6"> {user.karma}</span>
              </div>
              <div className="row">
                <span className="col s3">About : </span>
                <span
                  className="col s6"
                  dangerouslySetInnerHTML={{ __html: user.about }}
                ></span>
              </div>
              <div className="row">
                <span className="col s3">Created At :</span>
                <span className="col s6"> {date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
