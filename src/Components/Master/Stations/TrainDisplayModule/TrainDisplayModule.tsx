import React from "react";
import ITrainDisplayModule from "./ITrainDisplayModule";
import { Modal } from "antd";
import { clearScreenDown } from "readline";
import { useQuery } from "@tanstack/react-query";
import useRailwayDetails from "../../../../hooks/useRailwayDetails";
import TableUI from "../../../UIComponent/TableUI/TableUI";
import TrainDisplayModuleConfig from "../../../../Service/Config/TrainDisplayModuleConfig";

const TrainDisplayModule: React.FunctionComponent<ITrainDisplayModule> = ({ open, closeFunc, StationName }) => {
    const { getTrainDetailOnParticularStation } = useRailwayDetails();
    const { data : response }= useQuery({
        queryFn : () => getTrainDetailOnParticularStation(StationName),
        queryKey : ["train",StationName]
    });

    console.log("Data   ",response);
    return (
        <Modal open={open} onCancel={closeFunc} footer={null} width={1000}>
            <TableUI data={ !response  ? [] : response.data} columns={TrainDisplayModuleConfig.tableColumns} />
        </Modal>
    )
};

export default TrainDisplayModule;