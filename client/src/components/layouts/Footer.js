import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear() + " by "}
      <a
        className="footer-linkedin"
        href="https://www.linkedin.com/in/jason-nguyen-25239068/"
      >
        Jason Nguyen
      </a>
    </footer>
  );
}

export default Footer;
