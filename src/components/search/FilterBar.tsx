import React, { useEffect, useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { fetchBrands } from '../../api/vehicleService';

interface FilterBarProps {
    onSearch: (brand: string, code: string) => void;
    onReset: () => void;
    loading: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onSearch, onReset, loading }) => {
    const [brands, setBrands] = useState<string[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [loadingBrands, setLoadingBrands] = useState<boolean>(true);

    useEffect(() => {
        const loadBrands = async () => {
            try {
                const data = await fetchBrands();
                setBrands(data);
            } catch (error) {
                console.error('Error loading brands:', error);
            } finally {
                setLoadingBrands(false);
            }
        };
        loadBrands();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBrand) return;
        onSearch(selectedBrand, code);
    };

    const handleReset = () => {
        setSelectedBrand('');
        setCode('');
        onReset();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-800 p-4 rounded-xl shadow-md border border-slate-700 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                        Marca <span className="text-red-400">*</span>
                    </label>
                    <select
                        value={selectedBrand}
                        onChange={(e) => {
                            setSelectedBrand(e.target.value);
                            if (!e.target.value) setCode('');
                        }}
                        disabled={loadingBrands || loading}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                    >
                        <option value="">-- Selecciona una marca --</option>
                        {brands.map((b) => (
                            <option key={b} value={b}>
                                {b}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                        Código Fasecolda (Opcional)
                    </label>
                    <input
                        type="text"
                        placeholder={selectedBrand ? "Ej. 0101001" : "Selecciona una marca primero"}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={!selectedBrand || loading}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={!selectedBrand || loading}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Search className="w-4 h-4" />
                        {loading ? 'Buscando...' : 'Buscar'}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={loading}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-2 rounded-lg transition disabled:opacity-50"
                        title="Limpiar Filtros"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </form>
    );
};
