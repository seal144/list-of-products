import { useContext } from 'react';
import { Box, Pagination, Table, TableBody, TableHead, TableRow, TableCell, styled } from '@mui/material';

import { ProductsDataContext } from '../context/ProductsDataContext';
import ProductsTableRow from './ProductsTableRow';

const StyledTableHead = styled(TableHead)(() => ({
  backgroundColor: '#244',
  textTransform: 'uppercase',
}));

const HeadTableCell = styled(TableCell)(() => ({
  border: '2px solid #111',
}));

export const NARROW_TABLE_CELL = 40;

const ProductsTable = () => {
  const { productsPage, searchParams, setSearchParams } = useContext(ProductsDataContext);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    if (setSearchParams) {
      setSearchParams((prevParams) => {
        const id = prevParams.get('id');
        return `page=${page}&${id ? `id=${id}` : ''}`;
      });
    }
  };

  return (
    <>
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 280 }}>
          <StyledTableHead>
            <TableRow>
              <HeadTableCell width={NARROW_TABLE_CELL} align="left">
                Id
              </HeadTableCell>
              <HeadTableCell align="center">Name</HeadTableCell>
              <HeadTableCell width={NARROW_TABLE_CELL} align="right">
                Year
              </HeadTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {productsPage?.data &&
              productsPage.data.map((product) => <ProductsTableRow key={product.id} product={product} />)}
          </TableBody>
        </Table>
      </Box>
      <Pagination
        sx={(theme) => ({ float: 'right', marginTop: theme.spacing(1) })}
        count={productsPage?.total_pages}
        onChange={handlePageChange}
        page={searchParams?.get('page') ? Number(searchParams?.get('page')) : 1}
      />
    </>
  );
};

export default ProductsTable;
