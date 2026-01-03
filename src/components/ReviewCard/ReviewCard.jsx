import "./ReviewCard.css";

function Stars({ rating }) {
  // rating de 1 a 5 estrellas
  const full = "★".repeat(rating);
  const empty = "☆".repeat(5 - rating);
  return <span className="stars" aria-label={`${rating} de 5`}>{full}{empty}</span>;
}

export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-head">
        <div>
          <h3 className="review-title">{review.title}</h3>
          <div className="review-meta">
            <span className="author">{review.author}</span>
            <span className="dot">•</span>
            <span className="date">{review.date}</span>
          </div>
        </div>

        <Stars rating={review.rating} />
      </div>

      <p className="review-comment">{review.comment}</p>
    </article>
  );
}
