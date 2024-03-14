import { Product } from '../api/productsApi';
import { TableCell, TableRow } from '@mui/material';

import { NARROW_TABLE_CELL } from './ProductsTable';

interface ProductsTableRowProps {
  product: Product;
}

const ProductsTableRow = ({ product }: ProductsTableRowProps) => {
  return (
    <TableRow sx={{ backgroundColor: product.color }}>
      <TableCell width={NARROW_TABLE_CELL} align="left">
        {product.id}
      </TableCell>
      <TableCell align="center">{product.name}</TableCell>
      <TableCell width={NARROW_TABLE_CELL} align="right">
        {product.year}
      </TableCell>
    </TableRow>
  );
};

export default ProductsTableRow;
