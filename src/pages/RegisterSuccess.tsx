import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import useAuthActions from "../hooks/useAuthActions";
import { useToast } from "../components/ToastProvider";
import { useEffect } from "react";

/**
 * Register success page.
 *
 * This page is displayed after the user has successfully registered a new
 * account. It contains a message with the email address that was used to
 * register the account and a link to the login page.
 */
export default function RegisterSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "ur email";

  const { resendVerificationEmail, error } = useAuthActions();
  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error]);

  return (
    <div className="h-screen container mx-auto flex items-center justify-center p-4 sm:p-6">
      <Card>
        <Card.Body>
          <h1 className="text-4xl font-bold text-gray-600 p-2">
            Successful Registration!
          </h1>
          <p className="text-gray-600 px-2 py-4">
            We have sent a verification email to <strong>{email}</strong>.
            Please check your inbox and click the link to verify your account.
          </p>
          <p className="text-gray-600 px-2 py-4">
            Don't receive the email?{" "}
            <button
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={async () => {
                try {
                  const { success } = await resendVerificationEmail(email);
                  if (success)
                    showToast(
                      "Verification email sent successfully",
                      "success"
                    );
                } catch (error) {
                  showToast(error as string, "error");
                }
              }}
            >
              Re-send verification email
            </button>
          </p>
          <Button onClick={() => navigate("/login")} className="mt-6">
            Go to login
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
