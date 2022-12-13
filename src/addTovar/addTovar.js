import { Component } from "react";
import ParseData from "../dataParse/dataParse";
import OkeySend from "../okeySend/okeySend";

class AddTovar extends Component {
    constructor(props){
        super(props);
        this.getTovarName();
        this.getPosts();
    }

    state = {
        name: '',
        posts: '',

        postSend: '',
        tovarSend: '',
        priceSend: '',
        weightSend: '',
        loading: false,
        error: false,
        success: false
    }
    
    getFormData = (e, input) => {
        this.setState({
            [input]: e.target.value
        })
    }

    dataObj = new ParseData();

    getTovarName = () => {
        this.dataObj.getData('http://localhost:3000/vegitable')
            .then(res => res.json())
            .then(res => {
                const names = res.map(items => items.name);

                this.setState({
                    name: names,
                    tovarSend: names[0]
                })
            })
    }

    changeData = (e) => {
        e.preventDefault()

        const {weightSend, postSend, priceSend, tovarSend} = this.state;

        const formD = {
            name: tovarSend,
            weight: weightSend,
            post: postSend,
            price: priceSend
        }
        
        if (weightSend !== '' && postSend !== '' && priceSend !== '' && tovarSend !== '') {
            this.setState({
                loading: true
            })
            this.dataObj.newData(formD, 'http://localhost:3000/changedTovar')
            .then(() => {
                this.setState({
                    loading: false,
                    success: true
                })
            }).catch(() => {
                this.setState({
                    error: true
                })
            })
        }
    }

    closePopap = () => {
        this.setState({
            success: false
        })
    }

    getPosts = () => {
        this.dataObj.getData('http://localhost:3000/postsTovar')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    posts: res,
                    postSend: res[0].name
                })
            })
    }

    render(){
        const {name, posts, postSend, priceSend, weightSend, tovarSend, success, loading} = this.state;

        const okey = (success || loading) ? <OkeySend success={success} load={loading} closePopap={this.closePopap} /> : null;

        let nameTovars, post;

        if (name !== '') {
            nameTovars = name.map((item, i) => <option key={i}>{item}</option>)
        }

        if (posts !== '') {
            post = posts.map((item, i) => <option key={i}>{item.name}</option>)
        }

        return (
            <div className="form-container">
                {okey}
                <h1 className="mb-4">Форма приема товара</h1>
                <form className="form" onSubmit={(e) => {this.changeData(e);}}>
                    <div className="form-group mb-3">
                        <label htmlFor="post" className="mb-1">Поставщик</label>
                        <select id="post" value={postSend} onChange={(e) => this.getFormData(e, 'postSend')} className="form-select">{post}</select>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="tovar" className="mb-1">Товар</label>
                        <select id="post" value={tovarSend} onChange={(e) => this.getFormData(e, 'tovarSend')} className="form-select">{nameTovars}</select>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="weight" className="mb-1">Вес</label>
                        <input type="text" id="weight" value={weightSend} onChange={(e) => this.getFormData(e, 'weightSend')} className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="price" className="mb-1">Цена</label>
                        <input type="text" id="price" value={priceSend} onChange={(e) => this.getFormData(e, 'priceSend')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <button className="w-100 mw-100 btn btn-primary">Отправить</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddTovar;