import { useState } from "react";
import "./FaqItem.css";

export default function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`faq-item ${open ? "open" : ""}`}>
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{faq.question}</span>
        <span className="icon">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="faq-answer">
          <p>{faq.answer}</p>
        </div>
      )}
    </article>
  );
}
