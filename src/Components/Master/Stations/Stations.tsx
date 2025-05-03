import React, { useState } from "react";
import IStations from "./IStations";
import SearchBar from "../../UIComponent/SearchBar/SearchBar";
import { useMutation, useQuery } from "@tanstack/react-query";
import useRailwayDetails from "../../../hooks/useRailwayDetails";
import { useParams } from "react-router-dom";
import HeaderCard from "../../UIComponent/Cards/HeaderCard/HeaderCard";
import styles from "./Stations.module.css";
import RailwayDetailsConfig from "../../../Service/Config/RailwayDetailsConfig";
import ModalForm from "../../UIComponent/ModalForm/ModalForm";
import PageTitle from "../../UIComponent/PageTitle/PageTitle";

const Stations: React.FunctionComponent<IStations> = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editData, setEditData] = useState<any>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { getStations, addStation, editStation } = useRailwayDetails();
    const { State } = useParams();
    const { data, isLoading } = useQuery({
        queryFn: () => getStations(State || ""),
        queryKey: ["stations"],
    })
    const { mutateAsync: addStationToDB } = useMutation({
        mutationFn: addStation,
    })
    const { mutateAsync: editStationToDB } = useMutation({
        mutationFn: editStation
    })
    const addStationFunc = async (value: any) => {
        if (!isEdit)
            await addStationToDB(value);
        else
            await editStationToDB({ ...value, ID: editData.ID });
    }
    const openFormModal = () => {
        setOpenModal(true);
        setIsEdit(false);
    };
    const closeFormModal = () => setOpenModal(false);
    const gettingEdittingData = (id: any) => {
        console.log(data[id]);
        setEditData(data[id]);
        setIsEdit(true);
        setOpenModal(true);
    }
    const genratingSubPoints = (item: any) => {
        const subPoints = [
            { Title: "State", Response: item.State },
            { Title: "City", Response: item.City },
            { Title: "Number Of Platforms", Response: item.NumberOfPlatforms },
            { Title: "Type Of Station", Response: item.TypeOfStation },
            { Title: "Is Active", Response: item.IsActive ? "Yes" : "No" },
            { Title: "Capacity", Response: item.Capacity },
            { Title: "Longitude", Response: item.Longitude },
            { Title: "Latitude", Response: item.Latitude },
        ];
        return subPoints;
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <PageTitle title={RailwayDetailsConfig.StationDashboardHeader} />
            <div className={styles.css1}>
                <button type="button" onClick={openFormModal} className={styles.css2}>
                    Add Stations
                </button>
                <SearchBar placeholder="Ex:- Howrah" />
            </div>
            {data &&
                <div className={styles.css3}>
                    {data.map((item: any, index: number) => {
                        const subPoints = genratingSubPoints(item);
                        return <HeaderCard indexNumber={index} title={item.PlaceName} subPoints={subPoints} fotter={RailwayDetailsConfig.stationFooterConfig} passingDataToParent={gettingEdittingData} />
                    })}
                </div>
            }
            <ModalForm headerCssClassName="cornerHeader" open={openModal} onCloseFunc={closeFormModal} formType="AddStation" formtitle={isEdit ? RailwayDetailsConfig.EditStationFormTitle : RailwayDetailsConfig.AddStationFormTitle} initialValues={isEdit ? {...editData} : { State: State?.replace("_", " ") }} formOptions={RailwayDetailsConfig.option} gettingValuesFromForm={addStationFunc} />
        </div>
    )
}

export default Stations;