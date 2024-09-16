import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogO from "../utils/skibidi.png";

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-[#292C94] p-2">
       
          <img className='h-10 rounded-lg' src={LogO} alt='Logo' />
        
    </Navbar>
  );

}

export default BasicExample;
