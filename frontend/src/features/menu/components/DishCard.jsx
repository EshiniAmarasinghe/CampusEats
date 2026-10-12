import { Link } from "react-router-dom";
import { formatPrice } from "../services/menuApi";

// Pure presentation: receives one dish via props.
function DishCard({ dish }) {
  return (
    <div className={`dish-card${dish.available ? "" : " sold-out"}`}>
      <small className="category">{dish.category}</small>
      <h3>{dish.name}</h3>
      <p className="price">{formatPrice(dish.price)}</p>
      {!dish.available && <span className="badge">Sold out</span>}
      <Link to={`/dish/${dish.id}`} className="details-link">View details →</Link>
    </div>
  );
}
export default DishCard;
