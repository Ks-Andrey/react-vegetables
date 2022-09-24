import styled from "styled-components";
import LoadState from "../load/load";

const OkeyContainer = styled.div`
    width: 400px;
    max-width: 400px;
    padding: 25px;
    border-radius: 10px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #eee;
    z-index: 999;
    min-height: 140px;
    img{
        width: 75px;
        max-width: 100%;
        margin: 0 auto;
    }
    div{
        font-size: 18px;
        font-weight: 500;
        margin-top: 15px;
    }
`;

function OkeySend({closePopap, load, success}) {
    const loadBlock = load ? <LoadState /> : null;
    const okey = success ?  <><img src="https://purepng.com/public/uploads/thumbnail//purepng.com-ok-iconyestickiconokcorrectokayconfirm-411520193901xx66y.png"/>
    <div>Действие успешно выполнено!</div>
    <button onClick={() => {closePopap()}} className="btn btn-success mt-3">Закрыть</button></> : null;

    return(
        <OkeyContainer>
            {loadBlock}
            {okey}
        </OkeyContainer>
    );
}

export default OkeySend;