import { useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Product } from '../api/productsApi';

interface ProductModalProps {
  handleClose: () => void;
  open: boolean;
  product: Product;
}

const ProductModal = ({ handleClose, open, product }: ProductModalProps) => {
  const productEntries = useMemo(() => Object.entries(product), [product]);

  const parseKey = (key: string) => {
    return key.replace('_', ' ').replace(/^\w/, (match) => match.toUpperCase());
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ minWidth: '120px', marginRight: 4 }}>{product.name.toUpperCase()}</DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 12,
          top: 12,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {productEntries.map((entry) => (
          <Typography key={entry[0]} gutterBottom>
            {parseKey(entry[0])}: {entry[1]}
          </Typography>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
