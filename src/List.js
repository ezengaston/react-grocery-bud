import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ item, deleteItem, editList }) => {
  return (
    <article className="grocery-item">
      <p className="title">{item.title}</p>
      <div className="btn-container">
        <button className="edit-btn" onClick={() => editList(item.id)}>
          <FaEdit />
        </button>
        <button className="delete-btn" onClick={() => deleteItem(item.id)}>
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default List;
