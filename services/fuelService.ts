import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../firebase';
import { FuelEntry, FuelStatistics } from '../types/fuel';

const FUEL_COLLECTION = 'fuelEntries';

export class FuelService {
  // Add a new fuel entry
  static async addFuelEntry(entry: Omit<FuelEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      console.log('Adding fuel entry:', entry);
      const docData = {
        ...entry,
        date: Timestamp.fromDate(entry.date),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      console.log('Document data to save:', docData);
      
      const docRef = await addDoc(collection(db, FUEL_COLLECTION), docData);
      console.log('Document added with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding fuel entry:', error);
      throw error;
    }
  }

  // Get all fuel entries for a user
  static async getFuelEntries(userId: string): Promise<FuelEntry[]> {
    try {
      console.log('Fetching fuel entries for userId:', userId);
      
      // Try with orderBy first
      let q = query(
        collection(db, FUEL_COLLECTION),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      
      let querySnapshot;
      try {
        querySnapshot = await getDocs(q);
      } catch (orderByError) {
        console.log('OrderBy failed, trying without orderBy:', orderByError);
        // Fallback to query without orderBy
        q = query(
          collection(db, FUEL_COLLECTION),
          where('userId', '==', userId)
        );
        querySnapshot = await getDocs(q);
      }
      
      console.log('Query snapshot size:', querySnapshot.docs.length);
      
      const entries = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Raw document data:', data);
        return {
          id: doc.id,
          ...data,
          date: data.date.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as FuelEntry;
      });
      
      // Sort manually if orderBy failed
      entries.sort((a, b) => b.date.getTime() - a.date.getTime());
      
      console.log('Processed entries:', entries);
      return entries;
    } catch (error) {
      console.error('Error getting fuel entries:', error);
      throw error;
    }
  }

  // Update a fuel entry
  static async updateFuelEntry(entryId: string, updates: Partial<Omit<FuelEntry, 'id' | 'userId' | 'createdAt'>>): Promise<void> {
    try {
      const entryRef = doc(db, FUEL_COLLECTION, entryId);
      const updateData: any = {
        ...updates,
        updatedAt: Timestamp.now(),
      };
      
      if (updates.date) {
        updateData.date = Timestamp.fromDate(updates.date);
      }
      
      await updateDoc(entryRef, updateData);
    } catch (error) {
      console.error('Error updating fuel entry:', error);
      throw error;
    }
  }

  // Test function to verify document exists and can be read
  static async testDocumentAccess(entryId: string): Promise<void> {
    try {
      console.log('=== TESTING DOCUMENT ACCESS ===');
      const entryRef = doc(db, FUEL_COLLECTION, entryId);
      console.log('Testing read access for document:', entryRef.path);
      
      const docSnap = await getDoc(entryRef);
      console.log('Document exists:', docSnap.exists());
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Document data:', data);
        console.log('Document userId:', data.userId);
      } else {
        console.log('Document does not exist!');
      }
      console.log('=== DOCUMENT ACCESS TEST COMPLETE ===');
    } catch (error) {
      console.error('=== DOCUMENT ACCESS TEST FAILED ===');
      console.error('Error accessing document:', error);
      throw error;
    }
  }

  // Delete a fuel entry
  static async deleteFuelEntry(entryId: string): Promise<void> {
    try {
      console.log('=== DELETE ATTEMPT START ===');
      console.log('Attempting to delete fuel entry with ID:', entryId);
      console.log('Collection name:', FUEL_COLLECTION);
      console.log('Entry ID type:', typeof entryId);
      console.log('Entry ID length:', entryId?.length);
      
      if (!entryId || entryId.trim() === '') {
        throw new Error('Invalid entry ID provided');
      }
      
      // First, test if we can access the document
      await this.testDocumentAccess(entryId);
      
      const entryRef = doc(db, FUEL_COLLECTION, entryId);
      console.log('Document reference:', entryRef);
      console.log('Document path:', entryRef.path);
      console.log('Document ID:', entryRef.id);
      
      console.log('Calling deleteDoc...');
      await deleteDoc(entryRef);
      console.log('Successfully deleted fuel entry');
      console.log('=== DELETE ATTEMPT SUCCESS ===');
    } catch (error) {
      console.error('=== DELETE ATTEMPT FAILED ===');
      console.error('Error deleting fuel entry:', error);
      console.error('Error code:',  (error as any).code);
      console.error('Error message:',  (error as any).message);
      console.error('Error stack:',  (error as any).stack);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      throw error;
    }
  }

  // Get fuel statistics for a user
  static async getFuelStatistics(userId: string): Promise<FuelStatistics> {
    try {
      const entries = await this.getFuelEntries(userId);
      
      if (entries.length === 0) {
        return {
          totalFuelConsumed: 0,
          totalMoneySpent: 0,
          averagePricePerLiter: 0,
          totalEntries: 0,
          fuelTypeBreakdown: {
            petrol: { totalFuel: 0, totalCost: 0, entries: 0 },
            diesel: { totalFuel: 0, totalCost: 0, entries: 0 }
          }
        };
      }

      const totalFuelConsumed = entries.reduce((sum, entry) => sum + entry.quantity, 0);
      const totalMoneySpent = entries.reduce((sum, entry) => sum + entry.totalCost, 0);
      const averagePricePerLiter = totalMoneySpent / totalFuelConsumed;
      const lastEntryDate = entries[0]?.date;

      // Calculate fuel efficiency if odometer readings are available
      let averageFuelEfficiency: number | undefined;
      const entriesWithOdometer = entries.filter(entry => entry.odometerReading !== undefined);
      if (entriesWithOdometer.length > 1) {
        const sortedEntries = entriesWithOdometer.sort((a, b) => a.date.getTime() - b.date.getTime());
        let totalDistance = 0;
        let totalFuel = 0;
        
        for (let i = 1; i < sortedEntries.length; i++) {
          const distance = sortedEntries[i].odometerReading! - sortedEntries[i-1].odometerReading!;
          if (distance > 0) {
            totalDistance += distance;
            totalFuel += sortedEntries[i].quantity;
          }
        }
        
        if (totalFuel > 0) {
          averageFuelEfficiency = totalDistance / totalFuel;
        }
      }

      // Calculate fuel type breakdown
      const fuelTypeBreakdown = {
        petrol: { totalFuel: 0, totalCost: 0, entries: 0 },
        diesel: { totalFuel: 0, totalCost: 0, entries: 0 }
      };

      entries.forEach(entry => {
        const type = entry.fuelType;
        fuelTypeBreakdown[type].totalFuel += entry.quantity;
        fuelTypeBreakdown[type].totalCost += entry.totalCost;
        fuelTypeBreakdown[type].entries += 1;
      });

      return {
        totalFuelConsumed,
        totalMoneySpent,
        averagePricePerLiter,
        averageFuelEfficiency,
        totalEntries: entries.length,
        lastEntryDate,
        fuelTypeBreakdown
      };
    } catch (error) {
      console.error('Error getting fuel statistics:', error);
      throw error;
    }
  }

  // Get fuel entries by date range
  static async getFuelEntriesByDateRange(
    userId: string, 
    startDate: Date, 
    endDate: Date
  ): Promise<FuelEntry[]> {
    try {
      const q = query(
        collection(db, FUEL_COLLECTION),
        where('userId', '==', userId),
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate)),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as FuelEntry;
      });
    } catch (error) {
      console.error('Error getting fuel entries by date range:', error);
      throw error;
    }
  }
}
