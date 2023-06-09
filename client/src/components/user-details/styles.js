import styled from 'styled-components';

const StyledDetails = styled.div`
	position: fixed;
	right: 250px;
	display: flex;
	flex-direction: column;
	text-align: center;
`;

const StyledProfileImage = styled.img`
	width: 150px;
	margin-left: auto;
	margin-right: auto;
	border-radius: 1rem;
`;

export { StyledDetails, StyledProfileImage };
