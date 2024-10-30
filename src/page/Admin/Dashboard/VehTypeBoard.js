
import './Dashboard.css';
import VehTypeTable from '../../../components/Table/VehType/VehTypeTable';

function VehTypeBoard() {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const table = searchParams.get('table');

    return (
        <div className="admin-table-container">
            {table && <VehTypeTable
            title={`ประเภทพาหนะ`}
            table={table}/>}
            {/* <SysTable title={"การตั้งค่าส่งแจ้งเตือน"} table={"notifysys"}/>
            <SysTable title={"การตั้งค่า LINE Front-end Framework"} table={"liffsys"}/> */}
        </div>
    )
}

export default VehTypeBoard;