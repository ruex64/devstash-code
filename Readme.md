DevStash: A Modern Code-Sharing Platform
DevStash is a full-stack MERN application designed for developers to share, discover, and remix code components in a collaborative and visually appealing environment. It serves as a personal library for developers' best code snippets and a community hub for inspiration.

The platform is built with a focus on a modern, dark-themed UI featuring glassmorphism, providing a premium user experience. It includes robust authentication, role-based permissions, and a powerful live preview feature for modern web frameworks.

Core Features
User & Community Features:
Full Authentication: Secure user registration and login system with both email/password and Google OAuth options. Includes a "Forgot Password" flow with email-based token reset.

Component Creation & Sharing: Users can create new code components, providing a name, description, tags, installation commands, and an associated image for visual context.

Live Previews: For compatible components (React JSX/TSX), users can view a live, interactive preview of the code running directly on the page, powered by Sandpack.

Syntax Highlighting: Code snippets are displayed with proper syntax highlighting in a dark-theme editor for maximum readability.

Component Discovery: A public homepage displays all shared components in a card-based layout, with a debounced search bar for efficient filtering by name, tags, or description.

Remixing: Users with a "collaborator" or "admin" role can "remix" any existing component. This clones the original component into a new one under their name, automatically adding a "Remixed from" link to credit the original creator.

Public User Profiles: Each user has a public profile page that displays their bio, social media links (GitHub, Instagram, LinkedIn), and a gallery of all the components they have created.

Profile Editing: Users can edit their own profile to update their name, bio, and social links.

Administrative Features:
Role-Based Access Control (RBAC): The system has three distinct user roles:

Viewer: Can create, edit, and delete their own components. Can view all public components.

Collaborator: Has all viewer permissions, plus the ability to remix any component.

Admin: Has full control over the platform, including the ability to delete any component and manage user roles.

Admin Dashboard: A protected dashboard where admins can view a list of all users and change their roles between viewer, collaborator, and admin.

Technology Stack
Backend (Server-Side)
Runtime: Node.js

Framework: Express.js

Database: MongoDB with Mongoose for data modeling.

Authentication: JSON Web Tokens (JWT) for securing APIs, bcryptjs for password hashing.

Image Uploads: Cloudinary for cloud-based image storage, with multer for handling file uploads.

API Design: Follows RESTful principles for clean, scalable endpoints.

Frontend (Client-Side)
Framework: React (using Vite for a fast development environment).

Styling: Tailwind CSS with a custom dark theme configuration.

State Management: React Context API for global authentication state.

Routing: React Router for client-side navigation.

API Communication: Axios for making HTTP requests to the backend.

Live Previews: @codesandbox/sandpack-react for in-browser compilation and rendering of React components.

UI/UX:

Icons: Lucide React for a clean and consistent icon set.

Animations: Framer Motion for smooth page transitions and interactive animations.

Notifications: React Hot Toast for modern, non-intrusive alerts.
