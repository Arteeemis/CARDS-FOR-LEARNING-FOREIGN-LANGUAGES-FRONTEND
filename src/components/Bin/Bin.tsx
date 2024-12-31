import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";

type Props = {
    isActive: boolean,
    draft_collection_id: string,
    cards_count: number
}

const Bin = ({isActive, draft_collection_id, cards_count}:Props) => {

    if (!isActive) {
        return <Button color={"secondary"} className="bin-wrapper" disabled>Корзина</Button>
    }

    return (
        <Link to={`/collections/${draft_collection_id}/`} className="bin-wrapper">
            <Button color={"primary"} className="w-100 bin ">
                Корзина
                <Badge>
                    {cards_count}
                </Badge>
            </Button>
        </Link>
    )
}

export default Bin