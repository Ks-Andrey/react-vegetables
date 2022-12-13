import { Component } from "react";
import ParseData from "../dataParse/dataParse";

class PostsFormRemove extends Component{
    constructor(props){
        super(props);

        this.dataObj = new ParseData();
    }

    state = {
        postSend: '',
        delElem: ''
    }
    

    deletePost = (id, e) => {
        e.preventDefault();

        const {getStateData, getPosts} = this.props;

        getStateData("loading", true);

        this.dataObj.deleteItem('http://localhost:3000/postsTovar/', id)
        .then(() => {
            getStateData("loading", false);
            getStateData("success", true);
            getPosts();
            
        }).catch(() => {
            getStateData("error", true);
        })
    }


    chooseDel = (e) => {
        const id = this.props.posts.filter(item => e.target.value == item.name);

        this.setState({
            delElem: id[0].id,
            postSend: id[0].name
        });
    }


    render(){

        const {delElem, postSend} = this.state;

        const {posts} = this.props

        let post;

        if (posts !== '') {
            post = posts.map((item, i) => <option key={i}>{item.name}</option>)
        }

        return(
                <form className="form">
                    <div className="form-group mb-3">
                    <select className="form-select" onChange={(e) => this.chooseDel(e)} value={postSend}>{post}</select>
                    </div>
                    <div className="form-group">
                        <button className="w-100 mw-100 btn btn-primary" onClick={(e) => this.deletePost(delElem, e)}>Удалить</button>
                    </div>
                </form>
        );
    }
}

export default PostsFormRemove;