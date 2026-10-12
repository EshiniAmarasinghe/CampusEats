import DishCard from "./DishCard";

// Maps the array to cards (unique key) and handles the empty case.
function MenuList({ dishes }) {
  if (!dishes.length) return <p className="empty">No dishes match your search.</p>;
  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}
export default MenuList;
