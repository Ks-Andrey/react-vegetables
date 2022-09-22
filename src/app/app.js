import { Component } from 'react';
import BtnsMain from '../btnMain/btnsMain';
import Vegitable from '../dataObj/dataObj';
import AddTovar from '../addTovar/addTovar';
import styled from 'styled-components';

const Container = styled.div`
  width: 700px;
  max-width: 100%;
  margin: auto;
  padding: 30px;
  margin-top: 40px;
`;

class App extends Component{
  constructor(props){
    super(props);
  }

  state = {
    vegitable: false,
    addTovar: false,
    sellTovar: false,
    btnsOpen: true,
    backBtn: false,
  };

  openVegitable = () => {
    this.setState({
      vegitable: !this.state.vegitable,
      btnsOpen: false,
      backBtn: true,
    })
  }

  openNewTovar = () => {
    this.setState({
      addTovar: !this.state.addTovar,
      btnsOpen: false,
      backBtn: true,
    })
  }

  openBack = () => {
    this.setState({
      vegitable: false,
      addTovar: false,
      sellTovar: false,
      btnsOpen: true,
      backBtn: false
    })
  }

  render() {
    const {vegitable, addTovar, sellTovar, btnsOpen, backBtn} = this.state;

    const buttons = btnsOpen ? <BtnsMain openNewTovar={this.openNewTovar} openVegitable={this.openVegitable}/> : null;
    const vegitableOpen = vegitable ? <Vegitable/> : null;
    const addNewTovar = addTovar ? <AddTovar /> : null

    const back = backBtn ? <button className='btn btn-primary mt-3' onClick={() => this.openBack()}>Назад</button> : null;

    return(
      <Container>
        {buttons}
        {vegitableOpen}
        {addNewTovar}

        {back}
      </Container>
    );
  }
}

export default App;