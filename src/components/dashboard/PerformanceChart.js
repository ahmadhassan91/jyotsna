"use client";

export default function PerformanceChart() {
    const data = [
        { month: 'Jan', val: 50 },
        { month: 'Feb', val: 55 },
        { month: 'Mar', val: 65 },
        { month: 'Apr', val: 60 },
        { month: 'May', val: 75 },
        { month: 'Jun', val: 85 },
        { month: 'Jul', val: 92 },
    ];

    return (
        <div className="glass-panel" style={{ padding: '24px 32px', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', position: 'relative', zIndex: 10, width: '100%' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#fff', letterSpacing: '0.025em', margin: 0 }}>Property Performance Revenue</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ cursor: 'pointer', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s' }}>Month</button>
                    <button style={{ cursor: 'pointer', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(56, 189, 248, 0.2)', color: 'var(--accent)', border: '1px solid rgba(56, 189, 248, 0.5)', boxShadow: '0 0 10px rgba(56,189,248,0.3)' }}>YTD</button>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flex: 1, paddingTop: '16px', paddingBottom: '8px', position: 'relative', zIndex: 10, borderBottom: '1px solid rgba(255,255,255,0.1)', minHeight: '250px' }}>
                
                {/* Horizontal Guide lines */}
                <div style={{ position: 'absolute', width: '100%', top: '0', borderTop: '1px dashed rgba(255,255,255,0.05)', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', width: '100%', top: '33.33%', borderTop: '1px dashed rgba(255,255,255,0.05)', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', width: '100%', top: '66.66%', borderTop: '1px dashed rgba(255,255,255,0.05)', pointerEvents: 'none' }}></div>

                {data.map((item, idx) => {
                    return (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: '12px', flex: 1, margin: '0 8px', position: 'relative', cursor: 'pointer' }}>
                            <div style={{ width: '100%', maxWidth: '48px', display: 'flex', alignItems: 'flex-end', height: '100%', justifyContent: 'center', position: 'relative' }}>
                                {/* Bar */}
                                <div 
                                    style={{ 
                                        width: '100%', 
                                        height: `${item.val}%`, 
                                        borderRadius: '8px 8px 0 0', 
                                        transition: 'all 0.5s ease-out', 
                                        position: 'relative', 
                                        background: 'linear-gradient(to top, rgba(14, 165, 233, 0.2), var(--accent))', 
                                        boxShadow: '0 0 15px rgba(56,189,248,0.3)' 
                                    }}
                                    onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(to top, rgba(14, 165, 233, 0.3), #7dd3fc)'}
                                    onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(to top, rgba(14, 165, 233, 0.2), var(--accent))'}
                                >
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px 8px 0 0' }}></div>
                                </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.month}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
