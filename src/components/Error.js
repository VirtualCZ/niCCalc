const Error = ({ error = [] }) => {
  if (error.length > 0) {
    return error.map((e) =>
      e ? <p className="bg-red-600 rounded-lg py-0.5 px-1">Error: {e}</p> : null
    );
  }
};
export default Error;
