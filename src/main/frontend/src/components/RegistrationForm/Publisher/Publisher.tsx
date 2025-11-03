import React, {FC, useState} from 'react';
import css from './Publisher.module.css';
import {IPublisher, PublisherType} from "../../../models/IPublisher";
import {RecordGroupType} from "../../../models/catalog/IRecordGroup";
import {BsCaretDownFill, BsCaretUpFill} from "react-icons/bs";
import {VscNewFile} from "react-icons/vsc";
import uuid from 'react-uuid';
import {parseStringToNumberOrDefaultZero} from "../../../utils/parser";
import ModalFormContainer from "../../../hoc/ModalFormContainer/ModalFormContainer";
import {PublisherForm} from "./PublisherForm/PublisherForm";
import {setModal} from "../../../redux/modal/slice";
import {useAppDispatch} from "../../../hooks/redux";

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
    const [currentRecordGroupType, setCurrentRecordGroupType] = useState<typeof PublisherType[keyof typeof PublisherType] | null>(null);
    const dispatch = useAppDispatch();

    const AddNewPublisher = (publisher: IPublisher | null) => {
        if (publisher) {
            publisher.id = parseStringToNumberOrDefaultZero(uuid());
            setPublishers([...publishers, publisher]);
        }

        dispatch(setModal(false));
    }
    const ShowModalForm = (visaType: typeof PublisherType[keyof typeof PublisherType]) => {
        setCurrentRecordGroupType(visaType);
        dispatch(setModal(true));
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
            addNewPub = () => {
                ShowModalForm(PublisherType.SIGNATORY);
            };
            pubLabel = `Підп: (${publishers.filter(publisher => PublisherType.SIGNATORY === publisher.publisherType).length})`;
            pubList = publishers.filter(publisher => PublisherType.SIGNATORY === publisher.publisherType);
            isOpenList = openSignatory;
        }
        if (PublisherType.APPROVER === visaType) {
            showPubList = ShowApprover;
            addNewPub = () => {
                ShowModalForm(PublisherType.APPROVER)
            };
            pubLabel = `Візи: (${publishers.filter(publisher => PublisherType.APPROVER === publisher.publisherType).length})`;
            pubList = publishers.filter(publisher => PublisherType.APPROVER === publisher.publisherType);
            isOpenList = openApprover;
        }
        if (PublisherType.EXECUTANT === visaType) {
            showPubList = ShowExecutant;
            addNewPub = () => {
                ShowModalForm(PublisherType.EXECUTANT)
            };
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
                {isOpenList ? pubList.map(publisher => <li key={publisher.id}>{publisher.official?.name}</li>)
                    :
                    <li key={pubList[0]?.id}>{pubList[0]?.official?.name}</li>
                }
            </ul>
            <button onClick={addNewPub} type="button"><VscNewFile/>
            </button>
        </div>
    }
    return (

        <div className={css.Publisher}>
            <ModalFormContainer>
                <ModalFormContainer>
                    <PublisherForm publisherType={currentRecordGroupType} formHandler={AddNewPublisher}/>
                </ModalFormContainer>
            </ModalFormContainer>
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
