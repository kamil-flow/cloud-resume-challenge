import React from "react"

export default function ResumeHeader(props) {
  const person = props.person;
  const contact = props.person.contact;
  return (
    <section className="header">
    <h1>{ person.name }</h1>
    <p>
        <span className="address">{contact.locationLine}</span>
        <span className="bull">•;</span>
        <span className="email"><a href="mailto:{contact.email}">{contact.email}
        </a></span>
        <span className="bull">•;</span>
        <span className="phone">{contact.phone}</span>
    </p>
    </section>  
  );
   
}
