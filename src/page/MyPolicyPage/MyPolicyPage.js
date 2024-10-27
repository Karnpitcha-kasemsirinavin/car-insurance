import React from "react";
import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack"; /* ปุ่มย้อนกลับ */
import "./ResponsiveTable.css";
import CustomerMenu from "../../components/CustomerMenu/CustomerMenu";
function MyPolicyPage() {
  // ข้อมูลตารางในรูปแบบของ array
  const tableData = [
    {
      orderCode: "#li7701",
      servicesUsede: "ต่อกรมธรรม์เเละภาษี",
      startDate: "3 มีนาคม 2577",
      status: "รอตรวจสอบ",
    },
    {
      orderCode: "#li1001",
      servicesUsede: "ต่อกรมธรรม์",
      startDate: "6 มีนาคม 2577",
      status: "ตรวจสอบเเล้ว",
    },

    {
      orderCode: "#li1001",
      servicesUsede: "ภาษี",
      startDate: "8 มีนาคม 2577",
      status: "ตรวจสอบเเล้ว",
    },
    {
      orderCode: "#li1001",
      servicesUsede: "ภาษี",
      startDate: "8 มีนาคม 2577",
      status: "ตรวจสอบเเล้ว",
    },
    {
      orderCode: "#li1001",
      servicesUsede: "ภาษี",
      startDate: "8 มีนาคม 2577",
      status: "ตรวจสอบเเล้ว",
    },
    {
      orderCode: "#li1001",
      servicesUsede: "ภาษี",
      startDate: "8 มีนาคม 2577",
      status: "ตรวจสอบเเล้ว",
    },
    {
      orderCode: "#li1001",
      servicesUsede: "ภาษี",
      startDate: "8 มีนาคม 2577",
      status: "ตรวจสอบเเล้ว",
    },
    {
      orderCode: "#li1001",
      servicesUsede: "ภาษี",
      startDate: "8 มีนาคม 2577",
      status: "ตรวจสอบเเล้ว",
    },
    {
      orderCode: "#li1001",
      servicesUsede: "ภาษี",
      startDate: "8 มีนาคม 2577",
      status: "ตรวจสอบเเล้ว",
    },
    {
      orderCode: "#li1001",
      servicesUsede: "ภาษี",
      startDate: "8 มีนาคม 2577",
      status: "ตรวจสอบเเล้ว",
    },
    {
      orderCode: "#li1001",
      servicesUsede: "ภาษี",
      startDate: "8 มีนาคม 2577",
      status: "ตรวจสอบเเล้ว",
    },
    {
      orderCode: "#li1001",
      servicesUsede: "ภาษี",
      startDate: "8 มีนาคม 2577",
      status: "ตรวจสอบเเล้ว",
    },
    // เพิ่มข้อมูลแถวที่ต้องการที่นี่

    // สามารถเพิ่มแถวเพิ่มเติมตามต้องการ
  ];

  return (
    <>
      <HandleBack />
      {/* ปุ่มย้อนกลับ */}
      <div className="layout-wrapper desktop custom">
        <div className="policy-container">
          <CustomerMenu />
          <div className="policy__table-box">
            <div className="table-title">
              <i class="fa-solid fa-user"></i>
              <p>กรมธรรม์ของฉัน</p>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>รหัสออเดอร์</th>
                  <th>บริหารที่ใช้</th>
                  <th>วันที่ออกใบเสร็จ</th>
                  <th>สถานะ</th>
                  <th>เอกสารใบคําสั่งซื้อ</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td data-label="รหัสออเดอร์">{row.orderCode}</td>
                    <td data-label="บริหารที่ใช้">{row.servicesUsede}</td>
                    <td data-label="วันที่ออกใบเสร็จ">{row.startDate}</td>

                    <td data-label="สถานะ">
                      <p
                        className={
                          row.status === "ตรวจสอบเเล้ว"
                            ? "status-checked-bg"
                            : "status-pending-bg"
                        }
                      >
                        {row.status}
                      </p>
                    </td>
                    <td data-label="เอกสารใบคําสั่งซื้อ">
                      <a href="#" className="btn">
                        PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPolicyPage;
