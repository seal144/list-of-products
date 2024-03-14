import { useContext, useMemo } from 'react';
import {
  Box,
  Pagination,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { ProductsDataContext } from '../context/ProductsDataContext';
import ProductsTableRow from './ProductsTableRow';

const HeadTableCell = styled(TableCell)(() => ({
  border: '2px solid #111',
}));

export const NARROW_TABLE_CELL = 40;

const ProductsTable = () => {
  const { productsPage, productSearched, searchParams, setSearchParams } = useContext(ProductsDataContext);

  const showSearchResult = useMemo(() => {
    if (searchParams?.get('id')) return true;
    return false;
  }, [searchParams]);

  const clearSearchId = () => {
    if (setSearchParams) {
      setSearchParams((prevParams) => {
        const page = prevParams.get('page');
        return page ? `page=${page}` : '';
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/[^0-9]/)) {
      event.target.value = '';
      return;
    }
    if (setSearchParams && event.target.value) {
      setSearchParams((prevParams) => {
        const page = prevParams.get('page');
        return `${page ? `page=${page}` : ''}&id=${event.target.value}`;
      });
    }

    if (!event.target.value) {
      clearSearchId();
    }
  };

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
      <TextField
        label="Search by ID"
        variant="outlined"
        value={searchParams?.get('id') ? searchParams?.get('id') : ''}
        onChange={handleSearchChange}
        sx={(theme) => ({ marginBottom: theme.spacing(2) })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={clearSearchId} disabled={!searchParams?.get('id')}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 280 }}>
          <TableHead sx={{ backgroundColor: '#244', textTransform: 'uppercase' }}>
            <TableRow>
              <HeadTableCell width={NARROW_TABLE_CELL} align="left">
                Id
              </HeadTableCell>
              <HeadTableCell align="center">Name</HeadTableCell>
              <HeadTableCell width={NARROW_TABLE_CELL} align="right">
                Year
              </HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showSearchResult
              ? productSearched && <ProductsTableRow product={productSearched} />
              : productsPage?.data &&
                productsPage.data.map((product) => <ProductsTableRow key={product.id} product={product} />)}
          </TableBody>
        </Table>
      </Box>
      {!showSearchResult && (
        <Pagination
          sx={(theme) => ({ float: 'right', marginTop: theme.spacing(1) })}
          count={productsPage?.total_pages}
          onChange={handlePageChange}
          page={searchParams?.get('page') ? Number(searchParams?.get('page')) : 1}
        />
      )}
    </>
  );
};

export default ProductsTable;
