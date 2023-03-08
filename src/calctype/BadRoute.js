import { useRouteError } from "react-router-dom";
const BadRoute = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <p>
        Error - <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
export default BadRoute;
