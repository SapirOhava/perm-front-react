import { useState } from 'react';

const InputTodo = () => {
  const [description, setDescription] = useState('');
  // const [alert, setAlert] = useState('');
  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_URL}/todos`;
      let res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: description }),
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();

      window.location = '/';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">InputTodo</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default InputTodo;
