
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { addReview, getReviews } from "../api/api";
import { XIcon } from "./Icons";

function StarPicker({ value, onChange, size = 36 }) {
  const [hover, setHover] = useState(0);
  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
  const colors = ["", "#EF4444", "#F97316", "#EAB308", "#22C55E", "#16A34A"];
  const active = hover || value;

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
        {[1, 2, 3, 4, 5].map((s) => {
          const filled = s <= active;
          return (
            <button
              key={s}
              type="button"
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              onClick={() => onChange(s)}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: 4,
                transform: hover === s ? "scale(1.3)" : s <= active ? "scale(1.12)" : "scale(1)",
                transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)",
                filter: filled ? "drop-shadow(0 2px 6px rgba(245,158,11,.5))" : "none",
              }}
            >
              <svg width={size} height={size} viewBox="0 0 24 24"
                fill={filled ? "#F59E0B" : "none"}
                stroke={filled ? "#F59E0B" : "#D1D5DB"}
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          );
        })}
      </div>
      {active > 0 && (
        <div style={{
          fontSize: 14, fontWeight: 700, color: colors[active],
          animation: "ratingLabel .2s ease both",
        }}>
          {labels[active]}
        </div>
      )}
    </div>
  );
}

function ReviewRow({ review, theme }) {
  const initials = (review.studentName || "Student")[0].toUpperCase();
  const date = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "Recently";

  return (
    <div style={{
      display: "flex", gap: 12, padding: "14px 0",
      borderBottom: `1px solid ${theme.divider}`,
    }}>
      {/* Avatar */}
      <div style={{
        width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg,#7C3AED,#9333EA)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 800, fontSize: 14,
        boxShadow: "0 3px 10px rgba(124,58,237,.25)",
      }}>
        {initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: theme.textPrimary }}>
            {review.studentName || "Anonymous"}
          </span>
          <span style={{ fontSize: 11, color: theme.textFaint }}>{date}</span>
        </div>
        {/* Stars */}
        <div style={{ display: "flex", gap: 2, marginBottom: 6 }}>
          {[1,2,3,4,5].map(s => (
            <svg key={s} width={12} height={12} viewBox="0 0 24 24"
              fill={s <= review.rating ? "#F59E0B" : "none"}
              stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        {review.comment && (
          <p style={{ fontSize: 12.5, color: theme.textMuted, lineHeight: 1.65, margin: 0 }}>
            "{review.comment}"
          </p>
        )}
      </div>
    </div>
  );
}

function RatingBar({ star, count, total, theme }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      <span style={{ fontSize: 11.5, color: theme.textMuted, width: 10, textAlign: "right", fontWeight: 600 }}>{star}</span>
      <svg width={11} height={11} viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <div style={{ flex: 1, height: 6, background: theme.divider, borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`, height: "100%",
          background: "linear-gradient(90deg, #F59E0B, #FBBF24)",
          borderRadius: 99, transition: "width .5s ease",
        }} />
      </div>
      <span style={{ fontSize: 11, color: theme.textFaint, width: 28 }}>{count}</span>
    </div>
  );
}

export default function RatingModal({ post, gradient, onClose, onRated }) {
  const { user } = useAuth();
  const { theme } = useTheme();

  const [userRating, setUserRating]   = useState(0);
  const [comment,    setComment]      = useState("");
  const [submitting, setSubmitting]   = useState(false);
  const [submitted,  setSubmitted]    = useState(false);
  const [error,      setError]        = useState("");

  const [reviews,   setReviews]   = useState(post.reviews || []);
  const [loadingRv, setLoadingRv] = useState(false);

  useEffect(() => {
    const postId = post._id || post.id;
    if (!postId) return;
    setLoadingRv(true);
    getReviews(postId).then(res => {
      if (res.success && Array.isArray(res.data)) setReviews(res.data);
      setLoadingRv(false);
    });
  }, [post._id, post.id]);

  const totalRatings = reviews.length;
  const avgRating    = totalRatings > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalRatings).toFixed(1)
    : (post.rating || 0).toFixed(1);

  const dist = [5,4,3,2,1].map(s => ({
    star: s, count: reviews.filter(r => r.rating === s).length,
  }));

  const handleSubmit = async () => {
    if (!userRating) { setError("Please pick a star rating before submitting."); return; }
    setError(""); setSubmitting(true);
    const res = await addReview(post._id || post.id, { rating: userRating, comment: comment.trim() });
    setSubmitting(false);
    if (!res.success) { setError(res.message); return; }

    const newReview = {
      rating: userRating,
      comment: comment.trim(),
      studentName: user?.name || "You",
      createdAt: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
    setSubmitted(true);
    onRated?.({ rating: userRating, comment: comment.trim() });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

}
