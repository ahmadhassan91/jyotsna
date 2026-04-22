"use client";
import { useState, useEffect } from 'react';

export default function PredictiveInsights() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const insights = [
        { title: 'Predicted Vacancy (60d)', value: '12%', status: 'warning', detail: '3% increase expected due to West Side renewals.', trend: '+3.1%' },
        { title: 'Revenue Forecast', value: '$158K', status: 'success', detail: 'On track to exceed Q2 targets by 5.2%.', trend: '+5.2%' },
        { title: 'Maintenance Risk', value: 'High', status: 'danger', detail: 'HVAC systems in Units 100-110 showing high failure probability.', trend: 'N/A' },
    ];

    if (isLoading) {
        return (
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '300px' }}>
                <div style={{ height: '24px', width: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ height: '80px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}></div>
                    <div style={{ height: '80px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--accent)' }}>✨</span> AI Predictive Insights
                </h3>
                <span style={{ fontSize: '0.625rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent)', fontWeight: 'bold', border: '1px solid rgba(56, 189, 248, 0.2)' }}>BETA</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {insights.map((insight, idx) => (
                    <div key={idx} style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: insight.status === 'success' ? 'var(--success)' : insight.status === 'warning' ? 'var(--warning)' : 'var(--danger)' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{insight.title}</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: insight.status === 'success' ? 'var(--success)' : insight.status === 'warning' ? 'var(--warning)' : '#fff' }}>{insight.value}</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>{insight.detail}</p>
                        {insight.trend !== 'N/A' && (
                            <div style={{ marginTop: '8px', fontSize: '0.625rem', fontWeight: 600, color: insight.status === 'success' ? 'var(--success)' : 'var(--warning)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <svg style={{ width: '10px', height: '10px' }} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                </svg>
                                {insight.trend} VS BASELINE
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <button className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', fontSize: '0.75rem', padding: '8px' }}>Generate Full AI Audit</button>
        </div>
    );
}
