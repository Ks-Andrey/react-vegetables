import { Component } from "react";
import ParseData from "../dataParse/dataParse";


class TovarsFormAdd extends Component{
    constructor(props){
        super(props);

        this.dataObj = new ParseData();
    }

    state = {
        img: '',
        name: ''
    }

    addNewTovar = (tovar, img, e) => {
        e.preventDefault();

            const postData = {
                name: tovar,
                image: img,
                weight: 0,
                price: 0
            };
            const {getStateData} = this.props;
    
            getStateData("loading", true);
    
            this.dataObj.newData(postData, 'http://localhost:3000/vegitable')
            .then(() => {
                getStateData("loading", false);
                getStateData("success", true);
            }).catch(() => {
                getStateData("error", true);
            })
    }

    onChangeInput = (e, input) => {
        if (input == 'img') {
            const getUrlImage = new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = function () {
                    resolve(this.result);
                }
            })
    
            getUrlImage.then((res) => {
                this.setState({
                    [input]: res
                })
            })
        }else{
            this.setState({
                [input]: e.target.value
            })
        }
    }

    render(){

        const {img, name} = this.state;

        return(
                <form className="form" onSubmit={(e) => this.addNewTovar(name, img, e)}>
                    <div className="form-group mb-3">
                        <input required value={name} onChange={(e) => this.onChangeInput(e, "name")} type="text" id="weight" className="form-control" placeholder="Введите название продукта"/>
                    </div>
                    <div className="form-group mb-3">
                        <input required onChange={(e) => this.onChangeInput(e, "img")} type="file" id="weight" className="form-control" placeholder="Вставьте ссылку на продукт"/>
                    </div>
                    <div className="form-group">
                        <button className="w-100 mw-100 btn btn-primary">Добавить</button>
                    </div>
                </form>
        );
    }
}

export default TovarsFormAdd;