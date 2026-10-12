import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { MENU_URL } from "../services/menuApi";
import MenuList from "../components/MenuList";
import SearchBar from "../components/SearchBar";
import Spinner from "../../../components/Spinner";

function MenuPage() {
  const [query, setQuery] = useState("");                 // local UI state
  const debounced = useDebounce(query, 400);
  const { data: dishes, isLoading, error } = useFetch(MENU_URL); // server state

  if (isLoading) return <Spinner label="Loading menu…" />;            // 1. loading
  if (error) return <p className="error">Could not load menu: {error}</p>; // 2. error

  // 3. success
  const filtered = dishes.filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase())
  );

  return (
    <section>
      <h2>Menu</h2>
      <SearchBar value={query} onChange={setQuery} />
      <MenuList dishes={filtered} />
    </section>
  );
}
export default MenuPage;
