function Section({
  eyebrow,
  title,
  children
}) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          {eyebrow && (
            <p className="eyebrow">{eyebrow}</p>
          )}

          {title && <h2>{title}</h2>}
        </div>
      </div>

      {children}
    </section>
  );
}

export default Section;
