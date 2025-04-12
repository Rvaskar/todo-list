import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response;
      if (data) {
        setDescription("");
        window.location.reload();
      }
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form
        className="d-flex mt-5 justify-content-between"
        onSubmit={onSubmitForm}
      >
        <input
          type="text"
          name="text"
          id="text"
          className="form-control mr-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success w-20">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
