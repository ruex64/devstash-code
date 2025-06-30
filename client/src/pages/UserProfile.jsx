import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Github, Linkedin, Instagram, Mail, Link } from "lucide-react";

const UserProfile = () => {
  const { slug } = useParams();
  const [user, setUser] = useState(null);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${slug}`);
        setUser(data.user);
        setComponents(data.components);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [slug]);

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center text-center mb-8">
        {user.avatar && (
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover mb-4" />
        )}
        <h1 className="text-2xl font-bold">{user.name}</h1>
        {user.bio && <p className="text-gray-600 mt-2">{user.bio}</p>}
        <div className="flex gap-4 mt-4">
          {user.social.github && (
            <a href={user.social.github} target="_blank" rel="noopener noreferrer">
              <Github />
            </a>
          )}
          {user.social.linkedin && (
            <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin />
            </a>
          )}
          {user.social.instagram && (
            <a href={user.social.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
          )}
          {user.social.blog && (
            <a href={user.social.blog} target="_blank" rel="noopener noreferrer">
              <Link />
            </a>
          )}
          {user.social.email && (
            <a href={`mailto:${user.social.email}`}>
              <Mail />
            </a>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Components by {user.name}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {components.map((comp) => (
          <div
            key={comp._id}
            className="border p-4 rounded-lg bg-white shadow hover:shadow-md transition"
          >
            {comp.image && (
              <img src={comp.image} alt={comp.name} className="w-full h-32 object-cover rounded" />
            )}
            <h3 className="font-semibold mt-2">{comp.name}</h3>
            <p className="text-sm text-gray-500">Version: {comp.version}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {comp.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-200 rounded px-2 py-0.5">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
