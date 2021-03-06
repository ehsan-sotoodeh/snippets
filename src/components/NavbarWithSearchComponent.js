import React,{Component} from 'react'
import {connect } from 'react-redux'
import { searchSnippets} from '../store/actions'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faTimes } from '@fortawesome/free-solid-svg-icons'; 
import Navbar from 'react-bootstrap/Navbar'


const SEARCHBOX_DELAY = 500; // add to settings file

const mapStateToProps = (state) =>{
    return {
        snippets : state.snippets,
        sidebarActive : state.view.sidebarActive
    }
}

const mapDispatchToProps = dispatch => {
    return{
        searchSnippets(term){
            dispatch(searchSnippets(term))

        }
    }
}

class NavbarWithSearchComponent extends Component {
    delayTimer;
    constructor(props){
        super(props);
        this.state = {
            searchKey:this.props.searchKey,
        };

    }

    componentDidMount(){
        this.doSearch();
    }   

    handleSubmit =  (e) => {
        e.preventDefault();
    }

    handleSearchInput = (e) =>{
        this.setState({searchKey:e.target.value});
        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(() => {
            this.doSearch();
        }, SEARCHBOX_DELAY);
    }
    doSearch = () =>{
        this.props.searchSnippets(this.state.searchKey.trim());
    }

    resetSearch = () =>{
        this.setState({searchKey:""},()=>{
            this.doSearch();
            this.props.resetSearch();
        });

    }

  

    render(){

        const sidebarActive = this.props.sidebarActive;
        return (
            <Navbar bg="light" expand="lg" className={" navbarWithSearch " + ((sidebarActive)?" slide-bottom ":" slide-up  d-none d-sm-block ")}>
            <Form inline>
                    <div id="custom-search-input" className="">
                        <div className="input-group ">
                                <input type="text" className="form-control input-sm" onChange={this.handleSearchInput} value={this.state.searchKey} placeholder="Search..." />
                                <span className="input-group-btn">
                                    <button 
                                        className={"btn btn-info btn-sm rounded-0 " + ((this.state.searchKey.length === 0)? "d-none" : " ")} 
                                        onClick={this.resetSearch} 
                                        type="button">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                    <button className="btn btn-info btn-sm rounded-0 searchButton" onClick={this.doSearch} type="button">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </span>
                        </div>
                    </div>
                </Form>
            </Navbar>
        );

    }
}

function SearchJsx({handleSubmit,handleSearchInput,doSearch}){
    return (
        <Form
        className={'w-75 d-flex justify-content-start'}
            noValidate
            onSubmit={handleSubmit}
        >


            <Form.Group as={Col} controlId="validationCustomUsername">
                <InputGroup>

                <Form.Control
                    type="text"
                    placeholder="Search"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={handleSearchInput}
                />
                <InputGroup.Append>
                        <Button type="submit" onClick={doSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                </InputGroup.Append>

                </InputGroup>
            </Form.Group>
        </Form>
    )
}
export default connect(mapStateToProps,mapDispatchToProps)(NavbarWithSearchComponent);

