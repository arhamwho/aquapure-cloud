import { useState } from "react";
import PageState from "../components/PageState";

const STATUS_OPTIONS = ["Pending", "Approved", "Completed"];

const INITIAL_TASKS = [
  {
    id: 1,
    task: "Approve Pune Plant maintenance schedule",
    owner: "Operations Manager",
    status: "Pending",
  },
  {
    id: 2,
    task: "Review monthly water quality compliance report",
    owner: "Quality Lead",
    status: "Approved",
  },
  {
    id: 3,
    task: "Deploy dashboard update to production EC2",
    owner: "Cloud Admin",
    status: "Completed",
  },
  {
    id: 4,
    task: "Validate alert escalation workflow",
    owner: "Safety Officer",
    status: "Pending",
  },
];

function WorkflowPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  function updateTaskStatus(id, status) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }

  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const approvedCount = tasks.filter((t) => t.status === "Approved").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  return (
    <PageState loading={false} error="">
      <div className="page-stack">
        <section className="panel reports-header">
          <div className="reports-header__content">
            <div>
              <p className="reports-header__eyebrow">Workflow Management</p>
              <h2 className="reports-header__title">Task Approval Pipeline</h2>
              <p className="reports-header__desc">
                Track operational workflows across pending, approved, and completed stages.
              </p>
            </div>
          </div>
        </section>

        <section className="stats-grid stats-grid--three">
          <div className="workflow-stat">
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>
          <div className="workflow-stat workflow-stat--approved">
            <span>Approved</span>
            <strong>{approvedCount}</strong>
          </div>
          <div className="workflow-stat workflow-stat--completed">
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Workflow Tasks</h2>
            <span className="panel__count">{tasks.length} tasks</span>
          </div>
          <div className="summary-table-wrapper">
            <table className="plant-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Owner</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.task}</td>
                    <td>{task.owner}</td>
                    <td>
                      <select
                        className="workflow-select"
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageState>
  );
}

export default WorkflowPage;
