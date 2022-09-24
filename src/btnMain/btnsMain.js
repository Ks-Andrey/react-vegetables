import styled from "styled-components";
import './btnsMain.css';

const BtnCont = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

function BtnsMain({openVegitable, openNewTovar, openSellTovar}) {
    return (
        <BtnCont>
            <button onClick={() => {openVegitable();}} className="btn btn-primary">Товар в наличии</button>
            <button onClick={() => {openNewTovar()}} className="btn btn-primary">Прием товара</button>
            <button onClick={() => {openSellTovar()}} className="btn btn-primary">Продать товар</button>
        </BtnCont>
    );
}

export default BtnsMain;