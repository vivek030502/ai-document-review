import {
  Search,
  Bell,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBackendHealth } from "../../services/api";

export default function Topbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [backendStatus, setBackendStatus] = useState({
    state: "checking",
    message: "",
  });
  const [healthCheckVersion, setHealthCheckVersion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkHealth = async () => {
      if (isMounted) {
        setBackendStatus({ state: "checking", message: "" });
      }

      try {
        await getBackendHealth();
        if (isMounted) {
          setBackendStatus({ state: "connected", message: "" });
        }
      } catch (error) {
        if (isMounted) {
          setBackendStatus({
            state: "offline",
            message: error instanceof Error ? error.message : "Health check failed.",
          });
        }
      }
    };

    checkHealth();
    const intervalId = window.setInterval(checkHealth, 30000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [healthCheckVersion]);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();

    if (query) {
      navigate(`/documents?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="topbar">

      <div className="topbar-left">

        <button
          aria-live="polite"
          className={`ai-processing ${backendStatus.state}`}
          disabled={backendStatus.state === "checking"}
          onClick={() => setHealthCheckVersion((version) => version + 1)}
          title={
            backendStatus.message ||
            (backendStatus.state === "connected"
              ? "Backend health check succeeded"
              : "Checking backend connection")
          }
          type="button"
        >
          <span></span>
          {backendStatus.state === "connected" && "Backend Connected"}
          {backendStatus.state === "checking" && "Connecting to Backend"}
          {backendStatus.state === "offline" && "Backend Unavailable · Retry"}
        </button>

      </div>

      <div className="topbar-right">

        <form className="global-search" onSubmit={handleSearch}>

          <Search size={17} />

          <input
            type="text"
            placeholder="Search documents..."
            aria-label="Search documents"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

        </form>

        <button className="icon-button">
          <Bell size={19} />
        </button>

        <Link
          className="profile-button"
          to="/profile"
          aria-label="Open profile"
          title="Profile"
        >
          <UserCircle size={26} />
        </Link>

      </div>

    </header>
  );
}