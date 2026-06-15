import PageState from "../components/PageState";

const PRICING_ITEMS = [
  { service: "Amazon EC2", description: "Application server (t3.medium)", cost: 38.5 },
  { service: "Amazon RDS", description: "MySQL database (db.t3.micro)", cost: 24.0 },
  { service: "Amazon S3", description: "Backup and document storage", cost: 6.75 },
  { service: "Amazon CloudWatch", description: "Monitoring, logs, and alerts", cost: 9.25 },
];

function PricingPage() {
  const monthlyTotal = PRICING_ITEMS.reduce((sum, item) => sum + item.cost, 0);

  return (
    <PageState loading={false} error="">
      <div className="page-stack">
        <section className="panel reports-header">
          <div className="reports-header__content">
            <div>
              <p className="reports-header__eyebrow">AWS Cost Management</p>
              <h2 className="reports-header__title">Monthly Cloud Pricing</h2>
              <p className="reports-header__desc">
                Estimated monthly infrastructure costs for AquaPure Cloud deployment.
              </p>
            </div>
            <div className="pricing-total-card">
              <span>Monthly Total</span>
              <strong>${monthlyTotal.toFixed(2)}</strong>
            </div>
          </div>
        </section>

        <section className="pricing-grid">
          {PRICING_ITEMS.map((item) => (
            <div key={item.service} className="pricing-card">
              <p className="pricing-card__service">{item.service}</p>
              <p className="pricing-card__desc">{item.description}</p>
              <p className="pricing-card__cost">${item.cost.toFixed(2)}</p>
              <span className="pricing-card__period">per month</span>
            </div>
          ))}
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Cost Breakdown</h2>
            <span className="panel__count">${monthlyTotal.toFixed(2)} / month</span>
          </div>
          <div className="summary-table-wrapper">
            <table className="plant-table">
              <thead>
                <tr>
                  <th>AWS Service</th>
                  <th>Description</th>
                  <th>Monthly Cost (USD)</th>
                </tr>
              </thead>
              <tbody>
                {PRICING_ITEMS.map((item) => (
                  <tr key={item.service}>
                    <td>{item.service}</td>
                    <td>{item.description}</td>
                    <td>${item.cost.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="pricing-table__total-row">
                  <td colSpan="2">
                    <strong>Monthly Total</strong>
                  </td>
                  <td>
                    <strong>${monthlyTotal.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageState>
  );
}

export default PricingPage;
