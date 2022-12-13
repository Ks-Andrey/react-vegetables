import styled from "styled-components";
import { Component } from "react";

const SingContainer = styled.div`
    width: 400px;
    padding: 30px;
    border-radius: 5px;
    border: 1px solid rgba(1, 1, 1, 0.3);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    z-index: 999;
    position: absolute;
    background: #fff;
`;

class AccontForm extends Component {
    constructor(props){
        super(props);
    }

    state = {
        password: ''
    }

    onCinPassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    render () {
        const {onCloseForm, onSingIn} = this.props;
        const {password} = this.state;

        return (
            <SingContainer>
                 <form className="form">
                        <div className="form-group mb-3">
                            <input value={password} onChange={(e) => {this.onCinPassword(e)}} type="password" id="weight" className="form-control" placeholder="Введите пароль"/>
                        </div>
                        <div className="form-group">
                            <button onClick={(e) => onSingIn(password, e)} className="w-100 mw-100 btn btn-primary">Войти</button>
                        </div>
                        <div className="form-group">
                            <button onClick={() => onCloseForm()} className="mt-2 w-100 mw-100 btn btn-danger">Назад</button>
                        </div>
                    </form>
            </SingContainer>
        )
    }
}

export default AccontForm;