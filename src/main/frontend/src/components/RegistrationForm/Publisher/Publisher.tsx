import React, {FC, useState} from 'react';
import css from './Publisher.module.css';
import {IPublisher, PublisherType} from "../../../models/IPublisher";
import {RecordGroupType} from "../../../models/catalog/IRecordGroup";
import {BsCaretDownFill, BsCaretUpFill} from "react-icons/bs";
import {VscNewFile} from "react-icons/vsc";
import uuid from 'react-uuid';
import {parseStringToNumberOrDefaultZero} from "../../../utils/parser";

interface PublisherProps {
    publishers: IPublisher[];
    setPublishers: (setPublishers: IPublisher[]) => void;
    recordGroupType: typeof RecordGroupType[keyof typeof RecordGroupType];
    children?: React.ReactNode;
}

const Publisher: FC<PublisherProps> = ({publishers, setPublishers, recordGroupType, children}) => {
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
            publisherType: PublisherType.SIGNATORY
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
            publisherType: PublisherType.APPROVER
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
            publisherType: PublisherType.EXECUTANT
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

    const createPublisherGroup = (visaType: typeof PublisherType[keyof typeof PublisherType]) => {
        let showPubList = () => {
        };
        let addNewPub = () => {
        };
        let pubLabel = "";
        let pubList: IPublisher[] = [];
        let isOpenList: boolean = false;

        if (PublisherType.SIGNATORY === visaType) {
            showPubList = ShowSignatory;
            addNewPub = AddNewSignatory;
            pubLabel = `Підп: (${publishers.filter(publisher => PublisherType.SIGNATORY === publisher.publisherType).length})`;
            pubList = publishers.filter(publisher => PublisherType.SIGNATORY === publisher.publisherType);
            isOpenList = openSignatory;
        }
        if (PublisherType.APPROVER === visaType) {
            showPubList = ShowApprover;
            addNewPub = AddNewApprover;
            pubLabel = `Візи: (${publishers.filter(publisher => PublisherType.APPROVER === publisher.publisherType).length})`;
            pubList = publishers.filter(publisher => PublisherType.APPROVER === publisher.publisherType);
            isOpenList = openApprover;
        }
        if (PublisherType.EXECUTANT === visaType) {
            showPubList = ShowExecutant;
            addNewPub = AddNewExecutant;
            pubLabel = `Вик: (${publishers.filter(publisher => PublisherType.EXECUTANT === publisher.publisherType).length})`;
            pubList = publishers.filter(publisher => PublisherType.EXECUTANT === publisher.publisherType);
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
            <button onClick={addNewPub} type="button"><VscNewFile/>
            </button>
        </div>
    }
    return (

        <div className={css.Publisher}>
            {createPublisherGroup(PublisherType.SIGNATORY)}
            <div className={`${css.publisherGroup} ${css.publisherGroupChildren}`}>
                {children}
            </div>
            {createPublisherGroup(PublisherType.APPROVER)}
            {createPublisherGroup(PublisherType.EXECUTANT)}
        </div>
    );
};

export default Publisher;
