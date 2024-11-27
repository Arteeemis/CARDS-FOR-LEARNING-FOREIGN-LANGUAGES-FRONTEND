import {Container, Row} from "reactstrap";

const HomePage = () => {
	return (
		<Container>
			<Row style = {{marginLeft:'50px'}}>
				<h1 className="mb-3">Ne-Quizlet</h1>
				<p className="fs-5" >Освойте любую иностранную лексику с помощью интерактивных карточек и удобных списков в Ne-Quizlet.</p>
			</Row>
		</Container>
	)
}

export default HomePage