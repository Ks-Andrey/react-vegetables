import { Component } from "react";
import ParseData from "../dataParse/dataParse";

class TovarsFormRemove extends Component{
    constructor(props){
        super(props);

        this.dataObj = new ParseData();
        this.getPosts();
    }

    state = {
        postSend: '',
        tovars: '',
        delElem: '1'
    }
    

    deletePost = (id, e) => {
        e.preventDefault();

        const {getStateData} = this.props;

        getStateData("loading", true);

        this.dataObj.deleteItem('http://localhost:3000/vegitable/', id)
        .then(() => {
            getStateData("loading", false);
            getStateData("success", true);
            this.getPosts();
        }).catch(() => {
            getStateData("error", true);
        })
    }

    getPosts = () => {
        this.dataObj.getData('http://localhost:3000/vegitable')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    tovars: res,
                    postSend: res[0].name
                })
            })
    }

    chooseDel = (e) => {
        const id = this.state.tovars.filter(item => e.target.value == item.name);

        this.setState({
            delElem: id[0].id,
            postSend: id[0].name
        });
    }


    render(){
        const {tovars, postSend, delElem} = this.state;

        let tovar;

        if (tovars !== '') {
            tovar = tovars.map((item, i) => <option key={i}>{item.name}</option>)
        }

        return(
                <form className="form">
                    <div className="form-group mb-3">
                    <select className="form-select" onChange={(e) => this.chooseDel(e)} value={postSend}>{tovar}</select>
                    </div>
                    <div className="form-group">
                        <button className="w-100 mw-100 btn btn-primary" onClick={(e) => this.deletePost(delElem, e)}>Удалить</button>
                    </div>
                </form>
        );
    }
}

export default TovarsFormRemove;