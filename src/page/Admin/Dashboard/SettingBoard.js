
import './Dashboard.css';
import SysTable from "../../../components/Table/Sys/SysTable";

const mapTableName = {
    servicesys: "เวลาและบริการ",
    products: "บริการทั้งหมด", 
    notifysys: "การส่งแจ้งเตือน",
    liffsys: "LINE Front-end Framework",
    default: "ไม่ได้ตั้งค่า"    
}

function SettingBoard() {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const table = searchParams.get('table');

    return (
        <div className="admin-table-container">
            {table === "servicesys" && <SysTable
            title={`การตั้งค่า ${mapTableName["products"]}`}
            table={"products"}/>}

            {table && <SysTable
            title={`การตั้งค่า ${mapTableName[table] ? mapTableName[table]: mapTableName["default"]}`}
            table={table}/>}
            {/* <SysTable title={"การตั้งค่าส่งแจ้งเตือน"} table={"notifysys"}/>
            <SysTable title={"การตั้งค่า LINE Front-end Framework"} table={"liffsys"}/> */}
        </div>
    )
}

export default SettingBoard;