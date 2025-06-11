import React, { useState, useEffect, use } from "react";
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
import Cards from "../../UIComponent/Cards/DashboardCard/Card";
import { ICardInterface } from "../../../Service/Interface/CardInterface";
import AfterSubmitPopup from "../../UIComponent/Popup/AfterSubmitPopup/AfterSubmitPopup";
import Filter from "../../UIComponent/Dashboards/DashboardFilters/Filters";
import RailwayStationConfig from "../../../Service/Config/RailwayStationConfig";
import TrainDisplayModule from "./TrainDisplayModule/TrainDisplayModule";

const Stations: React.FunctionComponent<IStations> = () => {
    const [openTrainDisplayModal , setOpenTrainDisplayModal] = useState<boolean>(false);
    const [stationName , setStationName] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editData, setEditData] = useState<any>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [cardData, setCardData] = useState<any>(null);
    const [filterVal , setFilterVal] = useState<Record<string,any>>();
    const [searchValue , setSearchValue] = useState<string | null >(null);
    const [tempStore , setTempStore] = useState<string | null >(null); 
    const { getStations, addStation, editStation, getCardValues , genratingSubPointsFunc } = useRailwayDetails();
    const { State } = useParams();
    const [openActionPopupResult, setOpenActionPopupResult] = useState<boolean>(false);
    const [actionPopupType, setActionPopupType] = useState<string>("Success");

    const closeTrainDisplayModalFunc = () => setOpenTrainDisplayModal(false);
    const { data } = useQuery({
        queryFn: () => getStations(State || "" , filterVal , searchValue ),
        queryKey: ["stations" , filterVal , searchValue],
    })
    const { data: cardValues, isLoading: cardValuesLoading } = useQuery({
        queryFn: () => getCardValues(State || ""),
        queryKey: ["cardValues"],
    });
    const closePopup = () => { setOpenActionPopupResult(false); }
    const addStationResult = (result?: boolean) => {
        setOpenActionPopupResult(true);
        setActionPopupType(result ? "Success" : "Error");
    }
    const { mutateAsync: addStationToDB, } = useMutation({
        mutationFn: addStation,
        onSuccess: addStationResult
    })
    const { mutateAsync: editStationToDB } = useMutation({
        mutationFn: editStation
    })
    const applyFilter = (value : Record<string,any>) => setFilterVal(value);
    const clearFilter = () => setFilterVal(undefined);
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
    const gettingEdittingData = (id: any , buttonType? : string) => {
        console.log("Button Type    ",buttonType);
        if(buttonType && buttonType === "View Trains"){
            // PlaceName
            setOpenTrainDisplayModal(true);
            setStationName(data[id].PlaceName);
            return;
        }
        setEditData(data[id]);
        console.log(data[id]);
        setIsEdit(true);
        setOpenModal(true);
    }
    const changeHandler = (newvalue : string) => {
        if(newvalue.trim().length === 0) setTempStore(null);
        else setTempStore(newvalue.trim());
    }
    useEffect(() => {
        if (cardValuesLoading) return;
        if (cardValues) {
            const cardDataVal: Array<ICardInterface> = [];
            for (const key in cardValues) {
                if (key === "Total") continue;
                const card: ICardInterface = {
                    displayName: key,
                    type: "Cirular",
                    sideIcon: "view",
                    value: cardValues[key] / cardValues["Total"] * 100,
                }
                cardDataVal.push(card);
            }
            setCardData(cardDataVal);
        }
    }, [cardValuesLoading]);
    useEffect(() => {
        const timeOutObj = setTimeout(()=>{
            setSearchValue(tempStore);
        } , 3000);
        return () => { 
            clearTimeout(timeOutObj);
        }
    },[tempStore])

    return (
        <div>
            <PageTitle title={RailwayDetailsConfig.StationDashboardHeader} />
            <Cards cardData={cardData} />
            <div className={styles.css1}>
                <Filter filterArray={RailwayStationConfig.filterFields} filterApplied={applyFilter} clearFilter={clearFilter} />
                <button type="button" onClick={openFormModal} className={styles.css2}>
                    Add Stations
                </button>
                <SearchBar placeholder="Ex:- Howrah" changeHandler={changeHandler} />
            </div>
            {data &&
                <div className={styles.css3}>
                    {data.map((item: any, index: number) => {
                        const subPoints = genratingSubPointsFunc(item);
                        return <HeaderCard indexNumber={index} title={item.PlaceName} subPoints={subPoints} fotter={RailwayDetailsConfig.stationFooterConfig} passingDataToParent={gettingEdittingData} />
                    })}
                </div>
            }
            <ModalForm headerCssClassName="cornerHeader" open={openModal} onCloseFunc={closeFormModal} formType="AddStation" formtitle={isEdit ? RailwayDetailsConfig.EditStationFormTitle : RailwayDetailsConfig.AddStationFormTitle} initialValues={isEdit ? { ...editData } : { State: State?.replace("_", " ") }} formOptions={RailwayDetailsConfig.option} gettingValuesFromForm={addStationFunc} />
            <AfterSubmitPopup open={openActionPopupResult} decisionFunc={closePopup} popupType={actionPopupType as "Success" | "Error"} />
            <TrainDisplayModule open={openTrainDisplayModal} closeFunc={closeTrainDisplayModalFunc} StationName={stationName} />
        </div>
    )
}

export default Stations;