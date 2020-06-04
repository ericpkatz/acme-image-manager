import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createImage } from '../store';

class ImageForm extends Component{
  constructor(props){
    super();
    this.state = {
      data: '',
    };
    this.save = this.save.bind(this);
  }
  save(ev){
    ev.preventDefault();
    const { data } = this.state;
    this.props.save({ data });
  }
  componentDidMount(){
    this.el.addEventListener('change', (ev)=> {
      const reader = new FileReader();
      const file = ev.target.files[0];

      reader.readAsDataURL(file);

      reader.addEventListener('load', ()=> {
        this.setState({data: reader.result});
      });
    });
  }
  render(){
    const { data } = this.state;
    const { save } = this;
    return (
      <form onSubmit={ save }>
        <input ref={ ref => this.el = ref } type='file'/>
        <button>Save</button>
      </form>
    );
  }
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    save: (image)=> dispatch(createImage(image)) 
  };
};

const mapStateToProps = ({ user })=> {
  return {
    user
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ImageForm);
