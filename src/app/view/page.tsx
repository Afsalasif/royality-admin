"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "../../../firebase";

type Props = {
  searchParams: SearchParams;
};

type SearchParams = {
  bookingId: string;
};

function Page({ searchParams }: Props) {
  const [bookingData, setBookingData] = useState<any>(null);
  const bid = searchParams.bookingId;

  useEffect(() => {
    console.log("object here");
    console.log(searchParams);
    const bookingId = "RP00023";
    console.log(bid, "here im booking");
    if (!bid) {
      return;
    }

    const fetchBookingData = async () => {
      try {
        const docRef = doc(db, "bookings", bid);
        const docSnap = await getDoc(docRef);
        console.log("here im reached");

        if (docSnap.exists()) {
          setBookingData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookingData();
    console.log(bookingData);
  }, [searchParams.bookingId]);
  console.log(bookingData);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className=" flex bg-white shadow-lg rounded-lg p-6  w-full">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">
            Booking Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DetailItem
              label="Amount"
              value={`₹${bookingData?.bookingDetails.amount}`}
            />
            <DetailItem
              label="Base Fare"
              value={`₹${bookingData?.bookingDetails.baseFare}`}
            />
            <DetailItem
              label="Booking Date"
              value={new Date(
                bookingData?.bookingDetails.bookingDate
              ).toLocaleString()}
            />

            <DetailItem
              label="Taxes"
              value={`₹${bookingData?.bookingDetails.taxes}`}
            />

            <DetailItem
              label="Trip Distance"
              value={`${bookingData?.bookingDetails.tripDistance} ${bookingData?.bookingDetails.tripDistanceUnit}`}
            />

            <DetailItem
              label="Trip Ending Destination"
              value={bookingData?.bookingDetails.tripEndingDestination}
            />
            <DetailItem
              label="Trip Pickup Date"
              value={bookingData?.bookingDetails.tripPickupdate}
            />

            <DetailItem
              label="Trip Starting Destination"
              value={bookingData?.bookingDetails.tripStartingDestination}
            />
            <DetailItem
              label="Trip Total Fare"
              value={`₹${bookingData?.bookingDetails.tripTotalFare}`}
            />
            <DetailItem
              label="Trip Type"
              value={bookingData?.bookingDetails.tripType}
            />
            <DetailItem
              label="Vehicle Base Rate"
              value={`₹${bookingData?.bookingDetails.vehicleBaseRate}`}
            />
            <DetailItem
              label="Vehicle Capacity"
              value={bookingData?.bookingDetails.vehicleCapacity.toString()}
            />
            <DetailItem
              label="Vehicle ID"
              value={bookingData?.bookingDetails.vehicleId.toString()}
            />
            <DetailItem
              label="Vehicle Name"
              value={bookingData?.bookingDetails.vehicleName}
            />
            <DetailItem
              label="Vehicle Type"
              value={bookingData?.bookingDetails.vehicleType}
            />
            <DetailItem
              label="Vehicle Per KM"
              value={`₹${bookingData?.bookingDetails.vehicleperKM}`}
            />
            <DetailItem
              label="Vehicle Per Hour"
              value={`₹${bookingData?.bookingDetails.vehicleperHour}`}
            />
          </div>
        </div>
        <div className="flex flex-col ml-6">
          <h2 className="text-3xl font-bold mt-10 mb-6 text-blue-600">
            Customer Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DetailItem label="Drop" value={bookingData?.values.drop} />
            <DetailItem label="Email" value={bookingData?.values.email} />
            <DetailItem
              label="GST"
              value={bookingData?.values.gst ? "Applied" : "Not Applied"}
            />
            <DetailItem
              label="GST Address"
              value={bookingData?.values.gstAddress || "N/A"}
            />
            <DetailItem
              label="GST Number"
              value={bookingData?.values.gstNumber || "N/A"}
            />
            <DetailItem label="Mobile" value={bookingData?.values.mobile} />
            <DetailItem label="Name" value={bookingData?.values.name} />
            <DetailItem label="Pickup" value={bookingData?.values.pickup} />
            <DetailItem
              label="Special Instructions"
              value={bookingData?.values.specialInstructions}
            />
            <DetailItem
              label="Terms"
              value={bookingData?.values.terms ? "Accepted" : "Not Accepted"}
            />
            <DetailItem label="Time" value={bookingData?.values.time} />
            <DetailItem label="Trip" value={bookingData?.values.trip} />
            <DetailItem label="Type" value={bookingData?.values.type} />
          </div>
        </div>
      </div>
    </div>
  );
}
const DetailItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between border-b border-gray-200 pb-2">
    <span className="font-medium text-gray-700">{label}:</span>
    <span className="text-gray-900">{value}</span>
  </div>
);
export default Page;
