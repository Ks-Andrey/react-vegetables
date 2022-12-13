import { Component } from "react";
import ParseData from "../dataParse/dataParse";
import OkeySend from "../okeySend/okeySend";


class ChangePassword extends Component{
    constructor(props){
        super(props);

        this.dataObj = new ParseData();
    }

    state = {
        password: '',
        repPassword: '',

        loading: false,
        error: false,
        success: false
    }

    onChangeInput = (e, input) => {
        this.setState({
            [input]: e.target.value
        })
    }

    onChangePassword = (e) => {
        e.preventDefault();

        const {repPassword, password} = this.state;
        const {getPassword} = this.props;

        if (repPassword == password) {
            const postData = {pass: password};

            this.setState({
                loading: true
            })

            this.dataObj.changePassword(postData)
                .then(() => {
                    this.setState({
                        loading: false,
                        success: true
                    })
                    getPassword();
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

    render(){

        const {password, repPassword, success, loading, error} = this.state;

        const okey = (success || loading) ? <OkeySend load={loading} success={success} closePopap={this.closePopap} /> : null;


        return(
            <>
                <h1 className="mb-4">Настройки пароля</h1>
                <form className="form">
                    <div className="form-group mb-3">   
                        <input value={password} onChange={(e) => this.onChangeInput(e, "password")} type="password" id="weight" className="form-control" placeholder="Введите пароль"/>
                    </div>
                    <div className="form-group mb-3">
                        <input value={repPassword} onChange={(e) => this.onChangeInput(e, "repPassword")} type="password" id="weight" className="form-control" placeholder="Повторите пароль"/>
                    </div>
                    <div className="form-group">
                        <button onClick={(e) => this.onChangePassword(e)} className="w-100 mw-100 btn btn-primary">Изменить</button>
                    </div>
                </form>
                {okey}
            </>
        );
    }
}

export default ChangePassword;