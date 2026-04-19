"use client";
import { useState } from 'react';

export default function ReportDataGrid() {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            alert('PDF Report Successfully Exported! Check your downloads folder.');
            setIsExporting(false);
        }, 2000);
    };

    const mockData = [
        { unit: 'GN-101', tenant: 'Alice Smith', rent: '$1,500', parking: '$100', total: '$1,600', status: 'Current' },
        { unit: 'GN-102', tenant: 'Bob Johnson', rent: '$1,550', parking: '$0', total: '$1,550', status: 'Current' },
        { unit: 'GN-103', tenant: 'Charlie Brown', rent: '$1,600', parking: '$150', total: '$1,750', status: '30 Days Late', isLate: true },
        { unit: 'GN-104', tenant: 'Diana Prince', rent: '$1,450', parking: '$100', total: '$1,550', status: 'Current' },
        { unit: 'GN-105', tenant: 'Evan Wright', rent: '$1,650', parking: '$0', total: '$1,650', status: 'Current' },
        { unit: 'GN-106', tenant: 'UNAVAILABLE', rent: '-', parking: '-', total: '-', status: 'Vacant' },
        { unit: 'GN-107', tenant: 'Fiona Gallagher', rent: '$1,500', parking: '$100', total: '$1,600', status: 'Current' },
        { unit: 'GN-108', tenant: 'George Miller', rent: '$1,700', parking: '$150', total: '$1,850', status: '60 Days Late', isLate: true },
    ];

    return (
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--panel-border)', background: 'linear-gradient(to right, rgba(255,255,255,0.02), transparent)' }}>
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#fff', display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
                        YTD Detailed Rent Roll - Global Portfolio
                        <span style={{ fontSize: '0.65rem', fontWeight: 'bold', letterSpacing: '1px', padding: '4px 8px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>OFFICIAL DRAFT</span>
                    </h3>
                    <p className="sub-text" style={{ margin: '4px 0 0 0' }}>Generated dynamically: Today, 10:45 AM EDT</p>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        CSV Export
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={handleExport}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isExporting ? 0.7 : 1 }}
                    >
                        {isExporting ? 'Generating...' : (
                            <>
                                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                                Generate PDF
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, overflow: 'auto' }}>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead style={{ position: 'sticky', top: 0, background: '#0f172a', zIndex: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                        <tr style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid var(--panel-border)' }}>
                            <th style={{ padding: '20px 24px', fontWeight: 600 }}>Unit ID</th>
                            <th style={{ padding: '20px 24px', fontWeight: 600 }}>Primary Tenant</th>
                            <th style={{ padding: '20px 24px', fontWeight: 600 }}>Base Rent</th>
                            <th style={{ padding: '20px 24px', fontWeight: 600 }}>Ancillary Fees</th>
                            <th style={{ padding: '20px 24px', fontWeight: 600, color: 'var(--accent)' }}>Total Obligation</th>
                            <th style={{ padding: '20px 24px', fontWeight: 600 }}>Account Status</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '0.875rem' }}>
                        {mockData.map((item, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid var(--panel-border)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                                <td style={{ padding: '16px 24px', fontFamily: 'monospace', fontWeight: 500, color: item.status === 'Vacant' ? 'var(--text-secondary)' : '#e2e8f0' }}>{item.unit}</td>
                                <td style={{ padding: '16px 24px', fontWeight: 500, color: item.status === 'Vacant' ? 'var(--text-secondary)' : '#fff', fontStyle: item.status === 'Vacant' ? 'italic' : 'normal' }}>{item.tenant}</td>
                                <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{item.rent}</td>
                                <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{item.parking}</td>
                                <td style={{ padding: '16px 24px', fontWeight: 'bold', color: item.status === 'Vacant' ? 'var(--text-secondary)' : 'var(--accent)', background: 'rgba(56, 189, 248, 0.03)', borderLeft: '1px solid rgba(56, 189, 248, 0.1)' }}>{item.total}</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: item.isLate ? 'var(--danger)' : item.status === 'Vacant' ? 'var(--text-secondary)' : 'var(--success)' }}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot style={{ position: 'sticky', bottom: 0, background: '#0f172a', boxShadow: '0 -4px 20px rgba(0,0,0,0.3)' }}>
                        <tr style={{ borderTop: '2px solid var(--panel-border)' }}>
                            <td style={{ padding: '24px', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>PORTFOLIO TOTAL</td>
                            <td style={{ padding: '24px' }}></td>
                            <td style={{ padding: '24px', fontWeight: 'bold', color: '#e2e8f0' }}>$10,950</td>
                            <td style={{ padding: '24px', fontWeight: 'bold', color: '#e2e8f0' }}>$600</td>
                            <td style={{ padding: '24px', fontWeight: 'bold', color: 'var(--accent)', fontSize: '1.125rem', background: 'rgba(56, 189, 248, 0.1)', borderLeft: '1px solid rgba(56, 189, 248, 0.2)' }}>$11,550</td>
                            <td style={{ padding: '24px' }}></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
