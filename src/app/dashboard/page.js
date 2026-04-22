import KPICard from '@/components/dashboard/KPICard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import ActionPanel from '@/components/dashboard/ActionPanel';
import RecentActivity from '@/components/dashboard/RecentActivity';
import PredictiveInsights from '@/components/dashboard/PredictiveInsights';
import AlertsCenter from '@/components/dashboard/AlertsCenter';

export default function Dashboard() {
  return (
    <div className="section-active">
        <div className="kpi-grid">
            <KPICard 
                title="Total Units" 
                value="312" 
                detail="+29 floor expansion active" 
                trend="+12%" 
                isPositive={true} 
            />
            <KPICard 
                title="Occupancy Rate" 
                value="94%" 
                detail="Target: 95%" 
                trend="+2.1%" 
                isPositive={true} 
            />
            <KPICard 
                title="Outstanding Dues" 
                value="$18,450" 
                detail="24 Tenants Flagged" 
                trend="+5.2%" 
                isPositive={false} 
                valueClass="warning-text"
            />
            <KPICard 
                title="Monthly Profit (MTD)" 
                value="$142,800" 
                detail="Across all properties" 
                trend="+8.4%" 
                isPositive={true} 
                valueClass="success-text"
            />
        </div>
        
        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
            <div style={{ gridColumn: 'span 2' }}>
                <PerformanceChart />
            </div>
            <div>
                <PredictiveInsights />
            </div>
        </div>

        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
            <div>
                <AlertsCenter />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
                <RecentActivity />
            </div>
        </div>

        <div className="dashboard-body">
            <ActionPanel />
        </div>
    </div>
  );
}
