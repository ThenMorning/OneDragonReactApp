import React from "../react";

let StoreContext;
export class Provider extends React.Component {
  constructor(props) {
    super(props);
    // 基于之前实现的react context 我们可以封装一个store作为全局状态 保存在context中
    StoreContext = React.createContext({ store: props.store });
  }

  render() {
    return <StoreContext.Provider>{this.props.children}</StoreContext.Provider>;
  }
}

export const connnect = (mapStateToProps, mapDispatchToProps) => (
  CusComponent
) =>
  class ConnectComponent extends React.Component {
    constructor(props) {
      ConnectComponent.contextType = StoreContext;
      super(props);
      this.state = {
        props: {},
      };
    }
    componentWillMount() {
      const { store } = this.context;
      this.mapping();
    }
    mapping() {
      const { store } = this.context;
      const stateProps =mapStateToProps &&  mapStateToProps(store) || store;
      const dispatchProps = {};
      const newProps = this.state.props;
      Object.assign(newProps,stateProps)
      Object.assign(newProps,dispatchProps)
      this.setState({
        props: newProps
      });
    }
    render() {
      return <CusComponent {...this.state.props} />;
    }
  };
