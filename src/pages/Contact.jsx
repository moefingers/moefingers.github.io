import "../assets/styles/contact.css";
import { useEffect, useRef } from "react";

export default function Contact() {

  const unorderedListElement = useRef(null);
  useEffect(() => {
    Object.values(unorderedListElement.current.children).forEach((li, index) => {
      li.children[0].style.animationDelay = `${index * -.2}s`;
    })
  }, []);

  return (
    <div className="contact-page-container">
      <ul ref={unorderedListElement}>
          <li><a href="https://github.com/MoeFingers" target="_blank">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/MohammadZuiter/" target="_blank">LinkedIn</a></li>
          <li><a href="mailto:mbzuiter@gmail.com" target="_blank">mbzuiter@gmail.com</a></li>
          <li><a href="tel:8017026391" target="_blank">(801) 702-6391</a></li>
      </ul>
    </div>
  );
}