import { useEffect, useState } from 'react';
import { Car } from 'lucide-react';
import { FilterBar } from './components/search/FilterBar';
import { VehicleTable } from './components/ui/VehicleTable';
import { PriceChart } from './components/charts/PriceChart';
import { ClassesChart } from './components/charts/ClassesChart';
import { TopBrandsChart } from './components/charts/TopBrandsChart';
import {
  fetchVehicles,
  fetchPriceHistory,
  fetchClassMetrics,
  fetchTopBrandMetrics
} from './api/vehicleService';

import type { Vehicle } from './types/vehicle';
import type { ClassMetric, TopBrandMetric, PriceHistoryMetric } from './types/metrics';

import logoPoli from './assets/logo-poli.png';

export function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [classMetrics, setClassMetrics] = useState<ClassMetric[]>([]);
  const [topBrands, setTopBrands] = useState<TopBrandMetric[]>([]);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryMetric[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Dashboard Fasecolda';
    loadMetricsData();
  }, []);

  const loadMetricsData = async () => {
    try {
      const [classesData, brandsData] = await Promise.all([
        fetchClassMetrics(),
        fetchTopBrandMetrics()
      ]);
      setClassMetrics(classesData);
      setTopBrands(brandsData);
    } catch (err) {
      console.error(err);
      setError('Error al cargar las métricas globales.');
    }
  };

  const handleSearch = async (brand: string, code: string) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const results = await fetchVehicles(brand, code || undefined);
      setVehicles(results);

      if (results.length === 1) {
        handleSelectVehicle(results[0]);
      } else {
        setSelectedVehicle(null);
        setPriceHistory([]);
      }
    } catch (err) {
      console.error(err);
      setError('Error al consultar los vehículos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVehicle = async (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    try {
      const history = await fetchPriceHistory(vehicle.Codigo, vehicle.Marca);
      setPriceHistory(history);
    } catch (err) {
      console.error('Error fetching price history:', err);
      setPriceHistory([]);
    }
  };

  const handleReset = () => {
    setVehicles([]);
    setSelectedVehicle(null);
    setPriceHistory([]);
    setHasSearched(false);
  };

  const getVehicleFullName = (v: Vehicle) => {
    const refs = [v.Referencia1, v.Referencia2, v.Referencia3].filter(Boolean).join(' ');
    return `${v.Marca} ${refs} (${v.Codigo})`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
              <Car className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Dashboard Vehículos Fasecolda
              </h1>
              <p className="text-sm font-medium text-indigo-400">
                Isaac Díaz Cardona
              </p>
            </div>
          </div>

          <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm flex items-center justify-center border border-slate-200">
            <img
              src={logoPoli}
              alt="Politécnico Grancolombiano"
              className="h-12 w-auto object-contain"
            />
          </div>
        </header>

        <FilterBar onSearch={handleSearch} onReset={handleReset} loading={loading} />

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-300 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {selectedVehicle && priceHistory.length > 0 && (
          <PriceChart
            data={priceHistory}
            vehicleName={getVehicleFullName(selectedVehicle)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ClassesChart data={classMetrics} />
          <TopBrandsChart data={topBrands} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-white">
              Listado de Vehículos
            </h2>
            {loading && <span className="text-xs text-indigo-400 animate-pulse">Cargando datos...</span>}
          </div>
          <VehicleTable
            vehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            selectedVehicleCode={selectedVehicle?.Codigo}
            hasSearched={hasSearched}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
