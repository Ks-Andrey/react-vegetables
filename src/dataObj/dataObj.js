// import { base } from "../dataBase/db";
import styled from "styled-components";
import ParseData from "../dataParse/dataParse";
import LoadState from "../load/load";
import HistoryTovar from "../historyTovar/historyTovar";

import { Component } from "react";

const VegitableContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item{
        width: 30%;
        max-width: 100%;
        box-sizing: border-box;
        padding: 15px;
        margin: 1.5%;
        box-shadow: 0px 0px 20px rgba(1, 1, 1, .2);
        border-radius: 5px;
        .image{
            width: 100%;
            max-width: 100%;
            height: 150px;
            position: relative;
            overflow: hidden;
            img{
                min-height: 150px;
                max-height: 150px;
                display: block;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .tittle{
            font-size: 17px;
            font-weight: 500;
            line-height: 1;
            margin-top: 15px;
        }
        .weight, .post{
            font-size: 16px;
            line-height: 1;
            margin-top: 15px;
        }
    }
`;

class Vegitable extends Component {
    constructor(props){
        super(props);
        this.getItems();
        this.getChanged();
        this.getSell();
    }

    state = {
        items: '',
        changed: '',
        sell: '',
        history: false
    };

    dataObj = new ParseData();

    openHistory = (name) => {
        this.setState({
            history: name
        });
    }
    closeHistory = () => {
        this.setState({
            history: false
        })
    }

    getItems = () => {
        this.dataObj.getData('http://localhost:3000/vegitable')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    items: res
                })
            });
    }
    
    getChanged = () => {
        this.dataObj.getData('http://localhost:3000/changedTovar')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    changed: res
                })
            });
    }

    getSell = () => {
        this.dataObj.getData('http://localhost:3000/sellTovar')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    sell: res
                })
            });
    }

    render() {
        const {items, changed, sell, history} = this.state;

        const dataHistory = history ? <HistoryTovar closeHistory={this.closeHistory} name={history} sell={sell} add={changed} /> : null;

        let vegitables;

        if (items !== '' && changed !== '' && sell !== '') {
            vegitables = items.map(({name, weight, image}, i) => {   
                changed.forEach(chang => {
                    if (name == chang.name){
                        weight = +weight + +chang.weight;
                    }
                })
                sell.forEach(selled => {
                    if (name == selled.name) {
                        if (weight >= selled.weight) {
                            weight = +weight - +selled.weight
                        }
                    }
                })

                return (
                    <div className="item" key={i} onClick={() => this.openHistory(name)}>
                        <div className="image"><img src={image}/></div>
                        <div className="tittle">{name}</div>
                        <div className="weight">{weight}</div>
                    </div>
                );
            })
        }else{
            vegitables = <LoadState />
        }
    
        return (
            <>
                <h1 className="mb-4">Список товара</h1>
                <VegitableContainer>
                    {dataHistory}
                    {vegitables}
                </VegitableContainer>
            </>
        );
    }
}

export default Vegitable;