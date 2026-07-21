import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import type { PriceHistoryMetric } from '../../types/metrics';

interface PriceChartProps {
    data: PriceHistoryMetric[];
    vehicleName: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, vehicleName }) => {
    if (data.length === 0) return null;

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 mb-6">
            <h3 className="text-lg font-semibold text-white mb-1">Histórico de Precios Comercial</h3>
            <p className="text-sm text-slate-400 mb-4">{vehicleName}</p>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="year" stroke="#94a3b8" />
                        <YAxis
                            stroke="#94a3b8"
                            tickFormatter={(val: number) => `$${(val / 1000000).toFixed(0)}M`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                            formatter={(value: unknown) => [
                                typeof value === 'number' ? formatCurrency(value) : '$0',
                                'Precio'
                            ]}
                            labelFormatter={(label) => `Modelo: ${label}`}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ fill: '#818cf8', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
