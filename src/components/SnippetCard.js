import React,{Component} from 'react'
import {connect } from 'react-redux'
import {fetchMySnippets , searchSnippets ,bookmarkSnippet ,unBookmarkSnippet} from '../store/actions'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark,faShareAlt,faUserEdit } from '@fortawesome/free-solid-svg-icons'; 

const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets
    }
} 

const mapDispatchToProps = dispatch => {
    return{
        fetchMySnippets(){
            dispatch(fetchMySnippets())
        },
        searchSnippets(term){
            dispatch(searchSnippets(term))
        },
        bookmarkSnippet(snippetId){
            dispatch(bookmarkSnippet(snippetId))

        },
        unBookmarkSnippet(snippetId){
            dispatch(unBookmarkSnippet(snippetId))

        }
    }
}


class SnippetCard extends Component{
    constructor(props){
        super(props);
        this.state = {"showAnimation" : false}

    }

    bookmarkToggle = () =>{
        console.log(this.props.snippet);
        this.setState({"showAnimation" : true})
        if(this.props.snippet.bookmarkId){
            // already bookmarked -> unBookmark it
            this.props.unBookmarkSnippet(this.props.snippet.id);
        }else{
            // bookmark snippet;
            this.props.bookmarkSnippet(this.props.snippet.id);
        }
        
    }

    render(){
        const snippet = this.props.snippet;
        let keywordsJsx = snippet.keywords.split(" ").map((keyword,index) =>{
            return(
                <span key={"badge-pill" + index} className="fontSize07 mx-1 padding05 badge badge-pill badge-success">{keyword}</span>
    
            )
        });
        const isCreatedByLoggedInUser = (this.props.userId === snippet.user)?true:false;
        
        // TODO get real number of bookmarks count / for now it makes a number based on the first letter of the title
        const bookmarkCount = (parseInt(snippet.title[0]))?
                                parseInt(snippet.title[0]): 
                                lettersArray.indexOf(snippet.title[0].toLowerCase());

        const bookmarkedClass = (snippet.bookmarkId)? "text-primary" : " deactiveBookmarkTag";
        const animationType = (snippet.bookmarkId)? " bookmarkAnimation ":" unBookmarkAnimation ";

        const animation = (this.state.showAnimation)? animationType : "";
        return (
            <div className={"card col-12 ml-2 my-3 snippetCard snippetCardActiveBorder" } style={{ width: '95%' }}>

                    <div className="row ">
                        <div className="col-md-12 ">
                            <div className="bookmarkTagContainer pointer" onClick={this.bookmarkToggle}>
                                <FontAwesomeIcon 
                                    
                                    className={"fontSize20 mx-2  "+ bookmarkedClass + animation} 
                                    icon={faBookmark} />
                                    <span 
                                        className={
                                                " "+((snippet.bookmarkId)? " text-light" : " text-dark")+
                                                " "+((bookmarkCount < 10)? " oneDigit" : " twoDigit")
                                                
                                                
                                                } >
                                        {bookmarkCount}
                                    </span>
                            </div>
 

                            <div className="card-body padding05" >
                            <NavLink snippet={snippet} exact to={
                                {
                                    pathname: "/snippet/" + snippet.id,
                                    snippet:{...snippet}
                                }
                                }>
                                    <div className="card-title d-flex justify-content-start text-dark fontSize12">{snippet.title}</div>
                                </NavLink>
                                <hr/>
                                <div className="d-fle">
                                <div className="d-flex justify-content-start m-0">
                                    {keywordsJsx}
    
                                </div>
                                    <div className="d-flex justify-content-end m-0">
                                        <FontAwesomeIcon 
                                            className={"fontSize11 mx-2  orangeText " + ((isCreatedByLoggedInUser)?" ":"d-none")}
                                             icon={faUserEdit} />
       
                                        <FontAwesomeIcon className="fontSize11 mx-2 text-secondary " icon={faShareAlt} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }

}

const lettersArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

export default connect(mapStateToProps,mapDispatchToProps)(SnippetCard);

