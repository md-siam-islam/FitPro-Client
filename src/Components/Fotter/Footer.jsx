import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-base-200 text-base-content p-10">
        <aside>
          <p>
            <a className="btn btn-ghost text-2xl">
              <span className="text-[#FFA500]">Fit</span>Pro
            </a>
            <br />
            Providing reliable Trainer
          </p>
        </aside>

    
       <nav>
          <h6 className="footer-title">Company</h6>
         
         <Link to={'/'}><a className="link link-hover">Home</a></Link>
          <Link to={'/trainer'}><a className="link link-hover">All Trainer</a></Link>
          <Link to={'/classes'}><a className="link link-hover">All Class</a></Link>
          <Link to={'/community'}><a className="link link-hover">Community</a></Link>
       
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>

      </footer>
    </div>
  );
};

export default Footer;
