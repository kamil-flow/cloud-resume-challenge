// ResumeSectionItem.jsx
import React from "react";

export default function ResumeSectionItem({ item }) {
  // Handle different shapes gracefully
  const hasDetails = item.details && (item.details.location || item.details.duration);
  const hasDescription = item.description;

  return (
    <div className="item">
      <div className="item_heading">
        <div className="info">
          <h3>{item.title}</h3>
          {hasDescription && <p>{item.description}</p>}
        </div>

        {hasDetails && (
          <div className="details">
            {item.details.location && (
              <div className="location">{item.details.location}</div>
            )}
            {item.details.duration && (
              <div className="duration">{item.details.duration}</div>
            )}
          </div>
        )}
      </div>

      {item.bullets && item.bullets.length > 0 && (
        <ul>
          {item.bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
