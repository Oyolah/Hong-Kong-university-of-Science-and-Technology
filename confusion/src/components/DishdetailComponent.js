import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Label
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  else return <div></div>;
}

function RenderComments({ comments }) {
  if (comments.length != 0) {
    const dishcomments = comments.map(comment => {
      return (
        <div key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }).format(new Date(Date.parse(comment.date)))}
          </p>
        </div>
      );
    });

    return (
      <div>
        <h4>Comments</h4> {dishcomments}
      </div>
    );
  } else {
    return <div></div>;
  }
}

export class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  submitComment(values) {
    this.toggleModal();
    alert(
      "Rating: " +
        values.rating +
        " Author: " +
        values.author +
        " Comment: " +
        values.comment
    );
  }

  render() {
    const maxLength = len => val => !val || val.length <= len;
    const minLength = len => val => val && val.length >= len;

    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil"> </span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.submitComment(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                    defaultValue="1"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    rows="6"
                    model=".comment"
                    id="comment"
                    name="comment"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={10}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const DishDetail = props => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
          <CommentForm />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
