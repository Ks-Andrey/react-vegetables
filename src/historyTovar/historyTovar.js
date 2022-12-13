import { Component } from "react";
import styled from "styled-components";

const RowTovar = styled.div`
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    &:last-child{
        margin-bottom: 0;
    }
    .item-block{
        width: 47%; 
        & > div{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
        }
    }
`;

const Adds = styled.div`
    padding: 20px;
    z-index: 999;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 20px rgba(1, 1, 1, .3);
    width: 500px;
    max-width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

function HistoryTovar({add, name, closeHistory, sell}){

        const filterNameAdd = add.filter(item => item.name == name);
        const filterNameSell = sell.filter(item => item.name == name);

        const sellArray = sell.length != 0 ? sell : ' ';

        let sellTovarArr, buyTovarArr;

        if (filterNameAdd.length != 0) {
            buyTovarArr = filterNameAdd.map((item) => <div><div className="td">{item.weight}</div><div className="td">{item.price}</div></div>);
        }else{
            buyTovarArr = <div>Нету истории:(</div>
        }

        if (filterNameSell.length != 0) {
            sellTovarArr = filterNameSell.map((item) => <div><div className="td">{item.weight}</div><div className="td">{item.price}</div></div>);
        }else{
            sellTovarArr = <div>Нету истории:(</div>
        }

        return(
            <Adds>
                <RowTovar>
                    <div className="item-block">
                        <div><div className="td">Вес покупки</div><div className="td">Цена покупки</div></div>
                    </div>
                    <div className="item-block">
                        <div><div className="td">Вес продажи</div><div className="td">Цена продажи</div></div>
                    </div>
                </RowTovar>
                <RowTovar>
                    <div className="item-block">
                        {buyTovarArr}
                    </div>
                    <div className="item-block">
                        {sellTovarArr}
                    </div>
                </RowTovar>
                <button onClick={() => closeHistory()} className="btn btn-danger w-100 mt-3">Закрыть</button>
            </Adds>
        );
}

export default HistoryTovar; 