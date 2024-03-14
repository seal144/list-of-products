import { useContext } from 'react';
import { ProductsDataContext } from '../context/ProductsDataContext';
import ProductsTable from '../components/ProductsTable';

const Home = () => {
  const { productFiltered, productsPage, setSearchParams } = useContext(ProductsDataContext);
  const addParamsId = () => {
    if (setSearchParams) {
      setSearchParams((prevParams) => {
        const page = prevParams.get('page');
        return `${page ? `page=${page}` : ''}&id=8`;
      });
    }
  };
  const addParamsPage = () => {
    if (setSearchParams) {
      setSearchParams((prevParams) => {
        const id = prevParams.get('id');
        return `page=3&${id ? `id=${id}` : ''}`;
      });
    }
  };
  const resetParams = () => {
    if (setSearchParams) {
      setSearchParams('');
    }
  };

  console.log(productFiltered);
  console.log(productsPage);

  return (
    <>
      <div>Home</div>
      <button onClick={addParamsId}>id</button>
      <button onClick={addParamsPage}>page</button>
      <button onClick={resetParams}>reset</button>
      <p>{productFiltered?.name}</p>
      <p>{productsPage?.data[0].name}</p>
      <ProductsTable />
    </>
  );
};

export default Home;
