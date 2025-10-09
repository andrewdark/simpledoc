import React, {FC, useState} from 'react';
import css from './Publisher.module.css';
import {IPublisher, VisaType} from "../../../models/IPublisher";
import {RecordGroupType} from "../../../models/catalog/IRecordGroup";
import {BsCaretDownFill, BsCaretUpFill} from "react-icons/bs";
import {VscNewFile} from "react-icons/vsc";
import uuid from 'react-uuid';
import {parseStringToNumberOrDefaultZero} from "../../../utils/parser";

interface PublisherProps {
    publishers: IPublisher[];
    setPublishers: (setPublishers: IPublisher[]) => void;
    recordGroupType: typeof RecordGroupType[keyof typeof RecordGroupType];
}

const Publisher: FC<PublisherProps> = ({publishers, setPublishers, recordGroupType}) => {
    const [openSignatory, setOpenSignatory] = useState<boolean>(false);
    const [openApprover, setOpenApprover] = useState<boolean>(false);
    const [openExecutant, setOpenExecutant] = useState<boolean>(false);

    const AddNewSignatory = () => {
        const idRandom = uuid();
        const pub: IPublisher = {
            id: parseStringToNumberOrDefaultZero(idRandom),
            department: {
                name: idRandom + " - SIGNATORY ",
                position: "Chief",
                official: true
            },
            signingDate: null,
            visaType: VisaType.SIGNATORY
        }
        setPublishers([...publishers, pub]);
    }
    const AddNewApprover = () => {
        const idRandom = uuid();
        const pub: IPublisher = {
            id: parseStringToNumberOrDefaultZero(idRandom),
            department: {
                name: idRandom + " - APPROVER ",
                position: "Chief",
                official: true
            },
            signingDate: null,
            visaType: VisaType.APPROVER
        }
        setPublishers([...publishers, pub]);
    }
    const AddNewExecutant = () => {
        const idRandom = uuid();
        const pub: IPublisher = {
            id: parseStringToNumberOrDefaultZero(idRandom),
            department: {
                name: idRandom + " - EXECUTANT ",
                position: "Chief",
                official: true
            },
            signingDate: null,
            visaType: VisaType.EXECUTANT
        }
        setPublishers([...publishers, pub]);
    }
    const ShowSignatory = () => {
        openSignatory ? setOpenSignatory(false) : setOpenSignatory(true);
    }
    const ShowApprover = () => {
        openApprover ? setOpenApprover(false) : setOpenApprover(true);
    }
    const ShowExecutant = () => {
        openExecutant ? setOpenExecutant(false) : setOpenExecutant(true);
    }

    const createPublisherGroup = (visaType: typeof VisaType[keyof typeof VisaType]) => {
        let showPubList = () => {
        };
        let addNewPub = () => {
        };
        let pubLabel = "";
        let pubList: IPublisher[] = [];
        let isOpenList: boolean = false;

        if (VisaType.SIGNATORY === visaType) {
            showPubList = ShowSignatory;
            addNewPub = AddNewSignatory;
            pubLabel = `Підп: (${publishers.filter(publisher => VisaType.SIGNATORY === publisher.visaType).length})`;
            pubList = publishers.filter(publisher => VisaType.SIGNATORY === publisher.visaType);
            isOpenList = openSignatory;
        }
        if (VisaType.APPROVER === visaType) {
            showPubList = ShowApprover;
            addNewPub = AddNewApprover;
            pubLabel = `Візи: (${publishers.filter(publisher => VisaType.APPROVER === publisher.visaType).length})`;
            pubList = publishers.filter(publisher => VisaType.APPROVER === publisher.visaType);
            isOpenList = openApprover;
        }
        if (VisaType.EXECUTANT === visaType) {
            showPubList = ShowExecutant;
            addNewPub = AddNewExecutant;
            pubLabel = `Вик: (${publishers.filter(publisher => VisaType.EXECUTANT === publisher.visaType).length})`;
            pubList = publishers.filter(publisher => VisaType.EXECUTANT === publisher.visaType);
            isOpenList = openExecutant;
        }

        return <div className={css.publisherGroup}>
            <div className={css.openList} onClick={showPubList}>
                {isOpenList ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                <label>{pubLabel}</label>
            </div>
            <ul>
                {isOpenList ? pubList.map(publisher => <li key={publisher.id}>{publisher.department?.name}</li>)
                    :
                    <li key={pubList[0]?.id}>{pubList[0]?.department?.name}</li>
                }
            </ul>
            <button onClick={addNewPub} type={"button"}><VscNewFile/>
            </button>
        </div>
    }
    return (

        <div className={css.Publisher}>
            {createPublisherGroup(VisaType.SIGNATORY)}
            {createPublisherGroup(VisaType.APPROVER)}
            {createPublisherGroup(VisaType.EXECUTANT)}
        </div>
    );
};

export default Publisher;
