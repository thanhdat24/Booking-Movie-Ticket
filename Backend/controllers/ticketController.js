const Ticket = require('../models/ticketModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const ShowTime = require('../models/showtimeModel');
const moment = require('moment');
const nodemailer = require('nodemailer');
require('dotenv').config();
const _ = require('lodash');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_APP, // generated ethereal user
    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
  },
});

let newTicket = null;
let calculateTimeout = (dateShow) => {
  const fakeThoiLuong = 120;
  const timeInObj = new Date(dateShow);
  const timeOutObj = new Date(timeInObj.getTime() + fakeThoiLuong * 60 * 1000);
  return timeOutObj.toLocaleTimeString([], { hour12: false }).slice(0, 5);
};

exports.createTicket = catchAsync(async (req, res, next) => {
  const { idShowtime, seatCodes, discount } = req.body;
  const user = req.user;
  await ShowTime.findById(idShowtime)
    .populate('idMovie')
    .populate('idTheater')
    .then((showtime) => {
      if (!showtime)
        return Promise.reject({
          status: 404,
          message: 'Lịch chiếu không tồn tại!',
        });
      const availableSeatCodes = showtime.seatList
        .filter((seat) => !seat.isBooked)
        .map((seat) => seat.name);

      let invalidSeat = [];
      seatCodes.forEach((name) => {
        if (availableSeatCodes.indexOf(name) === -1) invalidSeat.push(name);
      });
      if (invalidSeat.length > 0)
        return Promise.reject({
          status: 400,
          message: 'Ghế đã được đặt!',
          notAvaiSeat: invalidSeat,
        });
      newTicket = new Ticket({
        idShowtime,
        userId: user,
        seatList: seatCodes.map((seat) => ({
          isBooked: true,
          name: seat,
        })),
        price: showtime.ticketPrice,
        totalPrice: (showtime.ticketPrice * seatCodes.length) - discount,
      });
      showtime.seatList = showtime.seatList.map((seat) => {
        if (seatCodes.indexOf(seat.name) > -1) {
          seat.isBooked = true;
        }
        return seat;
      });
      Promise.all([newTicket.save(), showtime.save()]);
      res.status(201).json({
        status: 'success',
        data: newTicket,
      });
      req.ticket = newTicket;
      req.showtime = showtime;

      // console.log('req.ticket', req.ticket);
      // console.log('req.showtime', req.showtime);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
  const amountTicket = req.body.seatCodes.length;
  const { id, totalPrice, createdAt, price } = req.ticket;
  const { dateShow, idTheaterCluster, idTheater, idMovie } =
    req.showtime;
  let formatDateTimeShow = new Date(dateShow)
    .toLocaleTimeString([], { hour12: false })
    .slice(0, 5);

  let formatDateShow = new Date(dateShow)
    .toLocaleDateString('en-GB')
    .slice(0, 10);
  let formatDateCreateAt = new Date(createdAt)
    .toLocaleDateString('en-GB')
    .slice(0, 10);

  let formatDateCreateAtTime = new Date(createdAt).toLocaleTimeString();

  await transporter.sendMail({
    from: `"Giao Dich Thanh Cong " <ltd.ctu@gmail.com>`, // sender address
    to: 'thanhledatomon@gmail.com', // list of receivers
    subject: 'EMAIL XÁC NHẬN ĐẶT VÉ THÀNH CÔNG', // Subject line
    // text: "Hello world?", // plain text body
    html: `   <div style="background-color: #ff7f00 ;text-align: center;padding: 10px; border-radius: 10px; width: 80%">
        <div style=" color: white; margin-bottom: 10px;">
              <h3>Chúc mừng bạn!</h3>
              <span>Việc mua vé online của bạn đã thành công. Star Movie xin chân thành cám ơn bạn đã chọn chúng tôi để
                  phục vụ nhu cầu giải trí của bạn. Bạn vui lòng xem thông tin đặt vé dưới đây</span>
          </div>

              <table style="background-color: #F3E9DD;width: 80%; margin: 0 auto;padding: 20px;text-align: left;">
                  <tbody>
                      <tr>
                          <td>Mã vé:</td>
                          <th >${id}</th>
                      </tr>
                      <tr>
                          <td>Tên phim:</td>
                          <th >

    ${idMovie.name}
                          </th>
                      </tr>
                      <tr>
                          <td>Rạp:</td>
                          <th >${idTheaterCluster.name}</th>
                      </tr>
                       <tr>
                          <td>Phòng chiếu:</td>
                          <th >${idTheater.name}</th>
                      </tr>
                      <tr>
                          <td>Suất chiếu: </td>
                          <th > ${formatDateShow}, ${formatDateTimeShow} ~ ${calculateTimeout(
      dateShow
    )}</th>
                      </tr>
                      <tr>
                          <td>Ghế:</td>
                          <th ><span>${req.body.seatCodes.join(
                            ', '
                          )}</span></th>
                      </tr>
                      <tr>
                          <td>Phương thức thanh toán:</td>
                          <th ><b>ZaloPay</b></th>
                      </tr>
                      <tr>
                          <td>Thời gian thanh toán:</td>
                          <th >${formatDateCreateAt}, ${formatDateCreateAtTime}</th>
                      </tr>
                        <tr>
                          <td>Giá:</td>
                          <th >${amountTicket} x ${price.toLocaleString(
      'vi-VI'
    )} vnđ</th>
                      </tr>

                           <tr style="border-collapse:collapse;">
                            <td style="padding:0;Margin:0;padding-bottom:10px">
                               <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px"> 
                     <tbody><tr style="border-collapse:collapse"> 
                      <td style="padding:0;Margin:0px;border-bottom:1px dotted #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
                     </tr> 
                   </tbody></table>
                            </td>
                               <td style="padding:0;Margin:0;padding-bottom:10px">
                               <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px"> 
                     <tbody><tr style="border-collapse:collapse"> 
                      <td style="padding:0;Margin:0px;border-bottom:1px dotted #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
                     </tr> 
                   </tbody></table>
                            </td>
                           </tr>
                        <tr>
                          <td><b>KHUYẾN MÃI</b></td>
                          <td>${(discount * 1).toLocaleString('vi-VI')} vnđ</td>
                      </tr>
                              <tr style="border-collapse:collapse;">
                            <td style="padding:0;Margin:0;padding-bottom:10px">
                               <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px"> 
                     <tbody><tr style="border-collapse:collapse"> 
                      <td style="padding:0;Margin:0px;border-bottom:1px dotted #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
                     </tr> 
                   </tbody></table>
                            </td>
                               <td style="padding:0;Margin:0;padding-bottom:10px">
                               <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px"> 
                     <tbody><tr style="border-collapse:collapse"> 
                      <td style="padding:0;Margin:0px;border-bottom:1px dotted #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
                     </tr> 
                   </tbody></table>
                            </td>
                           </tr>

                      <tr>
                          <td>Tổng Cộng:</td>
                          <th ><span style="font-size:24px">${totalPrice.toLocaleString(
                            'vi-VI'
                          )} vnđ</span></th>
                      </tr>
                  </tbody>

              </table>

  </div>
      </div>
                      `,
  });
});

exports.getTicketRevenue = catchAsync(async (req, res, next) => {
  let query = Ticket.find(req.query);
  const array = await query;

  let result = _(array)
    .groupBy((x) => x.idShowtime.idTheaterCluster.name)
    .map((value, key) => ({ name: key, ticketRevenue: value }))
    .value();

  try {
    res.status(200).json({
      status: 'success',
      data: result,
      result: result.length,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

exports.getMovieRevenue = catchAsync(async (req, res, next) => {
  let query = Ticket.find(req.query);
  const array = await query;

  let result = _(array)
    .groupBy((x) => x.idShowtime.idMovie.name)
    .map((value, key) => ({ name: key, ticketRevenue: value }))
    .value();

  try {
    res.status(200).json({
      status: 'success',
      data: result,
      result: result.length,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

exports.getRevenueByDay = catchAsync(async (req, res, next) => {
  let query = Ticket.find(req.query);
  const array = await query;

  let result = _(array)
    .groupBy((x) => moment(x.createdAt).format('MM-DD-YYYY'))
    .map((value, key) => ({ name: key, ticketRevenue: value }))
    .value();

  try {
    res.status(200).json({
      status: 'success',
      data: result,
      result: result.length,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
exports.getAllTicket = factory.getAll(Ticket, { path: 'showtimes' });
exports.getDetailTicket = factory.getOne(Ticket);
exports.updateTicket = factory.updateOne(Ticket);
exports.deleteTicket = factory.deleteOne(Ticket);
