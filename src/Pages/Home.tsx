import { useProductsPage, useProduct } from '../api/productsApi';

const Home = () => {
  const { data } = useProductsPage(2);
  const { data: productData } = useProduct(1);

  console.log(data);
  console.log(productData);
  return <div>Home</div>;
};

export default Home;
