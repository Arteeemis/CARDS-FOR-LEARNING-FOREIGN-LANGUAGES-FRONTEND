import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Card} from "modules/types.ts";

type Props = {
    selectedCard: T_Card | null
}

const Breadcrumbs = ({selectedCard}:Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/cards") &&
                <BreadcrumbItem active>
                    <Link to="/cards">
						Слова
                    </Link>
                </BreadcrumbItem>
			}
            {selectedCard &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedCard.word }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs