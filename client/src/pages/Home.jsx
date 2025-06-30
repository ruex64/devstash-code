import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/components`)
      .then((res) => setComponents(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Explore Components</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {components.map((comp) => (
          <Link to={`/components/${comp.slug}`} key={comp._id} className="bg-white shadow rounded p-4 hover:shadow-lg transition">
            <img src={comp.image} alt={comp.name} className="w-full h-40 object-cover rounded mb-2" />
            <h2 className="text-lg font-semibold">{comp.name}</h2>
            <p className="text-sm text-gray-600">By <Link to={`/users/${comp.creator.name}`} className="text-indigo-600 hover:underline">{comp.creator.name}</Link></p>
            <div className="flex flex-wrap gap-1 mt-2">
              {comp.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
