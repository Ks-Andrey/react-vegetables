import { Component } from "react";
import ParseData from "../dataParse/dataParse";


class PostsFormAdd extends Component{
    constructor(props){
        super(props);

        this.dataObj = new ParseData();
    }

    state = {
        phone: '',
        name: ''
    }

    addNewTovar = (post, phone, e) => {
        e.preventDefault();

        const postData = {name: post, phone: phone};
        const {getStateData, getPosts} = this.props;

        getStateData("loading", true);

        this.dataObj.newData(postData, 'http://localhost:3000/postsTovar')
        .then(() => {
            getStateData("loading", false);
            getStateData("success", true);
            getPosts();
        }).catch(() => {
            getStateData("error", true);
        })
    }

    onChangeInput = (e, input) => {
        this.setState({
            [input]: e.target.value
        })
    }

    render(){

        const {phone, name} = this.state;

        return(
                <form className="form">
                    <div className="form-group mb-3">
                        <input value={name} onChange={(e) => this.onChangeInput(e, "name")} type="text" id="weight" className="form-control" placeholder="Введите имя поставщика"/>
                    </div>
                    <div className="form-group mb-3">
                        <input value={phone} onChange={(e) => this.onChangeInput(e, "phone")} type="text" id="weight" className="form-control" placeholder="Введите номер телефона"/>
                    </div>
                    <div className="form-group">
                        <button onClick={(e) => this.addNewTovar(name, phone, e)} className="w-100 mw-100 btn btn-primary">Добавить</button>
                    </div>
                </form>
        );
    }
}

export default PostsFormAdd;