import React from "react";
import ITableUI from "./ITableUI";
import { Table } from "antd";

const TableUI: React.FunctionComponent<ITableUI> = ({columns , data}) => {
    return (
        <div>
            <Table dataSource={data} columns={columns} />
        </div>
    )
};

export default TableUI;