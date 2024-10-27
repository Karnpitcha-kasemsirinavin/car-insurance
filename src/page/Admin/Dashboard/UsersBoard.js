
import axios from "axios";
import UsersTable from "../../../components/Table/UsersTable";
import './Dashboard.css';
import { baseURL } from "../../../App";
import { useEffect, useState } from "react";


function UsersBoard() {
    const [fields, setFields] = useState();
    const [data, setData] = useState();

    // * request fields
    async function requestUserFields() {
        try {
            const response = await axios.get(`${baseURL}/admin/columns/users`);
            
            if (response && response.data.status === "success") {
                setFields(response.data.data);
            }
        } catch (error) {
            // ! error
            console.log("error: ", error);
        }
    }

    // * request data
    async function requestUserData() {
        try {
            const response = await axios.get(`${baseURL}/admin/data/users`);
            
            if (response && response.data.status === "success") {
                setData(response.data.data);
            }
        } catch (error) {
            // ! error
            console.log("error: ", error);
        }
    }

    useEffect(() => {
        requestUserFields();
        requestUserData();
    }, [])

    return (
        <div className="admin-table-container">
            {fields && data && <UsersTable data={data} fields={fields} reset={requestUserData}/>}
        </div>
    )
}

export default UsersBoard;