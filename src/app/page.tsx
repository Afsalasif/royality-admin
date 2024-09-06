"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Adjust the import path based on your firebase.ts file location
import {
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

export default function Home() {
  // Example trip details data
  const router = useRouter()
  const tripDetails = [
    {
      id: 1,
      destination: "Paris",
      date: "2024-09-15",
      duration: "7 days",
      price: "$1,200",
    },
    {
      id: 2,
      destination: "Tokyo",
      date: "2024-10-10",
      duration: "10 days",
      price: "$2,500",
    },
    {
      id: 3,
      destination: "New York",
      date: "2024-11-05",
      duration: "5 days",
      price: "$1,000",
    },
  ];
  const [trips, setTrips] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data from Firestore collection
    const fetchTrips = async () => {
      try {
        const tripsCollection = collection(db, "bookings"); // Reference to the 'trips' collection
        const tripSnapshot = await getDocs(tripsCollection); // Fetch all documents in the collection
        const tripList = tripSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(tripList);
        setTrips(tripList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trip data: ", error);
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);
  const handleClick =(id:any)=>{
    router.push(`/view?bookingId=${id}`);
   console.log(id)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Table Card */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-700">Trip Details</h2>
          </div>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TYPE
                </th>
                <th className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PICKUP
                </th>
                <th className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DROP
                </th>
                <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DATE
                </th>
                <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CAB TYPE
                </th>
                <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="w-2/12 px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trips.map((trip: any) => (
                <tr key={trip.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {trip.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trip.bookingDetails?.tripType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trip.bookingDetails?.tripStartingDestination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trip.bookingDetails?.tripEndingDestination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trip.bookingDetails?.tripPickupdate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trip.bookingDetails?.vehicleType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {trip.bookingDetails?.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleClick(trip.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      view
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
