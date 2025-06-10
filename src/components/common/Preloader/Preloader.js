import classes from './Preloader.module.scss';

export const Preloader = ({ isActive }) => {
  if (!isActive) return null;
  return <div className={classes.loader}></div>;
};
