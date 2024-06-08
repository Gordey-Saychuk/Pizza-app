import { Link, Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <>
      
      <div>
      <Link to='/'>Меню</Link>
      <a href='/cart'>Корзина</a>
     </div>
     <div>
      <Outlet />
     </div>
    </>
  )
}
