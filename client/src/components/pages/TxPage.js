import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
     
      <Button variant="contained"  style={{ background: '#008c73',width:"200px",margin:"10px" }} onClick={handleOpen}>Send Funds</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function Transaction() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" sl style={{ background: '#008c73' }} onClick={handleOpen}>New Transaction</Button>
      <Modal
        open={open}
        onClose={handleClose}
      
      >
        <Box sx={{ ...style, width: 400 }}>
         
        <Stack alignItems="center">
        <div style={{display:"flex",justifyContent: "space-between"}}>

        <p>Send</p>
        <p style={{marginLeft:"250px"}} onClick={handleClose}><CloseIcon/> </p>
        </div> 
       
        <ChildModal />
        <Divider />
         <Button variant="contained" sl style={{ background: '#008c73',width:"200px" }} onClick={handleOpen}>Send NFT</Button>
         
          </Stack>
       
          
         

        </Box>
      </Modal>
    </div>
  );
}