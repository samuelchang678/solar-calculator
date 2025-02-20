import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const PrintPage = () => {
  useEffect(() => {
    window.print();
  }, []);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "N/A";
  const contact = searchParams.get("contact") || "N/A";

  return (
    <div>
      <h2>Submitted Details</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Phone/Email:</strong> {contact}
      </p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};
