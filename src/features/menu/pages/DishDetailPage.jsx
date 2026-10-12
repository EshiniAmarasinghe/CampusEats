import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { MENU_URL, formatPrice } from "../services/menuApi";
import Spinner from "../../../components/Spinner";

function DishDetailPage() {
  const { id } = useParams();                       // from /dish/:id
  const { data: dishes, isLoading, error } = useFetch(MENU_URL);

  if (isLoading) return <Spinner label="Loading dish…" />;
  if (error) return <p className="error">Could not load dish: {error}</p>;

  const dish = dishes.find((d) => d.id === Number(id));

  return (
    <section className="detail">
      {dish ? (
        <>
          <p className="muted">Showing details for dish #{id}</p>
          <h2>{dish.name}</h2>
          <dl>
            <dt>Category</dt><dd>{dish.category}</dd>
            <dt>Price</dt><dd>{formatPrice(dish.price)}</dd>
            <dt>Status</dt><dd>{dish.available ? "Available" : "Sold out"}</dd>
          </dl>
          {dish.available && <Link to="/order" className="btn btn-primary">Order now</Link>}
        </>
      ) : (
        <p className="error">No dish with id {id}.</p>
      )}
      <p><Link to="/">← Back to menu</Link></p>
    </section>
  );
}
export default DishDetailPage;
