import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchComments } from "./service";
import { storage } from "../core/storage";

export const List = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [addComment, SetAddComment] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const comments = storage.getItem("comments");
        if (comments) {
          setList(JSON.parse(comments)?.sort((a, b) => b.id - a.id));
        } else {
          let response = await fetchComments();
          setList(response);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        navigate("/fallback");
      }
    })();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchData) return list;
    return list.filter(
      (item) =>
        item.name.toLowerCase().includes(searchData.toLowerCase()) ||
        item.email.toLowerCase().includes(searchData.toLowerCase())
    );
  }, [searchData, list]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * size;
    return filteredData.slice(start, start + size);
  }, [page, filteredData]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / size);
  }, [filteredData]);

  const handleSearch = () => {
    setPage(1);
    setSearchData(search);
  };

  useEffect(() => {
    if (addComment) {
      navigate("/addComment");
      SetAddComment(false);
    }
  }, [addComment]);

  return (
    <>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <p
            style={{
              margin: "0px",
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Comments List
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              verticalAlign: "top",
            }}
          >
            <input
              style={{
                width: "200px",
                height: "30px",
                fontSize: "15px",
                display: "block",
              }}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button
              style={{
                width: "80px",
                height: "35px",
                color: "white",
                background: "black",
              }}
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              style={{
                width: "180px",
                height: "35px",
                color: "white",
                background: "black",
              }}
              onClick={() => {
                SetAddComment(true);
              }}
            >
              Add new Comment
            </button>
          </div>
          {paginatedData?.length > 0 ? (
            <>
              <table className="my-table" style={{ marginTop: "20px" }}>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "end",
                  gap: "15px",
                }}
              >
                <p style={{ margin: "5px" }}>Pagenation</p>
                <button
                  style={{ height: "25px" }}
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >{`<< Next`}</button>
                <span>
                  {page} / {totalPages}
                </span>
                <button
                  style={{ height: "25px" }}
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >{`Previous >>`}</button>
              </div>
            </>
          ) : (
            <p>No Record</p>
          )}
        </div>
      )}
    </>
  );
};
export default List;
