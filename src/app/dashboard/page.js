import KPICard from '@/components/dashboard/KPICard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import ActionPanel from '@/components/dashboard/ActionPanel';
import RecentActivity from '@/components/dashboard/RecentActivity';

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
        <div className="dashboard-body">
            <PerformanceChart />
            <ActionPanel />
        </div>
        
        {/* Added Recent Activity Table for deeper detail feature */}
        <RecentActivity />
    </div>
  );
}
