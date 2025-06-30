import { Link } from "react-router-dom";

const ComponentCard = ({ component }) => {
  return (
    <Link to={`/components/${component.slug}`} className="block bg-white shadow rounded hover:shadow-lg transition p-4">
      <img src={component.image || "/placeholder.png"} alt={component.name} className="w-full h-40 object-cover rounded mb-3" />
      <h2 className="text-lg font-bold mb-1">{component.name}</h2>
      <p className="text-sm text-gray-500 mb-1">v{component.version}</p>
      <div className="flex flex-wrap gap-2 text-sm text-indigo-600">
        {component.tags.map((tag, idx) => (
          <span key={idx} className="bg-indigo-50 px-2 py-0.5 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default ComponentCard;
