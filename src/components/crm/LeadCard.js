"use client";

export default function LeadCard({ lead, onClick, onDragStart }) {
    let classes = "lead-card";
    if(lead.isDueToday) classes += " due-today";
    if(lead.isSuccess) classes += " success";

    return (
        <div 
            className={classes} 
            onClick={() => onClick(lead)}
            draggable="true"
            onDragStart={(e) => onDragStart(e, lead.id)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <h4 style={{ margin: 0 }}>{lead.name}</h4>
                {lead.tag && <span className="tag tag-blue">{lead.tag}</span>}
            </div>
            
            <p className="text-sm text-slate-400 mb-2">{lead.detail}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px', borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    {lead.phone}
                </div>
                {lead.followUpDate && (
                    <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', color: lead.isDueToday ? 'var(--danger)' : 'var(--text-secondary)', fontWeight: lead.isDueToday ? 500 : 400 }}>
                        <svg style={{ width: '12px', height: '12px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {lead.followUpDate}
                    </div>
                )}
            </div>
        </div>
    );
}
