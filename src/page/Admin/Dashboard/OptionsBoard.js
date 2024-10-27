
import './Dashboard.css';
import OptionTable from '../../../components/Table/Option/OptionTable';

const mapTableName = {
    addroptions: "ที่อยู่",
    coloroptions: "สีรถยนต์",
    platetypeoptions: "ประเภทป้ายทะเบียน",
    idtypeoptions: "ประเภทบัตร",
    insuredtypeoptions: "ประเภทผู้ขอกรมธรรม์",
    titleoptions: "คำนำหน้า",
    vehicleprovinceoptions: "จังหวัดที่จดทะเบียน",
    default: "ไม่ได้ตั้งค่า"    
}

function OptionsBoard() {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const table = searchParams.get('table');

    return (
        <div className="admin-table-container">
            {table && <OptionTable 
            title={`ตัวเลือกสำหรับ ${mapTableName[table] ? mapTableName[table]: mapTableName["default"]}`} 
            table={table}/>}
        </div>
    )
}

export default OptionsBoard;