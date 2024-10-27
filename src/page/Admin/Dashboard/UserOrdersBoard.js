
import { useEffect, useState } from "react";
import { baseURL } from "../../../App";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import OrdersTable from "../../../components/Table/OrdersTable";

function UserOrdersBoard() {
    const [fields, setFields] = useState();
    const [data, setData] = useState();
    const searchParams = useSearchParams();
    const [userId, setUserId] = useState();
    const params = new URLSearchParams(window.location.search);

    // * request fields
    async function requestUserFields() {
        try {
            const response = await axios.get(`${baseURL}/admin/columns/orders`);
            if (response && response.data.status === "success") {
                setFields(response.data.data);
                console.log(response.data.data)
            }
        } catch (error) {
            // ! error
            console.log("error: ", error);
        }
    }

    // * request data
    async function requestUserData() {
        const userId = params.get("id");

        setUserId(userId);

        try {
            const response = await axios.post(`${baseURL}/admin/user/order`, 
                {
                    userId: userId
                }
            );
            console.log(response)
            if (response && response.data.status === "success" ) {
                setData(response.data.data);
            }
        } catch (error) {
            console.log("error: ", error)
        }
    }

    useEffect(() => {
        requestUserFields();
        requestUserData();
    }, [])

    return (
        <div className="table-container">
            {fields && data && <OrdersTable data={data} fields={fields} reset={requestUserData}/>}
        </div>
    )
}

export default UserOrdersBoard;