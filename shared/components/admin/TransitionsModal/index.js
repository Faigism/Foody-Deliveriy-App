import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useGlobalStore } from '../../../services/provider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 498,
    height: 226,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    p: 4,
};

export default function TransitionsModal({ id, deleteItem }) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    const { setRefresh, refresh } = useGlobalStore();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" style={{ fontSize: '28px', fontWeight: '600', textAlign: 'center' }}>
                            Are you sure?
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }} style={{ fontSize: '18px', fontWeight: '400', textAlign: 'center', color: '#4F4F4F' }}>
                            Attention, if you delete this product, it will not come back...
                        </Typography>
                        <div className='flex gap-3 justify-center mt-4'>
                            <Button className='bg-mainRed text-black h-[34px] w-[106px]' onClick={() => {
                                deleteItem(id)
                                setOpen(false)
                                setRefresh(!refresh)
                            }}>delete</Button>
                            <Button className='bg-green text-black h-[34px] w-[106px]' onClick={() => { handleClose() }}>cancel</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>




    );
}
