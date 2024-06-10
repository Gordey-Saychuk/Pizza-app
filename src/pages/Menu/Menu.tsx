import  Search  from "../../components/Search/Search";
import Headling from "../../components/Headling/Headling";
import styles from "./Menu.module.css";
import { Product } from "../../interfaces/product.interfaces";
import {useState, useEffect} from 'react'
import axios, { AxiosError } from "axios";
import MenuList from "./MenuList/MenuList";


export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>()

  const getMenu = async () => {
    try{
      setIsLoading(true);
      await new Promise<void>((resolve) => {
    
          resolve();
 
      });

      const {data} = await axios.get<Product[]>(`http://localhost:3000/products/`)
      setProducts(data);
      setIsLoading(false);
    } catch(e){
      console.error(e);
      if (e instanceof AxiosError){
      setError(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={styles.head}>
        <Headling>Меню</Headling>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <div>
        {error && <>{error}</>}
        { !isLoading && <MenuList products={products} />}
        {isLoading && <>Загружаем продукты...</>}
      </div>
    </>
  );
}
