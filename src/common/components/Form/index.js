import React from "../../../../lib/react";
import "./index.css"

let FormContext;
class Form extends React.Component {
  constructor(props) {
    super(props);
    FormContext = React.createContext(
      (props.options && props.options.defaultValues) || {}
    );
    this.props.options.getFormInstance(this);
  }

  getValues(formItemNames) {
    return formItemNames && formItemNames.length
      ? formItemNames.map(
          (formItemName) => FormContext.Provider.currentValue[formItemName]
        )
      : FormContext.Provider.currentValue;
  }
  getValuesWithCheck(formItemNames, cb) {
    this.checkFormItem(formItemNames,(errors)=>{
        cb(errors,this.getValues(formItemNames))
    });
  }

  resetValue(formItemNames) {
    const { Consumer } = FormContext;
  }

  checkFormItem(formItemNames,cb) {
    const { Consumer } = FormContext;
    const errors = [];
    const checkConsumer = Consumer.filter(c=>formItemNames && formItemNames.includes(c.props.options.name) || true);
    checkConsumer.forEach((item) => {
        item.check(null,(error)=>{
            errors.push(error)
            if(errors.length === checkConsumer.length ){
                cb(errors.filter(error=>!!error))
            }
        })
    });
  }

  render() {
    return <FormContext.Provider className={this.props.className}>{this.props.children}</FormContext.Provider>;
  }
}

export class Item extends React.Component {
  constructor(props) {
    Item.contextType = FormContext;
    super(props);
    const { options = {} } = this.props;
    const { name } = options;
    if (!name) {
      throw new Error("[Form-Item-Error]:Form-Item需要一个唯一的name");
    }
    this.state = {
      error: "",
    };
  }

  componentDidMount() {
    const { children, options = {} } = this.props;
    const { name } = options;
    const _children = {
      ...children,
      attrs: {
        ...children.attrs,
        value: this.context[name] || undefined,
        oninput: this.onchange.bind(this),
      },
    };
    this.setState({
      _children,
    });
  }

  check(_value, cb) {
    const { options = {} } = this.props;
    const { rules, name } = options;
    const value = _value || this.context[name] || "";
    let checkResult = true;
    try {
      rules.forEach((rule) => {
        if (rule.require) {
          checkResult = isVaild(value);
        } else if (rule.checkFn) {
          if (rule.deps && rule.deps.length) {
            checkResult = rule.checkFn(
              value,
              rule.deps.map((dep) => this.context[dep])
            );
          } else {
            checkResult = rule.checkFn(value);
          }
        } else {
          console.warn(
            "[Form-Item-Warning]:Form-Item暂且只支持自定义检验与必填校验"
          );
        }
        if (!checkResult) {
          this.setState({
            error: rule.message,
          });
          cb && cb(rule.message)
          throw new Error("[Form-Item-Error]:Form-Item校验到Error");
        }
      });
    } catch (e) {}
    if (checkResult && this.state.error) {
      this.setState({
        error: " ", // diff算法有细节问题 这里 赋值 " " 用来做覆盖
      });
      cb && cb("")
    }
  }

  onchange(res) {
    const { options = {} } = this.props;
    const { name } = options;
    const newContext = { ...this.context };
    newContext[name] = res.target.value || "";
    this.setContext(newContext);
    this.check(res.target.value);
  }

  render() {
    const { options,className } = this.props;
    const { label } = options;
    const { error, _children } = this.state;
    if (!_children) {
      return null;
    }
    const __children = {
      ..._children,
      attrs: {
        ..._children.attrs,
        class: error && error!== " " ? "error-dom dom" : "dom",
      },
    };
    return (
      <div className={className}>
        <div className="label">{label}</div>
        {__children}
        {(error && <div class="error-tip">{error}</div>) || null}
      </div>
    );
  }
}
Form.Item = Item;
export default Form;

function isVaild(value) {
  return !!value;
}
