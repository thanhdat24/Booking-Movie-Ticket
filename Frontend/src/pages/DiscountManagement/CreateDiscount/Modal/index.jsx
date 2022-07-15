import React from "react";

export default function Modal() {
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md">
      <ModalDialog onClose={handleClose}>Khuyến Mãi</ModalDialog>
      <div
        className="p-3 my-0 mx-8 flex mb-3 rounded"
        style={{ background: " rgb(242, 242, 242)" }}
      >
        <div
          style={{
            width: "calc(100% - 97px)",
            display: "inline-block",
            verticalAlign: "top",
            marginRight: " 8px",
            position: "relative",
          }}
        >
          <img
            className="absolute top-3 left-3"
            src="../img/discount/coupon-icon.svg"
            alt=""
          />
          <input
            className={classes.search}
            type="text"
            onChange={(event) => handleCoupon(event)}
            value={coupon}
            placeholder="Nhập mã giảm giá"
            style={{
              borderRadius: "4px",
              boxShadow: "none",
              border: "1px solid rgb(196, 196, 207)",
              height: " 40px",
              width: "100%",
              color: "rgb(36, 36, 36)",
              fontSize: "14px",
              lineHeight: "20px",
              padding: "14px 12px 10px 44px",
              outline: " 0px",
            }}
          />
        </div>
        {coupon.length > 0 ? (
          <ButtonDiscount
            className="ml-auto inline-flex justify-center align-top text-xs py-0 px-2"
            onClick={handlePostCoupon}
            variant="outlined"
          >
            Áp Dụng
          </ButtonDiscount>
        ) : (
          <ButtonDiscount
            className="ml-auto inline-flex justify-center align-top text-xs py-0 px-2 opacity-50 pointer-events-none"
            onClick={handlePostCoupon}
            variant="outlined"
          >
            Áp Dụng
          </ButtonDiscount>
        )}
      </div>
      <DialogContent dividers>
        <div className="flex justify-between items-center px-2">
          <Typography className="mb-2" gutterBottom>
            Mã Giảm Giá
          </Typography>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "300",
              lineHeight: " 16px",
              color: "rgb(128, 128, 137)",
            }}
          >
            Áp dụng tối đa: 1
          </div>
        </div>
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
                          <div className="w-full relative">
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
                          <DiscountInfo
                            title={
                              <React.Fragment>
                                <div
                                  className="pr-4 flex items-center"
                                  style={{
                                    backgroundColor: "rgb(250, 250, 250)",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "50%",
                                      minWidth: "110px",
                                      flex: "0 0 auto",
                                      padding: "12px 24px",
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "rgb(120, 120, 120)",
                                    }}
                                  >
                                    Mã
                                  </div>
                                  <div className="pr-2 overflow-hidden">
                                    {item.code}
                                  </div>
                                  <CopyToClipboard
                                    text={item.code}
                                    onCopy={handleCopy}
                                  >
                                    <img
                                      className="cursor-pointer"
                                      src="../img/discount/copy-icon.svg"
                                      alt="copy-icon"
                                    />
                                  </CopyToClipboard>
                                </div>
                                <div className="pr-4 flex items-center">
                                  <div
                                    style={{
                                      width: "50%%",
                                      minWidth: "110px",
                                      flex: "0 0 auto",
                                      padding: "12px 24px",
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "rgb(120, 120, 120)",
                                    }}
                                  >
                                    Hạn sử dụng
                                  </div>
                                  <div className="pr-2 overflow-hidden">
                                    {item.expiryDate}
                                  </div>
                                </div>
                                <div
                                  className=""
                                  style={{
                                    backgroundColor: " rgb(250, 250, 250)",
                                    display: "flex",
                                    flexFlow: "row wrap",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "50%",
                                      minWidth: " 35px",
                                      flex: "0 0 auto",
                                      padding: "12px 24px",
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "rgb(120, 120, 120)",
                                    }}
                                  >
                                    Điều kiện
                                  </div>
                                  <div
                                    className="description"
                                    style={{
                                      padding: "12px 24px",
                                      fontSize: "13px",
                                      lineHeight: " 20px",
                                      color: "rgb(36, 36, 36)",
                                    }}
                                  >
                                    <ul className={classes.description}>
                                      {/* {parse(item.description)} */}
                                    </ul>
                                  </div>
                                </div>
                              </React.Fragment>
                            }
                          >
                            <img
                              className="m-w-full"
                              src="../img/discount/info_active.svg"
                              alt=""
                            />
                          </DiscountInfo>
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
                        filter: "drop-shadow(rgba(0, 0, 0, 0.15) 0px 1px 3px)",
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
                          <DiscountInfo
                            title={
                              <React.Fragment>
                                <div
                                  className="pr-4 flex items-center"
                                  style={{
                                    backgroundColor: "rgb(250, 250, 250)",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "33%",
                                      minWidth: "110px",
                                      flex: "0 0 auto",
                                      padding: "12px 24px",
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "rgb(120, 120, 120)",
                                    }}
                                  >
                                    Mã
                                  </div>
                                  <div className="pr-2 overflow-hidden">
                                    {item.code}
                                  </div>
                                  <CopyToClipboard
                                    text={item.code}
                                    onCopy={handleCopy}
                                  >
                                    <img
                                      className="cursor-pointer"
                                      src="../img/discount/copy-icon.svg"
                                      alt="copy-icon"
                                    />
                                  </CopyToClipboard>
                                </div>
                                <div className="pr-4 flex items-center">
                                  <div
                                    style={{
                                      width: "50%%",
                                      minWidth: "110px",
                                      flex: "0 0 auto",
                                      padding: "12px 24px",
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "rgb(120, 120, 120)",
                                    }}
                                  >
                                    Hạn sử dụng
                                  </div>
                                  <div className="pr-2 overflow-hidden">
                                    {item.expiryDate}
                                  </div>
                                </div>
                                <div
                                  className=""
                                  style={{
                                    backgroundColor: " rgb(250, 250, 250)",
                                    display: "flex",
                                    flexFlow: "row wrap",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "50%",
                                      minWidth: " 35px",
                                      flex: "0 0 auto",
                                      padding: "12px 24px",
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      color: "rgb(120, 120, 120)",
                                    }}
                                  >
                                    Điều kiện
                                  </div>
                                  <div
                                    className="description"
                                    style={{
                                      padding: "12px 24px",
                                      fontSize: "13px",
                                      lineHeight: " 20px",
                                      color: "rgb(36, 36, 36)",
                                    }}
                                  >
                                    <ul className={classes.description}>
                                      {/* {parse(item.description)} */}
                                    </ul>
                                  </div>
                                </div>
                              </React.Fragment>
                            }
                          >
                            <img
                              className="m-w-full"
                              src="../img/discount/info.svg"
                              alt=""
                            />
                          </DiscountInfo>
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
  );
}
