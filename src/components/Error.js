const Error = ({ error = [] }) => {
  if (error.length > 0) {
    return error.map((e) => (e ? <p className="error">Error: {e}</p> : null));
  }
};
export default Error;
