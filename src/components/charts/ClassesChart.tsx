import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ClassMetric } from '../../types/metrics';

interface ClassesChartProps {
    data: ClassMetric[];
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export const ClassesChart: React.FC<ClassesChartProps> = ({ data }) => {
    return (
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 h-80">
            <h3 className="text-md font-semibold text-white mb-2">Distribución por Clase</h3>
            <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                        <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
