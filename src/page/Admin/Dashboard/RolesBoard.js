
import './Dashboard.css';
import RolesTable from '../../../components/Table/Roles/RolesTable';
import CreateForm from '../../../components/Table/Create/CreateForm';

const mapTableName = {
    roles: "ประเภทผู้เใช้งาน",
    default: "ไม่ได้ตั้งค่า"    
}

function RolesBoard() {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const table = searchParams.get('table');

    return (
        <div className="admin-table-container">
            {table && <RolesTable
            title={`การตั้งค่า ${mapTableName[table] ? mapTableName[table]: mapTableName["default"]}`}
            table={table}/>}
        </div>
    )
}

export default RolesBoard;