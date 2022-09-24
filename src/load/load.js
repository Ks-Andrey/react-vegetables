import styled from "styled-components";

const Load = styled.img`
    width: 100px;
    max-width: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    animation: spin 1s infinite linear;

    @keyframes spin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;

function LoadState() {
    return(
        <Load src="https://cdn-icons-png.flaticon.com/512/248/248959.png"/>
    );
}

export default LoadState;