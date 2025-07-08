import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    const delayDebounce = setTimeout(() => {
      const fetchComponents = async () => {
        try {
          setLoading(true);
          const query = new URLSearchParams(location.search).get("search") || "";
          const url = `${import.meta.env.VITE_SERVER_URL}/components${
            query ? `?search=${encodeURIComponent(query)}` : ""
          }`;

          const res = await axios.get(url, { signal: controller.signal });
          setComponents(res.data);
        } catch (err) {
          if (err.name !== "CanceledError") {
            console.error("Error fetching components:", err);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchComponents();
    }, 400); // debounce duration

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [location.search]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Explore Components</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : components.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {components.map((comp) => (
            <Link
              to={`/components/${comp.slug}`}
              key={comp._id}
              className="bg-white shadow rounded p-4 hover:shadow-lg transition"
            >
              {comp.image && (
                <img
                  src={comp.image}
                  alt={comp.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-lg font-semibold">{comp.name}</h2>

              {comp.remixedFrom && (
                <p className="text-xs text-gray-500 mb-1">
                  Remix of{" "}
                  <Link
                    to={`/components/${comp.remixedFrom.slug}`}
                    className="text-blue-600 underline"
                  >
                    {comp.remixedFrom.name}
                  </Link>
                </p>
              )}

              <p className="text-sm text-gray-600">
                By{" "}
                <Link
                  to={`/users/${comp.creator.name}`}
                  className="text-indigo-600 hover:underline"
                >
                  {comp.creator.name}
                </Link>
              </p>

              <div className="flex flex-wrap gap-1 mt-2">
                {comp.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No components found.</p>
      )}
    </div>
  );
};

export default Home;
