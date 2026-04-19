"use client";

export default function KPICard({ title, value, detail, trend, isPositive, valueClass }) {
  return (
    <div className="kpi-card glass-panel">
      <div className="kpi-header">
        <h3>{title}</h3>
        {trend && (
            <span className={`trend ${isPositive ? 'positive' : 'negative'}`}>
                {trend}
            </span>
        )}
      </div>
      <div className={`kpi-value ${valueClass || ''}`}>{value}</div>
      <div className="kpi-footer">{detail}</div>
    </div>
  );
}
