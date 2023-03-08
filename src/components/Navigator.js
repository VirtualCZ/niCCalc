import "../css/Navigator.css";
const Navbar = () => {
  return (
    <nav class="navigator">
      <ul>
        <a href={`/Basic`}>
          <li>Basic calculator</li>
        </a>
        <a href={`/LiqAdd`}>
          <li>Add stuff to your liquid</li>
        </a>
      </ul>
    </nav>
  );
};
export default Navbar;
