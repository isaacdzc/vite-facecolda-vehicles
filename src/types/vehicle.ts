export interface Vehicle {
    Codigo: string;
    Marca: string;
    Referencia1?: string;
    Referencia2?: string;
    Referencia3?: string;
    Clase?: string;
    Servicio?: string;
    Nacionalidad?: string;
    Combustible?: string;
    Cilindraje?: number | string;
    Potencia?: number | string;
    CapacidadPasajeros?: number | string;
    CapacidadCarga?: number | string;
    Peso?: number | string;
    Puertas?: number | string;
    Transmision?: string;
    TipoCaja?: string;
    AireAcondicionado?: string | boolean;
    [key: string]: unknown;
}