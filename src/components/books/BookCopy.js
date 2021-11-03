import React, { Component } from "react";
import Page from "./Page";
import Modal from "react-bootstrap/Modal";

export default class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cover: "",
      currentPage: 0,
      showModal: false,
      modalInput:""
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
