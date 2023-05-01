import classes from "./Card.module.css";

const Card = ({ children, onClick }) => {
  return (
    <div className={classes.card} onClick={(event) => event.stopPropagation()}>
      {children}
    </div>
  );
};

export default Card;
