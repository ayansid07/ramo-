// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Branches = () => {
//   const [data, setData] = useState([]);
//   const [newItem, setNewItem] = useState('');
//   const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

//   useEffect(() => {
//     // Fetch data from the API when the component mounts
//     axios.get(apiUrl)
//       .then(response => setData(response.data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleAddItem = () => {
//     // Add a new item to the list
//     axios.post(apiUrl, { title: newItem, completed: false })
//       .then(response => {
//         setData([...data, response.data]);
//         setNewItem('');
//       })
//       .catch(error => console.error('Error adding item:', error));
//   };

//   const handleDeleteItem = (id) => {
//     // Delete an item from the list
//     axios.delete(`${apiUrl}/${id}`)
//       .then(() => setData(data.filter(item => item.id !== id)))
//       .catch(error => console.error('Error deleting item:', error));
//   };

//   return (
//     <div>
//       <h1>CRUD App</h1>
//       <ul>
//         {data.map(item => (
//           <li key={item.id}>
//             {item.title}
//             <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <div>
//         <input
//           type="text"
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//         />
//         <button onClick={handleAddItem}>Add</button>
//       </div>
//     </div>
//   );
// };

// export default Branches;








import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Branches() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Branches;