import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {formatDate} from "src/utils/utils.ts";
import {T_Collection} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";

const CollectionsTable = ({collections}:{collections:T_Collection[]}) => {
    const navigate = useNavigate()

    const handleClick = (collection_id) => {
        navigate(`/collections/${collection_id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => STATUSES[value]
            },
            {
                Header: 'Время изучения (мин)',    //добавил вычисляемое поле
                accessor: 'study_time',
                Cell: ({ value }) => value
            },
            {
                Header: 'Пользователь',             //добавил пользователя
                accessor: 'owner',
                Cell: ({ value }) => value
            }                                       //убрал даты создания и завершения
        ],
        []
    )

    return (
        <CustomTable columns={columns} data={collections} onClick={handleClick}/>
    )
};

export default CollectionsTable