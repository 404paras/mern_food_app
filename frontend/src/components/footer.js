import React from "react";
import "../styles/footer.css";
import { BsLinkedin, BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <section className="footer-text">
          <div>
            <p>Hungry for more? </p>
            <p>
              Stay connected with us on social media and never miss out on the
              latest updates, cooking tips, and mouthwatering recipes.{" "}
            </p>
            <p>Follow us today and embark on a delicious adventure!</p>
          </div>
        </section>

        <section className="footer-social">
          <a
            href="https://www.linkedin.com/in/paras-garg-b45512204/"
            className="me-4"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://github.com/404paras/mern_food_app"
            target="_blank"
            className="me-4"
            rel="noreferrer"
          >
            <BsGithub />
          </a>
        </section>
      </div>
      <div className="footer-line"></div>
      <div className="footer-copyright">Made By Paras Garg ❤️</div>
    </div>
  );
};

export default Footer;
