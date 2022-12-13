import { Component } from "react";
import ParseData from "../dataParse/dataParse";
import OkeySend from "../okeySend/okeySend";

class SellTovar extends Component {
    constructor(props){
        super(props);
        this.getTovarName();
    }

    state = {
        name: '',
        tovarSend: '',
        weight: '',
        price: '', 
        
        error: false,
        loading: false,
        success: false
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

    getFormData = (e, input) => {
        this.setState({
            [input]: e.target.value
        })
    }

    closePopap = () => {
        this.setState({
            success: false
        })
    }

    onSellTovar = (e) => {
        e.preventDefault();

        const {tovarSend, weight, price} = this.state;

        const formD = {
            name: tovarSend,
            weight: weight,
            price: price
        }

        if (weight !== '' && price !== '') {
            this.setState({
                loading: true
            })
            this.dataObj.sellTovar(formD)
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

    render() {
        const {name, tovarSend, weight, price, success, loading} = this.state;
        
        let tovars;

        if (name !== '') {
            tovars = name.map((item, i) => <option key={i}>{item}</option>);
        }

        const okey = (success || loading) ? <OkeySend success={success} load={loading} closePopap={this.closePopap} /> : null;

        return (
            <div className="form-container">
                {okey}
                <h1 className="mb-4">Форма продажи товара</h1>
                <form className="form" onSubmit={(e) => {this.onSellTovar(e)}}>
                        <div className="form-group mb-3">
                            <label htmlFor="tovar" className="mb-1">Товар</label>
                            <select id="post" onChange={(e) => this.getFormData(e, 'tovarSend')} value={tovarSend} className="form-select">
                            {tovars}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="weight" className="mb-1">Вес</label>
                            <input required type="number" value={weight} onChange={(e) => this.getFormData(e, 'weight')} id="weight" className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="price" className="mb-1">Цена</label>
                            <input required type="number" value={price} onChange={(e) => this.getFormData(e, 'price')} id="price" className="form-control" />
                        </div>
                        <div className="form-group">
                            <button className="w-100 mw-100 btn btn-primary">Отправить</button>
                        </div>
                    </form>
            </div>
        );
    }
}

export default SellTovar;