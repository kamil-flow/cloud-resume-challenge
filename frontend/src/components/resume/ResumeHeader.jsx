// ResumeHeader.jsx
import React from "react";

export default function ResumeHeader({ person }) {
  // Destructure directly from person (no .contact!)
  const { name, locationLine, email, phone } = person;

  return (
    <section className="header">
      <h1>{name}</h1>
      <p>
        <span className="address">{locationLine}</span>
        {/*
        <span className="bull"> • </span>
        <span className="email">
          <a href={`mailto:${email}`}>{email}</a>
        </span>
        <span className="bull"> • </span>
        <span className="phone">{phone}</span>
        */}
      </p>
    </section>
  );
}
