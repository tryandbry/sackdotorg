import React from 'react';

export default class Carousel extends React.Component {
  constructor(){
    super();
    this.state = {
      cycle: true,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    event.preventDefault();
    if(this.state.cycle){
      $('.carousel').carousel('pause');
      this.setState({cycle: false});
    }
    else {
      $('.carousel').carousel('cycle');
      this.setState({cycle: true});
    }
  }

  render(){

    return (
      <div>
        <div className="row">
          <h3 className="text-center">Image carousel</h3>
        </div>
        <div className="row">
          <div className="col-lg-2 col-md-2" />
          <div className="col-lg-8 col-md-8">
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              {/*Indicators*/}
              <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
              </ol>

              {/*Wrapper for slides*/}
              <div className="carousel-inner">
                <div className="item active">
                  <img className="img-responsive center-block" src="img/main_01_1.jpg" alt="Los Angeles" />
                </div>

                <div className="item">
                  <img className="img-responsive center-block" src="img/main_01_2.jpg" alt="Chicago" />
                </div>

                <div className="item">
                  <img className="img-responsive center-block" src="img/main_01_3.jpg" alt="New York" />
                </div>
              </div>

              {/*Left and right controls*/}
              <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-md-2">
            <button className="btn btn-default" onClick={this.handleClick}>Pause</button>
          </div>
        </div>
      </div>
    );
  }
}
