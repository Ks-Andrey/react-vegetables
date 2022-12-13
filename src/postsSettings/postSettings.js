import {BtnCont} from '../btnMain/btnsMain';
import styled from 'styled-components';
import PostsFormAdd from '../postsFormAdd/postsFormAdd';
import PostsFormRemove from '../postsFormRemove/postsFormRemove';
import { Component } from 'react';
import OkeySend from '../okeySend/okeySend';
import TovarsFormAdd from '../tovarFormAdd/tovarFormAdd';
import TovarsFormRemove from '../tovarFormRemove/tovarFormRemove';
import ParseData from '../dataParse/dataParse';

const AdminButton = styled(BtnCont)`
    button{
        width: 49.3%;
        max-widht: 100%;
    }
`;

const PostList = styled.div`
    width: 100%;
    max-width: 100%;
    border: 1px solid rgba(1, 1, 1, .2);
    border-radius: 5px;
    margin-top: 15px;
    & > div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 7px 15px;
        border-bottom: 1px solid rgba(1, 1, 1, .2);
        &:last-child{
            border-bottom: 0;
        }
    }
    .table-data-name div{
        font-weight: bold;
    }
`

class PostsSettings extends Component {
    constructor(props){
        super(props);

        this.dataObj = new ParseData();
        this.getPosts();
    }

    state = {
        delPosts: false,
        addPosts: false,
        delTovars: false,
        addTovars: false,

        loading: false,
        error: false,
        success: false,

        posts: '',
        postSend: ''
    }

    onOpenBlock = (block) => {
        this.setState({
            delPosts: false,
            addPosts: false,
            delTovars: false,
            addTovars: false
        })
        this.setState({
            [block]: !this.state[block]
        })
    }
    
    closePopap = () => {
        this.setState({
            success: false
        })
    }

    getStateData = (state, bool) => {
        this.setState({
            [state]: bool
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
        const {addPosts, delPosts, addTovars, delTovars, success, loading, error, posts, postSend} = this.state;
        const {dataOpen} = this.props;
        
        const addBlock = addPosts ? <PostsFormAdd getPosts={this.getPosts} getStateData={this.getStateData} /> : null;
        const delBlock = delPosts ? <PostsFormRemove getPosts={this.getPosts} postSend={postSend} posts={posts} getStateData={this.getStateData} /> : null;
        const addTovarBlock = addTovars ? <TovarsFormAdd getStateData={this.getStateData} /> : null;
        const delTovarBlock = delTovars ? <TovarsFormRemove getStateData={this.getStateData} /> : null;

        const okey = (success || loading) ? <OkeySend load={loading} success={success} closePopap={this.closePopap} /> : null;

        let postsList,
            postListContainer;

        if (posts !== '') {
            postsList = dataOpen == "posts" ? posts.map((item, i) => <div key={i}><div>{item.name}</div><div>{item.phone}</div></div>) : '';
            postListContainer = dataOpen == "posts" ? <PostList>
            <div className="table-data-name">
                <div>Имя</div>
                <div>Номер телефона</div>
            </div>
            {postsList}
        </PostList> : null;
        }   

        const btnCont = dataOpen == "posts" ?
            <>
                <h1 className="mb-4">Редактирование поставщиков</h1>
                <AdminButton>
                        <button onClick={() => this.onOpenBlock('addPosts')} className="btn btn-primary">Добавить поставщика</button>
                        <button onClick={() => this.onOpenBlock('delPosts')} className="btn btn-primary">Удалить поставщика</button>
                </AdminButton>
            </>
             : 
             <>
                <h1 className="mb-4">Редактирование товара</h1>
                <AdminButton>
                    <button onClick={() => this.onOpenBlock('addTovars')} className="btn btn-primary">Добавить товар</button>
                    <button onClick={() => this.onOpenBlock('delTovars')} className="btn btn-primary">Удалить товар</button>
                </AdminButton>
             </>

                    

        return (
            <>
                {btnCont}
                
                <div className="mt-3">
                    {addBlock}
                    {delBlock}
                    {delTovarBlock}
                    {addTovarBlock}
                    {okey}
                </div>

                {postListContainer}
            </>
        );
    }
}

export default PostsSettings;