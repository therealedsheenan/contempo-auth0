/* eslint-disable react/prop-types */

import React from 'react';

const asyncComponent = WrappedComponent =>
  // return class
   class extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
         loaded: false
       };
     }

     componentDidMount() {
       WrappedComponent.then((module) => {
         this.component = module.default;
         this.setState({ loaded: true });
       });
     }

     render() {
       if (this.state.loaded) {
         return <this.component {...this.props.props} />;
       }
       return <div>Loading...</div>;
     }
  };

export default asyncComponent;
