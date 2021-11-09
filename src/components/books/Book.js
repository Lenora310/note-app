import React, { Component, useState, useContext } from "react";
import {Page} from "./Page";
import Modal from "react-bootstrap/Modal";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { PageForm } from "../form/PageForm";


export const Book = (props) => {

  const firebase = useContext(FirebaseContext);
  
  console.log(props);
  console.log("FIREBASE");
  console.log(firebase);
  console.log("BOOKS");
  console.log(firebase.books);

  const [id, _] = useState(props.match.params.id);
  // console.log("ID");
  // console.log(id);

  const [pages, setPages] = useState(firebase.books.find((element)=>{return element.id ===id}).pages);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const previousPage=() =>{
    if(currentPage!==0){
      setCurrentPage(currentPage-1)
    }
  }
  const nextPage =() => {
    if(currentPage!==pages.length-1){
      setCurrentPage(currentPage+1)
    }
  }
  const addPage =() => {
    setShowModal(true)
  }
  const hideModal =() => {
    setShowModal(false)
  }

 

  // const { loading, notes, fetchNotes, removeNote, books, fetchBooks } =
  //   useContext(FirebaseContext);

  // useEffect(() => {
  //   fetchNotes();
  //   fetchBooks();
  //   //eslint-disable-next-line
  // }, []);

  return (
    <div>
      <h1>I am a book with id {id} </h1>
      <button onClick={previousPage}>Previous</button>
      <Page
        pageName={pages[currentPage].title}
        pageNumber={currentPage}
      />
      <button onClick={nextPage}>Next</button>

      <br />
      <button onClick={addPage}>Add new page</button>

       {/* <p>
          {pages}
      </p>  */}

      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Create a new page!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <PageForm bookId={id}></PageForm>
          {/* <form onSubmit={handleSubmit}>
              <input value={state.modalInput} onChange={handleModalInputChange}/>
              <button type="submit">Submit</button>
          </form> */}
        </Modal.Body>

        <Modal.Footer>
          <button variant="secondary" onClick={hideModal}>
            Close
          </button>
          {/* <button variant="primary" onClick={saveNewPage}>
            Save Changes
          </button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}


//  export default 
class BookOld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cover: "",
      currentPage: 0,
      showModal: false,
      modalInput:"",
      id: props.match.params.id
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.addPage = this.addPage.bind(this);
    this.saveNewPage = this.saveNewPage.bind(this);

    this.hideModal = this.hideModal.bind(this);

    this.handleModalInputChange = this.handleModalInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  previousPage() {
    if (this.state.currentPage !== 0) {
      this.setState((state) => ({
        currentPage: state.currentPage - 1,
      }));
    }
  }
  nextPage() {
    if (this.state.currentPage !== this.props.pages.length - 1) {
      this.setState((state) => ({
        currentPage: state.currentPage + 1,
      }));
    }
  }
  addPage() {
    this.setState({
      showModal: true,
    });
  }
  
  handleModalInputChange(event){
        this.setState({
            modalInput: event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault() 
        // предотвращает обновление страницы

        this.setState({
            modalInput: this.state.modalInput,
        })
    }

  hideModal() {
    this.setState({ showModal: false });
  };
  saveNewPage(){
      this.setState(state => ({
          pages: this.props.pages.push(state.modalInput),
          showModal: false
      }))
  }
  

  render() {
    return (
      <div>
        <h1>I am a book with id {this.state.id} </h1>
        <button onClick={this.previousPage}>Previous</button>
        <Page
          pageName={this.props.pages[this.state.currentPage]}
          pageNumber={this.state.currentPage}
        />
        <button onClick={this.nextPage}>Next</button>

        <br />
        <button onClick={this.addPage}>Add new page</button>

        <p>
            {this.props.pages}
        </p>

        <Modal show={this.state.showModal} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>Create a new page!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.modalInput} onChange={this.handleModalInputChange}/>
                <button type="submit">Submit</button>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <button variant="secondary" onClick={this.hideModal}>
              Close
            </button>
            <button variant="primary" onClick={this.saveNewPage}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
