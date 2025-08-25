import { useEffect, useMemo, useState, useCallback } from "react";
import HeroSlider from "../components/HeroSlider";
import FilterNav from "../components/FilterNav";
import ProductGrid from "../components/ProductGrid";
import useDebounce from "../hooks/useDebounce";
import { API } from "../utils/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name-asc");
  const debounced = useDebounce(query, 300);

  useEffect(() => {
    (async () => {
      const res = await fetch(API.products);
      const data = await res.json();
      setProducts(data);
    })();
  }, []);

  const visible = useMemo(() => {
    let filtered = products.filter(p =>
      p.title.toLowerCase().includes(debounced.toLowerCase())
    );
    switch (sort) {
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "price-asc":
        filtered.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        filtered.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      default:
        break;
    }
    return filtered;
  }, [products, debounced, sort]);

  const onSearchChange = useCallback((v) => setQuery(v), []);
  const onSortChange = useCallback((v) => setSort(v), []);

  return (
   <div>
    <HeroSlider />

    <div style={{ marginLeft: "200px", marginRight: "200px" }}>
      <FilterNav
        query={query}
        setQuery={onSearchChange}
        sort={sort}
        setSort={onSortChange}
      />

      <ProductGrid products={visible} />
    </div>
  </div>
  );
}
