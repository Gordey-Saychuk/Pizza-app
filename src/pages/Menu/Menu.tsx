import  Search  from "../../components/Search/Search";
import Headling from "../../components/Headling/Headling";
import styles from "./Menu.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Product } from "../../interfaces/product.interfaces";
import {useState, useEffect} from 'react'


export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);

  const getMenu = async () => {
    try {
      const res = await fetch(`http://localhost:3000/products/`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        console.error('Ошибка получения products');
      }
    } catch (e) {
      console.error(e);
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
        {products.map(p => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            description={p.ingredients.join(', ')}
            rating={p.rating}
            price={p.price}
            img={p.image}
          />
        ))}
      </div>
    </>
  );
}
