import { useContext, useMemo } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Pagination,
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
import { ErrorMessages } from '../api/productsApi';
import ProductsTableRow from './ProductsTableRow';
import ErrorMessage from './ErrorMessage';

const HeadTableCell = styled(TableCell)(() => ({
  border: '2px solid #111',
}));

export const NARROW_TABLE_CELL = 40;

const ProductsTable = () => {
  const {
    productsPage,
    productsPageLoading,
    productSearched,
    productSearchedLoading,
    fetchError,
    searchParams,
    setSearchParams,
  } = useContext(ProductsDataContext);

  const searchIdProvided = useMemo(() => {
    if (searchParams?.get('id')) return true;
    return false;
  }, [searchParams]);

  const errorMessage = useMemo(() => {
    const defaultErrorMessage = 'Something went wrong - please try again later';
    if (fetchError?.message === ErrorMessages.NotFound && searchIdProvided) {
      return `There is no product with ${searchParams?.get('id') ? `id: ${searchParams?.get('id')}` : 'such id'}`;
    }
    if (fetchError?.message === ErrorMessages.NotFound || fetchError?.message === ErrorMessages.Client) {
      return `${defaultErrorMessage} (client error)`;
    }
    if (fetchError?.message === ErrorMessages.Client) {
      return `${defaultErrorMessage} (server error)`;
    }
    if (fetchError) {
      return defaultErrorMessage;
    }
  }, [fetchError, searchIdProvided, searchParams]);

  const isLoading = useMemo(() => {
    if (searchIdProvided && productSearchedLoading) {
      return true;
    }
    if (!searchIdProvided && productsPageLoading) {
      return true;
    }
  }, [searchIdProvided, productsPageLoading, productSearchedLoading]);

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
          {!isLoading && !errorMessage && (
            <TableBody>
              {searchIdProvided
                ? productSearched && <ProductsTableRow product={productSearched} />
                : productsPage?.data &&
                  productsPage.data.map((product) => <ProductsTableRow key={product.id} product={product} />)}
            </TableBody>
          )}
        </Table>
      </Box>
      {isLoading && (
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={(theme) => ({
              position: 'absolute',
              top: theme.spacing(4),
              left: '50%',
              transform: 'translateX(-50%)',
            })}
          >
            <CircularProgress />
          </Box>
        </Box>
      )}
      {!isLoading && errorMessage && <ErrorMessage message={errorMessage} />}
      {!isLoading && !searchIdProvided && !errorMessage && (
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
