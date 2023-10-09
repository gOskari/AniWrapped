const Footer = () => {
  return(
  <div className="container mx-auto text-center">
    <div className="mb-4">
      <a
        href="https://github.com/gOskari"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-color hover:text-gray-700"
      >
        <i className="fab fa-github"></i> GitHub
      </a>
    </div>
    <div>
      <p className="text-gray-500 text-sm">
        Copyright &copy; 2023 AniWrapped. All rights reserved.
      </p>
    </div>
  </div>
  );
};

export default Footer;