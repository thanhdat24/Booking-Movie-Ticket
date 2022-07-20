import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCreateTicket } from "../../../redux/actions/BookTicket";
import formatDate, { calculateTimeout } from "../../../utils/formatDate";

export default function Paypal(props) {
  const {
    seatCodes,
    idShowtime,
    discount,
    danhSachPhongVe: { data },
  } = useSelector((state) => state.BookTicketReducer);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  if (error) {
    alert(error);
  }
  let itemBooking = {
    discount: (discount * 0.00004).toFixed(2),
    amountTicket: seatCodes.length,
    ticketPrice: (data.ticketPrice * 0.00004).toFixed(2),
    data,
  };
  const [successPayPal, setSuccessPayPal] = useState(false);
  useEffect(() => {
    if (successPayPal) {
      dispatch(postCreateTicket({ idShowtime, seatCodes, discount }));
    }
  }, [successPayPal]);
  localStorage.setItem("itemBooking", JSON.stringify(itemBooking));
  let item = JSON.parse(localStorage.getItem("itemBooking"));
  return (
    <PayPalScriptProvider>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                // reference_id: 1234,
                description: "Booking Ticket",
                amount: {
                  currency_code: "USD",

                  value: item.ticketPrice * item.amountTicket - item.discount,
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: item.ticketPrice * item.amountTicket,
                    },
                    // shipping: { currency_code: "USD", value: 1 },
                    // tax_total: { currency_code: "USD", value: "1.4" },
                    discount: { currency_code: "USD", value: item.discount },
                  },
                },
                items: [
                  {
                    name: `x Vé xem phim ${item.data.movieName} - ${
                      item.data.theaterClusterName
                    } - ${calculateTimeout(item.data.dateShow)} ${
                      formatDate(item.data.dateShow).dDMmYy
                    }`,
                    unit_amount: {
                      currency_code: "USD",
                      value: item.ticketPrice,
                    },
                    // tax: {
                    //   currency_code: "USD",
                    //   value: 0,
                    // },
                    quantity: item.amountTicket,
                    // sku: "OnePlus61",
                    // category: "PHYSICAL_GOODS",
                  },
                ],
                shipping: {
                  address: {
                    address_line_1:
                      "Khu II, Đ. 3/2, Xuân Khánh, Ninh Kiều",
                    address_line_2: "KTX Đại học cần thơ",
                    admin_area_2: "Cần Thơ",
                    admin_area_1: "Ô Môn",
                    postal_code: "94000",
                    country_code: "GB",
                  },
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            setSuccessPayPal(true);
          });
        }}
        onCancel={() => {}}
        onError={(err) => {
          setError(err);
          console.log("Paypal Checkout onError", err);
        }}
      />
    </PayPalScriptProvider>
  );
}
