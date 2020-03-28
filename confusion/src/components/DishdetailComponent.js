import React, { Component } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import {
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
  Button,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
const isNumber = val => !isNaN(Number(val));

class Dishdetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    // event.preventDefault();
  }

  renderComments(comments) {
    if (comments == null) {
      return <div></div>;
    }

    const theComments = comments.map(comment => {
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author}, &nbsp;
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit"
            }).format(new Date(this.comment.date))}
          </p>
        </li>
      );
    });
    return (
      <div className=" col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">{theComments}</ul>
      </div>
    );
  }
  renderDish(dish) {
    if (dish != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const dish = this.props.dish;
    if (dish == null) {
      return <div></div>;
    }
    const dishItem = this.renderDish(dish);
    const commentItem = this.renderComments(dish.comments);
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={values => this.handleSubmit(values)}>
                <Label htmlFor="rating">Rating</Label>
                <Row className="form-group">
                  <Col>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                    >
                      <option> 1</option>
                      <option> 2</option>
                      <option> 3</option>
                    </Control.select>
                  </Col>
                </Row>
                <Label htmlFor="yourname">Your Name</Label>
                <Row className="form-group">
                  <Col>
                    <Control.text
                      model=".yourname"
                      id="yourname"
                      name="yourname"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15)
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".yourname"
                      show="touched"
                      messages={{
                        required: "Required ",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less"
                      }}
                    />
                  </Col>
                </Row>

                <Label htmlFor="message">Your Feedback</Label>
                <Row className="form-group">
                  <Col>
                    <Control.textarea
                      model=".message"
                      id="message"
                      name="message"
                      rows="6"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 6, offset: 0 }}>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
          <div className="col-12">
            <h3>{this.props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          {dishItem}
          {commentItem}
          <Button outline onClick={this.toggleModal}>
            <span className="	fa fa-pencil fa-lg"></span> Submit comment
          </Button>
        </div>
      </div>
    );
  }
}
export default Dishdetail;
