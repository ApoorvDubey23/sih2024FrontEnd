import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useUser } from '../Contexts/UserContext';
function SideDrawer() {
  const [show, setShow] = useState(false);
  const [historyItems, setHistoryItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const {User,setUser}=useUser();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHistoryItem = (index) => {
    setHistoryItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <>
      <Button variant='dark' className='absolute top-3 right-3' onClick={handleShow}>
        More
      </Button>

      <Offcanvas show={show} onHide={handleClose} style={{ width: '400px' }}>
        <Offcanvas.Header className='bg-neutral-900' closeButton>
          <Offcanvas.Title className='text-white'>Menu</Offcanvas.Title>
          
        </Offcanvas.Header>
        <Offcanvas.Body className='text-white bg-neutral-900'>
          {/* Profile Section */}
          <div className="flex gap-2 items-center text-white mb-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="h-16 rounded-full mb-2"
            />
            <div>
              <div className="text-2xl font-bold text-white">{User.username}</div>
              <div className="text-gray-400">{User.email}</div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-600" />

          {/* History Section */}
          <div className="history-section">
            <h6 className="text-white">History</h6>
            <ul className="list-unstyled text-gray-400">
              {historyItems.map((item, index) => (
                <li key={index} className="mb-2 flex justify-between items-center">
                  <span>{item}</span>
                  <button
                   
                    className="text-gray-400"
                    onClick={() => deleteHistoryItem(index)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideDrawer;
