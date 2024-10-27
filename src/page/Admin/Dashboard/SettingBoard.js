
import './Dashboard.css';
import SysTable from "../../../components/Table/Sys/SysTable";

function SettingBoard() {
    return (
        <div className="admin-table-container">
            {/* service sys */}
            <SysTable title={"การตั้งค่าบริการ"} table={"servicesys"}/>
            {/* notify sys */}
            <SysTable title={"การตั้งค่าส่งแจ้งเตือน"} table={"notifysys"}/>
            {/* liff sys */}
            <SysTable title={"การตั้งค่า LINE Front-end Framework"} table={"liffsys"}/>
        </div>
    )
}

export default SettingBoard;