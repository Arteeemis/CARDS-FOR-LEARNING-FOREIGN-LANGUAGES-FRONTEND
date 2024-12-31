import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftCollection,
    fetchCollection,
    removeCollection, sendDraftCollection,
    triggerUpdateMM,
    updateCollection
} from "store/slices/collectionsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_CollectionStatus, T_Card} from "modules/types.ts";
import CardCard from "components/CardCard/CardCard.tsx";
import CustomDatePicker from "components/CustomDatePicker/CustomDatePicker.tsx";
import {formatDate} from "utils/utils.ts";
import CustomInput from "components/CustomInput/CustomInput.tsx";

const CollectionPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated} = useAppSelector((state) => state.user)

    const collection = useAppSelector((state) => state.collections.collection)

    const [name, setName] = useState<string>(collection?.name)

    const [study_time, setStudyTime] = useState<string>(collection?.study_time)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchCollection(id))
        return () => dispatch(removeCollection())
    }, []);

    useEffect(() => {
        setStudyTime(collection?.study_time)
        setName(collection?.name)
    }, [collection]);

    const sendCollection = async (e) => {
        e.preventDefault()

        await saveCollection()
        await dispatch(sendDraftCollection())

        navigate("/collections/")
    }

    const saveCollection = async (e?) => {
        e?.preventDefault()

        const data = {
            name
        }

        await dispatch(updateCollection(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteCollection = async () => {
        await dispatch(deleteDraftCollection())
        navigate("/cards/")
    }

    if (!collection) {
        return (
            <div>

            </div>
        )
    }

    const isDraft = collection.status == E_CollectionStatus.Draft
    const isCompleted = collection.status == E_CollectionStatus.Completed

    return (
        <Form onSubmit={sendCollection} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновой набор" : `Набор №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName} disabled={!isDraft}/> //заполняемое поле заявки
                {isCompleted && <CustomInput label="Время изучения (мин)" value={study_time} disabled={true}/>}
            </Row>
            <Row>
                {collection.cards.length > 0 ? collection.cards.map((card:T_Card) => (
                    <Row key={card.id} className="d-flex justify-content-center mb-5">
                        <CardCard card={card} showRemoveBtn={isDraft} editMM={isDraft} />
                    </Row>
                )) :
                    <h3 className="text-center">Слова не добавлены</h3>
                }
            </Row>
            {isDraft &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                    {/* <Button color="success" className="fs-4" onClick={saveCollection}>Сохранить</Button> */}
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteCollection}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default CollectionPage