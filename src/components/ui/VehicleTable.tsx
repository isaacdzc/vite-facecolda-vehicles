import React from 'react';
import type { Vehicle } from '../../types/vehicle';
import { LineChart, Search } from 'lucide-react';

interface VehicleTableProps {
    vehicles: Vehicle[];
    onSelectVehicle: (vehicle: Vehicle) => void;
    selectedVehicleCode?: string;
    hasSearched: boolean;
}

export const VehicleTable: React.FC<VehicleTableProps> = ({
    vehicles,
    onSelectVehicle,
    selectedVehicleCode,
    hasSearched
}) => {
    if (!hasSearched) {
        return (
            <div className="bg-slate-800 p-12 rounded-xl border border-slate-700 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
                <Search className="w-10 h-10 text-slate-500" />
                <p className="text-base font-medium">Selecciona una marca arriba para consultar sus vehículos.</p>
            </div>
        );
    }

    if (vehicles.length === 0) {
        return (
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
                No se encontraron vehículos para la búsqueda realizada.
            </div>
        );
    }

    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-xs border-b border-slate-700">
                        <tr>
                            <th className="py-3 px-4">Código</th>
                            <th className="py-3 px-4">Marca</th>
                            <th className="py-3 px-4">Línea / Referencia</th>
                            <th className="py-3 px-4">Clase</th>
                            <th className="py-3 px-4">Cilindraje</th>
                            <th className="py-3 px-4">Combustible</th>
                            <th className="py-3 px-4 text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {vehicles.map((v) => {
                            const isSelected = selectedVehicleCode === v.Codigo;
                            const ref = [v.Referencia1, v.Referencia2, v.Referencia3].filter(Boolean).join(' ');

                            return (
                                <tr
                                    key={`${v.Marca}-${v.Codigo}`}
                                    className={`hover:bg-slate-700/50 transition ${isSelected ? 'bg-indigo-900/30' : ''
                                        }`}
                                >
                                    <td className="py-3 px-4 font-mono text-indigo-400 font-semibold">{v.Codigo}</td>
                                    <td className="py-3 px-4 font-medium text-white">{v.Marca}</td>
                                    <td className="py-3 px-4">{ref || 'N/A'}</td>
                                    <td className="py-3 px-4">{v.Clase || 'N/A'}</td>
                                    <td className="py-3 px-4">{v.Cilindraje ? `${v.Cilindraje} cc` : 'N/A'}</td>
                                    <td className="py-3 px-4">{v.Combustible || 'N/A'}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => onSelectVehicle(v)}
                                            className="inline-flex items-center gap-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                                            title="Ver Histórico de Precios"
                                        >
                                            <LineChart className="w-3.5 h-3.5" />
                                            Histórico
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="bg-slate-900 px-4 py-2 text-xs text-slate-500 text-right">
                Mostrando {vehicles.length} registros
            </div>
        </div>
    );
};
