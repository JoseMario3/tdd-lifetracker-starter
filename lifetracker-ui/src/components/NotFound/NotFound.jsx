import * as React from "react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="content">
        <div className="text">
          <p>
            Oh No! Your search has yielded no results. Try searching another
            item
          </p>
        </div>
        <div className="media">
          <img
            src="https://st2.depositphotos.com/1001911/7684/v/600/depositphotos_76840879-stock-illustration-depressed-emoticon.jpg"
            alt="sad face"
          ></img>
        </div>
      </div>
    </div>
  );
}
