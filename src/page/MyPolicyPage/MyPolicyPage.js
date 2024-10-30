import React, { useEffect, useState } from "react";
import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack"; /* ปุ่มย้อนกลับ */
import "./ResponsiveTable.css";
import CustomerMenu from "../../components/CustomerMenu/CustomerMenu";
import axios from "axios";
import { baseURL } from "../../AuthContext.js";
import { ReceiptPopup } from "../../components/Popup/Popup";

function MyPolicyPage() {
  const [memberOrders, setMemberOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();

  // * popup
  const [openPopup, setOpenPopup] = useState(false);

  // * request Orders
  async function requestMemberOrder() {
    // TODO: fix userid
    try {
      const response = await axios.post(`${baseURL}/member/display/orders`,
        {
          userId: "6565917"
        }, {
          withCredentials: true,
        }
      )

      if (response && response.data.status === "success") {
        const tempData = response.data.data;
        setMemberOrders(tempData);
        console.log(tempData);
      }
    } catch (error) {
      // ! error
      console.log("error: ", error)
    }
  }

  // * date
  function convertToThaiDate(dateString) {
    if (!dateString) {
      return;
    }
    const date = new Date(dateString);

    // Create a formatter for Thai date
    const thaiFormatter = new Intl.DateTimeFormat('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Bangkok'
    });

    // Convert to Thai 
    const thaiDate = thaiFormatter.format(date);

    return thaiDate;
  }

  // * click display receipt
  const handleDisplayClick = (row) => {
    setSelectedOrder(row);
    setOpenPopup(true);
  }

  useEffect(() => {
    requestMemberOrder();
  }, [])

  return (
    <>
      <HandleBack />
      {/* ปุ่มย้อนกลับ */}
      <div className="layout-wrapper desktop custom">
        <div className="policy-container">
          <CustomerMenu />
          <div className="policy__table-box">
            <div className="table-title">
              <i className="fa-solid fa-user"></i>
              <p>กรมธรรม์ของฉัน</p>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>รหัสออเดอร์</th>
                  <th>บริการที่ใช้</th>
                  <th>วันที่ออกใบคําสั่งซื้อ</th>
                  <th>สถานะ</th>
                  <th>เอกสารและใบคําสั่งซื้อ</th>
                </tr>
              </thead>
              <tbody>
                {memberOrders.length !== 0 &&  memberOrders
                .sort((a, b) => {
                  const dateA = new Date(a.TaxPaymentUpdatedAt || a.CMIPaymentUpdatedAt);
                  const dateB = new Date(b.TaxPaymentUpdatedAt || b.CMIPaymentUpdatedAt);
                  return dateB - dateA; // Sort in latest order; use dateA - dateB for oldest
                })
                .map((row, index) => (
                  <tr key={index}>
                    <td data-label="รหัสออเดอร์">{row.orderId}</td>
                    <td data-label="บริการที่ใช้">{row.ProductName}</td>
                    <td data-label="วันที่ออกใบคําสั่งซื้อ">{convertToThaiDate(row.TaxPaymentUpdatedAt) || convertToThaiDate(row.CMIPaymentUpdatedAt)}</td>

                    <td data-label="สถานะ">
                      <p
                        className={
                          row.Status === 1
                            ? "status-checked-bg"
                            : "status-pending-bg"
                        }
                      >
                        {row.Status === 1 ? "ตรวจสอบแล้ว": "รอการตรวจสอบ"}
                      </p>
                    </td>
                    <td data-label="เอกสารใบคําสั่งซื้อ">
                      <button className="btn" onClick={() => handleDisplayClick(row)}>
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedOrder && <ReceiptPopup isOpen={openPopup} orderId={selectedOrder.orderId}
      onClose={() => setOpenPopup(false)} title={"เอกสารและใบคําสั่งซื้อ"} Qcode={selectedOrder.CMIId}/>}
    </>
  );
}

export default MyPolicyPage;
