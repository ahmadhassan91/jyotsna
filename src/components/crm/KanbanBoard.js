"use client";
import { useState } from 'react';
import LeadCard from './LeadCard';
import LeadModal from './LeadModal';

const initialData = {
    columns: {
        'new': { id: 'new', title: 'New (Zillow)', leadIds: ['lead-1', 'lead-2', 'lead-3'] },
        'contacted': { id: 'contacted', title: 'Contacted', leadIds: ['lead-4'] },
        'tour': { id: 'tour', title: 'Tour Scheduled', leadIds: ['lead-5', 'lead-6'] },
        'lease': { id: 'lease', title: 'Lease Processing', leadIds: ['lead-7'] },
    },
    leads: {
        'lead-1': { id: 'lead-1', name: 'Sarah Jenkins', detail: 'Interested in 2BHK', tag: 'Zillow', phone: '(555) 123-4567' },
        'lead-2': { id: 'lead-2', name: 'David Cho', detail: 'Studio Apartment', tag: 'Zillow', phone: '(555) 987-6543' },
        'lead-3': { id: 'lead-3', name: 'Mark Ruffalo', detail: '3BHK Penthouse', tag: 'Zillow', phone: '(555) 456-7890' },
        'lead-4': { id: 'lead-4', name: 'Emily Chen', detail: 'Sent pricing details', followUpDate: 'July 15', phone: '(555) 222-3333' },
        'lead-5': { id: 'lead-5', name: 'John Doe', detail: 'Touring Unit 402', followUpDate: 'Today, 2:00 PM', isDueToday: true, phone: '(555) 111-0000' },
        'lead-6': { id: 'lead-6', name: 'Alice Walker', detail: 'Virtual Tour', followUpDate: 'Tomorrow', phone: '(555) 444-5555' },
        'lead-7': { id: 'lead-7', name: 'Brian O\'Connor', detail: 'Awaiting signature', isSuccess: true, phone: '(555) 666-7777' },
    },
    columnOrder: ['new', 'contacted', 'tour', 'lease']
};

export default function KanbanBoard() {
  const [data, setData] = useState(initialData);
  const [activeLead, setActiveLead] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for Add Lead manually
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({ name: '', detail: '', phone: '', tag: 'Manual' });

  const openModal = (lead) => setActiveLead(lead.name);
  const closeModal = () => setActiveLead(null);

  const onDragStart = (e, leadId) => {
    e.dataTransfer.setData('text/plain', leadId);
    e.currentTarget.classList.add('opacity-50');
  };

  const onDragEnd = (e) => {
      e.currentTarget.classList.remove('opacity-50');
  }

  const onDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-slate-800/50');
  };

  const onDragLeave = (e) => {
      e.currentTarget.classList.remove('bg-slate-800/50');
  }

  const onDrop = (e, columnId) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-slate-800/50');
    const leadId = e.dataTransfer.getData('text/plain');
    
    let sourceColumnId = null;
    for (const colId of data.columnOrder) {
        if (data.columns[colId].leadIds.includes(leadId)) {
            sourceColumnId = colId;
            break;
        }
    }

    if (!sourceColumnId || sourceColumnId === columnId) return;

    const newSourceLeadIds = Array.from(data.columns[sourceColumnId].leadIds);
    newSourceLeadIds.splice(newSourceLeadIds.indexOf(leadId), 1);

    const newDestLeadIds = Array.from(data.columns[columnId].leadIds);
    newDestLeadIds.push(leadId);

    setData(prev => ({
        ...prev,
        columns: {
            ...prev.columns,
            [sourceColumnId]: { ...prev.columns[sourceColumnId], leadIds: newSourceLeadIds },
            [columnId]: { ...prev.columns[columnId], leadIds: newDestLeadIds }
        }
    }));
  };

  const filteredLeads = (leadIds) => {
      if(!searchQuery) return leadIds;
      return leadIds.filter(id => {
          const lead = data.leads[id];
          return lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 lead.detail.toLowerCase().includes(searchQuery.toLowerCase());
      });
  }

  const handleAddLeadSubmit = (e) => {
      e.preventDefault();
      if(!newLeadForm.name) return;

      const newLeadId = `lead-${Date.now()}`;
      const newLead = {
          id: newLeadId,
          ...newLeadForm
      };

      setData(prev => {
          const updatedColumns = { ...prev.columns };
          // Add to 'New' column
          updatedColumns['new'].leadIds = [...updatedColumns['new'].leadIds, newLeadId];

          return {
              ...prev,
              leads: { ...prev.leads, [newLeadId]: newLead },
              columns: updatedColumns
          };
      });

      setIsAddingLead(false);
      setNewLeadForm({ name: '', detail: '', phone: '', tag: 'Manual' });
  };

  return (
    <>
      <div className="crm-toolbar">
          <button className="btn btn-primary" onClick={() => setIsAddingLead(true)}>+ Add Lead</button>
          <div className="search-box">
              <input 
                 type="text" 
                 placeholder="Search prospects..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
              />
          </div>
      </div>

      <div className="kanban-board">
          {data.columnOrder.map(columnId => {
              const column = data.columns[columnId];
              const visibleLeads = filteredLeads(column.leadIds);

              return (
                  <div 
                      key={column.id} 
                      className="kanban-col glass-panel"
                      style={{ transition: 'background-color 0.2s', padding: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={(e) => onDrop(e, column.id)}
                  >
                      <div className="col-header">
                          <h3>{column.title}</h3>
                          <span className="badge">{visibleLeads.length}</span>
                      </div>
                      <div className="cards-container" style={{ flex: 1, overflowY: 'auto', paddingRight: '8px', paddingBottom: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {visibleLeads.map(leadId => (
                              <LeadCard 
                                  key={leadId}
                                  lead={data.leads[leadId]}
                                  onClick={openModal}
                                  onDragStart={onDragStart}
                                  onDragEnd={onDragEnd}
                              />
                          ))}
                          {visibleLeads.length === 0 && (
                              <div style={{ textAlign: 'center', padding: '16px', border: '1px dashed rgba(148, 163, 184, 0.5)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '8px' }}>
                                  Drag leads here
                              </div>
                          )}
                      </div>
                  </div>
              )
          })}
      </div>

      {activeLead && <LeadModal leadName={activeLead} onClose={closeModal} />}

      {/* Manual Add Lead Modal */}
      {isAddingLead && (
         <div className="modal-overlay" style={{ zIndex: 50 }}>
            <div className="modal glass-panel" style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 0 50px rgba(0,0,0,0.5)', maxWidth: '28rem', width: '100%', margin: '0 auto' }}>
                <div className="modal-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.025em', color: '#fff', margin: 0 }}>Create New Lead</h3>
                </div>
                <form onSubmit={handleAddLeadSubmit} style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Full Name</label>
                        <input 
                            type="text" required
                            className="input-field" 
                            style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
                            placeholder="e.g. Jane Doe"
                            value={newLeadForm.name}
                            onChange={(e) => setNewLeadForm({...newLeadForm, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Phone / Contact</label>
                        <input 
                            type="text" required
                            className="input-field" 
                            style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
                            placeholder="(555) 000-0000"
                            value={newLeadForm.phone}
                            onChange={(e) => setNewLeadForm({...newLeadForm, phone: e.target.value})}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Interest Details</label>
                        <input 
                            type="text" required
                            className="input-field" 
                            style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
                            placeholder="e.g. Looking for 2BHK"
                            value={newLeadForm.detail}
                            onChange={(e) => setNewLeadForm({...newLeadForm, detail: e.target.value})}
                        />
                    </div>
                    <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button type="button" className="btn btn-outline" style={{ padding: '8px 24px', transition: 'all 0.2s' }} onClick={() => setIsAddingLead(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ boxShadow: '0 4px 12px rgba(56,189,248,0.3)', padding: '8px 24px' }}>Create Lead</button>
                    </div>
                </form>
            </div>
         </div> 
      )}
    </>
  );
}
