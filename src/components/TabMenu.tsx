import { NavLink } from 'react-router-dom';

// This is a simple component to navigate between the tasks and analytics pages
// It's a nav with two links
export const TabMenu = () => {
  //Get the active class based on the current page
  const getActiveClass = (isActive: boolean) => {
    return isActive ? 'nav-link active' : 'nav-link';
  }
  return (
    <nav className='bg-body-secondary fixed-top'>
      <ul className='nav nav-tabs'>
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
