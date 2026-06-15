function PlaceholderPage({ title, description }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__icon">◈</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="placeholder-page__badge">Coming in next release</span>
    </div>
  );
}

export default PlaceholderPage;
