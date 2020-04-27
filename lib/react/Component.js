import { _setState } from "./SetState";

export default class Component{
    constructor(props={}){
        this.props = props;
        this.state = {}
        this.contextType = this.constructor.contextType;
        this.context =this.constructor.contextType && this.constructor.contextType.Provider.currentValue;
    }
    setState(payload){
        _setState(payload,this);
    }
}