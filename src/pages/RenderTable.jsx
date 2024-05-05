import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./renderTable.css";
import { getAuth } from "../auth";
import { useNavigate } from "react-router-dom";

export default function RenderTable() {
  const auth = getAuth();
  console.log("RenderTable");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    userId: "",
    id: "",
    title: "",
    completed: "",
  });
  const [editRowId, setEditRowId] = useState(null);

  useEffect(() => {
    checkAuthAndNavigate();
  }, [auth]);

  const checkAuthAndNavigate = () => {
    if (!auth) {
      navigate("/login");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const fetchedData = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setData(Object.values(fetchedData.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // delete
  async function handleDeleteData(id) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  async function handleAddData() {
    try {
      const newData = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        input
      );
      setData([...data, newData.data]);

      setInput({
        userId: "",
        id: "",
        title: "",
        completed: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function setEditData(id) {
    setEditRowId(id);
    const rowEditData = data.find((row) => row.id === id);
    setInput(rowEditData);
  }

  async function submitEditData() {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${editRowId}`,
        input
      );
      const updatedData = data.map((row) =>
        row.id === editRowId ? input : row
      );
      setData(updatedData);
      setEditRowId(null);

      setInput({
        userId: "",
        id: "",
        title: "",
        completed: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    { field: "userId", headerName: "User Id", width: 150 },
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "completed", headerName: "Status", width: 150 },
    {
      field: "Action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <>
            <DeleteOutlineOutlined
              style={{ color: "red", cursor: "pointer", marginRight: 8 }}
              onClick={() => {
                handleDeleteData(params.id);
                console.log(params);
              }}
            />
            <EditOutlined
              onClick={() => setEditData(params.id)}
              style={{ cursor: "pointer", color: "green", paddingLeft: "10px" }}
            />
          </>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "90%", margin: "25px" }}>
      <div className="ipcontainer" style={{ margin: "10px" }}>
        <input
          name="userId"
          value={input.userId}
          onChange={handleChange}
          placeholder="User ID"
          className="ip"
        />
        <input
          name="id"
          value={input.id}
          onChange={handleChange}
          placeholder="ID"
          className="ip"
        />
        <input
          name="title"
          value={input.title}
          onChange={handleChange}
          placeholder="Title"
          className="ip"
        />
        <input
          name="completed"
          value={input.completed}
          onChange={handleChange}
          placeholder="Completed"
          className="ip"
        />
        {editRowId ? (
          <button onClick={submitEditData}>Update</button>
        ) : (
          <button onClick={handleAddData}>Add</button>
        )}
      </div>
      {!loading ? (
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      ) : (
        <>Data is Loading</>
      )}
    </div>
  );
}
