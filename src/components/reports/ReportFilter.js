"use client";

export default function ReportFilter() {
    return (
        <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', background: 'var(--panel-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--panel-border)', backdropFilter: 'blur(12px)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Report Architecture</label>
                    <select className="input-field" defaultValue="rent_roll" style={{ background: 'rgba(15, 23, 42, 0.8)' }}>
                        <option value="rent_roll">Detailed Rent Roll Analysis</option>
                        <option value="profit_loss">Property-Level P&L Insights</option>
                        <option value="arrears">Arrears & Collections Ledger</option>
                        <option value="vacancy">Vacancy Variance Audit</option>
                    </select>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Target Portfolio</label>
                    <select className="input-field" defaultValue="all" style={{ background: 'rgba(15, 23, 42, 0.8)' }}>
                        <option value="all">Global Portfolio (All Assets)</option>
                        <option value="bmg_1">BMG Tower 1</option>
                        <option value="gn_heights">GN Heights Residential</option>
                        <option value="new_dev">Phase II (29-Floor Dev)</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Insight Depth</label>
                    <select className="input-field" defaultValue="property" style={{ background: 'rgba(15, 23, 42, 0.8)' }}>
                        <option value="property">Property-Level Summary</option>
                        <option value="unit">Unit-Level Drilldown</option>
                        <option value="tenant">Tenant Payment History</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Temporal Range</label>
                    <select className="input-field" defaultValue="ytd" style={{ background: 'rgba(15, 23, 42, 0.8)' }}>
                        <option value="mtd">Month to Date (MTD)</option>
                        <option value="last_month">Trailing 30 Days</option>
                        <option value="ytd">Year to Date (YTD)</option>
                        <option value="q3">Fiscal Q3 2026</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end' }}>
                    <button className="btn btn-primary" style={{ padding: '12px 24px' }}>
                        Compile Data
                    </button>
                </div>
            </div>
        </div>
    );
}
