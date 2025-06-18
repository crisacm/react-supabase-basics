import Card from "../components/Card";
import { useAuthActions } from "../hooks/useAuthActions";
import { useNavigate } from "react-router";

export default function Home() {
  const { logout } = useAuthActions();

  const navigate = useNavigate();

  const onLogout = async () => {
    const { success } = await logout();
    if (success) navigate("/login");
  };

  return (
    <div className="h-screen container mx-auto flex items-center justify-center p-4 sm:p-6">
      <Card className="min-w-[300px] lg:min-w-2xl">
        <Card.Header>
          <div className="flex items-center justify-between">
            <h1 className="flex w-1/5 text-4xl font-bold text-gray-600">
              Home
            </h1>
            <div className="flex w-3/5 items-center justify-center gap-4">
              <a href="/" className="underline font-mono font-semibold text-lg">
                Profile
              </a>
              <button
                onClick={onLogout}
                className="underline font-mono text-lg transition-all duration-150 ease-in-out hover:text-red-600 cursor-pointer"
              >
                Logout
              </button>
            </div>
            <div className="flex w-1/5 items-center justify-end">
              <div className="h-10 w-10 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <p>Content</p>
        </Card.Body>
      </Card>
    </div>
  );
}
