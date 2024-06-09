import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

export default function ProductCard(props: ProductCardProps) {
  return (
    <Link className={styles['link']} to={`/product/${props.id}`}>
    <div className={styles['card']}>
      <div className={styles['head']} style={{backgroundImage: `url('${props.img}')`, backgroundSize: 'cover',
  }}>
        <div className={styles['price']}>
          {props.price}&nbsp;
          <span className={styles['currency']}>P</span>
        </div>
        <button className={styles['add-to-card']}>
          <img className={styles['cart-btn']} src="./cart-btn.svg" alt="Добавить в корзину" />
        </button>
        <div className={styles['rating']}>
          {props.rating}&nbsp;
          <img className={styles['star']} src="/star.svg" alt="Иконка рейтинга" />
        </div>
      </div>
      <div className={styles['footer']}>
        <div className={styles['title']}> {props.name} </div>
        <div className={styles['description']}> {props.description} </div>
    </div>
    </div>
    </Link>
  )
}
