import styled from "styled-components";
import './btnsMain.css';
import AdminBtns from "../adminBtns/adminBtns";

export const BtnCont = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    button{
        margin-bottom: 5px;
    }
    & ~ .sing-in{
        position: absolute;
        right: 20px;
        top: 20px;
        width: 150px;
    }
`;

function BtnsMain({openBlock, openForm, signedFlag, onSingOut}) {

    const adminButtons = signedFlag ? <AdminBtns openBlock={openBlock}/> : null;
    const signBtns = signedFlag ? <button onClick={() => {onSingOut()}} className="btn btn-danger sing-in">Выйти</button> : 
    <button onClick={() => {openForm()}} className="btn btn-primary sing-in">Авторизоваться</button>;

    return (
        <>
        <BtnCont>
            <button onClick={() => {openBlock('vegitable');}} className="btn btn-primary">Товар в наличии</button>
            <button onClick={() => {openBlock('addTovar')}} className="btn btn-primary">Прием товара</button>
            <button onClick={() => {openBlock('sellTovar')}} className="btn btn-primary">Продать товар</button>
            {adminButtons}
        </BtnCont>
        {signBtns}
        </>
    );
}

export default BtnsMain;