import React from "react";
import { useNavigate } from "react-router-dom";
import "./footer.css";

const FooterList = (props) => {
  const navigate = useNavigate();
  return (
    <div className="footer-list">
      {props.list.map((item, i) => {
        return (
          <p
            onClick={() => {
              navigate(item.link);
            }}
            key={item + i.toString()}
          >
            {item.name}
          </p>
        );
      })}
    </div>
  );
};

export default FooterList;
