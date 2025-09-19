export interface FuelEntry {
  id: string;
  userId: string;
  fuelType: 'petrol' | 'diesel';
  date: Date;
  quantity: number; // in liters
  pricePerUnit: number; // price per liter
  totalCost: number;
  odometerReading?: number; // optional odometer reading
  location?: string; // optional location
  notes?: string; // optional notes
  createdAt: Date;
  updatedAt: Date;
}

export interface FuelStatistics {
  totalFuelConsumed: number;
  totalMoneySpent: number;
  averagePricePerLiter: number;
  averageFuelEfficiency?: number; // km/liter if odometer readings available
  totalEntries: number;
  lastEntryDate?: Date;
  fuelTypeBreakdown: {
    petrol: {
      totalFuel: number;
      totalCost: number;
      entries: number;
    };
    diesel: {
      totalFuel: number;
      totalCost: number;
      entries: number;
    };
  };
}

export interface FuelFormData {
  fuelType: 'petrol' | 'diesel';
  date: string;
  quantity: string;
  pricePerUnit: string;
  odometerReading: string;
  location: string;
  notes: string;
}
