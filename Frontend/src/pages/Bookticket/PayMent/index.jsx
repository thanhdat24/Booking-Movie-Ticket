import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import formatDate from "../../../utils/formatDate";
import useStyles from "./style";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { postCreateTicket } from "../../../redux/actions/BookTicket";
import { SET_READY_PAYMENT } from "../../../redux/constants/BookTicket";
import { blue } from "@mui/material/colors";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { updateActiveDiscount } from "../../../redux/actions/Discount";

const makeObjError = (name, value, dataSubmit) => {
  // kiểm tra và set lỗi rỗng
  let newErrors = {
    ...dataSubmit.errors,
    [name]:
      value?.trim() === ""
        ? `${name.charAt(0).toUpperCase() + name.slice(1)} không được bỏ trống`
        : "",
  };

  //   // kiểm tra và set lỗi sai định dạng
  //eslint-disable-next-line
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //eslint-disable-next-line
  const regexNumber =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
  if (name === "email" && value) {
    if (!regexEmail.test(value)) {
      newErrors[name] = "Email không đúng định dạng";
    }
  }
  if (name === "phone" && value) {
    if (!regexNumber.test(value)) {
      newErrors[name] = "Phone không đúng định dạng";
    }
  }
  return newErrors;
};

export default function PayMent() {
  const {
    listSeat,
    amount,
    email,
    phone,
    paymentMethod,
    isReadyPayment,
    discount,
    seatCodes,
    danhSachPhongVe: { data },
    idShowtime,
    miniPrice,
    isSelectedSeat,
    listSeatSelected,
  } = useSelector((state) => state.BookTicketReducer);
  const {
    discountList: { data: discountList },
  } = useSelector((state) => state.DiscountReducer);
  console.log("discountList", discountList);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const emailRef = useRef();
  const phoneRef = useRef(); // dùng useRef để dom tớ element
  let variClear = useRef(""); // dùng useRef để lưu lại giá trị setTimeout
  const [dataFocus, setDataFocus] = useState({ phone: false, email: false });
  const [dataSubmit, setdataSubmit] = useState({
    values: {
      email: email,
      phone: phone,
      paymentMethod: paymentMethod,
      discount: discount,
      miniPrice: miniPrice,
    },
    errors: {
      email: "",
      phone: "",
    },
  });
  const classes = useStyles({
    isSelectedSeat,
    isReadyPayment,
    dataFocus,
    dataSubmit,
    paymentMethod,
    discount,
    miniPrice,
  });

  const onChange = (e) => {
    // khi onchange update values và validation
    let { name, value } = e.target;
    console.log("e.target.name", e.target.name);

    let newValues = { ...dataSubmit.values, [name]: value };
    let newErrors = makeObjError(name, value, dataSubmit);
    setdataSubmit((dataSubmit) => ({
      ...dataSubmit,
      values: newValues,
      errors: newErrors,
    }));
    console.log("dataSubmit", dataSubmit);
  };

  useEffect(() => {
    // sau 0.5s mới đẩy data lên redux để tăng hiệu năng
    clearTimeout(variClear);
    variClear.current = setTimeout(() => {
      dispatch({
        type: "SET_DATA_PAYMENT",
        payload: {
          email: dataSubmit.values.email,
          phone: dataSubmit.values.phone,
          paymentMethod: dataSubmit.values.paymentMethod,
          discount: dataSubmit.values.discount,
          miniPrice: dataSubmit.values.miniPrice,
        },
      });
      // khi không có lỗi và đủ dữ liệu thì set data sẵn sàng đặt vé và ngược lại, set activeStep = 1 nếu đủ dữ liệu và chưa đặt vé
      if (
        !dataSubmit.errors.email &&
        !dataSubmit.errors.phone &&
        dataSubmit.values.email &&
        dataSubmit.values.phone &&
        dataSubmit.values.paymentMethod &&
        isSelectedSeat
      ) {
        dispatch({
          type: SET_READY_PAYMENT,
          payload: { isReadyPayment: true },
        });
      } else {
        dispatch({
          type: SET_READY_PAYMENT,
          payload: { isReadyPayment: false },
        });
      }
    }, 500);
    return () => clearTimeout(variClear.current);
  }, [dataSubmit, isSelectedSeat]);

  useEffect(() => {
    // cập nhật lại data email, phone và validation khi reload
    let emailErrors = makeObjError(emailRef.current.name, email, dataSubmit);
    let phoneErrors = makeObjError(phoneRef.current.name, phone, dataSubmit);

    if (amount === 0) {
      setdataSubmit((dataSubmit) => ({
        ...dataSubmit,
        values: {
          email: email,
          phone: phone,
          paymentMethod: paymentMethod,
          discount: 0,
          miniPrice: 0,
        },
        errors: { email: emailErrors.email, phone: phoneErrors.phone },
      }));
    } else {
      setdataSubmit((dataSubmit) => ({
        ...dataSubmit,
        values: {
          email: email,
          phone: phone,
          paymentMethod: paymentMethod,
          discount: discount,
          miniPrice: miniPrice,
        },
        errors: { email: emailErrors.email, phone: phoneErrors.phone },
      }));
    }
  }, [listSeat]); // khi reload listSeat sẽ được cập nhật kèm theo, email, phone mặc định của tài khoản
  const handleBookTicket = () => {
    dispatch(postCreateTicket({ idShowtime, seatCodes, discount }));
  };
  const handleDiscount = (item) => {
    let { id, price, miniPrice } = item;
    console.log("item", item);
    const discountListUpdate = discountList.find((item) => item._id === id);
    let dat = discountListUpdate;
    if (discountListUpdate) {
      discountListUpdate.active = !discountListUpdate.active;
    }
    console.log("discountListUpdate", discountListUpdate);
    dispatch(updateActiveDiscount(discountListUpdate, id));
    if (discountListUpdate.active) {
      if (amount >= miniPrice) {
        let newValues = {
          ...dataSubmit.values,
          discount: price,
          miniPrice: miniPrice,
        };
        let newErrors = makeObjError(discount, price, dataSubmit);
        setdataSubmit((dataSubmit) => ({
          ...dataSubmit,
          values: newValues,
          errors: newErrors,
        }));
        console.log("dataSubmit", dataSubmit);
      }
    } else {
      let newValues = {
        ...dataSubmit.values,
        discount: 0,
        miniPrice: 0,
      };
      let newErrors = makeObjError(discount, price, dataSubmit);
      setdataSubmit((dataSubmit) => ({
        ...dataSubmit,
        values: newValues,
        errors: newErrors,
      }));
    }
  };
  const onFocus = (e) => {
    setDataFocus({ ...dataFocus, [e.target.name]: true });
  };
  const onBlur = (e) => {
    setDataFocus({ ...dataFocus, [e.target.name]: false });
  };
  const calculateTimeout = (dateShow) => {
    const fakeThoiLuong = 120;
    const timeInObj = new Date(dateShow);
    const timeOutObj = new Date(
      timeInObj.getTime() + fakeThoiLuong * 60 * 1000
    );

    return timeOutObj.toLocaleTimeString([], { hour12: false }).slice(0, 5);
  };

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const ButtonDiscount = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    borderColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
      borderColor: blue[500],
    },
  }));
  return (
    <aside className={classes.payMent}>
      <div>
        {/* tổng tiền */}
        <p className={`${classes.amount} ${classes.payMentItem}`}>
          {amount > dataSubmit.values.miniPrice
            ? `${(amount - dataSubmit.values.discount).toLocaleString(
                "vi-VI"
              )} đ`
            : `${amount.toLocaleString("vi-VI")} đ`}
          {/* {`${(amount - dataSubmit.values.discount).toLocaleString("vi-VI")} đ`} */}
        </p>

        {/* thông tin phim và rạp */}

        <div className={classes.payMentItem}>
          <p className={classes.tenPhim}>{data?.movieName}</p>
          <p>{data?.theaterClusterName}</p>
          <p>{`${data?.movieId && formatDate(data?.dateShow).dayToday} ${
            formatDate(data?.dateShow).dDMmYy
          } - ${calculateTimeout(data?.dateShow)} - ${data?.theaterName}`}</p>
        </div>

        {/* ghế đã chọn */}
        <div className={`${classes.seatInfo} ${classes.payMentItem}`}>
          <span>{`Ghế ${listSeatSelected?.join(", ")}`}</span>
          <p className={classes.amountLittle}>
            {`${amount.toLocaleString("vi-VI")} đ`}
          </p>
        </div>

        {/* email */}
        <div className={classes.payMentItem}>
          <label className={classes.labelEmail}>E-Mail</label>
          <input
            type="text"
            name="email"
            ref={emailRef}
            onFocus={onFocus}
            onBlur={onBlur}
            value={dataSubmit.values.email}
            className={classes.fillInEmail}
            onChange={onChange}
            autoComplete="off"
          />
          <p className={classes.error}>{dataSubmit.errors.email}</p>
        </div>

        {/* phone */}
        <div className={classes.payMentItem}>
          <label className={classes.labelPhone}>Phone</label>
          <input
            type="number"
            name="phone"
            ref={phoneRef}
            onFocus={onFocus}
            onBlur={onBlur}
            value={dataSubmit.values.phone}
            className={classes.fillInPhone}
            onChange={onChange}
            autoComplete="off"
          />
          <p className={classes.error}>{dataSubmit.errors.phone}</p>
        </div>

        {/* Mã giảm giá */}
        {/* <div className={classes.payMentItem}>
          <label className={classes.label}>Mã giảm giá</label>
          <input
            type="text"
            value="Tạm thời không hỗ trợ..."
            readOnly
            className={classes.fillIn}
          />
          <button className={classes.btnDiscount} disabled>
            Áp dụng
          </button>
        </div> */}

        {/* Mã giảm giá test Voucher*/}

        <div className={classes.payMentItem}>
          <label className={classes.label}>Mã giảm giá</label>
          <div id="platform_coupon"></div>
          <div
            className="flex align-center cursor-pointer leading-6 mt-3"
            style={{ color: "rgb(11, 116, 229)" }}
            onClick={handleClickOpen}
          >
            <img
              className="mr-2"
              src="../img/discount/discount.svg"
              alt="logo_discount"
            />
            <span>Chọn hoặc nhập Khuyến mãi khác</span>
          </div>
        </div>

        {/* hình thức thanh toán */}
        <div className={classes.selectedPayMentMethod}>
          <label className={classes.label}>Hình thức thanh toán</label>
          <p className={classes.toggleNotice}>
            Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp.
          </p>

          <div className={classes.formPayment}>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="ZaloPay"
                onChange={onChange}
                checked={dataSubmit.values.paymentMethod === "ZaloPay"}
              />
              <img
                className={classes.img}
                src="/img/bookticket/zalo.jpg"
                alt="zalopay"
              />
              <label>Thanh toán qua ZaloPay</label>
            </div>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="Visa, Master, JCB"
                onChange={onChange}
                checked={
                  dataSubmit.values.paymentMethod === "Visa, Master, JCB"
                }
              />
              <img
                className={classes.img}
                src="/img/bookticket/visa.png"
                alt="visa"
              />
              <label>Visa, Master, JCB</label>
            </div>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="ATM nội địa"
                onChange={onChange}
                checked={dataSubmit.values.paymentMethod === "ATM nội địa"}
              />
              <img
                className={classes.img}
                src="/img/bookticket/atm.png"
                alt="atm"
              />
              <label>Thẻ ATM nội địa</label>
            </div>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="Cửa hàng tiện ích"
                onChange={onChange}
                checked={
                  dataSubmit.values.paymentMethod === "Cửa hàng tiện ích"
                }
              />
              <img
                className={classes.img}
                src="/img/bookticket/cuahang.png"
                alt="cuahang"
              />
              <label>Thanh toán tại cửa hàng tiện ích</label>
            </div>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="PayPal"
                onChange={onChange}
                checked={dataSubmit.values.paymentMethod === "PayPal"}
              />
              <img
                className={classes.img}
                src="/img/bookticket/paypal.jpg"
                alt="cuahang"
              />
              <label>Thanh toán qua PayPal</label>
            </div>
          </div>
        </div>

        <div className={classes.bottomSection}>
          <button
            className={classes.btnDatVe}
            disabled={!isReadyPayment}
            onClick={handleBookTicket}
          >
            <p className={classes.txtDatVe}>Đặt Vé</p>
          </button>
        </div>
      </div>

      {/* notice */}
      <div className={classes.notice}>
        <img
          className={classes.imgNotice}
          src="/img/bookticket/exclamation.png"
          alt="notice"
        />
        <span>Vé đã mua không thể đổi hoặc hoàn tiền</span>
        <p>
          Mã vé sẽ được gửi qua tin nhắn{" "}
          <span className={classes.contactColor}>ZMS</span> (tin nhắn Zalo) và{" "}
          <span className={classes.contactColor}>Email</span> đã nhập.
        </p>
      </div>

      <Dialog onClose={handleClose} open={open} maxWidth="md">
        <BootstrapDialogTitle onClose={handleClose}>
          Khuyến Mãi
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Mã Giảm Giá</Typography>
          {discountList?.map((item, index) =>
            amount >= item.miniPrice ? (
              <div
                className="grid  gap-4 truncate py-1 px-2 max-h-80"
                key={index}
              >
                <div className="relative">
                  <div className="relative w-full z-10 flex">
                    <div className="relative opacity-100 h-36">
                      {!item.active ? (
                        <img
                          className="w-full h-36"
                          src="../img/discount/ticket_box.svg"
                          alt=""
                          style={{
                            filter:
                              "drop-shadow(rgba(0, 0, 0, 0.15) 0px 1px 3px)",
                          }}
                        />
                      ) : (
                        <img
                          className="w-full h-36"
                          src="../img/discount/ticket_box_active.svg"
                          alt=""
                          style={{
                            filter:
                              "drop-shadow(rgba(0, 0, 0, 0.15) 0px 1px 3px)",
                          }}
                        />
                      )}

                      <div className="flex absolute top-0 left-0 w-full h-full">
                        <div className="flex flex-col items-center w-52 h-32 p-2 self-center justify-center">
                          <div className="relative w-14 h-14">
                            <div
                              className="w-full relative"
                            >
                              <img
                                src="../img/discount/vourcher.png"
                                alt=""
                                className="object-contain rounded-lg"
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              margin: "4px 4px 0px",
                              textAlign: "center",
                              fontSize: "13px",
                            }}
                          >
                            <p>{item.titte}</p>
                          </div>
                        </div>
                        <div className="flex flex-col p-3 w-full">
                          <button className="absolute top-3 right-3 translate-x-2 -translate-y-2 p-2 block bg-transparent">
                            <img
                              className="m-w-full"
                              src="../img/discount/info_active.svg"
                              alt=""
                            />
                          </button>
                          <div className="pr-7">
                            <h4 className="text-lg font-medium leading-6 m-0 p-0 text-gray-900 max-h-6">
                              Giảm {item?.price / 1000}K
                            </h4>
                            <p className="text-sm font-normal leading-5 m-0 p-0 text-gray-500 max-h-5">
                              Cho đơn hàng từ {item.miniPrice / 1000}K
                            </p>
                          </div>
                          <div className="flex items-end mt-auto">
                            <p className="pr-7 text-sm font-normal leading-5 m-0 p-0 text-gray-500 max-h-5">
                              HSD: {item?.expiryDate}
                            </p>
                            {!item.active ? (
                              <ButtonDiscount
                                className="ml-auto"
                                onClick={(e) => handleDiscount(item)}
                                variant="outlined"
                                // color="primary"
                              >
                                Áp Dụng
                              </ButtonDiscount>
                            ) : (
                              <ButtonDiscount
                                className="ml-auto"
                                variant="outlined"
                                onClick={(e) => handleDiscount(item)}
                              >
                                Bỏ Chọn
                              </ButtonDiscount>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="grid  gap-4 truncate py-1 px-2 max-h-80"
                key={index}
              >
                <div className="relative">
                  <div className="relative w-full z-10 flex">
                    <div className="relative opacity-100 h-36">
                      <img
                        className="w-full h-36"
                        src="../img/discount/ticket_box.svg"
                        alt=""
                        style={{
                          filter:
                            "drop-shadow(rgba(0, 0, 0, 0.15) 0px 1px 3px)",
                        }}
                      />
                      <div className="flex absolute top-0 left-0 w-full h-full">
                        <img
                          className="absolute h-16 w-20 bottom-1 right-1 max-w-full"
                          src="../img/discount/not_eligible_stamp.svg"
                          alt=""
                        />
                        <div className="flex flex-col items-center w-52 h-32 p-2 self-center justify-center">
                          <div className="relative w-14 h-14">
                            <div
                              className="w-full relative"
                              style={{ paddingBottom: "calc(100%)" }}
                            >
                              <img
                                src="../img/discount/vourcher.png"
                                alt=""
                                className="object-contain rounded-lg"
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              margin: "4px 4px 0px",
                              textAlign: "center",
                              fontSize: "13px",
                            }}
                          >
                            <p>{item.title}</p>
                          </div>
                        </div>
                        <div className="flex flex-col p-3 w-full">
                          <button className="absolute top-3 right-3 translate-x-2 -translate-y-2 p-2 block bg-transparent">
                            <img
                              className="m-w-full"
                              src="../img/discount/info.svg"
                              alt=""
                            />
                          </button>
                          <div className="pr-7 ">
                            <h4 className="text-lg font-medium leading-6 m-0 p-0 text-gray-900 max-h-6">
                              Giảm {item?.price / 1000}K
                            </h4>
                            <p className="text-sm font-normal leading-5 m-0 p-0 text-gray-500 max-h-5">
                              Cho đơn hàng từ {item.miniPrice / 1000}K
                            </p>
                          </div>
                          <div className="flex items-end mt-auto">
                            <p className="pr-7 text-sm font-normal leading-5 m-0 p-0 text-gray-500 max-h-5">
                              HSD: {item?.expiryDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </aside>
  );
}
