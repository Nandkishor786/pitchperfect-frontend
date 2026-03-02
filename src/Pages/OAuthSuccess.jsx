import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setUserToStorage } from "../utils/auth";

//google login part
const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const role = searchParams.get("role") ;
    const preferencesCompleted =
      searchParams.get("preferencesCompleted") === "true";

    if (token && id) {
      const user = {
        id,
        name,
        email,
        role,
        preferencesCompleted,
        token,
      };

      setUserToStorage(user);

      if (!preferencesCompleted) {
        navigate(`/onboarding/${role}`, { replace: true });
      } else {
        navigate(`/${role}/dashboard`, { replace: true });
      }
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;
