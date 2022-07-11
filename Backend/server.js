const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socket = require('socket.io');
// const session = require('express-session');
// const express = require('express');
// const passport = require('passport');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🧨 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const { getUserList, addUser, removeUser } = require('./utils/users');
const {
  addSeat,
  getDanhSachGheDangDat,
  removeSeat,
} = require('./utils/listSeatsBooked');

const http = require('http').createServer(app);
// const socket = require('socket.io')(http, {
//   cors: {
//     origin: 'http://localhost:3000',
//     Credential: true,
//   },
// });
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connection successful!');
  });

// lắng nghe event kết nối
const port = process.env.PORT || 8080;
const server = http.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});

// After you declare "app"

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 🧨 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    Credential: true,
  },
});

io.on('connection', (socket) => {
  console.log('USER CONNECTED');
  // nhan lai event tu client

  socket.on('user join booking from client to server', (showtimeId, user) => {
    socket.join(showtimeId);
    io.to(showtimeId).emit(
      'send danhSachGheDangDat from server to client',
      getDanhSachGheDangDat(showtimeId)
    );
    // chào
    // gửi cho client kêt nối vào
    // socket.emit(
    //   'send message from server to client',
    //   `Chào Mừng Bạn Đến Với Lịch Chiếu ${showtimeId}`
    // );

    // gửi cho các client còn lại
    // socket.broadcast
    //   .to(showtimeId)
    //   .emit(
    //     'send message from server to client',
    //     `${user.fullName} vừa mới tham gia`
    //   );

    // xử lí userList
    const newUser = {
      id: socket.id,
      fullName: user.fullName,
      showtimeId,
      avatar: user.photo,
    };

    addUser(newUser);
    io.to(showtimeId).emit(
      'send userList from server to client',
      getUserList(showtimeId)
    );

    socket.on(
      'send danhSachGheDangDat from client to server',
      (listSeatSelected, idShowtime, fullName) => {
        const newSeat = {
          fullName,
          idShowtime,
          danhSachGheDangDat: listSeatSelected,
          id: socket.id,
        };

        // xử lí ghế
        addSeat(newSeat);
        io.to(showtimeId).emit(
          'send danhSachGheDangDat from server to client',
          getDanhSachGheDangDat(showtimeId)
        );

        console.log('idShowtime', idShowtime);
        console.log('fullName', fullName);
      }
    );

    // nhận sự kiện đặt vé thành công của client gửi về
    // socket.on('send successBookingTicket client to server', (idShowtime) => {
    //   removeSeat(socket.id);
    //   io.to(showtimeId).emit(
    //     'send danhSachGheDangDat from server to client',
    //     getDanhSachGheDangDat(showtimeId)
    //   );
    //   io.to(showtimeId).emit(
    //     'send listSeat from server to client',
    //     idShowtime,
    //     io
    //       .to(showtimeId)
    //       .emit(
    //         'send danhSachGheDangDat from server to client',
    //         getDanhSachGheDangDat(showtimeId)
    //       )
    //   );
    // });

    // Chưa xử lí đc xử kiện successBookingTicket reset lại listSeat
    socket.on(
      'send successBookingTicket client to server',
      (idShowtime, successBookingTicket) => {
        if (successBookingTicket) {
          removeSeat(socket.id);
          io.to(showtimeId).emit(
            'send danhSachGheDangDat from server to client',
            getDanhSachGheDangDat(showtimeId)
          );
        }
      }
    );

    // Disconnect
    socket.on('disconnect', () => {
      removeSeat(socket.id);
      removeUser(socket.id);
      io.to(showtimeId).emit(
        'send userList from server to client',
        getUserList(showtimeId)
      );
      io.to(showtimeId).emit(
        'send danhSachGheDangDat from server to client',
        getDanhSachGheDangDat(showtimeId)
      );
      console.log('USER DISCONNECTED');
    });
  });
});
