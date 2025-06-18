import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

/**
 * Request change password success page.
 *
 * This page is displayed after the user has successfully requested a change
 * password. It contains a message with the email address that was used to
 * request the change password and a link to the login page.
 */
export default function RequestChangePassSucess() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "ur email";

  return (
    <div className="h-screen container mx-auto flex items-center justify-center p-4 sm:p-6">
      <Card>
        <Card.Body>
          <h1 className="text-4xl font-bold text-gray-600 p-2">
            Request change password successful!
          </h1>
          <p className="text-gray-600 px-2 py-4">
            We have sent the instructions and the link to change the password to
            the e-mail <strong>{email}</strong>. Please check your inbox and
            click the link to change your password.
          </p>
          <Button onClick={() => navigate("/login")} className="mt-4">
            Go to login
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
