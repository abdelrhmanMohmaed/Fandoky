import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format, differenceInDays } from "date-fns";

const BookingModal = ({ place, onBook }) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [guests, setGuests] = useState(1);

  const nights = differenceInDays(range[0].endDate, range[0].startDate);
  const totalPrice = place.price * guests * (nights > 0 ? nights : 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkIn = format(range[0].startDate, "yyyy-MM-dd");
    const checkOut = format(range[0].endDate, "yyyy-MM-dd");
    const bookingData = { placeId: place.id, guests, checkIn, checkOut };
    console.log("Booking submitted:", bookingData);
    if (onBook) {
      onBook(bookingData);
    }
  };

  return (
    <div className="my-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-white font-semibold py-2 rounded-md
        bg-gradient-to-r from-brandPrimary to-brandSecondary transition-colors duration-300 ease-in-out hover:from-brandSecondary hover:to-brandPrimary"
      >
        {open ? "Hide Booking Form" : "Reserve"}
      </button>

      {open && (
        <div
          className="
            mt-4
            sticky
            top-0
            p-6
            rounded-lg
            shadow-md
            border border-brandPrimary/30
            bg-gradient-to-br from-brandPrimary to-brandSecondary
            text-white
          "
        >
          <h3 className="text-2xl font-bold text-center mb-4">Reserve Now</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Range Picker */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Date Range
              </label>
              <DateRange
                ranges={range}
                onChange={(item) => setRange([item.selection])}
                minDate={new Date()}
                rangeColors={["#4D869C"]} // brandPrimary
                direction="horizontal"
                showMonthAndYearPickers={true}
              />
            </div>

            {/* Guests Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Guests
              </label>
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                className="w-full p-2 rounded-md border border-gray-300 bg-white text-brandPrimary focus:ring-2 focus:ring-brandPrimary"
                required
              />
            </div>

            {/* Total Price */}
            <div>
              <p className="text-lg font-semibold">
                {nights > 0
                  ? `Total Price: ${totalPrice.toLocaleString()} EGP`
                  : "Please select valid dates"}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white font-semibold py-2 rounded-md 
              bg-gradient-to-r from-brandSecondary to-brandPrimary transition-colors duration-300 ease-in-out hover:from-brandPrimary hover:to-brandSecondary"
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingModal;
