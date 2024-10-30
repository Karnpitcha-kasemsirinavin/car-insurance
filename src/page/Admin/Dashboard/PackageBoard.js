
import './Dashboard.css';
import PackageTable from '../../../components/Table/Package/PackageTable';

function PackageBoard() {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const table = searchParams.get('table');

    return (
        <div className="admin-table-container">
            {table && <PackageTable
            title={`แพ็คเกจ พรบ`}
            table={table}/>}
            {/* <SysTable title={"การตั้งค่าส่งแจ้งเตือน"} table={"notifysys"}/>
            <SysTable title={"การตั้งค่า LINE Front-end Framework"} table={"liffsys"}/> */}
        </div>
    )
}

export default PackageBoard;