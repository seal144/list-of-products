import { useState } from 'react';
import { TableCell, TableRow } from '@mui/material';

import { Product } from '../api/productsApi';
import parseKey from '../utils/parseKey';
import ProductModal from './ProductModal';
import { NARROW_TABLE_CELL } from './ProductsTable';

const ProductsTableRow = ({ product }: { product: Product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleIsModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <TableRow
        sx={{ backgroundColor: product.color, cursor: 'pointer', '&:hover': { opacity: 0.85 } }}
        onClick={toggleIsModalOpen}
      >
        <TableCell width={NARROW_TABLE_CELL} align="left">
          {product.id}
        </TableCell>
        <TableCell align="center">{parseKey(product.name)}</TableCell>
        <TableCell width={NARROW_TABLE_CELL} align="right">
          {product.year}
        </TableCell>
      </TableRow>
      <ProductModal handleClose={toggleIsModalOpen} open={isModalOpen} product={product} />
    </>
  );
};

export default ProductsTableRow;
