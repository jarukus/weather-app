import React from 'react'
import { Container, Row, Jumbotron } from 'reactstrap'

export default ({ children }) => {
	return (
		<Jumbotron>
			<Container>
				<Row>{children}</Row>
			</Container>
		</Jumbotron>
	)
}
