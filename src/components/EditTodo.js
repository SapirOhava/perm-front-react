import { useState } from 'react';

const EditTodo = ({ todo }) => {
  console.log('todo', todo);
  const [description, setDescription] = useState(todo.description);

  const updateDescriptionInDb = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/todos/${todo.todo_id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description }),
        }
      );
      const data = await res.json();
      window.location = '/';
    } catch (err) {
      console.err(err);
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#EditTodoModal${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`EditTodoModal${todo.todo_id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Todo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setDescription(todo.description)}
              ></button>
            </div>
            <div className="modal-body d-flex">
              <label htmlFor="desc" className="form-label">
                description:
              </label>
              <input
                type="text"
                className="form-control"
                id="desc"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateDescriptionInDb}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
