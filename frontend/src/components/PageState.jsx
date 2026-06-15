function PageState({ loading, error, children }) {
  if (loading) {
    return (
      <div className="dashboard__state">
        <div className="spinner" />
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard__state dashboard__state--error">
        <p>{error}</p>
      </div>
    );
  }

  return children;
}

export default PageState;
