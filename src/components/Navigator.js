import "../css/Navigator.css";
const Navbar = () => {
  return (
    <nav class="navigator">
      <div>
        <h1>niCCalc</h1>
        <ul>
          <a href={`/Basic`}>
            <li>Basic calculator</li>
          </a>
          <a href={`/LiqAdd`}>
            <li>Add stuff to your liquid</li>
          </a>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
