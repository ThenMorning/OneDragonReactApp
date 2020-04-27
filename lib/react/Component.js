import { _setState } from "./SetState";
import { setComponetContext } from "../react-dom";

export default class Component{
    constructor(props={}){
        this.props = props || {};
        this.state = {}
        this.context = {};
        if(this.constructor.contextType){
            this.contextType = this.constructor.contextType;
            this.context = this.constructor.contextType.Provider.currentValue;
            this.constructor.contextType.Consumer.push(this);
            this.setContext = (value)=>{
               this.contextType.Provider.setValue(value);
                setComponetContext(this.contextType.Consumer)
            }
        }
    }
    setState(payload){
        _setState(payload,this);
    }
}