// import { base } from "../dataBase/db";
import styled from "styled-components";
import ParseData from "../dataParse/dataParse";

import { Component } from "react";

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
    }

    state = {
        items: ''
    };

    dataObj = new ParseData();

    getItems = () => {
        this.dataObj.getData()
            .then(res => res.json())
            .then(res => {
                this.setState({
                    items: res.vegitable
                })
            });
    }

    render() {
        const {items} = this.state;

        let vegitables;

        if (items !== '') {
            vegitables =  items.map(({name, weight, image, post}, i) => {
                return (
                    <div className="item" key={i}>
                        <div className="image"><img src={image}/></div>
                        <div className="tittle">{name}</div>
                        <div className="weight">{weight}</div>
                        <div className="post">{post}</div>
                    </div>
                );
            })
        }else{
            vegitables = <Load src="https://cdn-icons-png.flaticon.com/512/248/248959.png"/>;
        }
    
        return (
            <VegitableContainer>
                {vegitables}
            </VegitableContainer>
        );
    }
}

export default Vegitable;