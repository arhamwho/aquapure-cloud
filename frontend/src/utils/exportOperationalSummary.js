import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOperationalSummaryPDF({
  summary,
  plants,
  alerts,
  maintenance,
  waterQuality,
}) {
  const doc = new jsPDF();
  const generatedAt = new Date().toLocaleString();

  doc.setFontSize(18);
  doc.setTextColor(12, 74, 110);
  doc.text("AquaPure Water Treatment Cloud", 14, 20);

  doc.setFontSize(13);
  doc.setTextColor(51, 65, 85);
  doc.text("Operational Summary Report", 14, 30);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated: ${generatedAt}`, 14, 38);

  autoTable(doc, {
    startY: 46,
    head: [["Metric", "Value"]],
    body: [
      ["Total Plants", String(summary.totalPlants)],
      ["Running Plants", String(summary.runningPlants)],
      ["Maintenance Tasks", String(summary.maintenanceTasks)],
      ["Open Alerts", String(summary.openAlerts)],
      ["Average Water Quality", String(summary.avgWaterQuality)],
    ],
    theme: "grid",
    headStyles: { fillColor: [2, 132, 199], textColor: 255 },
    styles: { fontSize: 10 },
  });

  const plantsStartY = doc.lastAutoTable.finalY + 12;
  doc.setFontSize(12);
  doc.setTextColor(12, 74, 110);
  doc.text("Plant Operations", 14, plantsStartY);

  autoTable(doc, {
    startY: plantsStartY + 4,
    head: [["Plant Name", "City", "Status", "Capacity"]],
    body: plants.map((p) => [
      p.plant_name,
      p.city,
      p.status,
      `${Number(p.capacity).toLocaleString()} L/day`,
    ]),
    theme: "striped",
    headStyles: { fillColor: [3, 105, 161], textColor: 255 },
    styles: { fontSize: 9 },
  });

  if (alerts.length > 0) {
    const alertsStartY = doc.lastAutoTable.finalY + 12;
    doc.setFontSize(12);
    doc.setTextColor(12, 74, 110);
    doc.text("Alerts", 14, alertsStartY);

    autoTable(doc, {
      startY: alertsStartY + 4,
      head: [["Message", "Severity", "Status"]],
      body: alerts.map((a) => [a.message, a.severity, a.status]),
      theme: "striped",
      headStyles: { fillColor: [220, 38, 38], textColor: 255 },
      styles: { fontSize: 9 },
    });
  }

  if (maintenance.length > 0) {
    let maintenanceStartY = doc.lastAutoTable.finalY + 12;
    if (doc.lastAutoTable.finalY > 250) {
      doc.addPage();
      maintenanceStartY = 20;
    }

    doc.setFontSize(12);
    doc.setTextColor(12, 74, 110);
    doc.text("Maintenance Tasks", 14, maintenanceStartY);

    autoTable(doc, {
      startY: maintenanceStartY + 4,
      head: [["Task", "Plant ID", "Assigned To", "Status"]],
      body: maintenance.map((m) => [
        m.task,
        String(m.plant_id),
        m.assigned_to,
        m.status,
      ]),
      theme: "striped",
      headStyles: { fillColor: [234, 88, 12], textColor: 255 },
      styles: { fontSize: 9 },
    });
  }

  if (waterQuality.length > 0) {
    let wqStartY = doc.lastAutoTable.finalY + 12;
    if (doc.lastAutoTable.finalY > 250) {
      doc.addPage();
      wqStartY = 20;
    }

    doc.setFontSize(12);
    doc.setTextColor(12, 74, 110);
    doc.text("Water Quality Readings", 14, wqStartY);

    autoTable(doc, {
      startY: wqStartY + 4,
      head: [["Plant ID", "pH", "Chlorine", "Quality Score"]],
      body: waterQuality.map((r) => [
        String(r.plant_id),
        String(r.ph),
        `${r.chlorine} mg/L`,
        String(r.quality_score),
      ]),
      theme: "striped",
      headStyles: { fillColor: [8, 145, 178], textColor: 255 },
      styles: { fontSize: 9 },
    });
  }

  doc.save(`AquaPure-Operational-Summary-${Date.now()}.pdf`);
}
