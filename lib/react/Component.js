import { _setState } from "./SetState";

export default class Component{
    constructor(props={}){
        this.props = props;
        this.state = {}
    }
    setState(payload){
        _setState(payload,this);
    }
}