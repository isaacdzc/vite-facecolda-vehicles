import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { TopBrandMetric } from '../../types/metrics';

interface TopBrandsChartProps {
  data: TopBrandMetric[];
}

export const TopBrandsChart: React.FC<TopBrandsChartProps> = ({ data }) => {
  return (
    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 h-80">
      <h3 className="text-md font-semibold text-white mb-2">Top 10 Marcas con más Registros</h3>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="brand"
              stroke="#94a3b8"
              angle={-30}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 11 }}
            />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
            <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
