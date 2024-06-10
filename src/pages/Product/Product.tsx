import { useLoaderData } from "react-router-dom"
import type { Product } from "../../interfaces/product.interfaces";

export default function Product() {

  const data = useLoaderData() as Product;

  return (
    <div>
      Product - {data.name}

    </div>
  )
}
