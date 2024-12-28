function Navbar() {
  return (
    <nav>
      <div className="navbarLogo">{/*image */}</div>
      <div>
        <Link to="/contact">
          <button>Contact</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
