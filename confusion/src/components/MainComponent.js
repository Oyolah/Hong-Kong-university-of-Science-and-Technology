import React, { Component } from 'react';
import Home from './HomeComponent'
import Menu from './MenuComponent'
import Contact from './ContactComponent';
import About from './AboutComponent' ;
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Dishdetail from './DishdetailComponent';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders,postfeedback} from '../redux/ActionCreators'
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition} from 'react-transition-group'


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({

  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment) ),
  postfeedback: (values) => dispatch(postfeedback(values)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},

})

 

class Main extends Component {
  constructor (props){
    super(props);
      
    
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
  onDishSelect(dishId) {
    this.setState({selectedDish : dishId});

}


  render(){

    const HomePage = () => {
      return (
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading = {this.props.dishes.isLoading}
        dishesErrMsg = {this.props.dishes.errMsg}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess}
        />
      )
    }

    const DishWithId = ({match}) => {
        return(
          <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading = {this.props.dishes.isLoading}
          errMsg = {this.props.dishes.errMsg} 
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentsErrMess={this.props.comments.errMess}
          postComment = {this.props.postComment} />
        );
    }
    return (
      <div>
        <Header />
        <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
         <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Route path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postfeedback = {this.props.postfeedback}/>} />
          <Redirect to="/home" />
         </Switch>
         </CSSTransition>
         </TransitionGroup>
        <Footer />      
      </div>
   
    );
  }
  
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
