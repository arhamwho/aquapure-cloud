import PageState from "../components/PageState";

const DEPLOYMENT_FLOW = [
  {
    step: "1",
    title: "User Request",
    detail: "Operator accesses AquaPure dashboard via browser.",
  },
  {
    step: "2",
    title: "Load Balancer",
    detail: "Traffic routed through AWS Application Load Balancer.",
  },
  {
    step: "3",
    title: "EC2 Application",
    detail: "Node.js + Express API processes business logic.",
  },
  {
    step: "4",
    title: "RDS MySQL",
    detail: "Plant, alerts, maintenance, and water quality data stored.",
  },
  {
    step: "5",
    title: "S3 Backup",
    detail: "Reports and backups stored in Amazon S3.",
  },
  {
    step: "6",
    title: "CloudWatch",
    detail: "CPU, memory, storage, and network metrics monitored.",
  },
];

function ArchitecturePage() {
  return (
    <PageState loading={false} error="">
      <div className="page-stack">
        <section className="panel reports-header">
          <div className="reports-header__content">
            <div>
              <p className="reports-header__eyebrow">Cloud Architecture</p>
              <h2 className="reports-header__title">AWS Deployment Design</h2>
              <p className="reports-header__desc">
                Enterprise architecture for AquaPure Water Treatment Cloud on AWS.
              </p>
            </div>
          </div>
        </section>

        <section className="architecture-grid">
          <div className="panel">
            <div className="panel__header">
              <h2>System Architecture</h2>
            </div>
            <div className="architecture-image-wrap">
              <img
                src="/architecture/aquapuresytem.drawio.png"
                alt="AquaPure system architecture diagram"
                className="architecture-image"
              />
            </div>
          </div>

          <div className="panel">
            <div className="panel__header">
              <h2>AWS Architecture</h2>
            </div>
            <div className="architecture-image-wrap">
              <img
                src="/architecture/awsarchitecture.drawio.png"
                alt="AWS architecture diagram"
                className="architecture-image"
              />
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Deployment Flow</h2>
            <span className="panel__tag">End-to-end</span>
          </div>
          <div className="flow-grid">
            {DEPLOYMENT_FLOW.map((item) => (
              <div key={item.step} className="flow-step">
                <div className="flow-step__number">{item.step}</div>
                <div>
                  <h3 className="flow-step__title">{item.title}</h3>
                  <p className="flow-step__detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageState>
  );
}

export default ArchitecturePage;
