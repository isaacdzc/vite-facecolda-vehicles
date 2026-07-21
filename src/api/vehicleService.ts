import { API_BASE_URL } from '../config/env';
import type { Vehicle } from '../types/vehicle';
import type { ClassMetric, TopBrandMetric, PriceHistoryMetric } from '../types/metrics';

export const fetchBrands = async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/brands`);
    if (!response.ok) throw new Error('Error fetching brands list');
    return response.json();
};

export const fetchVehicles = async (brand?: string, code?: string): Promise<Vehicle[]> => {
    const params = new URLSearchParams();
    if (brand) params.append('brand', brand);
    if (code) params.append('code', code);

    const url = `${API_BASE_URL}/vehicles${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching vehicles');
    return response.json();
};

export const fetchPriceHistory = async (code: string, brand: string): Promise<PriceHistoryMetric[]> => {
    const response = await fetch(
        `${API_BASE_URL}/metrics/price-history?code=${encodeURIComponent(code)}&brand=${encodeURIComponent(brand)}`
    );
    if (!response.ok) throw new Error('Error fetching price history');
    return response.json();
};

export const fetchClassMetrics = async (): Promise<ClassMetric[]> => {
    const response = await fetch(`${API_BASE_URL}/metrics/classes`);
    if (!response.ok) throw new Error('Error fetching class metrics');
    return response.json();
};

export const fetchTopBrandMetrics = async (): Promise<TopBrandMetric[]> => {
    const response = await fetch(`${API_BASE_URL}/metrics/top-brands`);
    if (!response.ok) throw new Error('Error fetching top brand metrics');
    return response.json();
};
