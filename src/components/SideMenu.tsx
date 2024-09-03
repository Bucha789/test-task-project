import { NavLink } from 'react-router-dom';

export const SideMenu = () => {
  const getActiveClass = (isActive: boolean) => {
    return isActive ? 'nav-link active' : 'nav-link';
  }
  return (
    <nav className='bg-body-secondary'>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <NavLink to='/tasks' className={({ isActive }) => getActiveClass(isActive)}>Tasks</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/analytics' className={({ isActive }) => getActiveClass(isActive)}>Analytics</NavLink>
        </li>
      </ul>
    </nav>
  );
}
