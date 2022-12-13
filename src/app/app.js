import { Component } from 'react';
import BtnsMain from '../btnMain/btnsMain';
import Vegitable from '../dataObj/dataObj';
import AddTovar from '../addTovar/addTovar';
import styled from 'styled-components';
import SellTovar from '../sellTovar/sellTovar';
import AccontForm from "../accountForm/accountForm";
import PostsSettings from '../postsSettings/postSettings';
import ChangePassword from '../changePassword/changePassword';
import ParseData from '../dataParse/dataParse';

const Container = styled.div`
  width: 700px;
  max-width: 100%;
  margin: auto;
  padding: 30px;
  margin-top: 40px;
`;

const PasswordError = styled.div`
  width: 300px;
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background: #fff;
  padding: 30px;
  border-radius: 5px;
  border: 1px solid rgba(1, 1, 1, .3);
  font-size: 22px;
  text-align: center;
  button{
    width: 100%;
    margin-top: 20px;
  }
`;

class App extends Component{
  constructor(props){
    super(props);

    this.dataObj = new ParseData();
    this.getPassword();
  }

  state = {
    vegitable: false,
    addTovar: false,
    sellTovar: false,
    posts: false,
    btnsOpen: true,
    changePass: false,

    backBtn: false,

    accountForm: false,
    singed: false,

    password: ''
  };

  openBlock = (btnData) => {
    this.setState({
      [btnData]: !this.state[btnData],
      btnsOpen: false,
      backBtn: true,
    })
  }
  
  openBack = () => {
    this.setState({
      vegitable: false,
      addTovar: false,
      sellTovar: false,
      posts: false,
      tovars: false,
      changePass: false,
      errorPassword: false,

      btnsOpen: true,
      backBtn: false
    })
  }

  openForm = () => {
    this.setState({
      accountForm: true
    })
  }

  closeForm = () => {
    this.setState({
      accountForm: false
    })
  }

  singIn = (pass, e) => {
    e.preventDefault();
    if (this.state.password == pass) {
      this.setState({
        singed: true,
        accountForm: false
      })
    }else{
      this.setState({
        errorPassword: true
      })
    }
  }

  singOut = () => {
    this.setState({
      singed: false,
    })
  }

  getPassword = () => {
    this.dataObj.getData('http://localhost:3000/password')
      .then(res => res.json())
      .then((res) => {
        this.setState({
          password: res[0].pass
        })
      })
  }

  closeErrorPassword = () => {
    this.setState({
      errorPassword: false
    })
  }

  render() {
    const {vegitable, addTovar, sellTovar, posts, btnsOpen, backBtn, accountForm, singed, tovars, changePass, errorPassword} = this.state;

    const buttons = btnsOpen ? <BtnsMain onSingOut={this.singOut} signedFlag={singed} openForm={this.openForm} openBlock={this.openBlock}/> : null;
    const vegitableOpen = vegitable ? <Vegitable/> : null;
    const addNewTovar = addTovar ? <AddTovar /> : null;
    const sell = sellTovar ? <SellTovar /> : null;
    const account = accountForm ? <AccontForm onSingIn={this.singIn} onCloseForm={this.closeForm}/> : null;
    const postsSettigs = posts ? <PostsSettings dataOpen="posts" /> : null;
    const tovarSettings = tovars ? <PostsSettings dataOpen="tovars" /> : null;
    const passwordChange = changePass ? <ChangePassword getPassword={this.getPassword} dataOpen="changePass" /> : null;
    const errorPs = errorPassword ? <PasswordError>Неверный пароль. Повторите попытку 
      <button className="btn btn-danger" onClick={() => this.closeErrorPassword()}>Закрыть</button> </PasswordError> : null;

    const back = backBtn ? <button className='btn btn-primary mt-3' onClick={() => this.openBack()}>Назад</button> : null;

    return(
      <Container>
        {buttons}
        {vegitableOpen}
        {addNewTovar}
        {sell}
        {postsSettigs}
        {tovarSettings}
        {account}
        {passwordChange}
        {errorPs}

        {back}
      </Container>
    );
  }
}

export default App;