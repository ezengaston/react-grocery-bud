import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState();
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const key = "LOCAL_STORAGE_grocery-bud";

  useEffect(() => {
    const data = localStorage.getItem(key);
    if (data != null) {
      setItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items]);

  function placeValue(e) {
    e.preventDefault();
    if (!value) {
      showAlert(true, "danger", "Please enter value");
    } else if (edit && value) {
      setItems(
        items.map((item) => {
          if (item.id === editId) {
            return { ...item, title: value };
          }
          return item;
        })
      );
      setValue("");
      setEditId(null);
      setEdit(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "Item added to the list");
      setItems([
        ...items,
        { title: value, id: new Date().getTime().toString() },
      ]);
      setValue("");
    }
  }

  function showAlert(show = false, type = "", msg = "") {
    setAlert({ show, type, msg });
  }

  function deleteItem(id) {
    showAlert(true, "danger", "item removed");
    const newList = items.filter((item) => item.id !== id);
    setItems(newList);
  }

  function clearList() {
    showAlert(true, "danger", "empty list");
    setItems([]);
  }

  function editList(id) {
    const specificItem = items.find((item) => item.id === id);
    setEdit(true);
    setEditId(id);
    setValue(specificItem.title);
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={(e) => placeValue(e)}>
        {alert.show && (
          <Alert alert={alert} removeAlert={showAlert} items={items} />
        )}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g egg"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <button type="submit" className="submit-btn">
            {edit ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {items.length > 0 && (
        <div className="grocery-container">
          <div className="grocery-list">
            {items.map((item, index) => (
              <List
                key={index}
                item={item}
                deleteItem={deleteItem}
                editList={editList}
              />
            ))}
          </div>
          <button className="clear-btn" onClick={() => clearList()}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
